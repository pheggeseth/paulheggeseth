import { compile, run } from '@mdx-js/mdx';
import { recmaCodeHike, remarkCodeHike } from 'codehike/mdx';
import * as runtime from 'react/jsx-runtime';
import { Code } from '../components/ui/code';
import { useMDXComponents } from './use-mdx-components';

export async function createMDXContent(content: string) {
	const vFile = await compile(content, {
		outputFormat: 'function-body',
		providerImportSource: './use-mdx-components',
		remarkPlugins: [[remarkCodeHike, { components: { code: Code.name } }]],
		recmaPlugins: [[recmaCodeHike, { components: { code: Code.name } }]],
	});

	const { default: Component } = await run(vFile, {
		...runtime,
		useMDXComponents,
	});

	return Component;
}
