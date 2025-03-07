import fs from 'node:fs/promises';
import { frontMatterSchema } from '@/schemas';
import type { BlogPostType } from '@/types';
import type { run } from '@mdx-js/mdx';
import { byPublicationDateDescending } from './sort';

export async function getAllBlogPosts() {
	const fileNames = await fs.readdir('src/blog-posts', { encoding: 'utf-8' });
	return Promise.all(
		fileNames.map(async (fileName) => {
			const slug = fileName.replace(/\.[^/.]+$/, '');
			return {
				slug,
				data: (await importBlogPost(slug)).data,
			};
		}),
	);
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
