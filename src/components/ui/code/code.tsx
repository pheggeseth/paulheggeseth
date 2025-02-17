import { Code as BrightCode } from 'bright';
import {} from 'codehike/blocks';
import {
	type AnnotationHandler,
	InnerLine,
	Pre,
	type RawCode,
	highlight,
} from 'codehike/code';
import type { ComponentProps } from 'react';
import './code.css';

export const lineNumbers: AnnotationHandler = {
	name: 'line-numbers',
	Line: (props) => {
		const width = props.totalLines.toString().length + 1;
		return (
			<div className="Line">
				<span
					className="line-number-wrapper"
					style={{ minWidth: `${width}ch` }}
				>
					{props.lineNumber}
				</span>
				<InnerLine merge={props} />
			</div>
		);
	},
};

function SelectionStyle({ theme }: { theme: RawTheme }) {
	const background = theme.colors?.['editor.selectionBackground'];
	if (!background) return null;

	return (
		<style
			// biome-ignore lint/security/noDangerouslySetInnerHtml: necessary for inline style element
			dangerouslySetInnerHTML={{
				__html: `.Pre ::-moz-selection { background: ${background}; }\n.Pre ::selection { background: ${background}; }`,
			}}
		/>
	);
}

export async function MyCode({ codeblock }: { codeblock: RawCode }) {
	const highlighted = await highlight(codeblock, theme);

	const handlers: AnnotationHandler[] = [];
	if (
		!highlighted.annotations.some(
			(a) => a.name === 'line-numbers' && a.query === 'false',
		)
	) {
		handlers.push(lineNumbers);
	}

	return (
		<>
			<SelectionStyle theme={theme} />
			<Pre className="Pre" code={highlighted} handlers={handlers} />
		</>
	);
}

export function Code(props: Omit<ComponentProps<typeof BrightCode>, 'theme'>) {
	return (
		<BrightCode
			{...props}
			className="code-wrapper"
			theme={theme}
			lineNumbers
			style={{
				borderRadius: 'var(--border-radius)',
				margin: 'var(--size-16) 0',
				tabSize: 2,
			}}
		/>
	);
}

type RawTheme = Extract<Parameters<typeof highlight>[1], object>;

const theme: RawTheme = {
	name: 'default',
	tokenColors: [
		{
			scope: ['entity', 'variable'],
			settings: {
				foreground: '#fffaf0', // hsl(40, 100%, 97%)
			},
		},
		{
			scope: ['string', 'constant'],
			settings: {
				foreground: '#d2c6ac', // hsl(40, 30%, 75%)
			},
		},
	],
	colors: {
		'editor.background': '#3b362b', // hsl(40, 15%, 20%)
		'editor.foreground': '#a89e8a', // hsl(40, 15%, 60%)
		'editor.selectionBackground': 'hsl(40deg, 100%, 97%, 20%)',
		'editorLineNumber.foreground': '#756b57', // hsl(40, 15%, 40%)
	},
};
