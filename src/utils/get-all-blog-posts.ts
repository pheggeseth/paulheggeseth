import { getBlogPostSlugs } from './get-blog-post-slugs';
import { readBlogPostFile } from './read-blog-post-file';

export async function getAllBlogPosts() {
	const slugs = await getBlogPostSlugs();
	return Promise.all(slugs.map(readBlogPostFile));
}
