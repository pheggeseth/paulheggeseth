const ordinalMap = {
	one: 'st',
	two: 'nd',
	few: 'rd',
	other: 'th',
	many: '',
	zero: '',
} as const satisfies { [K in Intl.LDMLPluralRule]: string };

const pluralRules = new Intl.PluralRules('en-us', { type: 'ordinal' });

const getDay = (date: Date) =>
	`${date.getUTCDate()}${ordinalMap[pluralRules.select(date.getUTCDate())]}` as const;

/**
 * Returns a `Date` in this format:
 *
 * `${month} ${day}${ordinal}, ${year}`
 *
 * such as `November 22nd, 1985`
 */
export function formatDate(date: Date | number) {
	const d = typeof date === 'number' ? new Date(date) : date;
	return `${new Intl.DateTimeFormat('en-us', { month: 'long' }).format(d)} ${getDay(d)}, ${d.getUTCFullYear()}` as const;
}
