import type { ComponentProps } from 'react';
import { Code } from '../components/ui/code';

export function useMDXComponents() {
	return {
		pre: (props: ComponentProps<typeof Code>) => <Code {...props} />,
	};
}
