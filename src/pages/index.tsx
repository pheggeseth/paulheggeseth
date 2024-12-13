import { BlogPost } from '../components/blog-post';
import { BlogPostList } from '../components/blog-post-list';
import type { GetConfig } from '../types';

export default function Index() {
	return (
		<>
			<BlogPost
				title="The current article will go here"
				publicationDate={new Date('2015-12-20').valueOf()}
			>
				<p>
					It's content will go here. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information. This would
					be the first paragraph that you read. It will contain some
					information. This would be the first paragraph that you read. It will
					contain some information. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information.
				</p>
				<p>
					It's content will go here. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information. This would
					be the first paragraph that you read. It will contain some
					information. This would be the first paragraph that you read. It will
					contain some information. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information.
				</p>
				<p>
					It's content will go here. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information. This would
					be the first paragraph that you read. It will contain some
					information. This would be the first paragraph that you read. It will
					contain some information. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information.
				</p>
				<p>
					It's content will go here. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information. This would
					be the first paragraph that you read. It will contain some
					information. This would be the first paragraph that you read. It will
					contain some information. This would be the first paragraph that you
					read. It will contain some information. This would be the first
					paragraph that you read. It will contain some information.
				</p>
			</BlogPost>
			<title>paulheggeseth.codes()</title>
			<BlogPostList
				heading="Recent thoughts"
				posts={[
					{
						id: 1,
						title: 'The title of a past article',
						publicationDate: Date.UTC(1985, 10, 22),
						content: (
							<>
								The beginning of the past article's content. The beginning of
								the past article's content.
							</>
						),
					},
					{
						id: 2,
						title: 'The title of a past article',
						publicationDate: Date.UTC(1985, 10, 22),
						content: (
							<>
								The beginning of the past article's content. The beginning of
								the past article's content.
							</>
						),
					},
				]}
			/>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'dynamic',
	};
};
