import { Link } from 'waku';
import type { BlogPostType } from '../../types';
import { formatDay } from '../../utils/dates';
import { getBlogPostPublicationYear } from '../../utils/get-blog-post-publication-year';
import './blog-post-list.css';

export function BlogPostList({
	posts,
}: { posts: Array<BlogPostType & { slug: string }> }) {
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
		<ol className="blog-post-list">
			{Array.from(postsByYear.entries()).map(([year, postsForYear]) => (
				<li key={year}>
					<h3 className="post-year-heading">{year}</h3>
					<ol>
						{postsForYear.map((p, index) => (
							<li key={index}>
								<Link to={`/thoughts/${p.slug}`}>
									<span className="title">{p.data.title}</span>
									<span className="spacer" />
									<span className="publication-date">
										{formatDay(p.data.publicationDate)}
									</span>
								</Link>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
