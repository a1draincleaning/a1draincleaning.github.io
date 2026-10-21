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
let keywordBlocksRemoved = 0;
let schemaFilesFixed = 0;

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  let cleaned = html.replace(keywordBlock, () => {
    keywordBlocksRemoved += 1;
    return '';
  });

  // astro-seo-schema escapes ampersands in its rendered script text. HTML
  // character references are not decoded inside script raw-text elements, so
  // values such as "Kitchen &amp; Bathroom" would otherwise reach crawlers as
  // the literal string "&amp;". Fix only JSON-LD script contents; do not alter
  // normal page HTML.
  const schemaPattern = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g;
  const schemaFixed = cleaned.replace(schemaPattern, (full, open, json, close) => {
    const decoded = json.replace(/&amp;/g, '&');
    return decoded === json ? full : `${open}${decoded}${close}`;
  });

  if (schemaFixed !== cleaned) schemaFilesFixed += 1;
  if (schemaFixed !== html) writeFileSync(file, schemaFixed);
}

console.log(`Removed ${keywordBlocksRemoved} generated keyword-list blocks and fixed JSON-LD escaping in ${schemaFilesFixed} HTML files.`);
