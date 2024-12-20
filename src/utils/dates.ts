const thing = new Intl.PluralRules('en-us', { type: 'ordinal' });
const ordinalMap = {
	one: 'st',
	two: 'nd',
	few: 'rd',
	other: 'th',
	many: '',
	zero: '',
} as const satisfies { [K in Intl.LDMLPluralRule]: string };

const getDay = (date: Date) =>
	`${date.getUTCDate()}${ordinalMap[thing.select(date.getUTCDate())]}`;

/**
 * Returns a `Date` in this format:
 *
 * `${month} ${day}${ordinal}, ${year}`
 *
 * such as `November 22nd, 1985`
 */
export function formatDate(date: Date) {
	return `${new Intl.DateTimeFormat('en-us', { month: 'long' }).format(date)} ${getDay(date)}, ${date.getUTCFullYear()}`;
}
