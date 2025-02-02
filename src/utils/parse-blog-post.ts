import { createMDXContent } from './create-mdx-content';
import { readBlogPostFile } from './read-blog-post-file';

export async function parseBlogPost(slug: string) {
	const { data, content } = await readBlogPostFile(slug);
	const Component = await createMDXContent(content);
	console.log({ data, content });

	return {
		data,
		Component,
	};
}
