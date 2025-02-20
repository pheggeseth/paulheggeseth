import { useEffect, useRef } from 'react';

export function useUpdatingRef<T>(value: T) {
	const ref = useRef<T>(value);

	useEffect(() => {
		ref.current = value;
	});

	return ref;
}
