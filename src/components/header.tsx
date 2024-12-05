import { Link } from 'waku';

export const Header = () => {
	return (
		<header className="px-4 py-2 -mx-px sticky top-0 w-full font-mono text-sm bg-white">
			<nav>
				<ul className="flex items-center gap-2">
					<li className="mr-auto">
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
	);
};
