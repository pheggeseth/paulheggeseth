import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Best approach - resolves relative to current file
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const filePath1 = path.join(currentDir, 'src/path.gen.ts');
console.log(filePath1);

// Using import.meta.resolve - needs --experimental-import-meta-resolve flag
const fileUrl = import.meta.resolve('./src/path.gen.ts');
const filePath2 = fileURLToPath(fileUrl);
console.log(filePath2);

// Using process.cwd() - depends on where Node was started
const filePath3 = path.join(process.cwd(), 'src/path.gen.ts');
console.log(filePath3);
