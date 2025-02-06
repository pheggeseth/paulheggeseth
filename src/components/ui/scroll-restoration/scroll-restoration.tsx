'use client';

import { useEffect, useRef } from 'react';
import { useRouter_UNSTABLE as useRouter } from 'waku';

export function ScrollRestoration({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const positions = useRef<Record<string, number>>({});
	const scrollTop = useRef(0);

	// save the layout element's scroll position whenever it changes
	useEffect(() => {
		const layout = document.getElementById('layout');
		if (!layout) return;

		function savePosition(event: Event) {
			scrollTop.current =
				(event.currentTarget as HTMLDivElement | null)?.scrollTop ?? 0;
		}

		layout.addEventListener('scroll', savePosition);

		return () => {
			layout.removeEventListener('scroll', savePosition);
		};
	}, []);

	useEffect(() => {
		const layout = document.getElementById('layout');
		if (!layout) return;

		// set the scroll position to the new path's previously saved position, if there is one,
		// otherwise set the position to 0
		layout.scrollTop = positions.current[router.path] ?? 0;

		// save the path so the cleanup function can use it
		const oldPath = router.path;

		return () => {
			// save the current scroll position for the old path when the path changes
			positions.current[oldPath] = scrollTop.current;
		};
	}, [router.path]);

	return children;
}
