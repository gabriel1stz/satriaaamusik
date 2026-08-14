import React from 'react';
import { Music, Speaker, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Hero: React.FC = () => {
  const { content } = useSite();

  const waLink = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya ingin tanya info studio musik / pesanan box speaker...'
  )}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-stone-950 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Simple, Non-AI clean subhead */}
            <div className="inline-block">
              <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-wide border-l-2 border-amber-500 pl-3">
                {content.hero.badgeText}
              </span>
            </div>

            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              {content.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              {content.hero.description}
            </p>

            {/* Quick Reality Highlights */}
            <div className="flex flex-wrap gap-4 pt-1 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-2 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Bahan Kayu Multiplek Pilihan</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <Music className="w-4 h-4 text-amber-400" />
                <span>Ruang Latihan Ber-AC & Dingin</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/90 px-3 py-1.5 rounded-lg border border-stone-800">
                <Speaker className="w-4 h-4 text-amber-400" />
                <span>Bisa Pesan Sesuai Ukuran</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => scrollTo('studio-section')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Lihat Studio Musik</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('box-section')}
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                <span>Pembuatan Box Speaker</span>
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Hubungi via WA</span>
              </a>
            </div>
          </div>

          {/* Right Showcase Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-900 aspect-[4/3] sm:aspect-square">
              <img
                src="/images/studio-hero.jpg"
                alt="Satria Musik Studio & Custom Box"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl">
                  {content.business.brandName}
                </h3>
                <p className="text-stone-300 text-xs mt-1">
                  Dikelola langsung oleh {content.business.ownerName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
