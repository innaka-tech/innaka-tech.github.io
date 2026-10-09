/**
 * Konfigurasi global situs. Ubah di sini — bukan di komponen.
 */
export const site = {
  name: 'Innaka',
  legalName: 'PT Innaka Teknologi Nusantara', // TODO: sesuaikan nama legal
  tagline: 'Solusi digital & AI untuk bisnis yang siap tumbuh.',
  description:
    'Innaka membangun website, aplikasi mobile, sistem bisnis terintegrasi, dan solusi AI untuk bisnis Indonesia. Konsultasi teknologi, software siap pakai (Tokopilot POS, WMS-Simple), hingga perawatan sistem.',
  url: 'https://innaka.dev',
  locale: 'id_ID',
  email: 'halo@innaka.dev',
  whatsapp: '6281234567890', // TODO: nomor WA bisnis (format internasional tanpa +)
  whatsappMessage: 'Halo Innaka, saya ingin konsultasi tentang kebutuhan digital bisnis saya.',
  address: 'Jakarta, Indonesia', // TODO: alamat lengkap
  nib: '', // TODO: isi NIB jika ingin tampil di footer
  social: {
    instagram: 'https://instagram.com/innaka.dev',
    linkedin: 'https://linkedin.com/company/innaka',
    github: 'https://github.com/innaka-tech',
  },
  /** Form kontak statis. Daftar gratis di https://web3forms.com lalu isi access key. */
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

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
