import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const requiredFiles = ['404.html', 'agent-index.md', 'llms.txt', 'llms.md', 'sitemap.xml', 'sitemap-index.xml'];
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
if (llms !== readFileSync(join(dist, 'llms.md'), 'utf8')) throw new Error('llms.md must match llms.txt exactly.');
if (!llms.includes('https://a1draincleaning.github.io/agent-index.md')) {
  throw new Error('llms.txt does not link to the Markdown agent index.');
}
// Match the exact published labels in llms.txt so the index cannot drift.
for (const required of [
  'Emergency Drain Cleaning',
  'Sewer Backup Emergency Service',
  'Drain & Sewer Camera Inspections',
  'Sewer Line Locating',
  'Drain & Sewer Pipe Repair',
]) {
  if (!llms.includes(required)) throw new Error(`llms.txt is missing a core service: ${required}`);
}

const homepage = readFileSync(join(dist, 'index.html'), 'utf8');
function extractJsonLd(html) {
  const opening = '<script type="application/ld+json">';
  const closing = '</script>';
  const values = [];
  let cursor = 0;
  while (true) {
    const start = html.indexOf(opening, cursor);
    if (start === -1) break;
    const contentStart = start + opening.length;
    const end = html.indexOf(closing, contentStart);
    if (end === -1) throw new Error('Unclosed JSON-LD script element.');
    values.push(JSON.parse(html.slice(contentStart, end)));
    cursor = end + closing.length;
  }
  return values;
}
const homepageGraphs = extractJsonLd(homepage);
if (!homepageGraphs.length) throw new Error('Homepage has no JSON-LD script.');
const graphNodes = homepageGraphs.flatMap((value) => Array.isArray(value['@graph']) ? value['@graph'] : [value]);
const hasType = (node, type) => (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).includes(type);
const organization = graphNodes.find((node) => hasType(node, 'Organization'));
if (!organization) throw new Error('Homepage JSON-LD has no Organization identity.');
for (const field of ['name', 'url', 'logo', 'description', 'sameAs', 'address', 'contactPoint']) {
  if (!organization[field]) throw new Error(`Organization JSON-LD is missing ${field}.`);
}
if (!organization.contactPoint.telephone) throw new Error('Organization contactPoint has no telephone.');
if (!graphNodes.some((node) => hasType(node, 'WebSite') && node.name && node.url && node.description && node.publisher)) {
  throw new Error('Homepage JSON-LD WebSite node is incomplete.');
}
const servicePage = readFileSync(join(dist, 'services', 'main-drain-cleaning', 'index.html'), 'utf8');
const serviceJsonLd = extractJsonLd(servicePage);
const serviceNodes = serviceJsonLd.flatMap((value) => Array.isArray(value['@graph']) ? value['@graph'] : [value]);
for (const type of ['Service', 'FAQPage', 'BreadcrumbList']) {
  if (!serviceNodes.some((node) => hasType(node, type))) throw new Error(`Main drain page JSON-LD is missing ${type}.`);
}
if (!homepage.includes('type="text/markdown"') || !homepage.includes('href="/agent-index.md"')) {
  throw new Error('Homepage HTML does not link to the Markdown agent index.');
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
if (!sitemap.includes('<urlset')) throw new Error('sitemap.xml is not a URL-set sitemap.');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
if (!entries.length) throw new Error('sitemap.xml contains no URL entries.');

const seen = new Set();
for (const [index, entry] of entries.entries()) {
  const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
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
if (!/<lastmod>[^<]+<\/lastmod>/.test(indexXml)) {
  throw new Error('Sitemap index is missing its sitemap-file lastmod timestamp.');
}

console.log(`Agent-readiness checks passed: custom 404, Markdown agent index, llms.txt discovery, HTML Markdown description link, and ${entries.length} unique sitemap URLs with valid lastmod values.`);
