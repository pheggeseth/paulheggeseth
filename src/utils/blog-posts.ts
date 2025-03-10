import fs from 'node:fs';
import { blogPostSchema, frontMatterSchema } from '@/schemas';
import type { BlogPostType } from '@/types';
import type { run } from '@mdx-js/mdx';
import { z } from 'zod';

export function getBlogPostPublicationYear(post: BlogPostType) {
	return post.data.publicationDate[0];
}

export function getBlogPostPublicationDate(post: BlogPostType) {
	return Date.UTC(...post.data.publicationDate);
}

let cachedPosts: BlogPostType[] | null = null;

export function getMostRecentBlogPosts(limit?: number) {
	if (!cachedPosts) {
		try {
			const rawData = fs.readFileSync('cache/posts.json', 'utf-8');
			const parsedData = JSON.parse(rawData);
			cachedPosts = z.array(blogPostSchema).parse(parsedData);
		} catch (error) {
			console.error('Failed to read or parse cache/posts.json:', error);
			cachedPosts = [];
		}
	}

	// Ensure it never returns null
	return limit ? cachedPosts.slice(0, limit) : [...cachedPosts];
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
