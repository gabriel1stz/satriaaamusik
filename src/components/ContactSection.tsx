import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink, Music, Box, Compass } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ContactSection: React.FC = () => {
  const { content } = useSite();

  const waUrl = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya ingin tanya info lokasi & layanan studio / pembuatan box speaker...'
  )}`;

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Direct WhatsApp Banner */}
        <div className="p-6 sm:p-10 rounded-2xl bg-stone-950 border border-stone-800 text-center max-w-3xl mx-auto space-y-5 shadow-lg">
          <div className="space-y-1.5">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
              Kontak WhatsApp Langsung
            </span>
            <h2 className="font-extrabold text-xl sm:text-3xl text-white tracking-tight">
              Mau Latihan Musik atau Mau Pesan Box Speaker?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
              Langsung kirim pesan ke WhatsApp Pak Aris Satria untuk tanya jadwal studio, tanya harga, atau konsultasi ukuran box speaker.
            </p>
          </div>

          <div className="pt-1 flex justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Chat WhatsApp: {content.business.whatsappNumber}</span>
            </a>
          </div>
        </div>

        {/* 2 Locations Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="font-bold text-xl sm:text-2xl text-white">
              Lokasi Studio & Bengkel
            </h3>
            <p className="text-xs text-stone-400">
              Berikut alamat lokasi fisik studio musik dan bengkel pembuatan box speaker kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Location 1: Studio Musik */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Music className="w-3.5 h-3.5" />
                    <span>LOKASI STUDIO MUSIK</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">Buka Setiap Hari</span>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-white">
                    {content.business.brandName} Studio
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{content.business.studioAddress}</span>
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Jam Buka: {content.business.openHoursStudio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>WhatsApp: {content.business.whatsappNumber}</span>
                  </div>
                </div>
              </div>

              <a
                href={content.business.studioMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Location 2: Workshop Box Speaker */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between space-y-5">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Box className="w-3.5 h-3.5" />
                    <span>LOKASI BENGKEL BOX SPEAKER</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-medium">Workshop Aktif</span>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-white">
                    Bengkel Box by {content.business.ownerName}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{content.business.workshopAddress}</span>
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Jam Kerja: {content.business.openHoursWorkshop}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>WhatsApp: {content.business.whatsappNumber}</span>
                  </div>
                </div>
              </div>

              <a
                href={content.business.workshopMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
