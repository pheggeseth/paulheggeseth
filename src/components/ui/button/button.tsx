import './button.css';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

export function Button(props: ComponentProps<'button'>) {
	return <button {...props} className={clsx('button', props.className)} />;
}
