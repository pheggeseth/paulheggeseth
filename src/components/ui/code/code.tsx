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

	console.log(highlighted);

	return <Pre className="Pre" code={highlighted} handlers={handlers} />;
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

const theme: NonNullable<ComponentProps<typeof BrightCode>['theme']> = {
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
		'editor.selectionBackground': '#756b5780', // hsla(40, 15%, 40%, 0.5)
		'editorLineNumber.foreground': '#756b57', // hsl(40, 15%, 40%)
	},
};
