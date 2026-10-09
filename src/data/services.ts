import { site } from './site';

export type ServiceItem = {
  title: string;
  desc: string;
  /** Ditampilkan sebagai "Segera hadir" jika true */
  soon?: boolean;
};

export type Service = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  items: ServiceItem[];
};

export const services: Service[] = [
  {
    id: 'solusi-digital',
    index: '01',
    eyebrow: 'Build',
    title: 'Solusi Digital Sesuai Kebutuhan Bisnis',
    summary:
      'Dari website hingga sistem operasional menyeluruh — dirancang khusus untuk cara bisnis Anda bekerja, bukan sebaliknya.',
    items: [
      { title: 'Website profesional', desc: 'Tampilan yang membangun kepercayaan sejak detik pertama.' },
      { title: 'Aplikasi mobile', desc: 'Siap bersaing di Play Store & App Store.' },
      { title: 'Sistem bisnis terintegrasi', desc: 'Stok, penjualan, sampai karyawan — dalam satu tempat.' },
      { title: 'Otomasi alur kerja', desc: 'Memangkas pekerjaan manual yang berulang.' },
      { title: 'Integrasi mulus', desc: 'Payment gateway, marketplace, ekspedisi, dan WhatsApp.' },
    ],
  },
  {
    id: 'konsultasi',
    index: '02',
    eyebrow: 'Advise',
    title: 'Konsultasi Teknologi & AI',
    summary:
      'Keputusan teknologi yang tepat sejak awal menghemat biaya bertahun-tahun ke depan. Kami bantu Anda memilih, memeriksa, dan menerapkan.',
    items: [
      { title: 'Strategi teknologi', desc: 'Tepat sejak awal, tanpa buang biaya.' },
      { title: 'Pemeriksaan kesehatan sistem', desc: 'Performa, keamanan, dan skalabilitas.' },
      { title: 'Implementasi AI untuk bisnis', desc: 'Chatbot cerdas dan otomasi dokumen.' },
      { title: 'Infrastruktur', desc: 'Stabil hari ini, siap tumbuh besok.' },
      { title: 'Tim ahli IT on-demand', desc: 'Tanpa perlu rekrut dan membina tim sendiri.' },
    ],
  },
  {
    id: 'software',
    index: '03',
    eyebrow: 'Products',
    title: 'Software Siap Pakai',
    summary:
      'Produk yang sudah teruji di lapangan. Pasang hari ini, jalan hari ini — tanpa menunggu pengembangan dari nol.',
    items: [
      { title: 'Tokopilot POS', desc: 'Kasir pintar untuk toko dan multi-cabang, laporan penjualan real-time.' },
      { title: 'WMS-Simple', desc: 'Gudang rapi, stok akurat, pengiriman lebih cepat.' },
    ],
  },
  {
    id: 'data-perawatan',
    index: '04',
    eyebrow: 'Care',
    title: 'Data & Perawatan Sistem',
    summary:
      'Sistem yang baik butuh dijaga. Kami pastikan data aman, aplikasi prima, dan Anda bisa fokus menjalankan bisnis.',
    items: [
      { title: 'Backup otomatis', desc: 'Data bisnis selalu aman.' },
      { title: 'Dashboard bisnis', desc: 'Keputusan berbasis data, bukan tebakan.' },
      { title: 'Migrasi sistem', desc: 'Pindah sistem tanpa kehilangan data.' },
      { title: 'Perawatan & dukungan teknis', desc: 'Aplikasi selalu prima.' },
      {
        title: 'Hosting terkelola',
        desc: 'Tinggal pakai, tanpa pusing server.',
        soon: !site.flags.hostingEnabled,
      },
    ],
  },
];

export type Product = {
  id: string;
  name: string;
  tag: string;
  headline: string;
  desc: string;
  features: string[];
  accent: string;
};

