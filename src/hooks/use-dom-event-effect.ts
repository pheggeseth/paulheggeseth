import { useEffect } from 'react';
import { useUpdatingRef } from './use-updating-ref';

export function useDOMEventEffect<K extends keyof WindowEventMap>(
	eventType: K,
	handler: (event: WindowEventMap[K]) => void,
	getElement: () => Pick<
		Window,
		'addEventListener' | 'removeEventListener'
	> = () => window,
) {
	const handlerRef = useUpdatingRef(handler);

	// biome-ignore lint/correctness/useExhaustiveDependencies: handlerRef updates with each render so this is ok
	useEffect(() => {
		function handle(event: WindowEventMap[K]) {
			handlerRef.current(event);
		}
		const element = getElement();
		element.addEventListener(eventType, handle);

		return () => {
			element.removeEventListener(eventType, handle);
		};
	}, [eventType]);
}
