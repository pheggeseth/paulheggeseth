import fs from 'node:fs/promises';
import path from 'node:path';
import { frontmatterSchema } from '@/schemas';
import type { BlogPostType } from '@/types';
import { byPublicationDateDescending } from '@/utils/sort';
import chokidar from 'chokidar';
import matter from 'gray-matter';

const blogDir = 'src/blog-posts';
const outputFile = 'src/posts.gen.json';

// Only import chokidar when in dev mode
const isDev = process.env.NODE_ENV === 'development';

async function generateBlogIndex() {
	try {
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
			outputFile,
			JSON.stringify(posts.sort(byPublicationDateDescending), null, 2),
		);
		console.log('✅ Generated posts index');
	} catch (err) {
		console.error('❌ Failed to generate posts index:', err);
	}
}

// Initial generation
generateBlogIndex();

// Watch mode only in development
if (isDev) {
	const watcher = chokidar.watch(blogDir, { persistent: true });

	watcher
		.on('add', (file) => {
			console.log(`🆕 New post added: ${file}`);
			generateBlogIndex();
		})
		.on('change', (file) => {
			console.log(`✏️ Post updated: ${file}`);
			generateBlogIndex();
		})
		.on('unlink', (file) => {
			console.log(`🗑️ Post deleted: ${file}`);
			generateBlogIndex();
		});

	console.log('👀 Watching for changes in posts...');
}
