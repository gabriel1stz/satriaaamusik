import React, { useState } from 'react';
import { Speaker, Phone, Menu, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSite();

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const waLink = `https://wa.me/${content.business.whatsappRaw}?text=${encodeURIComponent(
    'Halo Pak Aris Satria, saya ingin tanya seputar studio musik / pembuatan box speaker...'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold group-hover:bg-amber-400 transition-colors">
              <Speaker className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight block text-white leading-tight">
                {content.business.brandName}
              </span>
              <span className="text-xs text-stone-400 font-medium block">
                {content.business.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            <button
              onClick={() => scrollTo('studio-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Studio Musik
            </button>
            <button
              onClick={() => scrollTo('box-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Box Speaker
            </button>
            <button
              onClick={() => scrollTo('gallery-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Galeri
            </button>
            <button
              onClick={() => scrollTo('review-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 text-amber-400/90 hover:text-amber-400"
            >
              <span>Ulasan ★ 5.0</span>
            </button>
            <button
              onClick={() => scrollTo('about-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollTo('contact-section')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Lokasi & Kontak
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: {content.business.whatsappNumber}</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => scrollTo('studio-section')}
            className="block w-full text-left py-2 text-stone-200 hover:text-amber-400 font-medium text-sm"
          >
            Studio Musik
          </button>
          <button
            onClick={() => scrollTo('box-section')}
            className="block w-full text-left py-2 text-stone-200 hover:text-amber-400 font-medium text-sm"
          >
            Pembuatan Box Speaker
          </button>
          <button
            onClick={() => scrollTo('gallery-section')}
            className="block w-full text-left py-2 text-stone-200 hover:text-amber-400 font-medium text-sm"
          >
            Galeri Foto
          </button>
          <button
            onClick={() => scrollTo('review-section')}
            className="block w-full text-left py-2 text-amber-400 font-bold text-sm"
          >
            Ulasan Pelanggan ★ 5.0
          </button>
          <button
            onClick={() => scrollTo('about-section')}
            className="block w-full text-left py-2 text-stone-200 hover:text-amber-400 font-medium text-sm"
          >
            Tentang Usaha Kami
          </button>
          <button
            onClick={() => scrollTo('contact-section')}
            className="block w-full text-left py-2 text-stone-200 hover:text-amber-400 font-medium text-sm"
          >
            Lokasi & Kontak
          </button>

          <div className="pt-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Chat WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
