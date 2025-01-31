import type { ReactNode } from 'react';
import type { PostDate } from '../../types';
import { BlogPostPreview } from '../blog-post-preview';
import './blog-post-list.css';

export function BlogPostList({
	heading,
	posts,
}: {
	heading: string;
	posts: Array<{
		id: number;
		title: string;
		publicationDate: PostDate;
		content: ReactNode;
	}>;
}) {
	return (
		<nav className="blog-post-list">
			<h1>{heading}</h1>
			<ol>
				{posts.map((post) => (
					<li key={post.id}>
						<BlogPostPreview
							title={post.title}
							publicationDate={post.publicationDate}
						>
							{post.content}
						</BlogPostPreview>
					</li>
				))}
			</ol>
		</nav>
	);
}
