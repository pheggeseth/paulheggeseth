import {
	type AnnotationHandler,
	Pre,
	type RawCode,
	highlight,
} from 'codehike/code';
import { lineNumbers } from './annotations';
import { SelectionStyle } from './selection-style';
import { theme } from './theme';
import './code.css';

export async function Code({ codeblock }: { codeblock: RawCode }) {
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
			<Pre className="pre" code={highlighted} handlers={handlers} />
		</>
	);
}
