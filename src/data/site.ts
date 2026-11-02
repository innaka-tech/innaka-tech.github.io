/**
 * Konfigurasi global situs. Ubah di sini — bukan di komponen.
 */
export const site = {
  name: 'Innaka',
  /** Nama badan usaha resmi. Kosongkan → footer memakai `name`. */
  legalName: 'Innaka Tech', // ganti ke nama PT resmi bila sudah ada
  tagline: 'Solusi digital & AI untuk bisnis yang siap tumbuh.',
  /** Judul halaman utama (≤ 60 karakter, memuat kata kunci utama) */
  seoTitle: 'Innaka Tech | Software House Bekasi: Website, Aplikasi & AI',
  /** Meta description (≤ 160 karakter) */
  description:
    'Software house di Bekasi: jasa pembuatan website, aplikasi mobile, sistem bisnis & AI, plus produk Tokopilot POS, WMS-Simple, dan Invora.',
  /**
   * Definisi entitas satu-dua kalimat. Dipakai di halaman, JSON-LD, dan llms.txt
   * supaya mesin pencari & AI mengutip deskripsi yang sama persis.
   */
  about:
    'Innaka Tech adalah software house di Bekasi, Jawa Barat, yang membangun website, aplikasi mobile, sistem bisnis terintegrasi, dan solusi AI untuk UMKM hingga perusahaan di Indonesia. Innaka juga mengembangkan produk software Tokopilot POS (kasir multi-cabang), WMS-Simple (manajemen gudang), dan Invora (penagihan & follow-up piutang).',
  /** Topik keahlian — untuk JSON-LD knowsAbout */
  knowsAbout: [
    'Pembuatan website',
    'Pengembangan aplikasi mobile Android & iOS',
    'Sistem ERP dan manajemen bisnis',
    'Point of Sale (POS)',
    'Warehouse Management System (WMS)',
    'Penagihan dan follow-up piutang',
    'Integrasi payment gateway, marketplace, ekspedisi, dan WhatsApp API',
    'Chatbot AI dan otomasi dokumen',
    'Otomasi alur kerja',
    'Konsultasi teknologi dan audit sistem',
    'Migrasi data dan perawatan sistem',
  ],
  url: 'https://innaka.dev',
  locale: 'id_ID',
  email: 'halo@innaka.dev',
  /**
   * Nomor WhatsApp bisnis, format internasional tanpa "+" (mis. '628123456789').
   * Selama kosong, semua tombol WhatsApp otomatis beralih ke email.
   */
  whatsapp: '6281218191866',
  /** Nomor telepon untuk ditampilkan (format lokal) */
  phone: '0812-1819-1866',
  whatsappMessage: 'Halo Innaka, saya ingin konsultasi tentang kebutuhan digital bisnis saya.',
  /** Ringkas — untuk tampilan pendek */
  address: 'Bekasi, Jawa Barat',
  /** Lengkap — sesuai Google Business Profile */
  addressFull: {
    street: 'Jl. H. Mahir No.25, RT.13/RW.5, Jatikramat, Kec. Jatiasih',
    city: 'Kota Bekasi',
    region: 'Jawa Barat',
    postalCode: '17421',
    country: 'ID',
  },
  mapsUrl: 'https://maps.app.goo.gl/49P9Yo37Zj4upMP2A',
  nib: '', // TODO: isi NIB jika ingin tampil di footer
  social: {
    instagram: 'https://instagram.com/innaka.dev',
    linkedin: 'https://linkedin.com/company/innaka',
    github: 'https://github.com/innaka-tech',
  },
  /**
   * Form kontak statis. Daftar gratis di https://web3forms.com lalu isi access key.
   * Selama kosong, form membuka aplikasi email pengunjung dengan pesan yang sudah terisi.
   */
  web3formsKey: '',
  /**
   * Feature flags.
   * hostingEnabled: aktifkan setelah KBLI 63112 terdaftar.
   */
  flags: {
    hostingEnabled: false,
    showPortfolio: false,
  },
} as const;

export const hasWhatsapp = site.whatsapp.length > 0;
export const companyName = site.legalName || site.name;

/**
 * Link kontak utama. WhatsApp bila nomornya sudah diisi, selain itu email
 * dengan subjek & isi yang sudah disiapkan.
 */
export function contactUrl(message: string = site.whatsappMessage, subject = 'Konsultasi dari innaka.dev') {
  if (hasWhatsapp) return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export const whatsappUrl = contactUrl();

/** Atribut <a> untuk link kontak — WhatsApp dibuka di tab baru, email tidak. */
export const contactLinkAttrs = hasWhatsapp ? { target: '_blank', rel: 'noopener' } : {};
