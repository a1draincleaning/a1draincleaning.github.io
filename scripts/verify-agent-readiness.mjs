import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const requiredFiles = ['404.html', 'agent-index.md', 'llms.txt', 'sitemap.xml', 'sitemap-index.xml'];
for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) throw new Error(`Agent-readiness output is missing dist/${file}`);
}

const notFound = readFileSync(join(dist, '404.html'), 'utf8');
for (const href of ['/sitemap.xml', '/llms.txt', '/agent-index.md', '/services/', '/contact/']) {
  if (!notFound.includes(href)) throw new Error(`Custom 404 is missing navigation link ${href}`);
}
if (!/<meta name="robots" content="noindex,follow">/i.test(notFound)) {
  throw new Error('Custom 404 must remain noindex,follow.');
}
if (!notFound.includes("window.location.pathname === '/drain-diagnosis'")) {
  throw new Error('Custom 404 lost the existing /drain-diagnosis slash redirect.');
}

const agentIndex = readFileSync(join(dist, 'agent-index.md'), 'utf8');
for (const required of [
  'A-1 Drain Cleaning',
  '206 29th St SW, Mason City, IA 50401',
  '641-530-2728',
  'https://a1draincleaning.github.io/sitemap.xml',
  'https://a1draincleaning.github.io/llms.txt',
  'Emergency drain cleaning',
  'Emergency sewer backup service',
  'Albert Lea, Minnesota',
]) {
  if (!agentIndex.includes(required)) throw new Error(`Markdown agent index is missing required fact: ${required}`);
}

const llms = readFileSync(join(dist, 'llms.txt'), 'utf8');
if (!llms.includes('https://a1draincleaning.github.io/agent-index.md')) {
  throw new Error('llms.txt does not link to the Markdown agent index.');
}

const homepage = readFileSync(join(dist, 'index.html'), 'utf8');
if (!homepage.includes('type="text/markdown"') || !homepage.includes('href="/agent-index.md"')) {
  throw new Error('Homepage HTML does not advertise the Markdown agent index.');
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
if (!sitemap.includes('<urlset')) throw new Error('sitemap.xml is not a URL-set sitemap.');
const entries = [...sitemap.matchAll(/<url>([\\s\\S]*?)<\\/url>/g)].map((match) => match[1]);
if (!entries.length) throw new Error('sitemap.xml contains no URL entries.');

const seen = new Set();
for (const [index, entry] of entries.entries()) {
  const loc = entry.match(/<loc>([^<]+)<\\/loc>/)?.[1];
  const lastmod = entry.match(/<lastmod>([^<]+)<\\/lastmod>/)?.[1];
  if (!loc) throw new Error(`Sitemap entry ${index + 1} has no loc.`);
  if (seen.has(loc)) throw new Error(`Duplicate sitemap URL: ${loc}`);
  seen.add(loc);
  const parsed = new URL(loc);
  if (parsed.origin !== 'https://a1draincleaning.github.io' || !parsed.pathname.endsWith('/')) {
    throw new Error(`Non-canonical sitemap URL: ${loc}`);
  }
  if (!lastmod || Number.isNaN(Date.parse(lastmod))) {
    throw new Error(`Sitemap URL is missing a valid lastmod: ${loc}`);
  }
  if (Date.parse(lastmod) > Date.now() + 5 * 60 * 1000) {
    throw new Error(`Sitemap lastmod is in the future: ${loc}`);
  }
}

const indexXml = readFileSync(join(dist, 'sitemap-index.xml'), 'utf8');
if (!indexXml.includes('https://a1draincleaning.github.io/sitemap.xml')) {
  throw new Error('Sitemap index does not point to the direct sitemap URL.');
}
if (!/<lastmod>[^<]+<\\/lastmod>/.test(indexXml)) {
  throw new Error('Sitemap index is missing its sitemap-file lastmod timestamp.');
}

console.log(`Agent-readiness checks passed: custom 404, Markdown agent index, llms.txt discovery, HTML alternate link, and ${entries.length} unique sitemap URLs with valid lastmod values.`);
