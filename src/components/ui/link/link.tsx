import './link.css';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Link as WakuLink } from 'waku';

export function Link({
	className,
	unstable_prefetchOnEnter = true,
	...props
}: ComponentProps<typeof WakuLink>) {
	return (
		<WakuLink
			{...props}
			className={clsx('link', className)}
			unstable_prefetchOnEnter={unstable_prefetchOnEnter}
		/>
	);
}
