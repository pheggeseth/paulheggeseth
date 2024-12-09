import type { GetConfig } from '../types';

export default function Index() {
	return (
		<>
			<title>paulheggeseth.codes()</title>
			<article>
				<header>
					<h1>The current article will go here</h1>
				</header>
				<p>
					It's content will go here. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information. This would
					be the first paragraph that you read. It will contain some
					information. This would be the first paragraph that you read. It will
					contain some information. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information.
				</p>
			</article>
			<nav style={{ marginBlockStart: 'var(--size-48)' }}>
				<h2>Past articles will go here</h2>
				<ol>
					<li>
						<ol>
							<h3>November 2024</h3>
							<li>
								<article>
									<header>
										<h3>The title of a past article</h3>
									</header>
									<p>The beginning of the past article's content</p>
									<footer>publication date</footer>
								</article>
							</li>
						</ol>
					</li>
				</ol>
			</nav>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
