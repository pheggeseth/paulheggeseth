import './blog-post-preview.css';
import { BlogPostDate } from '@/components/blog-post-date';
import type { BlogPostType } from '@/types';
import { createPath } from '@/utils/create-path.gen';
import { ArrowRight } from 'react-feather';
import { Link } from 'waku';

export function BlogPostPreview({
	slug,
	title,
	description,
	publicationDate,
}: {
	slug: BlogPostType['slug'];
	title: BlogPostType['data']['title'];
	description?: BlogPostType['data']['description'];
	publicationDate: BlogPostType['data']['publicationDate'];
}) {
	const path = createPath('/thoughts/[slug]', { slug });

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
						<Link to={path} aria-label={title} unstable_prefetchOnEnter>
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
