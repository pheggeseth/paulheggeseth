import { z } from 'zod';

export const dateTupleSchema = z.tuple([
	z.number(),
	z.number().min(1).max(12),
	z.number().min(1).max(31),
]);

export const frontmatterSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1).optional(),
	publicationDate: dateTupleSchema,
	updatedDate: dateTupleSchema.optional(),
});

export const blogPostSchema = z.object({
	slug: z.string().min(1),
	frontmatter: frontmatterSchema,
});
