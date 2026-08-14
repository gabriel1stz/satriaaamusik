import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, GalleryItem, ReviewItem, FacilityItem, BoxTypeItem } from '../types';
import { initialSiteContent } from '../data';

const STORAGE_KEY = 'satria_audio_site_content_v9';
const PIN_STORAGE_KEY = 'satria_audio_admin_pin_v3';
const DEFAULT_PIN = '0410';

interface SiteContextType {
  content: SiteContent;
  updateBusiness: (business: SiteContent['business']) => void;
  updateHero: (hero: SiteContent['hero']) => void;
  updateStudio: (studio: SiteContent['studio']) => void;
  updateBoxSpeaker: (boxSpeaker: SiteContent['boxSpeaker']) => void;
  updateAbout: (about: SiteContent['about']) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addReview: (item: Omit<ReviewItem, 'id'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  updateReviews: (reviews: ReviewItem[]) => void;
  resetToDefault: () => void;
  // Auth state
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (pin: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  changePin: (oldPin: string, newPin: string) => { success: boolean; message?: string };
  lockoutRemaining: number;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      // Check current or previous version storage keys
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('satria_audio_site_content_v8') ||
        localStorage.getItem('satria_audio_site_content_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteContent,
          ...parsed,
          business: {
            ...initialSiteContent.business,
            ...(parsed.business || {}),
            studioMapsUrl: initialSiteContent.business.studioMapsUrl,
            workshopMapsUrl: initialSiteContent.business.workshopMapsUrl,
          },
          reviews: Array.isArray(parsed.reviews) && parsed.reviews.length > 0
            ? parsed.reviews
            : initialSiteContent.reviews,
        };
      }
    } catch {
      // ignore
    }
    return initialSiteContent;
  });


  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [content]);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockoutUntil) {
      setLockoutRemaining(0);
      return;
    }
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      setLockoutRemaining(remaining);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Discreet Admin triggers: URL hash (#admin), query param (?admin=true), or hotkey (Ctrl+Shift+A / Alt+A)
  useEffect(() => {
    const checkUrlAdmin = () => {
      if (
        window.location.hash.toLowerCase() === '#admin' ||
        new URLSearchParams(window.location.search).get('admin') === 'true' ||
        new URLSearchParams(window.location.search).get('admin') === '1'
      ) {
        setIsAdminOpen(true);
      }
    };

    checkUrlAdmin();
    window.addEventListener('hashchange', checkUrlAdmin);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Cmd + Shift + A or Alt + A
      if (
        (e.key === 'A' || e.key === 'a') &&
        ((e.ctrlKey && e.shiftKey) || (e.metaKey && e.shiftKey) || e.altKey)
      ) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlAdmin);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getSavedPin = (): string => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  };

  const loginAdmin = (enteredPin: string) => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const rem = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return { success: false, message: `Terlalu banyak percobaan salah. Silakan tunggu ${rem} detik.` };
    }

    const currentPin = getSavedPin();
    if (enteredPin.trim() === currentPin) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      setLockoutUntil(null);
      return { success: true };
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 120 * 1000; // 2 minutes lockout
        setLockoutUntil(lockoutTime);
        return { success: false, message: 'PIN salah 5 kali. Akun terkunci sementara selama 2 menit demi keamanan.' };
      }
      return {
        success: false,
        message: `PIN salah. Sisa kesempatan sebelum terkunci: ${5 - newAttempts} kali. (Default PIN: 0410)`,
      };
    }
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
  };

  const changePin = (oldPin: string, newPin: string) => {
    const currentPin = getSavedPin();
    if (oldPin.trim() !== currentPin) {
      return { success: false, message: 'PIN lama yang Anda masukkan tidak sesuai.' };
    }
    if (!newPin || newPin.trim().length < 4) {
      return { success: false, message: 'PIN baru minimal harus 4 digit/karakter.' };
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
    return { success: true, message: 'PIN Admin berhasil diganti!' };
  };

  const updateBusiness = (business: SiteContent['business']) => {
    setContent((prev) => ({ ...prev, business }));
  };

  const updateHero = (hero: SiteContent['hero']) => {
    setContent((prev) => ({ ...prev, hero }));
  };

  const updateStudio = (studio: SiteContent['studio']) => {
    setContent((prev) => ({ ...prev, studio }));
  };

  const updateBoxSpeaker = (boxSpeaker: SiteContent['boxSpeaker']) => {
    setContent((prev) => ({ ...prev, boxSpeaker }));
  };

  const updateAbout = (about: SiteContent['about']) => {
    setContent((prev) => ({ ...prev, about }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'photo_' + Date.now(),
    };
    setContent((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery],
    }));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...updated } : g)),
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const addReview = (item: Omit<ReviewItem, 'id'>) => {
    const newReview: ReviewItem = {
      ...item,
      id: 'rev_' + Date.now(),
    };
    setContent((prev) => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
    }));
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setContent((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...updated } : r)),
    }));
  };

  const deleteReview = (id: string) => {
    setContent((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
  };

  const updateReviews = (reviews: ReviewItem[]) => {
    setContent((prev) => ({
      ...prev,
      reviews,
    }));
  };

  const resetToDefault = () => {
    setContent(initialSiteContent);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('satria_audio_site_content_v7');
  };

  return (
    <SiteContext.Provider
      value={{
        content,
        updateBusiness,
        updateHero,
        updateStudio,
        updateBoxSpeaker,
        updateAbout,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addReview,
        updateReview,
        deleteReview,
        updateReviews,
        resetToDefault,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        changePin,
        lockoutRemaining,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

