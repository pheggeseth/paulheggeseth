import { Code as BrightCode } from 'bright';
import type { ComponentProps } from 'react';
import './code.css';

export function Code(props: Omit<ComponentProps<typeof BrightCode>, 'theme'>) {
	return (
		<div className="code-wrapper">
			<BrightCode
				{...props}
				theme={theme}
				lineNumbers
				style={{
					borderRadius: 'var(--border-radius)',
					margin: 'var(--size-16) 0',
					tabSize: 2,
				}}
			/>
		</div>
	);
}

const theme: NonNullable<ComponentProps<typeof BrightCode>['theme']> = {
	name: 'default',
	tokenColors: [
		{
			scope: ['entity', 'variable'],
			settings: {
				foreground: '#3b362b',
			},
		},
		{
			scope: ['string', 'constant'],
			settings: {
				foreground: '#9f8a60',
			},
		},
	],
	colors: {
		'editor.background': '#f6f2ea',
		'editor.foreground': '#868279',
		'editor.selectionBackground': '#dfca9f',
		'editorLineNumber.foreground': '#b6b4af',
	},
};
