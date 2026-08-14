import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const FloatingWhatsApp: React.FC = () => {
  const { content } = useSite();

  const waUrl = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya ingin tanya info seputar studio musik / pesanan box speaker...'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group"
        aria-label="Chat WhatsApp Pak Aris Satria"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold hidden sm:inline">
          WhatsApp Pak Aris
        </span>
      </a>
    </div>
  );
};
