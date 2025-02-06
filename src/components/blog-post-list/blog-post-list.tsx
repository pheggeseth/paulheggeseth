import { Link } from 'waku';
import type { BlogPostType } from '../../types';
import { formatDate, formatDay } from '../../utils/dates';
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
		<nav className="blog-post-list">
			<ol>
				{Array.from(postsByYear.entries()).map(([year, postsForYear]) => (
					<li key={year}>
						<h3 className="post-year-heading">{year}</h3>
						<ol>
							{postsForYear.map((post, index) => (
								<li key={index}>
									<Link to={`/thoughts/${post.slug}`}>
										<span className="title">{post.data.title}</span>
										<span className="spacer" aria-hidden />
										<span
											className="publication-date"
											aria-label={`Published on ${formatDate(post.data.publicationDate)}`}
										>
											{formatDay(post.data.publicationDate)}
										</span>
									</Link>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</nav>
	);
}
