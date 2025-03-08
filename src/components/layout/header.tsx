import './header.css';
import { createPath } from '@/utils/create-path.gen';
import { MobileNavPopover } from '../mobile-nav-popover';
import { Link } from '../ui/link';

export function Header() {
	return (
		<header className="header">
			<nav>
				<ul>
					<li>
						<h1>
							<Link to={createPath('/')} aria-label="home">
								paulheggeseth.codes()_
							</Link>
						</h1>
					</li>
					<li className="display-mobile">
						<MobileNavPopover />
					</li>
					<li className="display-tablet">
						<Link to={createPath('/thoughts')} aria-label="blog">
							read('things')
						</Link>
					</li>
					<span aria-hidden className="display-tablet">
						||
					</span>
					<li className="display-tablet">
						<Link to={createPath('/about')} aria-label="about">
							say('hi');
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
