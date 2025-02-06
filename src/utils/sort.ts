import type { BlogPostType } from '../types';
import { getBlogPostPublicationDate } from './get-blog-post-publication-date';

export function byPublicationDateDescending(a: BlogPostType, b: BlogPostType) {
	return getBlogPostPublicationDate(b) - getBlogPostPublicationDate(a);
}
