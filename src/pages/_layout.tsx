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
				<header>
					<nav>
						<ul>
							<li>
								<h2>
									<Link to="/">paulheggeseth.codes()_</Link>
								</h2>
							</li>
							<li>
								<Link to="/about">say('hi');</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main>{children}</main>
				<footer>
					<div>Copyright &copy; {new Date().getFullYear()} Paul Heggeseth</div>
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
