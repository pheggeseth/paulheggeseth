import type { UseMdxComponents } from '@mdx-js/mdx';
import { Code } from '../components/ui/code';

export const useMDXComponents: UseMdxComponents = () => ({
	pre: Code,
});
