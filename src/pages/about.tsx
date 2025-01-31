import { Article } from '../components/article';
import { Bookend } from '../components/bookend';
import { VisuallyHidden } from '../components/visually-hidden';
import type { GetConfig } from '../types';

export default function About() {
	return (
		<>
			<title>Hi</title>
			<Article>
				<header>
					<VisuallyHidden>
						<h1>Greetings</h1>
					</VisuallyHidden>
					<Bookend variant="start">{'<greetings>'}</Bookend>
				</header>
				<h2>I'm Paul,</h2>
				<p>I write code for humans.</p>
				<p>At work, I do it as a Senior Software Engineer at LaunchDarkly.</p>
				<h2>and this is my website.</h2>
				<p>It is very much a work in progress!</p>
				<Bookend variant="end">{'</greetings>'}</Bookend>
			</Article>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
