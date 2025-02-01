import { BlogPost } from '../../components/blog-post';
import type { GetConfig } from '../../types';
import { parseBlogPost } from '../../utils/parse-blog-post';

export default async function Thoughts({ slug }: { slug: string }) {
	const { title, publicationDate, BlogPostContent } = await parseBlogPost(slug);

	return (
		<BlogPost title={title} publicationDate={publicationDate}>
			<BlogPostContent />
		</BlogPost>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
