import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

export async function createMDXContent(content: string) {
	return (
		await run(await compile(content, { outputFormat: 'function-body' }), {
			...runtime,
			baseUrl: import.meta.url,
		})
	).default;
}
