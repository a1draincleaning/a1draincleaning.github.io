import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

// Retired URLs remain explicit redirects for old external references, while
// source generation prevents them from becoming current canonical pages.
const retiredRoutes = [
  { from: '/service-area/mason_city/', to: '/mason-city-drain-cleaning/' },
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
  for (const { from } of retiredRoutes) {
    const url = `https://a1draincleaning.github.io${from}`;
    if (xml.includes(url)) {
      throw new Error(`Retired URL remained in generated XML sitemap: ${url}`);
    }
  }
  writeFileSync(file, xml);
}

console.log(`Pruned ${retiredRoutes.length} retired routes, replaced their internal HTML links, and removed them from generated XML sitemaps.`);
