import './blog-post-list.css';
import type { BlogPostType } from '@/types';
import { getBlogPostPublicationYear } from '@/utils/blog-posts';
import { createPath } from '@/utils/create-path.gen';
import { formatDate, formatDay } from '@/utils/dates';
import { ChevronDown, ChevronRight } from 'react-feather';
import { Link } from 'waku';

export function BlogPostList({ posts }: { posts: Array<BlogPostType> }) {
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
									<details>
										<summary>
											<div className="trigger">
												<ChevronRight className="closed-icon" />
												<ChevronDown className="open-icon" />
											</div>
											<Link
												to={createPath('/thoughts/[slug]', { slug: post.slug })}
												aria-label={post.data.title}
												unstable_prefetchOnEnter
											>
												<span className="title">{post.data.title}</span>
												<span className="spacer" aria-hidden />
												<span
													className="publication-date"
													aria-label={`Published on ${formatDate(post.data.publicationDate)}`}
												>
													{formatDay(post.data.publicationDate)}
												</span>
											</Link>
										</summary>
										<p className="description">{post.data.description}</p>
									</details>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</nav>
	);
}
