import './blog-post-preview.css';
import { BlogPostDate } from '@/components/blog-post-date';
import type { PostDate } from '@/types';
import { ArrowRight } from 'react-feather';
import { Link } from 'waku';

export function BlogPostPreview({
	slug,
	title,
	description,
	publicationDate,
}: {
	slug: string;
	title: string;
	description?: string | undefined;
	publicationDate: PostDate;
}) {
	const path = `/thoughts/${slug}`;

	return (
		<article className="blog-post-preview">
			<header>
				<h2>
					<Link to={path}>{title}</Link>
				</h2>
			</header>
			{description && (
				<div className="description-wrapper">
					<p>{description}</p>
					<div className="more-wrapper">
						<Link to={path} aria-label={title}>
							More
							<ArrowRight />
						</Link>
					</div>
				</div>
			)}
			<footer>
				<BlogPostDate published={publicationDate} />
			</footer>
		</article>
	);
}
