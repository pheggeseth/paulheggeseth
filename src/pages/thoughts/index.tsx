import { BlogPostList } from '../../components/blog-post-list';
import { Bookend } from '../../components/bookend';
import { Article } from '../../components/ui/article';
import type { GetConfig } from '../../types';
import { getBlogPostPublicationYear } from '../../utils/get-blog-post-publication-year';
import { getBlogPostSlugs } from '../../utils/get-blog-post-slugs';
import { readBlogPostFile } from '../../utils/read-blog-post-file';
import { byPublicationDateDescending } from '../../utils/sort';

export default async function BlogPostsListPage() {
	const slugs = await getBlogPostSlugs();
	const posts = (await Promise.all(slugs.map(readBlogPostFile))).sort(
		byPublicationDateDescending,
	);

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
		<Article>
			<Bookend variant="start">{'<archive>'}</Bookend>
			<header>
				<h1>Thoughts</h1>
			</header>
			<BlogPostList posts={posts} />
			<Bookend variant="end">{'</archive>'}</Bookend>
		</Article>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
