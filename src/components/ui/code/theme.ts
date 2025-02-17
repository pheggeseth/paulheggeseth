import type { RawTheme } from '@/types';

export const theme: RawTheme = {
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
