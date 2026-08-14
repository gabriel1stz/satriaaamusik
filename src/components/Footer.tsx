import React, { useRef } from 'react';
import { Speaker } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Footer: React.FC = () => {
  const { content, setIsAdminOpen } = useSite();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretTrigger = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      setIsAdminOpen(true);
      clickCountRef.current = 0;
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1200);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-10 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Speaker className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">
                {content.business.brandName}
              </span>
              <span className="text-[11px] text-stone-400">
                {content.business.tagline} • {content.business.ownerName}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-stone-300">
            <a href="#studio-section" className="hover:text-amber-400 transition-colors">
              Studio Musik
            </a>
            <a href="#box-section" className="hover:text-amber-400 transition-colors">
              Box Speaker
            </a>
            <a href="#gallery-section" className="hover:text-amber-400 transition-colors">
              Galeri
            </a>
            <a href="#review-section" className="hover:text-amber-400 transition-colors text-amber-400/90">
              Ulasan Pelanggan
            </a>
            <a href="#about-section" className="hover:text-amber-400 transition-colors">
              Tentang Kami
            </a>
            <a href="#contact-section" className="hover:text-amber-400 transition-colors">
              Lokasi & Kontak
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500">
          <div className="flex items-center gap-3">
            <p 
              onClick={handleSecretTrigger}
              className="cursor-default select-none"
              title=""
            >
              © {new Date().getFullYear()} {content.business.brandName}. Semua hak cipta dilindungi.
            </p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-400 text-[10px] transition-colors border border-stone-800"
              title="Buka Panel Admin / Pemilik"
            >
              <span>Panel Pemilik</span>
            </button>
          </div>
          <div>
            <span>
              WhatsApp: <strong className="text-stone-300">{content.business.whatsappNumber}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

