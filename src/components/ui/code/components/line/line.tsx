import './line.css';
import { type CustomLine, InnerLine } from 'codehike/code';
import type { ComponentProps } from 'react';

export function Line(props: ComponentProps<CustomLine>) {
	const width = props.totalLines.toString().length + 1;
	return (
		<div className="line">
			<span className="line-number" style={{ minWidth: `${width}ch` }}>
				{props.lineNumber}
			</span>
			<InnerLine merge={props} />
		</div>
	);
}
