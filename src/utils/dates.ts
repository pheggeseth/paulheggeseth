import type { PostDate } from '../types';

const ordinalMap = {
	one: 'st',
	two: 'nd',
	few: 'rd',
	other: 'th',
	many: '',
	zero: '',
} as const satisfies { [K in Intl.LDMLPluralRule]: string };

const pluralRules = new Intl.PluralRules('en-us', { type: 'ordinal' });

/**
 * Returns a `Date` in this format:
 *
 * `${month} ${day}${ordinal}, ${year}`
 *
 * such as `November 22nd, 1985`
 */
export function formatDate([year, month, day]: PostDate) {
	return `${new Intl.DateTimeFormat('en-us', { month: 'long' }).format(new Date(year, month - 1, day))} ${day}${ordinalMap[pluralRules.select(day)]}, ${year}` as const;
}
