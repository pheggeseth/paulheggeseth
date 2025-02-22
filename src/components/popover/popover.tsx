import './popover.css';
import clsx from 'clsx';
import nullthrows from 'nullthrows';
import {
	type ComponentProps,
	type ElementType,
	type HTMLAttributes,
	type ReactElement,
	type ReactNode,
	cloneElement,
	useId,
} from 'react';
import type { Button } from '../button';

function PopoverRoot({
	children,
}: {
	children: [
		trigger: ReactElement<typeof Button>,
		panel: ReactElement<typeof PopoverPanel>,
	];
}) {
	const id = useId();
	const triggerProps: HTMLAttributes<HTMLButtonElement> = {
		popoverTarget: id,
	};
	const panelProps: HTMLAttributes<HTMLDivElement> = {
		id,
	};
	const trigger = cloneElement(children[0], triggerProps);
	const panel = cloneElement(children[1], panelProps);

	return (
		<>
			{trigger}
			{panel}
		</>
	);
}

function PopoverPanel<T extends ElementType = 'div'>({
	as,
	className,
	popover = 'auto',
	children,
	...props
}: { as?: T } & Omit<ComponentProps<T>, 'as' | 'children'> & {
		children: ReactNode | ((props: { hide: () => void }) => ReactNode);
	}) {
	const Component = (as ?? 'div') as 'div';
	function hide() {
		document.getElementById(nullthrows(props.id))?.hidePopover();
	}

	return (
		<Component
			{...props}
			className={clsx('popover-panel', className)}
			popover={popover}
		>
			{typeof children === 'function' ? children({ hide }) : children}
		</Component>
	);
}

export const Popover = Object.assign(PopoverRoot, {
	Panel: PopoverPanel,
});
