import type { ReactNode } from 'react';
import { BlogPostDate } from '../blog-post-date';
import './blog-post.css';

export function BlogPost({
	title,
	publicationDate,
	children,
}: {
	title: string;
	publicationDate: number;
	children: ReactNode;
}) {
	return (
		<>
			<title>{title}</title>
			<article className="blog-post">
				<div className="bookend start">{'<thoughts>'}</div>
				<header>
					<h1>{title}</h1>
					<BlogPostDate published={publicationDate} />
				</header>
				{children}
				<div className="bookend end">{'</thoughts>'}</div>
			</article>
		</>
	);
}
