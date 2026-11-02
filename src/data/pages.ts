/**
 * Konten halaman detail layanan & produk.
 *
 * Sumber fakta (innaka-blueprint): COM-MKT-03 (Ideal Customer Profile),
 * COM-MKT-05 (Paket Solusi), APP-MOD-02 (Katalog Aset/fitur modul).
 * Aturan: jangan menambah klaim (jumlah klien, angka hasil, harga) yang tidak
 * ada di dokumen sumber. Harga sengaja tidak ditampilkan (dokumen masih draft).
 */

export type Feature = { title: string; desc: string; soon?: boolean };
export type Faq = { q: string; a: string };

export type DetailPage = {
  kind: 'layanan' | 'produk';
  slug: string;
  /** Nama pendek untuk menu, breadcrumb, dan tautan */
  name: string;
  /** <title> — ≤ 60 karakter, memuat kata kunci */
  seoTitle: string;
  /** Meta description — ≤ 160 karakter */
  description: string;
  eyebrow: string;
  /** H1 — dipisah agar bagian `h1Italic` tampil miring beraksen */
  h1: string;
  h1Italic?: string;
  intro: string;
  /** Masalah yang sering dihadapi calon klien */
  problems: string[];
  featuresTitle: string;
  features: Feature[];
  /** Untuk siapa — sektor/kondisi bisnis */
  audience: string[];
  /** Yang Anda terima / cakupan pekerjaan */
  deliverables?: string[];
  faqs: Faq[];
  /** Pesan WhatsApp yang sudah terisi */
  ctaMessage: string;
  /** Slug halaman terkait (layanan/produk) */
  related: string[];
  /** schema.org serviceType / applicationSubCategory */
  schemaType: string;
};

