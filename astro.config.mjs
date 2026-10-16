import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://a1draincleaning.github.io',
  output: 'static',
  trailingSlash: 'always',
  // Keep generated canonical URLs and sitemap entries aligned with GitHub Pages directory routes.
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] }
});
