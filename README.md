# innaka.dev — Landing Page

Situs resmi Innaka. Dibangun dengan [Astro](https://astro.build) + Tailwind CSS v4, animasi GSAP + Lenis, tayang via GitHub Pages.

- Sementara: https://innaka-tech.github.io
- Nanti: https://innaka.dev (lihat bagian DNS di bawah)

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil di dist/
npm run preview
```

## Mengubah konten

Semua teks dan konfigurasi ada di `src/data/`, bukan di komponen:

| File | Isi |
|---|---|
| `src/data/site.ts` | Nama, email, nomor WhatsApp, alamat, sosial media, feature flags |
| `src/data/services.ts` | 4 pilar layanan, produk (Tokopilot POS, WMS-Simple), alasan, proses, FAQ |

### Feature flags (`site.flags`)

- `hostingEnabled` — set `true` setelah KBLI 63112 aktif. Selama `false`, item "Hosting terkelola" tampil dengan badge **Segera hadir**.
- `showPortfolio` — disiapkan untuk section portofolio/testimoni.

### Form kontak

Form memakai [Web3Forms](https://web3forms.com) (gratis, tanpa backend). Daftar, lalu isi `web3formsKey` di `src/data/site.ts`. Sebelum diisi, form menampilkan pesan agar pengunjung menghubungi via WhatsApp/email.

### OG image

`public/og.png` dibuat dari `scripts/og.html`:

```bash
node scripts/make-og.mjs
```

## Deploy

Setiap push ke `main` otomatis build & deploy lewat `.github/workflows/deploy.yml`.
Di **Settings → Pages → Build and deployment → Source** pilih **GitHub Actions**.

## Pindah ke innaka.dev (Cloudflare)

Domain `.dev` wajib HTTPS, jadi urutannya penting:

1. **Verifikasi domain** di GitHub: Org Settings → Pages → *Add a domain* → `innaka.dev`. Tambahkan record TXT `_github-pages-challenge-innaka-tech` yang diberikan GitHub ke Cloudflare.
2. **DNS di Cloudflare**, semua dengan Proxy status **DNS only** (awan abu-abu):

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `innaka-tech.github.io` |

   Jangan hapus record MX/TXT email yang sudah ada.
3. Repo Settings → Pages → **Custom domain** → `innaka.dev` → tunggu sertifikat terbit → centang **Enforce HTTPS**. (GitHub otomatis membuat file `CNAME` di branch; biarkan, atau tambahkan `public/CNAME` berisi `innaka.dev`.)
4. Ubah `site` di `astro.config.mjs` dan `url` di `src/data/site.ts` menjadi `https://innaka.dev`, serta `Sitemap:` di `public/robots.txt`.
5. (Opsional) Proxy Cloudflare (awan oranye) boleh diaktifkan **setelah** sertifikat GitHub terbit, dengan SSL/TLS mode **Full (strict)**.

## Struktur

```
src/
  components/   Nav, Hero, Marquee, Services, Products, Why, Process, Faq, Cta, Footer, …
  data/         site.ts, services.ts   ← konten di sini
  layouts/      Base.astro             ← <head>, SEO, JSON-LD
  pages/        index.astro, 404.astro
  scripts/      app.ts                 ← Lenis, GSAP, preloader, cursor, dll.
  styles/       global.css             ← design tokens (Tailwind v4 @theme)
```
