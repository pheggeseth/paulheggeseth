export type GetConfig = () => Promise<
	| {
			render: 'static';
			staticPaths?: string[];
	  }
	| { render: 'dynamic' }
>;

export type PostDate = [year: number, month: number, day: number];
