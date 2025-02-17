import type { GetConfig } from '@/types';
import { Bookend } from '../components/bookend';
import { VisuallyHidden } from '../components/ui/visually-hidden';

export default function About() {
	return (
		<>
			<title>Hi</title>
			<article>
				<header>
					<VisuallyHidden>
						<h1>Greetings</h1>
					</VisuallyHidden>
					<Bookend label="greetings" variant="start" />
				</header>
				<h2>Hi. I'm Paul,</h2>
				<p>I create user interfaces for humans.</p>
				<p>At work, I do it as a Senior Software Engineer at LaunchDarkly.</p>
				<h2>and this is my website.</h2>
				<p>It is very much a work in progress!</p>
				<Bookend label="greetings" variant="end" />
			</article>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
