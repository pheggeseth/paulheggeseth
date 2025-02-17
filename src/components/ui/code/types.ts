import type { highlight } from 'codehike/code';

export type RawTheme = Extract<Parameters<typeof highlight>[1], object>;
