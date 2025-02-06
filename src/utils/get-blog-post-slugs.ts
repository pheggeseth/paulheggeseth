import fs from 'node:fs/promises';

export async function getBlogPostSlugs() {
	const fileNames = await fs.readdir('src/blog-posts', { encoding: 'utf-8' });
	return fileNames.map((fileName) => fileName.replace(/\.[^/.]+$/, ''));
}
