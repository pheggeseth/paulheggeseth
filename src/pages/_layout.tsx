import type { ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import '../styles.css';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData();

	return (
		<div id="root-layout" className="flex flex-col">
			<meta name="description" content={data.description} />
			{/* <link rel="icon" type="image/png" href={data.icon} /> */}
			<Header />
			<main className="px-4 flex-auto">{children}</main>
			<Footer />
		</div>
	);
}

const getData = async () => {
	const data = {
		description: 'Paul Heggeseth codes',
		// icon: '/images/favicon.png',
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: 'static',
	} as const;
};
