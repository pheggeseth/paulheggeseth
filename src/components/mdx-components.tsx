import type { UseMdxComponents } from '@mdx-js/mdx';
import { Pre } from './ui/pre';

export const useMDXComponents: UseMdxComponents = () => ({
	pre: Pre,
});
