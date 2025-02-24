import fs from 'node:fs/promises';
import { blogPostSchema, frontMatterSchema } from '@/schemas';
import type { BlogPostType } from '@/types';
import type { run } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { byPublicationDateDescending } from './sort';

export async function getBlogPostSlugs() {
	const fileNames = await fs.readdir('src/blog-posts', { encoding: 'utf-8' });
	return fileNames.map((fileName) => fileName.replace(/\.[^/.]+$/, ''));
}

export async function readBlogPostFile(slug: string) {
	const file = await fs.readFile(`src/blog-posts/${slug}.mdx`, 'utf-8');
	return blogPostSchema.parse({ data: matter(file).data, slug });
}

export async function getAllBlogPosts() {
	const slugs = await getBlogPostSlugs();
	return Promise.all(slugs.map(readBlogPostFile));
}

export function getBlogPostPublicationYear(post: BlogPostType) {
	return post.data.publicationDate[0];
}

export function getBlogPostPublicationDate(post: BlogPostType) {
	return Date.UTC(...post.data.publicationDate);
}

export async function getMostRecentBlogPosts(limit?: number) {
	return (await getAllBlogPosts())
		.sort(byPublicationDateDescending)
		.slice(0, limit);
}

export async function importBlogPost(slug: string) {
	const module: Awaited<ReturnType<typeof run>> = await import(
		`../blog-posts/${slug}.mdx`
	);

	return {
		MDXContent: module.default,
		data: frontMatterSchema.parse(module.data),
	};
}
