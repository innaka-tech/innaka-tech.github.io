// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sementara tayang di GitHub Pages default. Saat domain innaka.dev
// sudah mengarah ke Pages, ganti `site` menjadi 'https://innaka.dev'.
export default defineConfig({
  site: 'https://innaka-tech.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
