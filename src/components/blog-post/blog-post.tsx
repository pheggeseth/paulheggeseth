import type { ReactNode } from 'react';
import type { PostDate } from '../../types';
import { Article } from '../article';
import { BlogPostDate } from '../blog-post-date';
import { Bookend } from '../bookend';

export function BlogPost({
	title,
	publicationDate,
	children,
}: {
	title: string;
	publicationDate: PostDate;
	children: ReactNode;
}) {
	return (
		<>
			<title>{title}</title>
			<Article>
				<Bookend variant="start">{'<thoughts>'}</Bookend>
				<header>
					<h1>{title}</h1>
					<BlogPostDate published={publicationDate} />
				</header>
				{children}
				<Bookend variant="end">{'</thoughts>'}</Bookend>
			</Article>
		</>
	);
}
