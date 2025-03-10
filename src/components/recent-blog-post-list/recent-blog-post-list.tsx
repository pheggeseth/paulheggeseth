import './recent-blog-post-list.css';
import type { BlogPostType } from '@/types';
import { BlogPostPreview } from './blog-post-preview';

export function RecentBlogPostList({
	heading,
	posts,
}: {
	heading: string;
	posts: Array<BlogPostType>;
}) {
	return (
		<nav className="recent-blog-post-list">
			<h1>{heading}</h1>
			<ol>
				{posts.map((post) => (
					<li key={post.frontmatter.publicationDate.join('-')}>
						<BlogPostPreview
							slug={post.slug}
							title={post.frontmatter.title}
							description={post.frontmatter.description}
							publicationDate={post.frontmatter.publicationDate}
						/>
					</li>
				))}
			</ol>
		</nav>
	);
}
