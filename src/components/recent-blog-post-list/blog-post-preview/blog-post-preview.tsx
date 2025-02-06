import { Link } from 'waku';
import type { PostDate } from '../../../types';
import { BlogPostDate } from '../../blog-post-date';
import './blog-post-preview.css';

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
	return (
		<article className="blog-post-preview">
			<header>
				<h2>
					<Link to={`/thoughts/${slug}`}>{title}</Link>
				</h2>
			</header>
			{description && <p>{description}</p>}
			<footer>
				<BlogPostDate published={publicationDate} />
			</footer>
		</article>
	);
}
