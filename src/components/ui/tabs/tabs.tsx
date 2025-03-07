import './tabs.css';
import { type ComponentProps, type ReactElement, useId } from 'react';
import type { Pre } from '../pre';

export function Tabs({
	children,
}: {
	children: Array<ReactElement<ComponentProps<typeof Pre>, typeof Pre>>;
}) {
	const id = useId().slice(1, -1);
	const tabId = (index: number) => `${id}-tab-${index}`;
	const tabContentId = (index: number) => `${id}-tab-content-${index}`;

	return (
		<div className="tabs-wrapper">
			<div className="tabs" id={id} role="tablist">
				<style>
					{`${children
						.map(
							(_, index) =>
								`.tabs#${id}:has(#${tabId(index)}:checked) { #${tabContentId(index)} { display: block; } }`,
						)
						.join('\n')}
					`}
				</style>
				<div className="tab-labels">
					{children.map((child, index) => (
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
				{children.map((child, index) => (
					<div
						key={index}
						id={tabContentId(index)}
						className="tab-content"
						role="tabpanel"
						aria-labelledby={tabId(index)}
					>
						{child}
					</div>
				))}
			</div>
		</div>
	);
}
