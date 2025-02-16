import type { ReactNode } from 'react';
import { Link } from 'waku';
import type { GetConfig } from '../types';
import '../styles.css';
import { ScrollRestoration } from '../components/ui/scroll-restoration';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
	const currentYear = new Date().getFullYear();

	return (
		<ScrollRestoration>
			<meta name="description" content="Paul Heggeseth's blog" />
			<div id="layout">
				<div className="header-shadow" role="presentation" />
				<div className="header-shadow-blocker" role="presentation" />
				<header>
					<nav>
						<ul>
							<li>
								<h1>
									<Link to="/" aria-label="home">
										paulheggeseth.codes()_
									</Link>
								</h1>
							</li>
							<li>
								<Link to="/thoughts">read('things')</Link>
							</li>
							<span aria-hidden>||</span>
							<li>
								<Link to="/about" aria-label="about">
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
