import { compile, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { useMDXComponents } from './use-mdx-components';

export async function createMDXContent(content: string) {
	const vFile = await compile(content, {
		outputFormat: 'function-body',
		providerImportSource: './use-mdx-components',
	});

	const { default: Component } = await run(vFile, {
		...runtime,
		useMDXComponents,
	});

	return Component;
}
