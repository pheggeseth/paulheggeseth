import chokidar from 'chokidar';
import ts from 'typescript';
import { readSourceFile, writeOutputFile } from './utils';

const inputFile = '../pages.gen.ts';
const outputFile = '../utils/create-path.gen.ts';
const configFile = '../../biome.json';

// Only import chokidar when in dev mode
const isDev = process.env.NODE_ENV === 'development';

async function generateCreatePath() {
	try {
		const sourceFile = await readSourceFile(inputFile);
		let output = '';

		function isTypeAlias(
			node: ts.Node,
			name?: string,
		): node is ts.TypeAliasDeclaration {
			return (
				ts.isTypeAliasDeclaration(node) &&
				(name ? node.name.getText() === name : true)
			);
		}

		function isPropertySignature(
			node: ts.Node,
			name?: string,
		): node is ts.PropertySignature &
			Required<Pick<ts.PropertySignature, 'type'>> {
			return (
				ts.isPropertySignature(node) &&
				(name ? node.name.getText() === name : true) &&
				!!node.type
			);
		}

		function isStringLiteral(node: ts.Node): node is Omit<
			ts.LiteralTypeNode,
			'literal'
		> & {
			literal: ts.StringLiteral;
		} {
			return ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal);
		}

		ts.forEachChild(sourceFile, (node) => {
			const paths =
				isTypeAlias(node, 'Page') &&
				ts.isUnionTypeNode(node.type) &&
				node.type.types
					.flatMap((t) => (ts.isParenthesizedTypeNode(t) ? [t.type] : []))
					.flatMap((t) => (ts.isIntersectionTypeNode(t) ? [t.types[0]] : []))
					.flatMap((t) => (t && ts.isTypeLiteralNode(t) ? t.members : []))
					.flatMap((t) => (isPropertySignature(t, 'path') ? [t.type] : []))
					.flatMap((t) => (isStringLiteral(t) ? [t.literal.text] : []));

			if (!paths) return;

			const pathsWithParams = paths.map((p) => {
				const params = p.match(/\[(\w+)\]/g)?.map((m) => m.slice(1, -1)) ?? [];
				if (params.length > 0) {
					return { path: p, params };
				}

				return { path: p };
			});

			const withoutParams = pathsWithParams.filter((t) => !t.params);
			const withParams = pathsWithParams.filter((t) => t.params);

			const pathsWithoutParamsType =
				withoutParams.length > 0
					? `type WithoutParams = ${withoutParams.map((t) => `'${t.path}'`).join(' | ')};`
					: '';
			const pathsWithParamsType =
				withParams.length > 0
					? `type WithParams = {
              ${withParams
								.map(
									(t) =>
										`'${t.path}': { ${t.params?.map((p) => `${p}: string; `)} }`,
								)
								.join('\n')}
            };`
					: '';

			output = `
        /* generated by src/scripts/generate-create-path.ts */

        ${pathsWithoutParamsType}
        ${pathsWithParamsType}
        
        export function createPath<T extends WithoutParams>(path: T): string;
        export function createPath<T extends keyof WithParams>(
          path: T,
          params: WithParams[T],
        ): string;
        export function createPath(p: string, params?: Record<string, string>): string {
          if (!params) return p;
          let result = p;
          for (const [key, value] of Object.entries(params)) {
            result = result.replace(\`[\${key}]\`, value);
          }
          return result;
        }
      `;
		});

		if (output) {
			await writeOutputFile(output, outputFile, configFile);
			console.log('✅ Generated create-path utility');
		}
	} catch (err) {
		console.error('❌ Failed to generate create-path:', err);
	}
}

// Initial generation
generateCreatePath();

// Watch mode only in development
if (isDev) {
	const watcher = chokidar.watch(inputFile, { persistent: true });

	watcher.on('change', (file) => {
		console.log(`✏️ Pages updated: ${file}`);
		generateCreatePath();
	});

	console.log('👀 Watching for changes in pages...');
}
