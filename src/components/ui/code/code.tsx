'use server';
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
				background: '#3b362b', // hsl(40deg 15% 20%)
				foreground: '#a89e8a', // hsl(40deg 15% 60%)
			},
		},
		{
			scope: ['entity', 'variable'],
			settings: {
				foreground: '#fffcf5', // hsl(40deg 100% 98%)
			},
		},
		{
			scope: ['string', 'constant'],
			settings: {
				foreground: '#c9ba9c', // hsl(40deg 30% 70%)
			},
		},
	],
};
