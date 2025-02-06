import type { BlogPostType } from '../types';

export function getBlogPostPublicationYear(post: BlogPostType) {
	return post.data.publicationDate[0];
}
