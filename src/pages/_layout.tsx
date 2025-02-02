import type { ReactNode } from 'react';
import { Link } from 'waku';
import type { GetConfig } from '../types';
import '../styles.css';

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<meta name="description" content="Paul Heggeseth's blog" />
			<div id="layout">
				<div className="header-shadow" role="presentation" />
				<div className="header-shadow-blocker" role="presentation" />
				<header>
					<nav>
						<ul>
							<li>
								<h1>
									<Link to="/">paulheggeseth.codes()_</Link>
								</h1>
							</li>
							<li>
								<Link to="/about">say('hi');</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main>{children}</main>
				<footer>
					<div>Copyright {new Date().getFullYear()} Paul Heggeseth</div>
				</footer>
			</div>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