export const products: Product[] = [
  {
    id: 'tokopilot',
    name: 'Tokopilot POS',
    tag: 'Point of Sale',
    headline: 'Kasir pintar untuk toko dan multi-cabang.',
    desc: 'Transaksi cepat di kasir, laporan penjualan real-time di genggaman. Satu dashboard untuk semua cabang.',
    features: ['Multi-cabang & multi-kasir', 'Laporan real-time', 'Manajemen stok & promo', 'Terhubung ke marketplace'],
    accent: 'var(--color-accent)',
  },
  {
    id: 'wms-simple',
    name: 'WMS-Simple',
    tag: 'Warehouse Management',
    headline: 'Gudang rapi, stok akurat, pengiriman lebih cepat.',
    desc: 'Dari barang masuk hingga barang keluar — setiap pergerakan tercatat. Tidak ada lagi stok hantu dan pengiriman terlambat.',
    features: ['Inbound & outbound tracking', 'Stock opname cepat', 'Lokasi rak & batch', 'Integrasi ekspedisi'],
    accent: 'var(--color-accent-2)',
  },
];

export const reasons = [
  {
    stat: '1',
    suffix: ' tim',
    title: 'Satu partner untuk semua',
    desc: 'Website, aplikasi, sistem, AI, hingga perawatan — tidak perlu koordinasi dengan lima vendor berbeda.',
  },
  {
    stat: '0',
    suffix: ' rekrut',
    title: 'Tanpa perlu rekrut',
    desc: 'Tim ahli IT on-demand. Bayar untuk hasil, bukan untuk kursi kosong di kantor.',
  },
  {
    stat: '100',
    suffix: '%',
    title: 'Siap tumbuh',
    desc: 'Arsitektur dirancang untuk skala — mulai dari satu toko sampai ratusan cabang.',
  },
  {
    stat: '24',
    suffix: '/7',
    title: 'Dukungan lokal',
    desc: 'Tim di Indonesia yang paham konteks bisnis Anda, bahasa Anda, dan jam kerja Anda.',
  },
];

export const process = [
  { step: '01', title: 'Konsultasi', desc: 'Kami dengarkan masalah dan tujuan bisnis Anda. Gratis, tanpa komitmen.' },
  { step: '02', title: 'Analisis', desc: 'Pemetaan kebutuhan, rekomendasi solusi, dan estimasi yang transparan.' },
  { step: '03', title: 'Pengembangan', desc: 'Dibangun bertahap dengan update rutin — Anda selalu tahu progresnya.' },
  { step: '04', title: 'Go-live', desc: 'Peluncuran terencana, pelatihan tim, dan migrasi data tanpa gangguan.' },
  { step: '05', title: 'Perawatan', desc: 'Pemantauan, backup, dan pengembangan lanjutan seiring bisnis bertumbuh.' },
];

export const faqs = [
  {
    q: 'Berapa biaya untuk membuat website atau aplikasi?',
    a: 'Biaya tergantung pada ruang lingkup dan kompleksitas. Setelah konsultasi awal (gratis), kami kirimkan estimasi transparan dengan rincian per fitur — tidak ada biaya tersembunyi.',
  },
  {
    q: 'Berapa lama waktu pengerjaannya?',
    a: 'Website profil perusahaan umumnya 2–4 minggu. Aplikasi mobile atau sistem bisnis terintegrasi 2–4 bulan, tergantung fitur. Untuk software siap pakai seperti Tokopilot POS, bisa aktif dalam hitungan hari.',
  },
  {
    q: 'Apakah ada garansi dan dukungan setelah selesai?',
    a: 'Ya. Setiap proyek dilengkapi masa garansi perbaikan bug. Setelah itu tersedia paket perawatan bulanan yang mencakup pemantauan, backup, update keamanan, dan dukungan teknis.',
  },
  {
    q: 'Bisnis saya masih kecil. Apakah Innaka cocok?',
    a: 'Sangat cocok. Banyak klien kami memulai dari satu toko atau tim kecil. Kami bantu memilih solusi yang sesuai anggaran hari ini namun tetap siap berkembang.',
  },
  {
    q: 'Apakah data bisnis saya aman?',
    a: 'Keamanan dan kepemilikan data adalah prioritas. Data sepenuhnya milik Anda, dengan backup otomatis dan praktik keamanan standar industri. Kami juga membantu migrasi data dari sistem lama tanpa kehilangan.',
  },
];
