import { SiteContent } from './types';

export const initialSiteContent: SiteContent = {
  business: {
    brandName: 'Satria Musik & Box Speaker',
    tagline: 'Studio Latihan Musik & Pembuatan Box Speaker',
    ownerName: 'Pak Aris Satria',
    whatsappNumber: '0812-9877-2232',
    whatsappRaw: '6281298772232',
    studioAddress: 'Jl. Kw. Industri Tristate, Sukadamai, Kec. Cikupa, Kabupaten Tangerang, Banten 15710',
    workshopAddress: 'Satria Musik Studio, RT002 RW001, Jl. Kw. Industri Tristate, Sukadamai, Kec. Cikupa, Kabupaten Tangerang, Banten 15710',
    studioMapsUrl: 'https://maps.app.goo.gl/iTWBBwCgKTHQx1T4A',
    workshopMapsUrl: 'https://maps.app.goo.gl/2tVAD8F3V8tT8Zvf6',
    openHoursStudio: 'Setiap Hari • 09.00 - 24.00 WIB',
    openHoursWorkshop: 'Senin - Sabtu • 08.30 - 17.30 WIB',
  },
  hero: {
    badgeText: 'Usaha Studio Musik & Pembuatan Box Speaker — Pak Aris Satria',
    title: 'Studio Musik & Pembuatan Custom Box Speaker',
    description: 'Penyewaan studio latihan band ber-AC dengan alat lengkap, serta melayani pesanan pembuatan box speaker dari bahan kayu multiplek berkualitas untuk sound system dan rumahan.',
  },
  studio: {
    title: 'Studio Latihan Musik',
    description: 'Ruang latihan nyaman dengan pendingin ruangan (AC), peredam suara yang baik, dan alat musik lengkap yang selalu dirawat.',
    facilities: [
      {
        id: 'fac-1',
        title: 'Ruangan Ber-AC & Peredam',
        desc: 'Ruang latihan sejuk dan nyaman untuk latihan berjam-jam bersama teman band.',
      },
      {
        id: 'fac-2',
        title: 'Drum Set Terawat',
        desc: 'Set drum lengkap dengan pedal dan simbal siap pakai dengan suara yang mantap.',
      },
      {
        id: 'fac-3',
        title: 'Ampli Gitar & Bass',
        desc: 'Tersedia amplifier gitar dan bass dengan karakter suara yang jelas.',
      },
      {
        id: 'fac-4',
        title: 'Sound & Mic Vokal',
        desc: 'Mikrofon dan speaker monitor vokal yang jernih agar artikulasi vokal jelas terdengar.',
      },
    ],
  },
  boxSpeaker: {
    title: 'Pembuatan Box Speaker',
    description: 'Menerima pesanan pembuatan berbagai jenis box speaker yang dibuat langsung oleh Pak Aris Satria dengan bahan kayu multiplek pilihan dan pengerjaan yang rapi serta kokoh.',
    features: [
      {
        title: 'Bahan Multiplek Berkualitas',
        desc: 'Menggunakan bahan kayu multiplek / triplek yang tebal dan padat sehingga box kuat dan tidak mudah rusak.',
      },
      {
        title: 'Finishing Rapi & Tahan Cuaca',
        desc: 'Dilapisi cat tekstur pelindung yang tahan air dan tidak mudah lecet saat dibawa manggung.',
      },
      {
        title: 'Bisa Custom Model & Ukuran',
        desc: 'Bisa disesuaikan dengan ukuran driver speaker yang Anda miliki atau skema box favorit Anda.',
      },
    ],
    models: [
      {
        id: 'mod-1',
        name: 'Box Subwoofer (Planar / CLA / Miniscoop)',
        desc: 'Cocok untuk nada rendah (bass) yang padat dan bertenaga untuk sound lapangan maupun acara.',
      },
      {
        id: 'mod-2',
        name: 'Box Line Array & Middle',
        desc: 'Untuk karakter vokal dan nada menengah agar suara lontaran tembak jauh dan terdengar jelas.',
      },
      {
        id: 'mod-3',
        name: 'Box Monitor Panggung',
        desc: 'Model miring untuk monitor pemain di atas panggung agar musik terdengar nyaman saat tampil.',
      },
      {
        id: 'mod-4',
        name: 'Box Speaker Custom Lainnya',
        desc: 'Bisa membawa ukuran atau gambar skema sendiri sesuai kebutuhan dan kapasitas ruangan.',
      },
    ],
  },
  about: {
    title: 'Tentang Usaha Kami',
    ownerImageUrl: '/images/box-custom-3.jpg',
    p1: 'Usaha ini dirintis dan dikelola langsung oleh Pak Aris Satria. Berawal dari hobi bermusik dan pengalaman di bidang perkayuan serta sound system, kami ingin menghadirkan tempat latihan musik yang nyaman sekaligus bengkel pembuatan box speaker dengan pengerjaan yang jujur dan rapi.',
    p2: 'Bahan kayu yang digunakan dipilih dengan baik tanpa campuran serbuk kayu murahan. Pengerjaan lem dan sekrup dipastikan rapat agar tidak bocor suara dan tahan lama untuk pemakaian jangka panjang.',
  },
  gallery: [
    {
      id: 'box-real-1',
      title: 'Custom Box Monitor Slope Black',
      category: 'box_speaker',
      imageUrl: '/images/box-custom-1.jpg',
      caption: 'Box speaker monitor panggung dengan finishing cat tekstur hitam rapi & presisi.',
    },
    {
      id: 'box-real-2',
      title: 'Proses Rakit Box Multiplek',
      category: 'box_speaker',
      imageUrl: '/images/box-custom-2.jpg',
      caption: 'Bahan kayu multiplek berkualitas tebal dengan pengerjaan sekrup & lem rapat.',
    },
    {
      id: 'box-real-3',
      title: 'Flight Case / Hardcase Satria',
      category: 'box_speaker',
      imageUrl: '/images/box-custom-3.jpg',
      caption: 'Hardcase tempat penyimpanan sound & aksesoris Satria Entertainment.',
    },
    {
      id: 'box-real-4',
      title: 'Box Subwoofer Custom Dual Port',
      category: 'box_speaker',
      imageUrl: '/images/box-custom-4.jpg',
      caption: 'Box subwoofer lapangan / hajatan dengan karakter bass padat bertenaga.',
    },
    {
      id: 'box-real-5',
      title: 'Pair Box Monitor Middle Grid',
      category: 'box_speaker',
      imageUrl: '/images/box-custom-5.jpg',
      caption: 'Pasangan box speaker monitor lengkap dengan ram grill pelindung depan.',
    },
    {
      id: 'studio-real-1',
      title: 'Tampilan Lengkap Studio Musik',
      category: 'studio',
      imageUrl: '/images/studio-hero.jpg',
      caption: 'Ruang latihan ber-AC sejuk dengan set drum lengkap, ampli Marshall, dan gitar.',
    },
    {
      id: 'studio-real-2',
      title: 'Ampli Marshall & Sudut Gitar',
      category: 'studio',
      imageUrl: '/images/studio-real-1.jpg',
      caption: 'Amplifier Marshall bertenaga, mik vokal, dan gitar di dinding peredam kayu.',
    },
    {
      id: 'studio-real-3',
      title: 'Set Drum & Simbal Meinl HCS',
      category: 'studio',
      imageUrl: '/images/studio-real-2.jpg',
      caption: 'Simbal drum berkualitas Meinl HCS untuk latihan band mantap.',
    },
  ],
};
