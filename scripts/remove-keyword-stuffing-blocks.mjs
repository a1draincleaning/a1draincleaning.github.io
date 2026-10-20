import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

const keywordBlock = /<div class="mt-8 flex flex-wrap gap-2">[\s\S]*?<\/div>/g;
let changed = 0;

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  const cleaned = html.replace(keywordBlock, '');
  if (cleaned !== html) {
    writeFileSync(file, cleaned);
    changed += 1;
  }
}

console.log(`Removed keyword-list blocks from ${changed} generated HTML files.`);
