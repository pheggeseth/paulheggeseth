import './blog-post-date.css';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import type { PostDate } from '@/types';
import { formatDate } from '@/utils/dates';

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
