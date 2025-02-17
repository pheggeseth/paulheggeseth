import type { BlogPostType } from '@/types';
import { getBlogPostPublicationDate } from './blog-posts';

export function byPublicationDateDescending(a: BlogPostType, b: BlogPostType) {
	return getBlogPostPublicationDate(b) - getBlogPostPublicationDate(a);
}
