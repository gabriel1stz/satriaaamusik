import { SiteContent } from './types';

export const initialSiteContent: SiteContent = {
  business: {
    brandName: 'Satria Musik & Box Speaker',
    tagline: 'Studio Latihan Musik & Pembuatan Box Speaker',
    ownerName: 'Pak Aris Satria',
    whatsappNumber: '0812-9877-2232',
    whatsappRaw: '6281298772232',
    studioAddress: 'Jl. Melati Raya No. 45 (Satria Musik Studio)',
    workshopAddress: 'Workshop Satria Box Speaker, Sentra Audio & Kayu',
    studioMapsUrl: 'https://maps.google.com/?q=Satria+Musik+Studio',
    workshopMapsUrl: 'https://maps.google.com/?q=Satria+Custom+Box+Speaker',
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
    p1: 'Usaha ini dirintis dan dikelola langsung oleh Pak Aris Satria. Berawal dari hobi bermusik dan pengalaman di bidang perkayuan serta sound system, kami ingin menghadirkan tempat latihan musik yang nyaman sekaligus bengkel pembuatan box speaker dengan pengerjaan yang jujur dan rapi.',
    p2: 'Bahan kayu yang digunakan dipilih dengan baik tanpa campuran serbuk kayu murahan. Pengerjaan lem dan sekrup dipastikan rapat agar tidak bocor suara dan tahan lama untuk pemakaian jangka panjang.',
  },
  gallery: [
    {
      id: '1',
      title: 'Box Subwoofer 18 Inch',
      category: 'box_speaker',
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Box subwoofer dengan lapisan tekstur rapi dan rangka kokoh.',
    },
    {
      id: '2',
      title: 'Ruang Latihan Studio Musik',
      category: 'studio',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
      caption: 'Ruangan bersih dan ber-AC untuk latihan band santai.',
    },
    {
      id: '3',
      title: 'Box Speaker Line Array',
      category: 'box_speaker',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      caption: 'Box vokal dan middle untuk keperluan panggung.',
    },
    {
      id: '4',
      title: 'Set Drum Siap Pakai',
      category: 'studio',
      imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1000&q=80',
      caption: 'Peralatan musik selalu dicek berkala agar nyaman dimainkan.',
    },
    {
      id: '5',
      title: 'Pengerjaan di Bengkel',
      category: 'box_speaker',
      imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
      caption: 'Proses pemotongan kayu dan perakitan manual yang teliti.',
    },
    {
      id: '6',
      title: 'Box Monitor Panggung',
      category: 'box_speaker',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
      caption: 'Box monitor sudut miring untuk kejelasan suara di panggung.',
    },
  ],
};
