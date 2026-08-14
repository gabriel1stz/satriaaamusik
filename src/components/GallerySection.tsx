import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { content } = useSite();
  const [activeTab, setActiveTab] = useState<'all' | 'studio' | 'box_speaker'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeTab === 'all'
      ? content.gallery
      : content.gallery.filter((item) => item.category === activeTab);

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
            Foto Dokumentasi
          </span>
          <h2 className="font-bold text-2xl sm:text-4xl text-white tracking-tight">
            Galeri Studio & Hasil Box Speaker
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Foto suasana ruang latihan studio dan beberapa hasil pembuatan box speaker oleh Pak Aris Satria.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-stone-950 border border-stone-800 gap-1 mt-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Semua ({content.gallery.length})
            </button>
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Studio Musik
            </button>
            <button
              onClick={() => setActiveTab('box_speaker')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'box_speaker'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Box Speaker
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 hover:border-stone-700 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-stone-900/90 text-white shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-sm p-4 animate-in fade-in duration-150"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="max-w-3xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors z-10"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 text-white space-y-1 bg-stone-950 border-t border-stone-800">
                <h3 className="font-bold text-base sm:text-lg">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
