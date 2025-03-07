import './tabs.css';
import { type ComponentProps, type ReactElement, useId } from 'react';
import type { Pre } from '../pre';

export function Tabs({
	children,
}: {
	children: Array<ReactElement<ComponentProps<typeof Pre>, typeof Pre>>;
}) {
	const id = useId().slice(1, -1);

	return (
		<div className="tabs-wrapper">
			<div className="tabs" role="tablist">
				<style>
					{`
          /* Show the content when its radio is checked */
          ${children
						.map(
							(_, index) => `
              .tabs:has(#${id}-tab-${index}:checked) {
                #${id}-tab-content-${index} {
                  display: block;
                }
              }
           `,
						)
						.join('')}          
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
							aria-controls={`${id}-tab-content-${index}`}
						>
							<input
								key={index}
								type="radio"
								id={`${id}-tab-${index}`}
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
						id={`${id}-tab-content-${index}`}
						className="tab-content"
						role="tabpanel"
						aria-labelledby={`${id}-tab-${index}`}
					>
						{child}
					</div>
				))}
			</div>
		</div>
	);
}
