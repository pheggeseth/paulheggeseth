import type { ReactNode } from 'react';
import { formatDate } from '../../utils/dates';
import { VisuallyHidden } from '../visually-hidden';

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
					<dl>
						<VisuallyHidden>
							<dt>Publication date</dt>
						</VisuallyHidden>
						<dd className="publication-date">
							{formatDate(new Date(publicationDate))}
						</dd>
					</dl>
					{/* <p>{formatDate(new Date(publicationDate))} (updated)</p> */}
				</header>
				{children}
			</article>
		</>
	);
}
