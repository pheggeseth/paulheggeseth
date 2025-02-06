import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { blogPostSchema } from '../schemas';

export async function readBlogPostFile(slug: string) {
	const file = await fs.readFile(`src/blog-posts/${slug}.mdx`, 'utf-8');
	return { ...blogPostSchema.parse(matter(file)), slug };
}
