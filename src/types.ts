export type GetConfig = () => Promise<{
	render: 'static' | 'dynamic';
}>;
