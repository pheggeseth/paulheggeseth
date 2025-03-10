import './pre.css';
import clsx from 'clsx';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { type ComponentProps, Fragment, type ReactElement } from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Copy } from '../copy';
import { getCodeHastFromProps } from './get-code-hast-from-props';

export async function Pre(
	props: Omit<ComponentProps<'div'>, 'children'> & {
		children: ReactElement<ComponentProps<'code'>, 'code'>;
		lines?: boolean;
		name?: string;
	},
) {
	const codeHast = await getCodeHastFromProps(props);

	if (!codeHast) {
		return <pre>{props.children}</pre>;
	}

	const codeString = String(props.children.props.children);

	const rootProps = { ...props };
	delete rootProps.lines;
	delete rootProps.name;

	return toJsxRuntime(codeHast, {
		Fragment,
		jsx,
		jsxs,
		jsxDEV,
		development: process.env.NODE_ENV === 'development',
		components: {
			pre: ({ children, ...preProps }) => {
				return (
					<div {...rootProps} className={clsx('pre-root', rootProps.className)}>
						<div className="pre-wrapper">
							<pre {...preProps} className="pre">
								{children}
							</pre>
						</div>
						<Copy text={codeString} />
					</div>
				);
			},
		},
	});
}
