import React from 'react';
import { Music, Wind, Volume2, Mic, Clock, MapPin, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const StudioSection: React.FC = () => {
  const { content } = useSite();

  const waStudioLink = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya mau tanya jadwal kosong untuk sewa studio latihan band...'
  )}`;

  const getIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return Wind;
      case 1:
        return Music;
      case 2:
        return Volume2;
      default:
        return Mic;
    }
  };

  return (
    <section id="studio-section" className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-800 aspect-[4/3] sm:aspect-square bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1000&q=80"
                alt="Fasilitas Studio Satria Musik"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-bold text-xl text-white">
                  Studio Latihan Musik
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Buka setiap hari • {content.business.openHoursStudio}
                </p>
              </div>
            </div>
          </div>

          {/* Details & Features */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
                Fasilitas & Ruangan
              </span>
              <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
                {content.studio.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {content.studio.description}
              </p>
            </div>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {content.studio.facilities.map((item, idx) => {
                const IconComp = getIcon(idx);
                return (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5 hover:border-stone-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-rose-500 text-sm">
                        {item.title}
                      </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Info & Direct WA */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{content.business.openHoursStudio}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{content.business.studioAddress}</span>
                </div>
              </div>

              <a
                href={waStudioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya Jadwal & Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
