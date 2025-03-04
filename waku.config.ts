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

const transformers: NonNullable<RehypeShikiOptions['transformers']> = [
	{
		line(hast, line) {
			if (hasLineNumbers(parseDirectives(this))) {
				return {
					type: 'element',
					tagName: 'span',
					properties: { class: 'line-wrapper' },
					children: [
						{
							type: 'element',
							tagName: 'span',
							properties: { class: 'line-number' },
							children: [{ type: 'text', value: line.toString() }],
						},
						hast,
					],
				};
			}

			return hast;
		},
		pre(hast) {
			console.log({ lines: this.lines });
			if (hasLineNumbers(parseDirectives(this))) {
				hast.children.unshift({
					type: 'element',
					tagName: 'div',
					properties: { class: 'shadow' },
					children: [],
				});
			}

			return hast;
		},
	},
];

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
