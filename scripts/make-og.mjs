// Membuat public/og.png dari scripts/og.html memakai Chromium (Playwright).
// Jalankan: node scripts/make-og.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFile, writeFile, rm } from 'node:fs/promises';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
// Sisipkan logo resmi (Logo Kit) ke template
const logo = await readFile(path.join(here, '..', 'src', 'assets', 'brand', 'innaka-horizontal-dark.svg'), 'utf8');
const html = (await readFile(path.join(here, 'og.html'), 'utf8')).replace('<!--LOGO-->', logo);
const tmp = path.join(here, '.og-render.html');
await writeFile(tmp, html);
await page.goto('file://' + tmp);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(here, '..', 'public', 'og.png'), type: 'png' });
await browser.close();
await rm(tmp);
console.log('✓ public/og.png');
