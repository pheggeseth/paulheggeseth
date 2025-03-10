import { BlogPost } from '@/components/blog-post';
import type { GetConfig } from '@/types';
import { importBlogPost } from '@/utils/blog-posts';
import type { PageProps } from 'waku/router';

export default async function BlogPostPage({
	slug,
}: PageProps<'/thoughts/[slug]'>) {
	const { MDXContent, frontmatter } = await importBlogPost(slug);

	return (
		<>
			<title>{frontmatter.title}</title>
			<BlogPost
				title={frontmatter.title}
				publicationDate={frontmatter.publicationDate}
			>
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
