'use client';

import nullthrows from 'nullthrows';
import { useEffect, useRef } from 'react';
import { useRouter_UNSTABLE as useRouter } from 'waku';
import { useDOMEventEffect } from '../../../hooks/use-dom-event-effect';

export function ScrollRestoration({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const positions = useRef<Record<string, number>>({});
	const scrollTop = useRef(0);

	// save the layout element's scroll position whenever it changes
	useDOMEventEffect(
		'scroll',
		(event) => {
			scrollTop.current =
				(event.currentTarget as HTMLDivElement | null)?.scrollTop ?? 0;
		},
		() => nullthrows(document.getElementById('layout')),
	);

	const popStateRef = useRef(false);
	useDOMEventEffect('popstate', () => {
		popStateRef.current = true;
	});

	useEffect(() => {
		const layout = document.getElementById('layout');
		if (!layout) return;

		// if a popstate event was detected, restore the previous scroll position,
		// otherwise, reset the scroll position to 0
		layout.scrollTop = popStateRef.current
			? (positions.current[router.path] ?? 0)
			: 0;

		// save the path so the cleanup function can use it
		const oldPath = router.path;
		popStateRef.current = false;

		return () => {
			// save the current scroll position for the old path when the path changes
			positions.current[oldPath] = scrollTop.current;
		};
	}, [router.path]);

	return children;
}
