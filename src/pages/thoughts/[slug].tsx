import { BlogPost } from '../../components/blog-post';
import type { GetConfig } from '../../types';
import { parseBlogPost } from '../../utils/parse-blog-post';

export default async function BlogPostPage({ slug }: { slug: string }) {
	const { data, Component } = await parseBlogPost(slug);

	return (
		<>
			<title>{data.title}</title>
			<BlogPost title={data.title} publicationDate={data.publicationDate}>
				<Component />
			</BlogPost>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
