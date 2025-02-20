// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as About_getConfig } from './pages/about';
// prettier-ignore
import type { getConfig as Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as ThoughtsSlug_getConfig } from './pages/thoughts/[slug]';
// prettier-ignore
import type { getConfig as ThoughtsIndex_getConfig } from './pages/thoughts/index';

// prettier-ignore
type Page =
| ({ path: '/about' } & GetConfigResponse<typeof About_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof Index_getConfig>)
| ({ path: '/thoughts/[slug]' } & GetConfigResponse<typeof ThoughtsSlug_getConfig>)
| ({ path: '/thoughts' } & GetConfigResponse<typeof ThoughtsIndex_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
  