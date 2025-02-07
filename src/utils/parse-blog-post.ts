import { createMDXContent } from './create-mdx-content';
import { readBlogPostFile } from './read-blog-post-file';

export async function parseBlogPost(slug: string) {
	const { data, content } = await readBlogPostFile(slug);
	const MDXContent = await createMDXContent(content);

	return {
		data,
		MDXContent,
	};
}
