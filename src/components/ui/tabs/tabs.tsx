import './tabs.css';
import {
	type ComponentProps,
	type ReactElement,
	cloneElement,
	useId,
} from 'react';
import type { Pre } from '../pre';

type Child = ReactElement<ComponentProps<typeof Pre>, typeof Pre>;

export function Tabs({
	children,
}: {
	children: Child | Array<Child>;
}) {
	const id = useId().slice(1, -1);
	const tabId = (index: number) => `${id}-tab-${index}`;
	const tabContentId = (index: number) => `${id}-tab-content-${index}`;

	const childrenArray = Array.isArray(children) ? children : [children];

	return (
		<div className="tabs" id={id} role="tablist">
			<style>
				{`${childrenArray
					.map(
						(_, index) =>
							`.tabs#${id}:has(#${tabId(index)}:checked) { #${tabContentId(index)} { display: block; } }`,
					)
					.join('\n')}
					`}
			</style>
			<div className="tab-labels">
				{childrenArray.map((child, index) => (
					// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
					<label
						key={index}
						className="tab-label"
						// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
						role="tab"
						aria-controls={tabContentId(index)}
					>
						<input
							key={index}
							type="radio"
							id={tabId(index)}
							name="tabs"
							defaultChecked={index === 0}
						/>
						{child.props.name}
					</label>
				))}
			</div>
			{childrenArray.map((child, index) =>
				cloneElement(child, {
					key: index,
					id: tabContentId(index),
					className: 'tab-content',
					role: 'tabpanel',
					'aria-labelledby': tabId(index),
				}),
			)}
		</div>
	);
}
