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
				foreground: '#1d1b16',
			},
		},
		{
			scope: ['string', 'constant'],
			settings: {
				foreground: '#8e6e2f',
			},
		},
	],
	colors: {
		'editor.background': '#fffcf5',
		'editor.foreground': '#817256',
		'editor.selectionBackground': '#f2ead9',
		'editorLineNumber.foreground': '#99886680',
	},
};
