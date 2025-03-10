import fs from 'node:fs/promises';
import path from 'node:path';
import { frontmatterSchema } from '@/schemas';
import type { BlogPostType } from '@/types';
import { byPublicationDateDescending } from '@/utils/sort';
import chokidar from 'chokidar';
import matter from 'gray-matter';

const blogDir = 'src/blog-posts';

const isDev = process.env.NODE_ENV === 'development';

async function makeBlogIndex() {
	const posts: BlogPostType[] = await Promise.all(
		(await fs.readdir(blogDir))
			.filter((fileName) => fileName.endsWith('.mdx'))
			.map(async (fileName) => {
				const content = await fs.readFile(
					path.join(blogDir, fileName),
					'utf-8',
				);
				return {
					slug: fileName.replace('.mdx', ''),
					frontmatter: frontmatterSchema.parse(matter(content).data),
				};
			}),
	);

	await fs.writeFile(
		'src/posts.gen.json',
		JSON.stringify(posts.sort(byPublicationDateDescending), null, 2),
	);
}

makeBlogIndex().then(() => {
	if (isDev) {
		const watcher = chokidar.watch(blogDir, { persistent: true });

		watcher
			.on('add', (file) => {
				console.log(`🆕 New post added: ${file}`);
				makeBlogIndex();
			})
			.on('change', (file) => {
				console.log(`✏️ Post updated: ${file}`);
				makeBlogIndex();
			})
			.on('unlink', (file) => {
				console.log(`🗑️ Post deleted: ${file}`);
				makeBlogIndex();
			});

		console.log('👀 Watching for changes in posts...');
	}
});
