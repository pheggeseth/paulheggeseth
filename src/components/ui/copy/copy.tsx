'use client';
import './copy.css';
import { useEffect, useRef, useState } from 'react';
import { Check, Clipboard } from 'react-feather';
import { Button } from '../button';

export function Copy({ text }: { text: string }) {
	const [copied, setCopied] = useState<false | object>(false);

	function handleSuccess() {
		setCopied({});
	}

	function handleError() {
		console.error('Failed to copy text.');
	}

	function handleCopyWithFeedback() {
		navigator.clipboard.writeText(text).then(handleSuccess).catch(handleError);
	}

	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
		}

		if (copied) {
			timeoutIdRef.current = setTimeout(() => {
				setCopied(false);
			}, 1500);
		}

		return () => {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
			}
		};
	}, [copied]);

	return (
		<Button className="copy" type="button" onClick={handleCopyWithFeedback}>
			{copied ? <Check /> : <Clipboard />}
		</Button>
	);
}
