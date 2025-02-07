import { Link } from 'waku';
import type { PostDate } from '../../../types';
import { BlogPostDate } from '../../blog-post-date';
import './blog-post-preview.css';
import { ArrowRight } from 'react-feather';

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
