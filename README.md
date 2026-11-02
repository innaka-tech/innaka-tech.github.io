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

### Halaman layanan & produk

Halaman detail (`/layanan/<slug>/`, `/produk/<slug>/`) digenerate dari **`src/data/pages.ts`** memakai template `src/components/DetailPage.astro`. Untuk menambah halaman, cukup tambah satu objek di `servicePages` atau `productPages` — sitemap, footer, structured data (Service/SoftwareApplication, BreadcrumbList, FAQPage), dan `llms.txt` ikut terbarui otomatis.

Fakta di halaman ini bersumber dari innaka-blueprint: COM-MKT-03 (profil pelanggan), COM-MKT-05 (paket solusi), APP-MOD-02 (fitur modul). Invora bersumber dari repo `innaka-tech/invoicing` (`FITUR.md`, `DOKUMENTASI_FITUR_APLIKASI.md`); tombol "Buka Invora" mengarah ke `https://invoicing.innaka.dev` (field `appUrl`). Jangan menambah klaim (jumlah klien, angka hasil, harga) yang tidak ada di sumber. Sesuai APP-MOD-02 §3, produk belum boleh diklaim "siap pakai" sebelum checklist kesiapan jual terpenuhi.

### Kontak (wajib diisi)

Di `src/data/site.ts`:

- `whatsapp` — nomor WA bisnis format internasional tanpa `+` (mis. `628123456789`). **Selama kosong, semua tombol "Konsultasi" dan "Minta Demo" otomatis memakai email**, jadi tidak ada tombol mati.
- `legalName`, `address`, `nib` — tampil di footer & data terstruktur (JSON-LD). `legalName` kosong → footer memakai `name`.

### Feature flags (`site.flags`)

- `hostingEnabled` — set `true` setelah KBLI 63112 aktif. Selama `false`, item "Hosting terkelola" tampil dengan badge **Segera hadir**.
- `showPortfolio` — disiapkan untuk section portofolio/testimoni.

### Form kontak

Form memakai [Web3Forms](https://web3forms.com) (gratis, tanpa backend). Daftar, lalu isi `web3formsKey` di `src/data/site.ts`. Sebelum diisi, tombol kirim membuka aplikasi email pengunjung dengan pesan yang sudah terisi.

### SEO & GEO

- Title, meta description, dan kalimat definisi entitas (`seoTitle`, `description`, `about`) ada di `src/data/site.ts`.
- Structured data (JSON-LD) dibangun otomatis di `src/data/schema.ts` dari data layanan, produk, dan FAQ: Organization/ProfessionalService, OfferCatalog, SoftwareApplication, FAQPage.
- `/llms.txt` dibuat otomatis (`src/pages/llms.txt.ts`) — ringkasan Markdown untuk mesin AI.
- `public/robots.txt` mengizinkan crawler mesin pencari & AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, dll.).
- Jaga NAP (nama, alamat, telepon) **identik** dengan Google Business Profile.

### Logo & ikon

Semua logo dan ikon berasal dari Logo Kit di repo `innaka-tech/innaka-blueprint` (`docs/company/06-brand/assets/`) dan **disalin apa adanya** — jangan diedit manual:

| Di repo ini | Sumber di Logo Kit |
|---|---|
| `src/assets/brand/innaka-horizontal-{dark,light}.svg`, `innaka-mark-dark.svg` | `svg/` |
| `public/favicon.svg` | `usage/web/favicon-adaptive.svg` |
| `public/favicon.ico`, `favicon-{16,32,48}.png`, `apple-touch-icon.png`, `icon-{192,512}.png`, `icon-maskable-512.png` | `web/` |
| `public/logo.png` (logo untuk Google / JSON-LD) | `png/on-background/innaka-mark-on-white-1024.png` |

Bila Logo Kit diperbarui, salin ulang file-file di atas lalu jalankan `node scripts/make-og.mjs`.

### Palet & font

Mengikuti Brand Identity (COM-BRD-01): Navy `#0E2A47`, Teal `#0F8B8D`, Amber `#F5A524`, Surface `#F8FAFC`, Teal terang `#5EEAD4` (aksen di latar gelap), font **Plus Jakarta Sans**. Token ada di `src/styles/global.css`:

- `ink` = latar, `paper` = teks — nilainya dibalik otomatis per section dengan atribut `data-theme-light` (dan `data-theme-dark` untuk kembali gelap di dalamnya).
- Teal brand hanya 3,9:1 di Surface (gagal WCAG AA untuk teks kecil), jadi di section terang teks aksen memakai shade `#0B7174` dan tombol memakai Navy.

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
