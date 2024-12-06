import type { GetConfig } from '../types';

export default async function Index() {
	return (
		<>
			<title>paulheggeseth.codes()</title>
			<p>articles will go here</p>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
