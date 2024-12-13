import type { ReactNode } from 'react';
import { formatDate } from '../../utils/dates';

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
				<header>
					<h1>{title}</h1>
					<p>{formatDate(new Date(publicationDate))} (updated)</p>
				</header>
				{children}
			</article>
		</>
	);
}
