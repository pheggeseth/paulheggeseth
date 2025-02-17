import { Code as BrightCode } from 'bright';
import type { ComponentProps } from 'react';
import './code.css';

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
