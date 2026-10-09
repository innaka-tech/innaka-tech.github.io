// Membuat public/og.png dari scripts/og.html memakai Chromium (Playwright).
// Jalankan: node scripts/make-og.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(here, 'og.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(here, '..', 'public', 'og.png'), type: 'png' });
await browser.close();
console.log('✓ public/og.png');
