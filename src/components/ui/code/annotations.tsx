import { type AnnotationHandler, InnerLine } from 'codehike/code';

export const lineNumbers: AnnotationHandler = {
	name: 'line-numbers',
	Line: (props) => {
		const width = props.totalLines.toString().length + 1;
		return (
			<div className="line">
				<span className="line-number" style={{ minWidth: `${width}ch` }}>
					{props.lineNumber}
				</span>
				<InnerLine merge={props} />
			</div>
		);
	},
};