export const servicePages: DetailPage[] = [
  {
    kind: 'layanan',
    slug: 'jasa-pembuatan-website',
    name: 'Pembuatan Website',
    seoTitle: 'Jasa Pembuatan Website Bekasi | Innaka Tech',
    description:
      'Jasa pembuatan website profesional di Bekasi: company profile, landing page, hingga toko online dengan payment gateway & ongkir otomatis. Konsultasi gratis.',
    eyebrow: 'Layanan · Website',
    h1: 'Jasa pembuatan website yang',
    h1Italic: 'membangun kepercayaan.',
    intro:
      'Website adalah kesan pertama bisnis Anda. Innaka Tech membangun website profesional — dari company profile dan landing page hingga toko online lengkap dengan pembayaran dan ongkir otomatis — yang cepat, rapi di semua perangkat, dan mudah ditemukan di Google.',
    problems: [
      'Website lama lambat, tampil berantakan di HP, dan tidak pernah diperbarui.',
      'Calon pelanggan sulit menemukan bisnis Anda di Google.',
      'Pesanan masih dicatat manual dari chat, ongkir dihitung satu per satu.',
      'Tidak tahu berapa pengunjung yang benar-benar menghubungi atau membeli.',
    ],
    featuresTitle: 'Yang kami bangun',
    features: [
      { title: 'Company profile & landing page', desc: 'Desain profesional yang menjelaskan bisnis Anda dengan jelas dan mengarahkan pengunjung untuk menghubungi Anda.' },
      { title: 'Toko online (e-commerce)', desc: 'Katalog produk dengan varian, keranjang belanja, checkout, serta harga bertingkat untuk pembeli grosir (B2B).' },
      { title: 'Payment gateway & ongkir otomatis', desc: 'Integrasi pembayaran online (mis. Midtrans/Xendit) dan perhitungan ongkos kirim kurir secara otomatis.' },
      { title: 'Notifikasi WhatsApp', desc: 'Status pesanan dan nomor resi dikirim otomatis ke pelanggan lewat WhatsApp Business Platform resmi.' },
      { title: 'Cepat & SEO-ready', desc: 'Struktur halaman, metadata, dan performa disiapkan agar mudah diindeks mesin pencari.' },
      { title: 'Responsif di semua perangkat', desc: 'Tampil rapi di HP, tablet, dan desktop — tempat sebagian besar pelanggan Anda membuka website.' },
    ],
    audience: ['UMKM & bisnis jasa yang butuh kehadiran online profesional', 'Brand lokal & produsen yang ingin berjualan langsung ke konsumen (D2C)', 'Bisnis grosir B2B yang ingin katalog & pemesanan online'],
    deliverables: ['Desain UI/UX responsif sesuai identitas bisnis Anda', 'Website di domain resmi bisnis Anda', 'Pengaturan dasar SEO (metadata, sitemap)', 'Pelatihan singkat cara mengelola konten'],
    faqs: [
      { q: 'Berapa lama pembuatan website?', a: 'Website company profile umumnya 2–4 minggu. Toko online dengan pembayaran dan ongkir otomatis lebih lama, tergantung jumlah fitur dan integrasi. Estimasi pasti kami berikan setelah konsultasi.' },
      { q: 'Apakah website bisa saya kelola sendiri?', a: 'Bisa. Kami siapkan cara mengubah konten yang paling sering diperbarui dan memberikan pelatihan singkat. Bila diperlukan, tersedia juga paket perawatan bulanan.' },
      { q: 'Apakah domain dan hosting disediakan?', a: 'Kami membantu pendaftaran dan pengaturan domain atas nama bisnis Anda, serta menyiapkan hosting yang sesuai kebutuhan.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin konsultasi pembuatan website untuk bisnis saya.',
    related: ['jasa-pembuatan-aplikasi-mobile', 'sistem-bisnis-terintegrasi', 'data-perawatan-sistem'],
    schemaType: 'Pembuatan website',
  },
  {
    kind: 'layanan',
    slug: 'jasa-pembuatan-aplikasi-mobile',
    name: 'Aplikasi Mobile',
    seoTitle: 'Jasa Pembuatan Aplikasi Android & iOS | Innaka Tech',
    description:
      'Jasa pembuatan aplikasi mobile Android & iOS di Bekasi — aplikasi pelanggan, aplikasi operasional tim, hingga PWA. Siap rilis di Play Store & App Store.',
    eyebrow: 'Layanan · Aplikasi Mobile',
    h1: 'Aplikasi mobile yang',
    h1Italic: 'siap bersaing.',
    intro:
      'Dari aplikasi untuk pelanggan hingga aplikasi kerja untuk tim lapangan dan gudang, Innaka Tech merancang dan membangun aplikasi mobile Android & iOS — termasuk Progressive Web App (PWA) yang bisa langsung dipakai dari browser tanpa instal.',
    problems: [
      'Pelanggan harus chat manual untuk memesan atau mengecek status.',
      'Tim lapangan atau gudang masih mencatat di kertas lalu menyalin ke komputer.',
      'Ide aplikasi sudah ada, tapi tidak tahu harus mulai dari mana dan berapa biayanya.',
    ],
    featuresTitle: 'Yang kami bangun',
    features: [
      { title: 'Aplikasi Android & iOS', desc: 'Aplikasi native/cross-platform yang disiapkan sesuai ketentuan Google Play Store dan Apple App Store.' },
      { title: 'Progressive Web App (PWA)', desc: 'Aplikasi yang dibuka dari browser, bisa dipasang di layar utama, cocok untuk tablet kasir dan HP staf.' },
      { title: 'Aplikasi operasional tim', desc: 'Pencatatan lapangan, scan barcode, dan alur persetujuan yang langsung tersinkron ke sistem pusat.' },
      { title: 'Terhubung ke sistem bisnis', desc: 'Data aplikasi menyatu dengan stok, penjualan, dan laporan — bukan aplikasi yang berdiri sendiri.' },
      { title: 'Notifikasi', desc: 'Pemberitahuan ke pengguna lewat push notification atau WhatsApp Business Platform resmi.' },
      { title: 'Desain berpusat pada pengguna', desc: 'Alur yang sederhana untuk pengguna awam — dirancang dan diuji sebelum dibangun penuh.' },
    ],
    audience: ['Bisnis yang ingin pelanggan memesan & memantau lewat aplikasi', 'Perusahaan dengan tim lapangan, sales, atau gudang', 'Founder dengan ide produk digital yang butuh tim teknis'],
    deliverables: ['Desain alur & tampilan (UI/UX) sebelum pengembangan', 'Aplikasi siap rilis beserta pendampingan publikasi ke toko aplikasi', 'Dashboard admin untuk mengelola data', 'Pelatihan pengguna'],
    faqs: [
      { q: 'Lebih baik aplikasi native atau PWA?', a: 'Tergantung kebutuhan. PWA lebih cepat dan hemat biaya untuk aplikasi internal tim; aplikasi di Play Store & App Store lebih cocok bila perlu fitur perangkat yang mendalam atau kehadiran di toko aplikasi. Kami bantu memilih saat konsultasi.' },
      { q: 'Berapa lama pembuatan aplikasi mobile?', a: 'Umumnya 2–4 bulan, tergantung jumlah fitur dan integrasi. Kami membangun bertahap sehingga versi awal bisa dicoba lebih dulu.' },
      { q: 'Apakah kode aplikasi menjadi milik saya?', a: 'Kepemilikan kode dan data diatur jelas di kontrak sejak awal. Data bisnis Anda sepenuhnya milik Anda.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin konsultasi pembuatan aplikasi mobile.',
    related: ['jasa-pembuatan-website', 'sistem-bisnis-terintegrasi', 'konsultasi-teknologi-ai'],
    schemaType: 'Pengembangan aplikasi mobile',
  },
  {
    kind: 'layanan',
    slug: 'sistem-bisnis-terintegrasi',
    name: 'Sistem Bisnis Terintegrasi',
    seoTitle: 'Sistem Bisnis Terintegrasi & Otomasi | Innaka Tech',
    description:
      'Satukan stok, penjualan, dan karyawan dalam satu sistem. Otomasi alur kerja dan integrasi payment gateway, marketplace, ekspedisi, serta WhatsApp.',
    eyebrow: 'Layanan · Sistem Bisnis',
    h1: 'Stok, penjualan, dan karyawan —',
    h1Italic: 'dalam satu tempat.',
    intro:
      'Saat bisnis tumbuh, data tersebar di spreadsheet, chat, dan aplikasi yang tidak saling bicara. Innaka Tech membangun sistem bisnis terintegrasi yang menyatukan operasional Anda, mengotomasi pekerjaan berulang, dan menghubungkannya ke layanan yang sudah Anda pakai.',
    problems: [
      'Data stok, penjualan, dan keuangan tercatat di tempat berbeda dan sering tidak cocok.',
      'Pekerjaan manual berulang — rekap, input ulang, kirim laporan — menyita waktu tim.',
      'Pesanan dari marketplace, WhatsApp, dan toko fisik harus dicatat satu per satu.',
      'Pemilik tidak bisa melihat kondisi bisnis secara real-time.',
    ],
    featuresTitle: 'Yang kami bangun',
    features: [
      { title: 'Sistem operasional terpadu', desc: 'Modul stok, penjualan, pembelian, dan karyawan dalam satu sistem dengan hak akses sesuai peran.' },
      { title: 'Otomasi alur kerja', desc: 'Rekap harian, pengingat, persetujuan, dan laporan berjalan otomatis — mengurangi pekerjaan manual.' },
      { title: 'Integrasi payment gateway', desc: 'Pembayaran online tercatat langsung ke sistem tanpa input ulang.' },
      { title: 'Integrasi marketplace & ekspedisi', desc: 'Pesanan dan stok tersinkron, ongkir dan resi dibuat otomatis.' },
      { title: 'Integrasi WhatsApp', desc: 'Notifikasi pesanan, tagihan, dan laporan dikirim lewat WhatsApp Business Platform resmi.' },
      { title: 'Aturan bisnis lewat konfigurasi', desc: 'Approval, diskon, metode stok, dan pajak diatur lewat konfigurasi — mudah diubah saat bisnis berkembang.' },
    ],
    audience: ['Distributor & grosir dengan banyak SKU dan gudang', 'Ritel dengan beberapa cabang', 'Bisnis jasa yang kewalahan mengelola tagihan & pekerjaan'],
    deliverables: ['Pemetaan alur kerja & kebutuhan sebelum pengembangan', 'Migrasi data dari spreadsheet/sistem lama', 'Pelatihan tim per peran', 'Pengukuran KPI sebelum & sesudah implementasi'],
    faqs: [
      { q: 'Apakah harus mengganti semua aplikasi yang sudah kami pakai?', a: 'Tidak selalu. Kami petakan dulu alat yang sudah berjalan baik, lalu menghubungkannya. Penggantian hanya disarankan bila memang menghambat.' },
      { q: 'Bagaimana dengan data lama kami?', a: 'Data dari spreadsheet atau sistem lama dimigrasikan dan diverifikasi bersama tim Anda sebelum sistem baru dipakai penuh.' },
      { q: 'Berapa lama implementasinya?', a: 'Tergantung jumlah modul dan integrasi; umumnya 2–4 bulan dengan rilis bertahap. Estimasi rinci diberikan setelah analisis kebutuhan.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin konsultasi sistem bisnis terintegrasi.',
    related: ['konsultasi-teknologi-ai', 'data-perawatan-sistem', 'wms-simple'],
    schemaType: 'Sistem bisnis terintegrasi dan otomasi alur kerja',
  },
  {
    kind: 'layanan',
    slug: 'konsultasi-teknologi-ai',
    name: 'Konsultasi Teknologi & AI',
    seoTitle: 'Konsultasi IT & Implementasi AI untuk Bisnis | Innaka',
    description:
      'Konsultasi teknologi & AI: strategi IT, audit kesehatan sistem, chatbot AI WhatsApp, otomasi dokumen, infrastruktur, dan tim ahli IT on-demand.',
    eyebrow: 'Layanan · Konsultasi & AI',
    h1: 'Keputusan teknologi yang tepat,',
    h1Italic: 'sejak awal.',
    intro:
      'Salah memilih teknologi bisa membuang biaya bertahun-tahun. Innaka Tech membantu Anda menyusun strategi, memeriksa sistem yang sudah ada, dan menerapkan AI secara praktis — seperti asisten WhatsApp yang menjawab pelanggan dan otomasi dokumen.',
    problems: [
      'Bingung memilih teknologi atau vendor, takut biaya membengkak.',
      'Sistem yang ada lambat, sering error, atau tidak jelas keamanannya.',
      'Admin CS kewalahan membalas chat pelanggan, terutama malam & akhir pekan.',
      'Butuh tenaga IT ahli, tapi belum siap merekrut tim penuh waktu.',
    ],
    featuresTitle: 'Yang kami kerjakan',
    features: [
      { title: 'Strategi teknologi', desc: 'Peta jalan teknologi sesuai tahap bisnis dan anggaran — apa yang dibangun, dibeli, atau ditunda.' },
      { title: 'Pemeriksaan kesehatan sistem', desc: 'Audit performa, keamanan, dan skalabilitas sistem yang sudah berjalan, beserta rekomendasi perbaikan.' },
      { title: 'Asisten AI WhatsApp', desc: 'AI yang menjawab pertanyaan pelanggan dari knowledge base bisnis Anda, dengan gaya bahasa brand dan pengalihan ke admin manusia saat dibutuhkan.' },
      { title: 'Otomasi dokumen dengan AI', desc: 'Ekstraksi dan pengolahan dokumen berulang — faktur, formulir, laporan — agar tim fokus ke pekerjaan bernilai.' },
      { title: 'Infrastruktur stabil', desc: 'Server, deployment, backup, dan pemantauan yang siap tumbuh bersama bisnis.' },
      { title: 'Tim ahli IT on-demand', desc: 'Akses ke engineer berpengalaman sesuai kebutuhan, tanpa proses rekrut dan biaya tetap tim internal.' },
    ],
    audience: ['Pemilik bisnis yang akan berinvestasi di sistem baru', 'Bisnis dengan volume chat pelanggan tinggi (klinik, properti, toko online)', 'Perusahaan tanpa tim IT internal'],
    deliverables: ['Laporan temuan & rekomendasi tertulis', 'Knowledge base bisnis untuk asisten AI', 'Integrasi WhatsApp Business Platform resmi (Cloud API)', 'Pengukuran KPI sebelum & sesudah'],
    faqs: [
      { q: 'Apakah chatbot AI memakai WhatsApp resmi?', a: 'Ya. Untuk klien produksi kami memakai WhatsApp Business Platform resmi (Cloud API). Biaya pesan dari Meta diteruskan sesuai pemakaian.' },
      { q: 'Bagaimana jika AI tidak bisa menjawab?', a: 'Percakapan dialihkan ke admin manusia (handover) agar pelanggan tetap terlayani dengan baik.' },
      { q: 'Apakah data percakapan aman?', a: 'Knowledge base hanya berisi informasi yang Anda setujui, dan akses data dibatasi sesuai kebutuhan. Detail pengelolaan data diatur dalam kontrak.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin konsultasi teknologi / implementasi AI.',
    related: ['sistem-bisnis-terintegrasi', 'data-perawatan-sistem', 'jasa-pembuatan-website'],
    schemaType: 'Konsultasi teknologi dan implementasi AI',
  },
  {
    kind: 'layanan',
    slug: 'data-perawatan-sistem',
    name: 'Data & Perawatan Sistem',
    seoTitle: 'Perawatan Sistem, Backup & Migrasi Data | Innaka Tech',
    description:
      'Backup otomatis, dashboard bisnis, migrasi sistem tanpa kehilangan data, serta perawatan & dukungan teknis agar aplikasi bisnis Anda selalu prima.',
    eyebrow: 'Layanan · Data & Perawatan',
    h1: 'Data aman, sistem',
    h1Italic: 'selalu prima.',
    intro:
      'Sistem yang baik perlu dijaga. Innaka Tech memastikan data bisnis Anda ter-backup, aplikasi tetap berjalan lancar, dan keputusan diambil berdasarkan data — sehingga Anda bisa fokus menjalankan bisnis.',
    problems: [
      'Belum ada backup rutin — satu kerusakan bisa menghapus data bertahun-tahun.',
      'Laporan bisnis disusun manual dan selalu terlambat.',
      'Ingin pindah sistem, tapi takut data hilang atau operasional terhenti.',
      'Vendor lama sulit dihubungi saat aplikasi bermasalah.',
    ],
    featuresTitle: 'Yang kami kerjakan',
    features: [
      { title: 'Backup otomatis', desc: 'Backup terjadwal beserta uji pemulihan (restore) berkala, agar backup benar-benar bisa dipakai saat dibutuhkan.' },
      { title: 'Dashboard bisnis', desc: 'Omzet, stok, dan kinerja dalam satu dashboard yang bisa dipantau dari HP.' },
      { title: 'Migrasi sistem', desc: 'Pemindahan data dari sistem lama dengan verifikasi bertahap, tanpa menghentikan operasional.' },
      { title: 'Perawatan & dukungan teknis', desc: 'Pemantauan, pembaruan keamanan, perbaikan bug, dan dukungan teknis dengan tingkat layanan yang jelas.' },
      { title: 'Hosting terkelola', desc: 'Tinggal pakai, tanpa pusing mengurus server.', soon: true },
    ],
    audience: ['Bisnis yang aplikasinya sudah berjalan dan perlu dirawat', 'Bisnis yang akan pindah dari sistem lama', 'Pemilik yang ingin laporan otomatis & real-time'],
    deliverables: ['Jadwal backup & bukti uji restore', 'Dashboard sesuai metrik bisnis Anda', 'Rencana migrasi & verifikasi data', 'Tingkat layanan (SLA) tertulis'],
    faqs: [
      { q: 'Apakah bisa merawat aplikasi yang bukan buatan Innaka?', a: 'Bisa, setelah kami melakukan pemeriksaan awal untuk memahami kondisi kode dan servernya. Hasil pemeriksaan menentukan cakupan perawatan.' },
      { q: 'Seberapa cepat masalah ditangani?', a: 'Waktu respons mengikuti tingkat layanan (SLA) yang disepakati di kontrak perawatan.' },
      { q: 'Kapan hosting terkelola tersedia?', a: 'Layanan hosting terkelola sedang disiapkan dan akan segera diumumkan. Sementara itu kami membantu menyiapkan hosting di penyedia pilihan Anda.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin konsultasi perawatan sistem / backup / migrasi data.',
    related: ['sistem-bisnis-terintegrasi', 'konsultasi-teknologi-ai', 'jasa-pembuatan-website'],
    schemaType: 'Perawatan sistem, backup, dan migrasi data',
  },
];

export const productPages: DetailPage[] = [
  {
    kind: 'produk',
    slug: 'tokopilot-pos',
    name: 'Tokopilot POS',
    seoTitle: 'Tokopilot POS — Aplikasi Kasir Multi-Cabang | Innaka',
    description:
      'Tokopilot POS: aplikasi kasir untuk toko & ritel multi-cabang. Kasir web/tablet, stok pusat real-time, struk Bluetooth, dan ringkasan omzet via WhatsApp.',
    eyebrow: 'Produk · Point of Sale',
    h1: 'Tokopilot POS:',
    h1Italic: 'kasir pintar untuk toko & multi-cabang.',
    intro:
      'Tokopilot POS adalah aplikasi kasir buatan Innaka untuk toko ritel dan bisnis dengan beberapa cabang. Transaksi cepat di kasir, stok pusat yang langsung terbarui, dan laporan omzet yang bisa dipantau pemilik dari mana saja.',
    problems: [
      'Pemilik tidak bisa memantau omzet dan transaksi semua cabang secara real-time dari HP.',
      'Pindah barang antar cabang sering hilang atau tidak tercatat rapi.',
      'Software kasir lama berbiaya per outlet, tapi tanpa stok gudang pusat.',
    ],
    featuresTitle: 'Fitur utama',
    features: [
      { title: 'Kasir cepat', desc: 'Pencarian barcode dan tombol produk favorit untuk transaksi yang cepat di jam ramai.' },
      { title: 'Web & tablet (PWA)', desc: 'Berjalan di PC, tablet Android, dan iPad lewat browser — tanpa perangkat khusus.' },
      { title: 'Multi-cabang & hak akses', desc: 'Kelola banyak outlet dengan peran berjenjang: Owner, Supervisor, dan Kasir.' },
      { title: 'Stok pusat real-time', desc: 'Stok tersinkron ke pusat setiap kali transaksi terjadi di kasir mana pun.' },
      { title: 'Struk & nota digital', desc: 'Cetak struk termal via Bluetooth/USB, atau kirim nota digital lewat WhatsApp.' },
      { title: 'Laporan & tutup kasir', desc: 'Laba kotor harian, rekap kas, penutupan shift, dan ringkasan omzet ke WhatsApp pemilik setiap malam.' },
    ],
    audience: ['Toko ritel fashion, gadget & aksesoris, pet shop, alat tulis/hobi', 'Bisnis dengan 2–5 cabang yang ingin stok terpusat', 'Pemilik yang ingin memantau omzet dari HP'],
    deliverables: ['Aplikasi kasir di subdomain bisnis Anda', 'Tampil dengan nama, logo, dan warna bisnis Anda', 'Impor data barang dari Excel/CSV', 'Pelatihan online untuk kasir & supervisor'],
    faqs: [
      { q: 'Perangkat apa yang dibutuhkan?', a: 'Tokopilot POS berjalan di browser, jadi bisa memakai PC, laptop, tablet Android, atau iPad yang sudah ada. Printer struk termal Bluetooth/USB bersifat opsional.' },
      { q: 'Apakah bisa memakai logo dan nama toko saya?', a: 'Bisa. Nama aplikasi, logo, warna, subdomain, dan template struk disesuaikan dengan merek bisnis Anda.' },
      { q: 'Apakah bisa dihubungkan dengan gudang?', a: 'Bisa. Tokopilot POS dapat dipadukan dengan WMS-Simple agar stok toko dan gudang pusat tersinkron.' },
      { q: 'Bagaimana dengan data barang yang sudah ada?', a: 'Data barang dapat diimpor dari file Excel/CSV, lalu kami verifikasi bersama tim Anda.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin minta demo Tokopilot POS.',
    related: ['wms-simple', 'sistem-bisnis-terintegrasi', 'data-perawatan-sistem'],
    schemaType: 'Point of Sale',
  },
  {
    kind: 'produk',
    slug: 'wms-simple',
    name: 'WMS-Simple',
    seoTitle: 'WMS-Simple — Aplikasi Manajemen Gudang | Innaka Tech',
    description:
      'WMS-Simple: aplikasi manajemen gudang berbasis scan barcode. Lokasi rak/bin/pallet, inbound-outbound, transfer antar gudang, dan stock opname cepat.',
    eyebrow: 'Produk · Warehouse Management',
    h1: 'WMS-Simple:',
    h1Italic: 'gudang rapi, stok akurat.',
    intro:
      'WMS-Simple adalah aplikasi manajemen gudang buatan Innaka untuk distributor dan grosir. Setiap barang masuk, berpindah, dan keluar tercatat lewat scan barcode — sehingga stok fisik dan pembukuan selalu cocok.',
    problems: [
      'Selisih stok fisik dan pembukuan selalu muncul saat stock opname.',
      'Staf salah ambil barang karena tidak ada sistem lokasi rak/bin dan scan barcode.',
      'Sulit memantau barang yang mendekati kedaluwarsa atau tidak bergerak (dead stock).',
    ],
    featuresTitle: 'Fitur utama',
    features: [
      { title: 'Inbound dengan scan barcode', desc: 'Penerimaan barang dicatat dengan scan, langsung menambah stok di lokasi yang benar.' },
      { title: 'Rak, bin & pallet (putaway)', desc: 'Setiap barang punya alamat penyimpanan yang jelas, memudahkan pencarian.' },
      { title: 'Picking & packing', desc: 'Pengambilan barang pesanan terarah ke lokasi yang tepat, mengurangi salah ambil.' },
      { title: 'Transfer antar gudang', desc: 'Mutasi stok antar gudang dengan alur persetujuan.' },
      { title: 'Kartu stok & audit trail', desc: 'Riwayat setiap pergerakan barang tercatat otomatis.' },
      { title: 'Stock opname cepat', desc: 'Hitung stok dengan scan dari HP (PWA), selisih terlihat seketika.' },
    ],
    audience: ['Distributor FMCG, bahan bangunan, suku cadang, farmasi/herbal, pakan ternak', 'Bisnis dengan 1–3 gudang dan 3–10 staf gudang', 'Grosir yang ingin stok akurat sebelum ekspansi'],
    deliverables: ['Aplikasi gudang di subdomain bisnis Anda', 'Tampil dengan nama, logo, dan warna bisnis Anda', 'Akun untuk staf gudang & kepala gudang', 'Impor master data barang dari Excel/CSV', 'Pelatihan online untuk staf operasional'],
    faqs: [
      { q: 'Apakah butuh alat scanner khusus?', a: 'Tidak wajib. WMS-Simple berjalan sebagai PWA di HP, sehingga kamera HP bisa dipakai untuk scan. Scanner barcode khusus dapat ditambahkan untuk volume tinggi.' },
      { q: 'Apakah mendukung lebih dari satu gudang?', a: 'Ya. WMS-Simple mendukung multi-lokasi beserta transfer stok antar gudang dengan persetujuan.' },
      { q: 'Bisa terhubung dengan kasir toko?', a: 'Bisa dipadukan dengan Tokopilot POS agar stok gudang pusat dan cabang tersinkron.' },
    ],
    ctaMessage: 'Halo Innaka, saya ingin minta demo WMS-Simple.',
    related: ['tokopilot-pos', 'sistem-bisnis-terintegrasi', 'data-perawatan-sistem'],
    schemaType: 'Warehouse Management System',
  },
];

export const allDetailPages = [...servicePages, ...productPages];

export const pageUrl = (p: Pick<DetailPage, 'kind' | 'slug'>) => `/${p.kind}/${p.slug}/`;

export function findPage(slug: string) {
  return allDetailPages.find((p) => p.slug === slug);
}
