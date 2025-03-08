import './layout.css';
import type { ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="layout" id="layout">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
