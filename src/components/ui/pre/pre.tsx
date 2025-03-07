import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { type ComponentProps, Fragment, type ReactElement } from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import { getHastFromProps } from './get-hast-from-props';

export async function Pre(props: {
	children: ReactElement<ComponentProps<'code'>, 'code'>;
	'line-numbers'?: boolean;
}) {
	return toJsxRuntime(await getHastFromProps(props), {
		Fragment,
		jsx,
		jsxs,
		jsxDEV,
		development: process.env.NODE_ENV === 'development',
		components: {
			pre: (props) => {
				return <pre {...props} />;
			},
		},
	});
}
