import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');

export function sourceFilesForUrl(url, projectRoot = root) {
  const pathname = new URL(url).pathname;
  const relative = pathname.replace(/^\/+|\/+$/g, '');
  const staticCandidates = relative
    ? [`src/pages/${relative}/index.astro`, `src/pages/${relative}.astro`]
    : ['src/pages/index.astro'];
  const staticPage = staticCandidates.find((file) => existsSync(join(projectRoot, file)));

  const shared = ['src/layouts/MainLayout.astro', 'src/data/business.ts'];
  if (staticPage) {
    if (pathname.startsWith('/services/')) {
      return [...new Set([staticPage, ...shared, 'src/data/services.ts', 'src/data/servicePageConfig.ts'])];
    }
    if (pathname.startsWith('/service-area/')) {
      return [...new Set([staticPage, ...shared, 'src/data/serviceAreaCities.ts', 'src/data/serviceAreaCityPages.ts'])];
    }
    return [...new Set([staticPage, ...shared])];
  }

  if (pathname.startsWith('/services/')) {
    return [
      'src/pages/services/[slug].astro',
      'src/data/services.ts',
      'src/data/servicePageConfig.ts',
      'src/data/serviceGroups.ts',
      ...shared
    ];
  }

  if (pathname.startsWith('/service-area/')) {
    return [
      'src/pages/service-area/[slug].astro',
      'src/data/serviceAreaCities.ts',
      'src/data/serviceAreaCityPages.ts',
      ...shared
    ];
  }

  throw new Error(`No source file mapping found for sitemap URL: ${url}`);
}

export function addUrlLastmod(xml, getLastmod) {
  let count = 0;
  const updated = xml.replace(/<url>([\s\S]*?)<\/url>/g, (_whole, inner) => {
    const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) throw new Error('Sitemap URL entry is missing its <loc> element.');
    const lastmod = new Date(getLastmod(loc));
    if (Number.isNaN(lastmod.getTime())) throw new Error(`Invalid lastmod date for ${loc}`);
    const date = lastmod.toISOString();
    const content = inner.replace(/<lastmod>[^<]*<\/lastmod>/g, '').trim();
    count += 1;
    return `<url>\n${content}\n  <lastmod>${date}</lastmod>\n</url>`;
  });
  if (count === 0) throw new Error('No <url> entries found in sitemap.');
  const withoutDates = [...updated.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .filter(([, inner]) => !/<lastmod>[^<]+<\/lastmod>/.test(inner));
  if (withoutDates.length) throw new Error('One or more sitemap URLs are missing lastmod.');
  return updated;
}

export function addIndexLastmod(xml, lastmod) {
  const date = new Date(lastmod);
  if (Number.isNaN(date.getTime())) throw new Error('Invalid sitemap-index lastmod date.');
  let count = 0;
  const updated = xml.replace(/<sitemap>([\s\S]*?)<\/sitemap>/g, (_whole, inner) => {
    if (!/<loc>[^<]+<\/loc>/.test(inner)) throw new Error('Sitemap index entry is missing its <loc> element.');
    count += 1;
    const content = inner.replace(/<lastmod>[^<]*<\/lastmod>/g, '').trim();
    return `<sitemap>\n${content}\n  <lastmod>${date.toISOString()}</lastmod>\n</sitemap>`;
  });
  if (count === 0) throw new Error('No <sitemap> entries found in sitemap index.');
  return updated;
}

let gitHistoryChecked = false;
function ensureFullGitHistory() {
  if (gitHistoryChecked) return;
  gitHistoryChecked = true;
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
    cwd: root,
    encoding: 'utf8'
  }).trim() === 'true';
  if (shallow) {
    const args = ['fetch', '--unshallow', '--no-tags', 'origin'];
    if (process.env.GITHUB_REF) args.push(process.env.GITHUB_REF);
    execFileSync('git', args, { cwd: root, stdio: 'inherit' });
  }
}

function gitLastmod(files) {
  ensureFullGitHistory();
  for (const file of files) {
    if (!existsSync(join(root, file))) throw new Error(`Sitemap source file is missing: ${file}`);
  }
  const value = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
    cwd: root,
    encoding: 'utf8'
  }).trim();
  if (!value) throw new Error(`Git history has no modification date for: ${files.join(', ')}`);
  return value;
}

function run() {
  const sitemapPath = join(dist, 'sitemap.xml');
  const indexPath = join(dist, 'sitemap-index.xml');
  if (!existsSync(sitemapPath) || !existsSync(indexPath)) {
    throw new Error('Expected dist/sitemap.xml and dist/sitemap-index.xml. Run the route-pruning step first.');
  }

  const original = readFileSync(sitemapPath, 'utf8');
  const updated = addUrlLastmod(original, (url) => gitLastmod(sourceFilesForUrl(url)));
  writeFileSync(sitemapPath, updated);

  const dates = [...updated.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => new Date(match[1]).getTime());
  const sitemapFileLastmod = new Date().toISOString();
  const index = readFileSync(indexPath, 'utf8');
  writeFileSync(indexPath, addIndexLastmod(index, sitemapFileLastmod));

  console.log(`Added source-history lastmod dates to ${dates.length} sitemap URLs and updated sitemap-index.xml.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) run();
