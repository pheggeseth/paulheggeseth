export default async function HomePage() {
	return (
		<div>
			<title>paulheggeseth.codes()</title>
			<p>Hello, world.</p>
		</div>
	);
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
