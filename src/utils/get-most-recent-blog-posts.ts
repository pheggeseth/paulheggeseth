import { getAllBlogPosts } from './get-all-blog-posts';
import { byPublicationDateDescending } from './sort';

export async function getMostRecentBlogPosts(limit?: number) {
	return (await getAllBlogPosts())
		.sort(byPublicationDateDescending)
		.slice(0, limit);
}
