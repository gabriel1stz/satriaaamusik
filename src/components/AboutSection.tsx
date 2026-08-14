import React from 'react';
import { Music, ShieldCheck, HeartHandshake, Phone } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const AboutSection: React.FC = () => {
  const { content } = useSite();

  const waLink = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya ingin konsultasi atau silaturahmi seputar studio / box speaker...'
  )}`;

  return (
    <section id="about-section" className="py-16 sm:py-20 bg-stone-950 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Profile */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-800 aspect-[4/5] bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
                alt="Workshop Pak Aris Satria"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
                <h3 className="font-extrabold text-2xl text-white">
                  {content.business.ownerName}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {content.business.brandName}
                </p>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
                Tentang Pemilik
              </span>
              <h2 className="font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                {content.about.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {content.about.p1}
            </p>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {content.about.p2}
            </p>

            {/* 3 Grounded Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Bahan Berkualitas
                </div>
                <p className="text-xs text-stone-400">
                  Multiplek pilihan yang padat dan kuat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Music className="w-4 h-4" />
                  Studio Ber-AC
                </div>
                <p className="text-xs text-stone-400">
                  Tempat latihan sejuk dan alat siap pakai.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  Pelayanan Ramah
                </div>
                <p className="text-xs text-stone-400">
                  Bebas diskusi dan konsultasi kebutuhan audio.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi Pak Aris Satria Langsung</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
