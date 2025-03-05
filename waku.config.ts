import { fileURLToPath } from 'node:url';
import mdx from '@mdx-js/rollup';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';
import { theme } from './src/components/ui/code/theme';

export default defineConfig({
	unstable_viteConfigs: {
		common: () => ({
			plugins: [
				tsconfigPaths({
					root: fileURLToPath(new URL('.', import.meta.url)),
				}),
				mdx({
					remarkPlugins: [
						[remarkFrontmatter, 'yaml'],
						[remarkMdxFrontmatter, { name: 'data' }],
					],
					rehypePlugins: [
						[
							rehypeShiki,
							{
								theme,
								transformers,
							},
						],
					],
					providerImportSource: '../components/mdx-components.tsx',
				}),
			],
		}),
	},
});

type Transformer = NonNullable<RehypeShikiOptions['transformers']>[number];

const transformers: Transformer[] = [
	lineNumbers(),
	{
		pre(hast) {
			return {
				type: 'element',
				tagName: 'div',
				properties: { class: 'pre-wrapper' },
				children: [hast],
			};
		},
	},
];

function lineNumbers(): Transformer {
	return {
		pre(hast) {
			if (hasLineNumbers(parseDirectives(this))) {
				hast.children.unshift({
					type: 'element',
					tagName: 'div',
					properties: { class: 'line-numbers-container' },
					children: [
						{
							type: 'element',
							tagName: 'div',
							properties: { class: 'shadow' },
							children: [],
						},
						{
							type: 'element',
							tagName: 'div',
							properties: { class: 'line-numbers' },
							children: this.lines.map((_, index) => ({
								type: 'element',
								tagName: 'div',
								properties: {},
								children: [{ type: 'text', value: (index + 1).toString() }],
							})),
						},
					],
				});
			}

			return hast;
		},
	};
}

function parseDirectives(that: { options: { meta?: { __raw?: string } } }) {
	const regex = /^\[!code\s+(.*(?:,\s*)?)+\]$/;

	const directives =
		(that.options.meta?.__raw ?? '')
			.match(regex)?.[1]
			?.split(/,\s*/)
			.filter((e): e is string => !!e) ?? [];

	return directives;
}

function hasLineNumbers(directives: string[]) {
	return directives.includes('line-numbers');
}
