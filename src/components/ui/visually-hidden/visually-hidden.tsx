import './visually-hidden.css';
import { type ReactElement, cloneElement } from 'react';

export function VisuallyHidden({
	children,
}: { children: ReactElement<{ className?: string }> }) {
	return cloneElement(children, {
		className: 'visually-hidden',
	});
}
