import type { GetConfigResponse, PathsForPages } from 'waku/router';

import type { getConfig as About_getConfig } from './pages/about';
import type { getConfig as Index_getConfig } from './pages/index';
import type { getConfig as ThoughtsSlug_getConfig } from './pages/thoughts/[slug]';

type Page = {
	DO_NOT_USE_pages:
		| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
		| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
		| ({ path: '/thoughts/[slug]' } & GetConfigResponse<
				typeof ThoughtsSlug_getConfig
		  >);
};

declare module 'waku/router' {
	interface RouteConfig {
		paths: PathsForPages<Page>;
	}
	interface CreatePagesConfig {
		pages: Page;
	}
}
