import { BlogPost } from '@/components/blog-post';
import type { GetConfig } from '@/types';
import { parseBlogPost } from '@/utils/blog-posts';

export default async function BlogPostPage({ slug }: { slug: string }) {
	const { data, MDXContent } = await parseBlogPost(slug);

	return (
		<>
			<title>{data.title}</title>
			<BlogPost title={data.title} publicationDate={data.publicationDate}>
				<MDXContent />
			</BlogPost>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
