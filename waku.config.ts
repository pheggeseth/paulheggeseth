import { fileURLToPath } from 'node:url';
import mdx from '@mdx-js/rollup';
import { recmaCodeHike, remarkCodeHike } from 'codehike/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';
import { Code } from './src/components/ui/code';

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
						[remarkMdxFrontmatter, { name: 'frontmatter' }],
						[remarkCodeHike, { components: { code: Code.name } }],
					],
					recmaPlugins: [[recmaCodeHike, { components: { code: Code.name } }]],
					providerImportSource: '../../src/utils/mdx-components.tsx',
				}),
			],
		}),
	},
});
