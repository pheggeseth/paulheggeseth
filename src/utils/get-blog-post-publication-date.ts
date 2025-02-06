import type { BlogPostType } from '../types';

export function getBlogPostPublicationDate(post: BlogPostType) {
	return Date.UTC(...post.data.publicationDate);
}
