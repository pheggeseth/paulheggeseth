import { Link } from 'waku';
import { Bookend } from '../../components/bookend';
import { Article } from '../../components/ui/article';
import type { GetConfig } from '../../types';
import { formatDay } from '../../utils/dates';
import { getBlogPostPublicationYear } from '../../utils/get-blog-post-publication-year';
import { getBlogPostSlugs } from '../../utils/get-blog-post-slugs';
import { readBlogPostFile } from '../../utils/read-blog-post-file';
import { byPublicationDateDescending } from '../../utils/sort';

export default async function BlogPostsListPage() {
	const slugs = await getBlogPostSlugs();
	const posts = (await Promise.all(slugs.map(readBlogPostFile))).sort(
		byPublicationDateDescending,
	);

	const postsByYear = new Map<number, typeof posts>();

	for (const post of posts) {
		const year = getBlogPostPublicationYear(post);
		if (postsByYear.has(year)) {
			postsByYear.get(year)?.push(post);
		} else {
			postsByYear.set(year, [post]);
		}
	}

	return (
		<Article>
			<Bookend variant="start">{'<archive>'}</Bookend>
			<header>
				<h1>Thoughts</h1>
			</header>
			<ol>
				{Array.from(postsByYear.entries()).map(([year, postsForYear]) => (
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
			<Bookend variant="end">{'</archive>'}</Bookend>
		</Article>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
