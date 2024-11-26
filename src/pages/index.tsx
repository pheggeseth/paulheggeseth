export default async function HomePage() {
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
		title: 'paulheggeseth.codes',
		headline: 'And this is his website',
		body: 'Hello world!',
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
