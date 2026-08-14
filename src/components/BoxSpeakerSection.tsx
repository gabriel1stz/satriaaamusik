import React from 'react';
import { Layers, ShieldCheck, Hammer, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const BoxSpeakerSection: React.FC = () => {
  const { content } = useSite();

  const waBoxLink = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya mau konsultasi pembuatan box speaker custom...'
  )}`;

  const featureIcons = [Layers, ShieldCheck, Hammer];

  return (
    <section id="box-section" className="py-16 sm:py-20 bg-stone-950 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
            Bengkel & Custom Audio
          </span>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {content.boxSpeaker.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            {content.boxSpeaker.description}
          </p>
        </div>

        {/* 3 Core Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.boxSpeaker.features.map((feat, idx) => {
            const IconComp = featureIcons[idx % featureIcons.length];
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5 hover:border-stone-700 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Model Showcase List & WA CTA Box */}
        <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-white">
              Model Box yang Sering Dikerjakan
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Melayani pesanan box mentahan maupun box yang sudah selesai dicat tekstur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {content.boxSpeaker.models.map((box, idx) => (
              <div
                key={box.id || idx}
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1"
              >
                <h4 className="text-amber-400 font-bold text-xs sm:text-sm">
                  {box.name}
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {box.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-sm sm:text-base text-white">
                Punya Ukuran atau Skema Sendiri?
              </h4>
              <p className="text-xs text-stone-400">
                Kirim foto contoh atau skema box ke WhatsApp Pak Aris Satria untuk konsultasi harga.
              </p>
            </div>

            <a
              href={waBoxLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Tanya / Pesan Box via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
