import { z } from 'zod';

export const dateTupleSchema = z.tuple([
	z.number(),
	z.number().min(1).max(12),
	z.number().min(1).max(31),
]);

export const frontMatterSchema = z.object({
	title: z.string().min(1),
	publicationDate: dateTupleSchema,
	updatedDate: dateTupleSchema.optional(),
});
