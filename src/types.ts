import type { z } from 'zod';
import type { blogPostSchema, dateTupleSchema } from './schemas';

export type GetConfig = () => Promise<
	| {
			render: 'static';
			staticPaths?: string[];
	  }
	| { render: 'dynamic' }
>;

export type PostDate = z.infer<typeof dateTupleSchema>;
export type BlogPostType = z.infer<typeof blogPostSchema>;
