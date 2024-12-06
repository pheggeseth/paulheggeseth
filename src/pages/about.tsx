import type { GetConfig } from '../types';

export default function About() {
	return (
		<>
			<title>Hi</title>
			<header>
				<h1>Hi,</h1>
			</header>
			<section>
				<header>
					<h2>I'm Paul,</h2>
				</header>
				<p>I write code for humans.</p>
				<p>At work, I do it as a Senior Software Engineer at LaunchDarkly.</p>
			</section>
			<section>
				<header>
					<h2>and this is my website.</h2>
				</header>
				<p>It is very much a work in progress!</p>
			</section>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
