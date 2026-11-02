// Membuat ikon PNG (apple-touch-icon, icon-192/512, logo) dari public/favicon.svg.
// Jalankan: node scripts/make-icons.mjs   (opsional: CHROME_PATH=/path/ke/chromium)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const svg = await readFile(path.join(root, 'public', 'favicon.svg'), 'utf8');

const targets = [
  ['apple-touch-icon.png', 180, 0],
  ['icon-192.png', 192, 0],
  ['icon-512.png', 512, 0],
  // Logo untuk JSON-LD: latar penuh (tanpa sudut transparan)
  ['logo.png', 512, 1],
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
for (const [name, size, square] of targets) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const body = square ? svg.replace('rx="14"', 'rx="0"') : svg;
  await page.setContent(
    `<html><body style="margin:0;background:${square ? '#0b0b0f' : 'transparent'}">` +
      body.replace('<svg ', `<svg width="${size}" height="${size}" `) +
      '</body></html>',
  );
  await page.screenshot({ path: path.join(root, 'public', name), omitBackground: !square });
  await page.close();
  console.log('✓ public/' + name);
}
await browser.close();
