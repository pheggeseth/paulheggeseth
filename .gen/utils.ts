import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Biome, Distribution } from '@biomejs/js-api';
import ts from 'typescript';

function filePath(relativePath: string) {
	return fileURLToPath(import.meta.resolve(relativePath));
}

export async function readSourceFile(relativePath: string) {
	return ts.createSourceFile(
		filePath(relativePath),
		await readFile(filePath(relativePath), 'utf8'),
		ts.ScriptTarget.Latest,
		true,
	);
}

export async function writeOutputFile(
	content: string,
	relativeOutputPath: string,
	relativeConfigPath: string,
) {
	const biome = await Biome.create({ distribution: Distribution.NODE });
	biome.applyConfiguration(
		JSON.parse((await readFile(filePath(relativeConfigPath))).toString()),
	);

	const outputFilePath = filePath(relativeOutputPath);

	return writeFile(
		outputFilePath,
		biome.formatContent(content, {
			filePath: outputFilePath,
		}).content,
		'utf-8',
	);
}
