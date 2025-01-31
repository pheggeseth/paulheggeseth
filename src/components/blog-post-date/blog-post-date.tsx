import type { PostDate } from '../../types';
import { formatDate } from '../../utils/dates';
import { VisuallyHidden } from '../visually-hidden';
import './blog-post-date.css';

export function BlogPostDate({
	published,
	updated,
}: {
	published: PostDate;
	updated?: PostDate;
}) {
	return (
		<dl className="blog-post-date">
			<VisuallyHidden>
				<dt>Publication date</dt>
			</VisuallyHidden>
			<dd>{formatDate(published)}</dd>
			{!!updated && (
				<>
					<VisuallyHidden>
						<dt>Date last updated</dt>
					</VisuallyHidden>
					<dd>(updated {formatDate(updated)})</dd>
				</>
			)}
		</dl>
	);
}
