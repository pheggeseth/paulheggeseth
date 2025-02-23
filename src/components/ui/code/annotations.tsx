import type { AnnotationHandler } from 'codehike/code';
import { Line } from './components/line';

export const lineNumbers: AnnotationHandler = {
	name: 'line-numbers',
	Line,
};
