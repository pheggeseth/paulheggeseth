import { type ReactElement, cloneElement } from 'react';
import './visually-hidden.css';

export function VisuallyHidden({ children }: { children: ReactElement }) {
	return cloneElement(children, { className: 'visually-hidden' });
}
