import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

// Retired URLs remain explicit redirects for old external references, while
// source generation prevents them from becoming current canonical pages.
const retiredRoutes = [
  { from: '/service-area/mason-city/', to: '/mason-city-drain-cleaning/' },
  { from: '/services/drain-repair/', to: '/pipe-repair/' },
  { from: '/services/washing-machine-basement-flooding/', to: '/services/laundry-drains/' },
  { from: '/services/kitchen-bathroom-drains/', to: '/services/bathroom-shower-drains/' }
];

function routeDir(route) {
  return join(dist, route.replace(/^\//, '').replace(/\/$/, ''));
}

function redirectHtml(to) {
  const destination = `https://a1draincleaning.github.io${to}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0;url=${destination}">
  <link rel="canonical" href="${destination}">
  <title>Page Moved | A-1 Drain Cleaning</title>
</head>
<body>
  <main>
    <p>This page has moved. <a href="${to}">Go to the current A-1 Drain Cleaning page.</a></p>
  </main>
</body>
</html>
`;
}

for (const { from, to } of retiredRoutes) {
  const directory = routeDir(from);
  if (existsSync(directory)) rmSync(directory, { recursive: true, force: true });
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'index.html'), redirectHtml(to));
}

function filesUnder(dir, predicate) {
  if (!existsSync(dir)) return [];
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...filesUnder(path, predicate));
    else if (predicate(entry.name)) results.push(path);
  }
  return results;
}

// Replace links to retired routes in generated HTML so live pages point directly
// to the current canonical destinations instead of making visitors and crawlers
// follow an unnecessary redirect.
for (const file of filesUnder(dist, (name) => name.endsWith('.html'))) {
  let html = readFileSync(file, 'utf8');
  for (const { from, to } of retiredRoutes) {
    html = html.split(from).join(to);
  }
  writeFileSync(file, html);
}

for (const file of filesUnder(dist, (name) => name.endsWith('.xml'))) {
  let xml = readFileSync(file, 'utf8');
  for (const { from } of retiredRoutes) {
    const url = `https://a1draincleaning.github.io${from}`;
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    xml = xml.replace(new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, 'g'), '');
  }
  // Fail the build if a retired canonical URL survives sitemap pruning.
  for (const { from } of retiredRoutes) {
    const url = `https://a1draincleaning.github.io${from}`;
    if (xml.includes(url)) {
      throw new Error(`Retired URL remained in generated XML sitemap: ${url}`);
    }
  }
  writeFileSync(file, xml);
}

// Publish a conventional /sitemap.xml alongside Astro's generated sitemap files.
// This gives crawlers a stable direct sitemap endpoint even if the generated
// sitemap-index/child endpoint is not being served correctly by the Pages CDN.
const generatedSitemap = join(dist, 'sitemap-0.xml');
const directSitemap = join(dist, 'sitemap.xml');
const sitemapIndex = join(dist, 'sitemap-index.xml');
if (!existsSync(generatedSitemap)) {
  throw new Error('Astro did not generate dist/sitemap-0.xml; refusing to deploy without a source sitemap.');
}

const generatedXml = readFileSync(generatedSitemap, 'utf8');
if (!generatedXml.includes('<urlset')) {
  throw new Error('Generated sitemap-0.xml is not a valid URL-set sitemap.');
}

const sitemapUrls = [...generatedXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length === 0) {
  throw new Error('Generated sitemap-0.xml contains no URLs.');
}

for (const sitemapUrl of sitemapUrls) {
  const parsed = new URL(sitemapUrl);
  if (parsed.origin !== 'https://a1draincleaning.github.io' || !parsed.pathname.endsWith('/')) {
    throw new Error('Non-canonical URL found in sitemap: ' + sitemapUrl);
  }
  const relativePath = decodeURIComponent(parsed.pathname).replace(/^\/+|\/+$/g, '');
  const htmlPath = relativePath ? join(dist, relativePath, 'index.html') : join(dist, 'index.html');
  if (!existsSync(htmlPath)) {
    throw new Error('Sitemap URL has no generated HTML page: ' + sitemapUrl + ' (expected ' + htmlPath + ')');
  }
}

copyFileSync(generatedSitemap, directSitemap);
const sitemapFileLastmod = new Date().toISOString();
writeFileSync(
  sitemapIndex,
  '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://a1draincleaning.github.io/sitemap.xml</loc><lastmod>' + sitemapFileLastmod + '</lastmod></sitemap></sitemapindex>'
);

if (!existsSync(directSitemap) || !readFileSync(sitemapIndex, 'utf8').includes('https://a1draincleaning.github.io/sitemap.xml')) {
  throw new Error('Direct sitemap or sitemap index was not published correctly.');
}

// Publish an explicit Markdown URL for agents. GitHub Pages cannot negotiate
// representations from the Accept header or set Vary: Accept, so this is a
// directly addressable static Markdown resource rather than HTTP negotiation.
const llmsText = join(dist, 'llms.txt');
const llmsMarkdown = join(dist, 'llms.md');
if (!existsSync(llmsText)) {
  throw new Error('public/llms.txt was not copied into dist; refusing to omit agent-readable site information.');
}
copyFileSync(llmsText, llmsMarkdown);
if (readFileSync(llmsText, 'utf8') !== readFileSync(llmsMarkdown, 'utf8')) {
  throw new Error('The published llms.md does not match llms.txt.');
}

// Add accurate source-history timestamps, then assert all agent-facing build outputs.
execFileSync(process.execPath, [join(process.cwd(), 'scripts/add-sitemap-lastmod.mjs')], { stdio: 'inherit' });
execFileSync(process.execPath, [join(process.cwd(), 'scripts/verify-agent-readiness.mjs')], { stdio: 'inherit' });

console.log('Pruned ' + retiredRoutes.length + ' retired routes, validated ' + sitemapUrls.length + ' canonical sitemap URLs against generated HTML pages, published sitemap.xml and sitemap-index.xml, and copied llms.txt to llms.md.');

