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

// Remove only the generated visible keyword inventory. Do not use a generic
// class-based <div> match because the same utility classes can appear in
// legitimate content elsewhere on the site.
const keywordBlock = /<p class="text-sm font-black uppercase tracking-\[0\.2em\] text-\[#b4232b\]">Related problems<\/p>\s*<h2 class="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">What else can be connected\?<\/h2>\s*<div class="mt-8 flex flex-wrap gap-2">[\s\S]*?<\/div>/g;
let changed = 0;

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  const cleaned = html.replace(keywordBlock, '');
  if (cleaned !== html) {
    writeFileSync(file, cleaned);
    changed += 1;
  }
}

console.log(`Removed intended generated keyword-list blocks from ${changed} HTML files.`);
