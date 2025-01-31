import type { ReactNode } from 'react';
import './article.css';

export function Article({ children }: { children: ReactNode }) {
	return <article className="article">{children}</article>;
}
