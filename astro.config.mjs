import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const sharedFiles = ['src/layouts/MainLayout.astro', 'src/data/business.ts'];

let hasFullGitHistory = false;
try {
  hasFullGitHistory = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'false';
  if (!hasFullGitHistory) {
    // GitHub Actions checkout defaults to a shallow clone. Fetch history so
    // lastmod can reflect the source page's last significant change, not build time.
    execFileSync('git', ['fetch', '--unshallow', '--no-tags', 'origin'], {
      stdio: ['ignore', 'ignore', 'ignore'],
    });
    hasFullGitHistory = true;
  }
} catch {
  // If history is unavailable, omit lastmod rather than publishing invented dates.
}

function sourceFilesForUrl(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return [...sharedFiles, 'src/pages/index.astro'];

  if (pathname.startsWith('/services/')) {
    const slug = pathname.split('/').filter(Boolean).at(-1);
    const staticPages = {
      'kitchen-drains': 'src/pages/services/kitchen-drains/index.astro',
      'bathroom-shower-drains': 'src/pages/services/bathroom-shower-drains/index.astro',
      'drain-cleaning': 'src/pages/services/drain-cleaning/index.astro',
      'smoke-testing': 'src/pages/services/smoke-testing.astro',
    };
    if (slug && staticPages[slug]) {
      return [...sharedFiles, staticPages[slug], 'src/data/services.ts', 'src/data/servicePageConfig.ts'];
    }
    return [
      ...sharedFiles,
      'src/pages/services/[slug].astro',
      'src/data/services.ts',
      'src/data/servicePageConfig.ts',
      'src/data/serviceGroups.ts',
    ];
  }

  if (pathname.startsWith('/service-area/')) {
    if (pathname === '/service-area/') {
      return [...sharedFiles, 'src/pages/service-area/index.astro', 'src/data/serviceAreaCities.ts'];
    }
    return [
      ...sharedFiles,
      'src/pages/service-area/[slug].astro',
      'src/data/serviceAreaCities.ts',
      'src/data/serviceAreaCityPages.ts',
    ];
  }

  const directoryPage = `src/pages${pathname}index.astro`;
  const flatPage = `src/pages${pathname.replace(/\\/$/, '')}.astro`;
  const specificFiles = [directoryPage, flatPage].filter((path) => existsSync(path));
  return [...sharedFiles, ...specificFiles];
}

function lastSignificantSourceChange(url) {
  const files = sourceFilesForUrl(url).filter((path) => existsSync(path));
  if (!files.length) return undefined;

  try {
    const timestamp = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...files],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    if (!timestamp || Number.isNaN(Date.parse(timestamp))) return undefined;
    return new Date(timestamp).toISOString();
  } catch {
    // Local source archives may not include Git history. In that case omit
    // lastmod rather than inventing a timestamp from the build clock.
    return undefined;
  }
}

export default defineConfig({
  site: 'https://a1draincleaning.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastSignificantSourceChange(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] }
});
