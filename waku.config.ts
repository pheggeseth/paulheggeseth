import { fileURLToPath } from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'waku/config';

export default defineConfig({
	unstable_viteConfigs: {
		common: () => ({
			plugins: [
				tsconfigPaths({ root: fileURLToPath(new URL('.', import.meta.url)) }),
			],
		}),
	},
});
