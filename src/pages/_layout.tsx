import '../styles.css';
import { ScrollRestoration } from '@/components/ui/scroll-restoration';
import type { GetConfig } from '@/types';
import { createPath } from '@/utils/create-path.gen';
import type { ReactNode } from 'react';
import { Link } from 'waku';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
	const currentYear = new Date().getFullYear();

	return (
		<ScrollRestoration>
			<meta name="description" content="Paul Heggeseth's blog" />
			<div id="layout">
				<header>
					<nav>
						<ul>
							<li>
								<h1>
									<Link to={createPath('/')} aria-label="home">
										paulheggeseth.codes()_
									</Link>
								</h1>
							</li>
							<li className="display-tablet">
								<Link to={createPath('/thoughts')}>read('things')</Link>
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
				<main>{children}</main>
				<footer>
					<div aria-label={`Copyright ${currentYear} Paul Heggeseth`}>
						copyright({currentYear}) Paul.Heggeseth
					</div>
				</footer>
			</div>
		</ScrollRestoration>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
