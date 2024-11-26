export default async function AboutPage() {
	const data = await getData();

	return (
		<div>
			<title>{data.title}</title>
			<h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
			<p>{data.body}</p>
		</div>
	);
}

const getData = async () => {
	const data = {
		title: 'Hi',
		headline: "I'm Paul and I write code in exchange for money",
		body: 'Right now I do it as a Senior Frontend Engineer at LaunchDarkly',
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
