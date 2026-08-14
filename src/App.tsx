import React from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StudioSection } from './components/StudioSection';
import { BoxSpeakerSection } from './components/BoxSpeakerSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Landing Page Content */}
        <main className="flex-1">
          {/* 1. Hero Showcase */}
          <Hero />

          {/* 2. Studio Musik Section */}
          <StudioSection />

          {/* 3. Pembuatan Box Speaker Section */}
          <BoxSpeakerSection />

          {/* 4. Galeri Foto */}
          <GallerySection />

          {/* 5. Tentang Usaha & Profil Pemilik */}
          <AboutSection />

          {/* 6. Lokasi (2 Alamat & Maps) serta Kontak */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Action */}
        <FloatingWhatsApp />

        {/* Protected Owner Admin Panel */}
        <AdminPanel />
      </div>
    </SiteProvider>
  );
}
