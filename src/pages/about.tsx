export default async function AboutPage() {
	return (
		<div>
			<title>Hi</title>
			<h1 className="text-4xl font-bold tracking-tight mb-2">Hi! I'm Paul.</h1>
			<p className="mb-3">
				I write code. During the day, I do it as a Senior Frontend Engineer at
				LaunchDarkly.
			</p>
		</div>
	);
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
