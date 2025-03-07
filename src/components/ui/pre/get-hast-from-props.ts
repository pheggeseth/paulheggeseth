import type { HastElement, HastRoot } from '@/types';
import type { ComponentProps, ReactElement } from 'react';
import { type BundledLanguage, codeToHast } from 'shiki/bundle/full';
import { theme } from './theme';

export async function getHastFromProps(props: {
	children: ReactElement<ComponentProps<'code'>, 'code'>;
	'line-numbers'?: boolean;
}) {
	const codeString = String(props.children.props.children);
	const lang = props.children.props.className?.match(/language-(.+)/)?.[1];
	ensureLang(lang);

	const root = (await codeToHast(codeString, {
		lang,
		theme,
	})) as PreRoot;

	if (props['line-numbers']) {
		root.children[0].children.unshift({
			type: 'element',
			tagName: 'div',
			properties: { class: 'line-numbers' },
			children: getLines(root).map((_, index) => ({
				type: 'element',
				tagName: 'div',
				properties: {},
				children: [{ type: 'text', value: String(index + 1) }],
			})),
		});
	}

	return root;
}

const supportedLanguages = ['ts'] as const satisfies BundledLanguage[];
type SupportedLanguage = (typeof supportedLanguages)[number];

function ensureLang(value: unknown): asserts value is SupportedLanguage {
	if (!supportedLanguages.includes(value as SupportedLanguage)) {
		throw new Error(`unexpected code language "${value}"`);
	}
}

type PreRoot = HastRoot & {
	children: [pre: HastElement & { children: [code: HastElement] }];
};

function getLines(root: PreRoot) {
	return root.children[0].children[0].children
		.filter(
			(e): e is HastElement =>
				e.type === 'element' &&
				typeof e.properties.class === 'string' &&
				e.properties.class.includes('line'),
		)
		.slice(0, -1);
}
