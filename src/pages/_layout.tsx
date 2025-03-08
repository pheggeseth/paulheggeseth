import { Layout } from '@/components/layout';
import '../styles.css';
import { ScrollRestoration } from '@/components/ui/scroll-restoration';
import type { GetConfig } from '@/types';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<meta name="description" content="Paul Heggeseth's blog" />
			<ScrollRestoration>
				<Layout>{children}</Layout>
			</ScrollRestoration>
		</>
	);
}

export const getConfig: GetConfig = async () => {
	return {
		render: 'static',
	};
};
