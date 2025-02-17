import { BlogPostDate } from '@/components/blog-post-date';
import { Bookend } from '@/components/bookend';
import type { PostDate } from '@/types';
import type { ReactNode } from 'react';

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
		<article>
			<Bookend label="thoughts" variant="start" />
			<header>
				<h1>{title}</h1>
				<BlogPostDate published={publicationDate} />
			</header>
			{children}
			<Bookend label="thoughts" variant="end" />
		</article>
	);
}
