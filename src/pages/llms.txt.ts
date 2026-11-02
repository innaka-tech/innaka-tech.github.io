/**
 * /llms.txt — ringkasan situs dalam Markdown untuk mesin AI (ChatGPT, Claude,
 * Perplexity, Gemini). Dibangun dari data yang sama dengan halaman supaya selalu sinkron.
 * Format: https://llmstxt.org
 */
import type { APIRoute } from 'astro';
import { site, companyName } from '../data/site';
import { services, products, process, faqs } from '../data/services';
import { servicePages, productPages, pageUrl } from '../data/pages';

export const GET: APIRoute = () => {
  const a = site.addressFull;
  const lines: string[] = [
    `# ${companyName}`,
    '',
    `> ${site.about}`,
    '',
    '## Kontak',
    '',
    `- Website: ${site.url}`,
    `- WhatsApp / Telepon: ${site.phone} (+${site.whatsapp})`,
    `- Email: ${site.email}`,
    `- Alamat: ${a.street}, ${a.city}, ${a.region} ${a.postalCode}, Indonesia`,
    `- Google Maps: ${site.mapsUrl}`,
    `- Konsultasi awal: gratis, tanpa komitmen — via WhatsApp atau email`,
    '',
    '## Layanan',
    '',
  ];

  for (const s of services) {
    lines.push(`### ${s.title}`, '', s.summary, '');
    for (const it of s.items) {
      lines.push(`- **${it.title}**${it.soon ? ' (segera hadir)' : ''}: ${it.desc}`);
    }
    lines.push('');
  }

  lines.push('## Produk software', '');
  for (const p of products) {
    lines.push(`### ${p.name} — ${p.tag}`, '', `${p.headline} ${p.desc}`, '', ...p.features.map((f) => `- ${f}`), '');
  }

  lines.push('## Cara kerja', '');
  process.forEach((p) => lines.push(`${Number(p.step)}. **${p.title}** — ${p.desc}`));
  lines.push('');

  lines.push('## Pertanyaan umum (FAQ)', '');
  for (const f of faqs) lines.push(`### ${f.q}`, '', f.a, '');

  lines.push('## Halaman', '', `- [Beranda](${site.url}/): ringkasan semua layanan, produk, cara kerja, FAQ, dan kontak`);
  for (const pg of [...servicePages, ...productPages]) {
    lines.push(`- [${pg.name}](${site.url}${pageUrl(pg)}): ${pg.description}`);
  }
  lines.push(`- [Sitemap](${site.url}/sitemap-index.xml)`, '');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
