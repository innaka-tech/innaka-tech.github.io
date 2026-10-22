/**
 * Konfigurasi global situs. Ubah di sini — bukan di komponen.
 */
export const site = {
  name: 'Innaka',
  /** Nama badan usaha resmi. Kosongkan → footer memakai `name`. */
  legalName: '', // TODO: isi nama legal PT, mis. 'PT ...'
  tagline: 'Solusi digital & AI untuk bisnis yang siap tumbuh.',
  description:
    'Innaka membangun website, aplikasi mobile, sistem bisnis terintegrasi, dan solusi AI untuk bisnis Indonesia. Konsultasi teknologi, software siap pakai (Tokopilot POS, WMS-Simple), hingga perawatan sistem.',
  url: 'https://innaka.dev',
  locale: 'id_ID',
  email: 'halo@innaka.dev',
  /**
   * Nomor WhatsApp bisnis, format internasional tanpa "+" (mis. '628123456789').
   * Selama kosong, semua tombol WhatsApp otomatis beralih ke email.
   */
  whatsapp: '', // TODO: isi nomor WA bisnis
  whatsappMessage: 'Halo Innaka, saya ingin konsultasi tentang kebutuhan digital bisnis saya.',
  address: 'Indonesia', // TODO: kota / alamat lengkap
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
