import { fileURLToPath } from 'node:url';
import mdx from '@mdx-js/rollup';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';

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
					rehypePlugins: [rehypeMdxCodeProps],
					providerImportSource: '../components/mdx-components.tsx',
				}),
			],
		}),
	},
});
