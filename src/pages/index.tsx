import { BlogPost } from '../components/blog-post';
import { RecentBlogPostList } from '../components/recent-blog-post-list';
import type { GetConfig } from '../types';
import { getMostRecentBlogPosts } from '../utils/blog-posts';
import { createMDXContent } from '../utils/create-mdx-content';

export default async function Index() {
	const [currentPost, ...recentPosts] = await getMostRecentBlogPosts(5);

	if (!currentPost) {
		throw new Error();
	}

	const MDXContent = await createMDXContent(currentPost?.content);

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
