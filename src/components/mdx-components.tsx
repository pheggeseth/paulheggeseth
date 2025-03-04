import type { UseMdxComponents } from '@mdx-js/mdx';

export const useMDXComponents: UseMdxComponents = () => ({
	pre: (props) => (
		<div style={{ overflow: 'hidden', borderRadius: 'var(--border-radius)' }}>
			<pre {...props} />
		</div>
	),
});
