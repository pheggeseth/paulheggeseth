import fs from 'node:fs/promises';
import { Link } from 'waku';
import { Bookend } from '../../components/bookend';
import { Article } from '../../components/ui/article';
import type { BlogPostType, GetConfig } from '../../types';
import { formatDay } from '../../utils/dates';
import { readBlogPostFile } from '../../utils/read-blog-post-file';

function getPublicationYear(post: BlogPostType) {
	return post.data.publicationDate[0];
}

function getPublicationDate(post: BlogPostType) {
	return Date.UTC(...post.data.publicationDate);
}

export default async function BlogPostsListPage() {
	const posts = (
		await Promise.all(
			(
				await fs.readdir('src/blog-posts', { encoding: 'utf-8' })
			).map(async (fileName) => {
				const slug = fileName.slice(0, -4);
				return { ...(await readBlogPostFile(slug)), slug: slug };
			}),
		)
	).sort((a, b) => getPublicationDate(b) - getPublicationDate(a));

	const byYear = new Map<number, (typeof posts)[number][]>();

	for (const post of posts) {
		const year = getPublicationYear(post);
		let group = byYear.get(year);
		if (group) {
			group.push(post);
		} else {
			group = [post];
		}
		byYear.set(year, group);
	}

	return (
		<Article>
			<Bookend variant="start">{'<archive>'}</Bookend>
			<header>
				<h1>Thoughts</h1>
			</header>
			<ol>
				{Array.from(byYear.entries()).map(([year, postsForYear]) => (
					<li key={year}>
						<h3
							style={{ textAlign: 'end', marginBlockStart: 'var(--size-32)' }}
						>
							{year}
						</h3>
						<ol style={{ marginBlockStart: 'var(--size-4)' }}>
							{postsForYear.map((p, index) => (
								<li key={index}>
									<Link
										to={`/thoughts/${p.slug}`}
										style={{
											display: 'grid',
											gridTemplateColumns: 'auto 1fr auto',
											columnGap: 'var(--size-16)',
											alignItems: 'baseline',
											lineHeight: '1rem',
											fontFamily: 'var(--font-family-body)',
											fontSize: 'var(--font-size-body)',
											fontWeight: 300,
											padding: 'var(--size-8)',
											marginInline: 'calc(var(--size-8) * -1)',
										}}
									>
										<span style={{ letterSpacing: '0.02rem' }}>
											{p.data.title}
										</span>
										<span
											style={{
												borderBlockEnd: '1px dotted var(--color-border)',
											}}
										/>
										<span
											style={{
												fontFamily: 'var(--font-family-code)',
												color: 'var(--color-subtle)',
												fontWeight: 400,
											}}
										>
											{formatDay(p.data.publicationDate)}
										</span>
									</Link>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
			<Bookend variant="start">{'</archive>'}</Bookend>
		</Article>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
