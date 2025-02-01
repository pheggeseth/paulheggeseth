import fs from 'node:fs/promises';
import { compile, run } from '@mdx-js/mdx';
import matter from 'gray-matter';
import * as runtime from 'react/jsx-runtime';
import { frontmatterSchema } from '../schemas';

export async function parseBlogPost(slug: string) {
	const fileContent = await fs.readFile(`src/blog-posts/${slug}.mdx`, 'utf-8');
	const { data, content } = matter(fileContent);
	const { default: BlogPostContent } = await run(
		await compile(content, { outputFormat: 'function-body' }),
		{
			...runtime,
			baseUrl: import.meta.url,
		},
	);

	return {
		...frontmatterSchema.parse(data),
		BlogPostContent,
	};
}
