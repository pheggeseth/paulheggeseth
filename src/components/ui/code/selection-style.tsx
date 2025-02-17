import type { RawTheme } from './types';

export function SelectionStyle({ theme }: { theme: RawTheme }) {
	const background = theme.colors?.['editor.selectionBackground'];
	if (!background) return null;

	return (
		<style
			// biome-ignore lint/security/noDangerouslySetInnerHtml: necessary for inline style element
			dangerouslySetInnerHTML={{
				__html: `.pre ::-moz-selection { background: ${background}; }\n.pre ::selection { background: ${background}; }`,
			}}
		/>
	);
}
