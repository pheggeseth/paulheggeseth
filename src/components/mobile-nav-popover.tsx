'use client';

import { createPath } from '@/utils/create-path.gen';
import { Menu } from 'react-feather';
import { Button } from './ui/button';
import { Link } from './ui/link';
import { Popover } from './ui/popover';

export function MobileNavPopover() {
	return (
		<Popover>
			<Button type="button" style={{ marginInlineEnd: -4 }}>
				<Menu />
			</Button>
			<Popover.Panel as="ul">
				{({ hide }) => (
					<>
						<li>
							<Link
								to={createPath('/thoughts')}
								aria-label="blog"
								onClick={hide}
							>
								read('things')
							</Link>
						</li>
						<li>
							<Link to={createPath('/about')} aria-label="about" onClick={hide}>
								say('hi')
							</Link>
						</li>
					</>
				)}
			</Popover.Panel>
		</Popover>
	);
}
