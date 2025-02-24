import { BlogPost } from '@/components/blog-post';
import type { GetConfig } from '@/types';
import { importBlogPost } from '@/utils/import-blog-post';
import type { PageProps } from 'waku/router';

export default async function BlogPostPage({
	slug,
}: PageProps<'/thoughts/[slug]'>) {
	const { MDXContent, data } = await importBlogPost(slug);

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
