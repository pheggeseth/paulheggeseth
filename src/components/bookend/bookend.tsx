import './bookend.css';

export function Bookend({
	label,
	variant,
}: { label: string; variant: 'start' | 'end' }) {
	return (
		<div aria-hidden className="bookend" data-variant={variant}>
			{variant === 'start' ? `<${label}>` : `</${label}>`}
		</div>
	);
}
