import type { AnnotationHandler } from 'codehike/code';
import { Line } from './line';

export const lineNumbers: AnnotationHandler = {
	name: 'line-numbers',
	Line,
};
