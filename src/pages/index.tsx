import { BlogPost } from '../components/blog-post';
import type { GetConfig } from '../types';

export default function Index() {
	return (
		<>
			<BlogPost
				title="The current article will go here"
				publicationDate={new Date('2015-12-20').valueOf()}
			>
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
			</BlogPost>
			<title>paulheggeseth.codes()</title>
			<nav>
				<h2 style={{ marginBlockEnd: 'var(--size-24)' }}>Recent articles</h2>
				<ol>
					<li>
						<article style={{ marginBlockEnd: 'var(--size-16)' }}>
							<header style={{ marginBlockEnd: 'var(--size-2)' }}>
								<h3>
									<a href="/">The title of a past article {'->'}</a>
								</h3>
							</header>
							<p>The beginning of the past article's content</p>
							<footer
								style={{
									fontFamily: 'var(--font-family-code)',
									textAlign: 'end',
									fontSize: 'var(--font-size-subtle)',
									color: 'var(--color-subtle)',
									marginBlockStart: 'var(--size-8)',
								}}
							>
								November 22nd, 2024
							</footer>
						</article>
					</li>
					<li>
						<article style={{ marginBlockEnd: 'var(--size-16)' }}>
							<header style={{ marginBlockEnd: 'var(--size-2)' }}>
								<h3>
									<a href="/">The title of a past article {'->'}</a>
								</h3>
							</header>
							<p>The beginning of the past article's content</p>
							<footer
								style={{
									fontFamily: 'var(--font-family-code)',
									textAlign: 'end',
									fontSize: 'var(--font-size-subtle)',
									color: 'var(--color-subtle)',
									marginBlockStart: 'var(--size-8)',
								}}
							>
								November 22nd, 2024
							</footer>
						</article>
					</li>
				</ol>
			</nav>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
