export default async function Index() {
	return (
		<>
			<title>paulheggeseth.codes()</title>
			<p>articles will go here</p>
		</>
	);
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
