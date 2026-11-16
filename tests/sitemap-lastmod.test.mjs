import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { addIndexLastmod, addUrlLastmod, sourceFilesForUrl } from '../scripts/add-sitemap-lastmod.mjs';

test('adds a distinct source date to every URL and replaces stale dates', () => {
  const xml = `<?xml version="1.0"?><urlset><url><loc>https://a1draincleaning.github.io/</loc></url><url><loc>https://a1draincleaning.github.io/about/</loc><lastmod>2020-01-01</lastmod></url></urlset>`;
  const dates = new Map([
    ['https://a1draincleaning.github.io/', '2026-11-01T10:00:00Z'],
    ['https://a1draincleaning.github.io/about/', '2026-11-02T10:00:00Z']
  ]);
  const result = addUrlLastmod(xml, (url) => dates.get(url));
  assert.match(result, /<lastmod>2026-11-01T10:00:00.000Z<\/lastmod>/);
  assert.match(result, /<lastmod>2026-11-02T10:00:00.000Z<\/lastmod>/);
  assert.equal((result.match(/<lastmod>/g) || []).length, 2);
});

test('rejects missing URL locations and invalid modification dates', () => {
  assert.throws(() => addUrlLastmod('<urlset><url></url></urlset>', () => '2026-01-01'), /missing its <loc>/);
  assert.throws(() => addUrlLastmod('<urlset><url><loc>https://example.com/</loc></url></urlset>', () => 'not-a-date'), /Invalid lastmod/);
});

test('adds the latest child sitemap date to each sitemap-index entry', () => {
  const xml = '<sitemapindex><sitemap><loc>https://a1draincleaning.github.io/sitemap.xml</loc></sitemap></sitemapindex>';
  const result = addIndexLastmod(xml, '2026-11-03T12:00:00Z');
  assert.match(result, /<lastmod>2026-11-03T12:00:00.000Z<\/lastmod>/);
});

test('maps dynamic service URLs to the service template and content data', () => {
  const root = mkdtempSync(join(tmpdir(), 'a1-sitemap-test-'));
  try {
    const files = [
      'src/pages/services/[slug].astro',
      'src/layouts/MainLayout.astro',
      'src/data/business.ts',
      'src/data/services.ts',
      'src/data/servicePageConfig.ts',
      'src/data/serviceGroups.ts'
    ];
    for (const file of files) {
      const target = join(root, file);
      mkdirSync(join(target, '..'), { recursive: true });
      writeFileSync(target, '');
    }
    assert.deepEqual(
      sourceFilesForUrl('https://a1draincleaning.github.io/services/main-drain-cleaning/', root),
      files.slice(0, 1).concat(files.slice(3, 4), files.slice(4, 6), files.slice(1, 3))
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
