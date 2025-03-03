import { fileURLToPath } from 'node:url';
import mdx from '@mdx-js/rollup';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import type { Element } from 'hast';
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
		pre(hast) {
			const totalLines = (
				hast.children[0] as Element | undefined
			)?.children?.filter((c) => c.type === 'element').length;

			if (totalLines) {
				this.addClassToHast(hast, `lines-${totalLines.toString().length}`);
			}
		},
	},
];
