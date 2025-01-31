import './bookend.css';

export function Bookend({
	variant,
	children,
}: { variant: 'start' | 'end'; children: string }) {
	return (
		<div aria-hidden className="bookend" data-variant={variant}>
			{children}
		</div>
	);
}
