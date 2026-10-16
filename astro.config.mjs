import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://a1draincleaning.github.io',
  output: 'static',
  // Trigger a fresh GitHub Pages build so the generated sitemap is republished.
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] }
});
