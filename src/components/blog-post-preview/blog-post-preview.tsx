import type { ReactNode } from 'react';
import { formatDate } from '../../utils/dates';
import './blog-post-preview.css';

export function BlogPostPreview({
	title,
	children,
	publicationDate,
}: { title: string; publicationDate: number; children: ReactNode }) {
	return (
		<article className="blog-post-preview">
			<header>
				<h2>{title}</h2>
			</header>
			<p>{children}</p>
			<footer>{formatDate(new Date(publicationDate))}</footer>
		</article>
	);
}
