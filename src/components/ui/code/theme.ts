import type { ThemeRegistration } from 'shiki';

export const theme: ThemeRegistration = {
	name: 'default',
	tokenColors: [
		{
			scope: ['entity', 'variable'],
			settings: {
				foreground: 'var(--color-surface)',
			},
		},
		{
			scope: ['string', 'constant'],
			settings: {
				foreground: 'hsl(40, 30%, 75%)',
			},
		},
	],
	colors: {
		'editor.background': 'var(--color-body)',
		'editor.foreground': 'hsl(40, 15%, 60%)',
	},
};
