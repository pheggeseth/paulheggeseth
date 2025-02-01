import fs from 'node:fs/promises';
import { compile, run } from '@mdx-js/mdx';
import matter from 'gray-matter';
import * as runtime from 'react/jsx-runtime';
import { BlogPost } from '../../components/blog-post';
import type { GetConfig } from '../../types';

export default async function Thoughts({ slug }: { slug: string }) {
	const fileContent = await fs.readFile(`src/posts/${slug}.mdx`, 'utf-8');
	const { data, content } = matter(fileContent);

	const compiledCode = String(
		await compile(content, { outputFormat: 'function-body' }),
	);
	const { default: Content } = await run(compiledCode, {
		...runtime,
		baseUrl: import.meta.url,
	});

	return (
		<BlogPost title={data.title} publicationDate={data.publicationDate}>
			<Content />
		</BlogPost>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
