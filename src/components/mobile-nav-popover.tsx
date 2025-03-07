'use client';

import { createPath } from '@/utils/create-path.gen';
import { Menu } from 'react-feather';
import { Link } from 'waku';
import { Popover } from './popover';
import { Button } from './ui/button';

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
								unstable_prefetchOnEnter
							>
								read('things')
							</Link>
						</li>
						<li>
							<Link
								to={createPath('/about')}
								aria-label="about"
								onClick={hide}
								unstable_prefetchOnEnter
							>
								say('hi')
							</Link>
						</li>
					</>
				)}
			</Popover.Panel>
		</Popover>
	);
}
