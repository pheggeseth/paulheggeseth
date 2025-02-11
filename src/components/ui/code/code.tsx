import { Code as BrightCode } from 'bright';
import type { ComponentProps } from 'react';
import './code.css';

export function Code(props: Omit<ComponentProps<typeof BrightCode>, 'theme'>) {
	return (
		<div className="code-wrapper">
			<BrightCode
				{...props}
				theme={theme}
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
	tokenColors: [
		{
			settings: {
				background: '#f6f2ea', // --color-hover
				foreground: '#868279', // --color-subtle
			},
		},
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
};
