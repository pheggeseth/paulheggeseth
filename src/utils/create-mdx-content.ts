import { compile, run } from '@mdx-js/mdx';
import { recmaCodeHike, remarkCodeHike } from 'codehike/mdx';
import * as runtime from 'react/jsx-runtime';
import { useMDXComponents } from './use-mdx-components';

export async function createMDXContent(content: string) {
	const vFile = await compile(content, {
		outputFormat: 'function-body',
		providerImportSource: './use-mdx-components',
		remarkPlugins: [[remarkCodeHike, { components: { code: 'MyCode' } }]],
		recmaPlugins: [[recmaCodeHike, { components: { code: 'MyCode' } }]],
	});

	const { default: Component } = await run(vFile, {
		...runtime,
		useMDXComponents,
	});

	return Component;
}
