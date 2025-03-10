import { BlogPost } from '@/components/blog-post';
import { RecentBlogPostList } from '@/components/recent-blog-post-list';
import type { GetConfig } from '@/types';
import { getMostRecentBlogPosts, importBlogPost } from '@/utils/blog-posts';

export default async function Index() {
	const [currentPost, ...recentPosts] = getMostRecentBlogPosts(5);

	if (!currentPost) {
		return (
			<>
				<title>paulheggeseth.codes()</title>
				<div>no blog posts found</div>
			</>
		);
	}

	const { MDXContent } = await importBlogPost(currentPost.slug);

	return (
		<>
			<title>paulheggeseth.codes()</title>
			<BlogPost
				title={currentPost.data.title}
				publicationDate={currentPost.data.publicationDate}
			>
				<MDXContent />
			</BlogPost>
			<RecentBlogPostList heading="Recent thoughts" posts={recentPosts} />
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
