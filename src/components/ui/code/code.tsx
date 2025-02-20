import './code.css';
import clsx from 'clsx';
import {
	type AnnotationHandler,
	Pre,
	type RawCode,
	highlight,
} from 'codehike/code';
import { lineNumbers } from './annotations';
import { SelectionStyle } from './selection-style';
import { theme } from './theme';

export async function Code({ codeblock }: { codeblock: RawCode }) {
	const highlighted = await highlight(codeblock, theme);
	const handlers: AnnotationHandler[] = [];
	let hasLineNumbers = false;

	if (
		!highlighted.annotations.some(
			(a) => a.name === 'line-numbers' && a.query === 'false',
		)
	) {
		hasLineNumbers = true;
		handlers.push(lineNumbers);
	}

	const totalLines = highlighted.code.split('\n').length.toString().length + 1;
	const width = `calc(${totalLines}ch + var(--size-16))`;

	return (
		<>
			<div className="wrapper">
				{hasLineNumbers && (
					<>
						<div
							className="left-shadow"
							style={{ width, marginInlineStart: `calc(${width} * -1)` }}
						/>
						<div
							className="left-border"
							style={{ width, marginInlineStart: `calc(${width} * -1)` }}
						/>
					</>
				)}

				<SelectionStyle theme={theme} />
				<Pre
					className={clsx('pre', hasLineNumbers && 'line-numbers')}
					code={highlighted}
					handlers={handlers}
				/>
				<div className="right-shadow" />
			</div>
		</>
	);
}
