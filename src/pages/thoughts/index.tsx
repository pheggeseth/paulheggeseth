import { BlogPostList } from '../../components/blog-post-list';
import { Bookend } from '../../components/bookend';
import type { GetConfig } from '../../types';
import { getBlogPostPublicationYear } from '../../utils/get-blog-post-publication-year';
import { getMostRecentBlogPosts } from '../../utils/get-most-recent-blog-posts';

export default async function BlogPostsListPage() {
	const posts = await getMostRecentBlogPosts();

	const postsByYear = new Map<number, typeof posts>();

	for (const post of posts) {
		const year = getBlogPostPublicationYear(post);
		if (postsByYear.has(year)) {
			postsByYear.get(year)?.push(post);
		} else {
			postsByYear.set(year, [post]);
		}
	}

	return (
		<article>
			<Bookend label="blog" variant="start" />
			<header>
				<h1>Thoughts</h1>
			</header>
			<BlogPostList posts={posts} />
			<Bookend label="blog" variant="end" />
		</article>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
