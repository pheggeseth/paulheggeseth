import { frontMatterSchema } from '@/schemas';
import type { run } from '@mdx-js/mdx';

export async function importBlogPost(slug: string) {
	const module: Awaited<ReturnType<typeof run>> = await import(
		`../blog-posts/${slug}.mdx`
	);

	return {
		MDXContent: module.default,
		frontmatter: frontMatterSchema.parse(module.frontmatter),
	};
}
