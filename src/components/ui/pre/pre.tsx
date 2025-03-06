import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import {
	type ComponentProps,
	Fragment,
	type ReactElement,
	type ReactNode,
	isValidElement,
} from 'react';
import { jsxDEV } from 'react/jsx-dev-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { BundledLanguage } from 'shiki';
import { codeToHast } from 'shiki/bundle/full';
import { theme } from '../code/theme';

type Root = Awaited<ReturnType<typeof codeToHast>>;
type Element = Extract<Root['children'][number], { type: 'element' }>;
type PreRoot = Root & {
	children: [pre: Element & { children: [code: Element] }];
};

function isPreRoot(root: Root): root is PreRoot {
	return (
		root.children.length === 1 &&
		root.children[0]?.type === 'element' &&
		root.children[0].tagName === 'pre' &&
		root.children[0].children.length === 1 &&
		root.children[0].children[0]?.type === 'element' &&
		root.children[0].children[0].tagName === 'code'
	);
}

function getLines(root: PreRoot) {
	return root.children[0].children[0].children
		.filter(
			(e): e is Element =>
				e.type === 'element' &&
				typeof e.properties.class === 'string' &&
				e.properties.class.includes('line'),
		)
		.slice(0, -1);
}

export async function Pre(props: {
	children: ReactNode;
	'line-numbers'?: boolean;
}) {
	if (!isCodeElement(props.children)) {
		return <pre {...props} />;
	}

	const codeString = String(props.children.props.children);
	const lang = props.children.props.className?.match(/language-(.+)/)?.[1];

	ensureLang(lang);

	const root = await codeToHast(codeString, {
		lang,
		theme,
	});

	if (!isPreRoot(root)) {
		return null;
	}

	if (props['line-numbers']) {
		const lines = getLines(root);
		root.children[0].children.unshift({
			type: 'element',
			tagName: 'div',
			properties: { class: 'line-numbers' },
			children: lines.map((_, index) => ({
				type: 'element',
				tagName: 'div',
				properties: {},
				children: [{ type: 'text', value: String(index + 1) }],
			})),
		});
	}

	return toJsxRuntime(root, {
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

function isCodeElement(
	node: ReactNode,
): node is ReactElement<ComponentProps<'code'>, 'code'> {
	return isValidElement(node) && node.type === 'code';
}

const langs = ['ts'] as const satisfies BundledLanguage[];
type Lang = (typeof langs)[number];

function ensureLang(value: unknown): asserts value is Lang {
	if (!langs.includes(value as Lang)) {
		throw new Error(`unexpected code language "${value}"`);
	}
}
