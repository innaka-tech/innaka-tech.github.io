// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domain utama. innaka-tech.github.io otomatis redirect ke sini oleh GitHub Pages.
export default defineConfig({
  site: 'https://innaka.dev',
  integrations: [
    sitemap({
      // 404 tidak perlu diindeks
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1 }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
