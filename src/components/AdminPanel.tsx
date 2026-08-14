import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Save,
  Trash2,
  Plus,
  Image as ImageIcon,
  Check,
  AlertCircle,
  RotateCcw,
  Building,
  Music,
  Box,
  Info,
  Shield,
  Upload,
  Star,
  Edit3,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { GalleryItem, ReviewItem } from '../types';

export const AdminPanel: React.FC = () => {
  const {
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
    resetToDefault,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    changePin,
    lockoutRemaining,
  } = useSite();

  const [activeTab, setActiveTab] = useState<
    'business' | 'hero_studio' | 'box' | 'gallery' | 'reviews' | 'security'
  >('business');

  // Login form state
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Change PIN state
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMsg, setPinMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Gallery Add Form State
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'studio' | 'box_speaker'>('box_speaker');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Reviews Admin State: Add Form
  const [newRevName, setNewRevName] = useState('');
  const [newRevRole, setNewRevRole] = useState('');
  const [newRevCategory, setNewRevCategory] = useState<'studio' | 'box_speaker'>('studio');
  const [newRevRating, setNewRevRating] = useState<number>(5);
  const [newRevDate, setNewRevDate] = useState('');
  const [newRevComment, setNewRevComment] = useState('');
  const [newRevVerified, setNewRevVerified] = useState(true);

  // Reviews Admin State: Edit Modal
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [editRevName, setEditRevName] = useState('');
  const [editRevRole, setEditRevRole] = useState('');
  const [editRevCategory, setEditRevCategory] = useState<'studio' | 'box_speaker'>('studio');
  const [editRevRating, setEditRevRating] = useState<number>(5);
  const [editRevDate, setEditRevDate] = useState('');
  const [editRevComment, setEditRevComment] = useState('');
  const [editRevVerified, setEditRevVerified] = useState(true);

  // Editable copies of state
  const [businessDraft, setBusinessDraft] = useState(content.business);
  const [heroDraft, setHeroDraft] = useState(content.hero);
  const [studioDraft, setStudioDraft] = useState(content.studio);
  const [boxDraft, setBoxDraft] = useState(content.boxSpeaker);
  const [aboutDraft, setAboutDraft] = useState(content.about);


  if (!isAdminOpen) return null;

  const showSuccessNotice = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(pinInput);
    if (res.success) {
      setPinInput('');
      setLoginError('');
      // Sync drafts
      setBusinessDraft(content.business);
      setHeroDraft(content.hero);
      setStudioDraft(content.studio);
      setBoxDraft(content.boxSpeaker);
      setAboutDraft(content.about);
    } else {
      setLoginError(res.message || 'PIN salah.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinMsg(null);
    const res = changePin(oldPin, newPin);
    if (res.success) {
      setPinMsg({ text: res.message || 'PIN berhasil diganti!', isError: false });
      setOldPin('');
      setNewPin('');
    } else {
      setPinMsg({ text: res.message || 'Gagal mengganti PIN.', isError: true });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('Ukuran file maksimal 3MB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPhotoUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) {
      alert('Mohon isi judul dan pilih foto terlebih dahulu.');
      return;
    }

    addGalleryItem({
      title: newPhotoTitle.trim(),
      caption: newPhotoCaption.trim(),
      category: newPhotoCategory,
      imageUrl: newPhotoUrl.trim(),
    });

    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
    showSuccessNotice('Foto baru berhasil ditambahkan ke galeri!');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevName.trim() || !newRevComment.trim()) {
      alert('Mohon isi nama customer dan ulasan terlebih dahulu.');
      return;
    }

    const dateStr =
      newRevDate.trim() ||
      new Intl.DateTimeFormat('id-ID', {
        month: 'long',
        year: 'numeric',
      }).format(new Date());

    addReview({
      customerName: newRevName.trim(),
      roleOrBand: newRevRole.trim() || (newRevCategory === 'studio' ? 'Musisi / Band' : 'Pelanggan Box'),
      category: newRevCategory,
      rating: Number(newRevRating) || 5,
      date: dateStr,
      comment: newRevComment.trim(),
      isVerified: newRevVerified,
    });

    setNewRevName('');
    setNewRevRole('');
    setNewRevComment('');
    setNewRevDate('');
    setNewRevRating(5);
    setNewRevVerified(true);
    showSuccessNotice('Ulasan pelanggan berhasil ditambahkan!');
  };

  const handleStartEditReview = (item: ReviewItem) => {
    setEditingReview(item);
    setEditRevName(item.customerName);
    setEditRevRole(item.roleOrBand || '');
    setEditRevCategory(item.category);
    setEditRevRating(item.rating || 5);
    setEditRevDate(item.date || '');
    setEditRevComment(item.comment);
    setEditRevVerified(item.isVerified !== false);
  };

  const handleSaveEditReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    if (!editRevName.trim() || !editRevComment.trim()) {
      alert('Nama dan ulasan tidak boleh kosong.');
      return;
    }

    updateReview(editingReview.id, {
      customerName: editRevName.trim(),
      roleOrBand: editRevRole.trim(),
      category: editRevCategory,
      rating: Number(editRevRating) || 5,
      date: editRevDate.trim() || editingReview.date,
      comment: editRevComment.trim(),
      isVerified: editRevVerified,
    });

    setEditingReview(null);
    showSuccessNotice('Ulasan pelanggan berhasil diperbarui!');
  };

  const handleDeleteReview = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus ulasan dari "${name}"?`)) {
      deleteReview(id);
      showSuccessNotice('Ulasan berhasil dihapus.');
    }
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness(businessDraft);
    showSuccessNotice('Informasi kontak & lokasi berhasil disimpan!');
  };

  const handleSaveHeroStudio = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroDraft);
    updateStudio(studioDraft);
    showSuccessNotice('Teks halaman depan & studio berhasil diperbarui!');
  };

  const handleSaveBox = (e: React.FormEvent) => {
    e.preventDefault();
    updateBoxSpeaker(boxDraft);
    showSuccessNotice('Informasi box speaker berhasil disimpan!');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutDraft);
    showSuccessNotice('Profil tentang kami berhasil diperbarui!');
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengembalikan seluruh isi website ke data default awal?')) {
      resetToDefault();
      setBusinessDraft(content.business);
      setHeroDraft(content.hero);
      setStudioDraft(content.studio);
      setBoxDraft(content.boxSpeaker);
      setAboutDraft(content.about);
      showSuccessNotice('Data website telah dikembalikan ke awal.');
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-stone-100 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Panel Admin Satria Audio</h2>
              <p className="text-xs text-stone-400">
                {isAuthenticated ? 'Kelola teks, kontak, galeri & lokasi' : 'Keamanan Akses Pemilik'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Notice */}
        {saveSuccessMsg && (
          <div className="bg-emerald-900/90 border-b border-emerald-700 px-6 py-2.5 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Body */}
        {!isAuthenticated ? (
          /* Lock Screen / PIN Form */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-xl text-white">Masukkan PIN Admin</h3>
              <p className="text-xs text-stone-400">
                Hanya pemilik yang dapat mengubah info website. PIN default adalah <strong className="text-amber-400">1234</strong>.
              </p>
            </div>

            {lockoutRemaining > 0 ? (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <p className="font-bold">Akses Terkunci Sementara</p>
                  <p>Silakan tunggu {lockoutRemaining} detik lagi sebelum mencoba kembali.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Masukkan PIN (cth: 1234)"
                    className="w-full px-4 py-3.5 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-center text-lg tracking-widest focus:outline-none focus:border-amber-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs hover:text-stone-200"
                  >
                    {showPin ? 'Sembunyikan' : 'Lihat'}
                  </button>
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{loginError}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors cursor-pointer"
                >
                  Buka Panel Admin
                </button>
              </form>
            )}

            <p className="text-[11px] text-stone-500">
              Dilengkapi perlindungan anti brute-force untuk keamanan website.
            </p>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-stone-950 border-r border-stone-800 p-4 space-y-1 flex md:flex-col overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('business')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'business'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>Kontak & Lokasi</span>
              </button>

              <button
                onClick={() => setActiveTab('hero_studio')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'hero_studio'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Music className="w-4 h-4 shrink-0" />
                <span>Studio Musik</span>
              </button>

              <button
                onClick={() => setActiveTab('box')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'box'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Box className="w-4 h-4 shrink-0" />
                <span>Box Speaker</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Galeri Foto</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Star className="w-4 h-4 shrink-0" />
                <span>Ulasan ({content.reviews?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left whitespace-nowrap cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <KeyRound className="w-4 h-4 shrink-0" />
                <span>Ganti PIN & Reset</span>
              </button>
            </div>

            {/* Content Tab Panels */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* TAB 1: BUSINESS & CONTACTS */}
              {activeTab === 'business' && (
                <form onSubmit={handleSaveBusiness} className="space-y-5 max-w-2xl">
                  <div className="border-b border-stone-800 pb-3">
                    <h3 className="font-bold text-base text-white">Info Usaha & Kontak WhatsApp</h3>
                    <p className="text-xs text-stone-400">
                      Ubah nomor telepon, nama pemilik, dan link rute Google Maps.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Nama Usaha / Brand
                      </label>
                      <input
                        type="text"
                        value={businessDraft.brandName}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, brandName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Nama Pemilik
                      </label>
                      <input
                        type="text"
                        value={businessDraft.ownerName}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, ownerName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Nomor Tampilan WhatsApp
                      </label>
                      <input
                        type="text"
                        value={businessDraft.whatsappNumber}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, whatsappNumber: e.target.value })
                        }
                        placeholder="0812-9877-2232"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Nomor Format WhatsApp Link (Cth: 6281298772232)
                      </label>
                      <input
                        type="text"
                        value={businessDraft.whatsappRaw}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, whatsappRaw: e.target.value.replace(/[^0-9]/g, '') })
                        }
                        placeholder="6281298772232"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Studio Address */}
                  <div className="space-y-3 pt-3 border-t border-stone-800">
                    <h4 className="text-xs font-bold text-amber-400">Lokasi 1: Studio Musik</h4>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Alamat Studio
                      </label>
                      <input
                        type="text"
                        value={businessDraft.studioAddress}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, studioAddress: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Link Google Maps Studio
                      </label>
                      <input
                        type="text"
                        value={businessDraft.studioMapsUrl}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, studioMapsUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Jam Buka Studio
                      </label>
                      <input
                        type="text"
                        value={businessDraft.openHoursStudio}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, openHoursStudio: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Workshop Address */}
                  <div className="space-y-3 pt-3 border-t border-stone-800">
                    <h4 className="text-xs font-bold text-amber-400">Lokasi 2: Bengkel Box Speaker</h4>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Alamat Bengkel Box Speaker
                      </label>
                      <input
                        type="text"
                        value={businessDraft.workshopAddress}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, workshopAddress: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Link Google Maps Bengkel
                      </label>
                      <input
                        type="text"
                        value={businessDraft.workshopMapsUrl}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, workshopMapsUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Jam Operasional Bengkel
                      </label>
                      <input
                        type="text"
                        value={businessDraft.openHoursWorkshop}
                        onChange={(e) =>
                          setBusinessDraft({ ...businessDraft, openHoursWorkshop: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Kontak</span>
                  </button>
                </form>
              )}

              {/* TAB 2: HERO & STUDIO */}
              {activeTab === 'hero_studio' && (
                <form onSubmit={handleSaveHeroStudio} className="space-y-6 max-w-2xl">
                  <div className="border-b border-stone-800 pb-3">
                    <h3 className="font-bold text-base text-white">Teks Utama & Studio Musik</h3>
                    <p className="text-xs text-stone-400">
                      Ubah judul utama dan daftar fasilitas studio musik.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-amber-400">Tampilan Utama (Hero)</h4>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Judul Besar Website
                      </label>
                      <input
                        type="text"
                        value={heroDraft.title}
                        onChange={(e) => setHeroDraft({ ...heroDraft, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Deskripsi Singkat Utama
                      </label>
                      <textarea
                        rows={3}
                        value={heroDraft.description}
                        onChange={(e) =>
                          setHeroDraft({ ...heroDraft, description: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Studio section details */}
                  <div className="space-y-3 pt-4 border-t border-stone-800">
                    <h4 className="text-xs font-bold text-amber-400">Bagian Studio Musik</h4>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Judul Bagian Studio
                      </label>
                      <input
                        type="text"
                        value={studioDraft.title}
                        onChange={(e) =>
                          setStudioDraft({ ...studioDraft, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Deskripsi Bagian Studio
                      </label>
                      <textarea
                        rows={3}
                        value={studioDraft.description}
                        onChange={(e) =>
                          setStudioDraft({ ...studioDraft, description: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="block text-xs text-stone-300 font-bold">
                        Daftar 4 Fasilitas Studio
                      </label>
                      {studioDraft.facilities.map((fac, idx) => (
                        <div
                          key={fac.id}
                          className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2"
                        >
                          <input
                            type="text"
                            value={fac.title}
                            onChange={(e) => {
                              const updated = [...studioDraft.facilities];
                              updated[idx].title = e.target.value;
                              setStudioDraft({ ...studioDraft, facilities: updated });
                            }}
                            placeholder="Nama Fasilitas"
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                          <input
                            type="text"
                            value={fac.desc}
                            onChange={(e) => {
                              const updated = [...studioDraft.facilities];
                              updated[idx].desc = e.target.value;
                              setStudioDraft({ ...studioDraft, facilities: updated });
                            }}
                            placeholder="Keterangan singkat"
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Teks Studio</span>
                  </button>
                </form>
              )}

              {/* TAB 3: BOX SPEAKER */}
              {activeTab === 'box' && (
                <form onSubmit={handleSaveBox} className="space-y-6 max-w-2xl">
                  <div className="border-b border-stone-800 pb-3">
                    <h3 className="font-bold text-base text-white">Bagian Custom Box Speaker</h3>
                    <p className="text-xs text-stone-400">
                      Ubah penjelasan bahan, keunggulan, dan model box yang dibuat.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Judul Bagian Box Speaker
                    </label>
                    <input
                      type="text"
                      value={boxDraft.title}
                      onChange={(e) => setBoxDraft({ ...boxDraft, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Deskripsi Bengkel Box
                    </label>
                    <textarea
                      rows={3}
                      value={boxDraft.description}
                      onChange={(e) =>
                        setBoxDraft({ ...boxDraft, description: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  {/* 3 Main Feature Cards */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs text-stone-300 font-bold">
                      3 Poin Keunggulan Box
                    </label>
                    {boxDraft.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2"
                      >
                        <input
                          type="text"
                          value={feat.title}
                          onChange={(e) => {
                            const updated = [...boxDraft.features];
                            updated[idx].title = e.target.value;
                            setBoxDraft({ ...boxDraft, features: updated });
                          }}
                          placeholder="Judul Poin"
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                        <input
                          type="text"
                          value={feat.desc}
                          onChange={(e) => {
                            const updated = [...boxDraft.features];
                            updated[idx].desc = e.target.value;
                            setBoxDraft({ ...boxDraft, features: updated });
                          }}
                          placeholder="Penjelasan singkat"
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Box Models list */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs text-stone-300 font-bold">
                      Daftar Model Box yang Sering Dipesan
                    </label>
                    {boxDraft.models.map((mod, idx) => (
                      <div
                        key={mod.id}
                        className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2"
                      >
                        <input
                          type="text"
                          value={mod.name}
                          onChange={(e) => {
                            const updated = [...boxDraft.models];
                            updated[idx].name = e.target.value;
                            setBoxDraft({ ...boxDraft, models: updated });
                          }}
                          placeholder="Nama Model Box"
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                        <input
                          type="text"
                          value={mod.desc}
                          onChange={(e) => {
                            const updated = [...boxDraft.models];
                            updated[idx].desc = e.target.value;
                            setBoxDraft({ ...boxDraft, models: updated });
                          }}
                          placeholder="Karakter suara / fungsi"
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Bagian Box Speaker</span>
                  </button>
                </form>
              )}

              {/* TAB 4: GALLERY MANAGER */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-800 pb-3">
                    <h3 className="font-bold text-base text-white">Kelola Foto Galeri</h3>
                    <p className="text-xs text-stone-400">
                      Tambah foto hasil karya box speaker atau suasana studio baru.
                    </p>
                  </div>

                  {/* Add New Photo Form */}
                  <form
                    onSubmit={handleAddPhoto}
                    className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-4"
                  >
                    <h4 className="font-bold text-xs text-amber-400 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Tambah Foto Baru</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Judul Foto
                        </label>
                        <input
                          type="text"
                          value={newPhotoTitle}
                          onChange={(e) => setNewPhotoTitle(e.target.value)}
                          placeholder="Cth: Box Subwoofer 18 Inch"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Kategori
                        </label>
                        <select
                          value={newPhotoCategory}
                          onChange={(e) =>
                            setNewPhotoCategory(e.target.value as 'studio' | 'box_speaker')
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="box_speaker">Custom Box Speaker</option>
                          <option value="studio">Studio Musik</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Keterangan Foto
                      </label>
                      <input
                        type="text"
                        value={newPhotoCaption}
                        onChange={(e) => setNewPhotoCaption(e.target.value)}
                        placeholder="Cth: Pesanan box model planar untuk rental sound"
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Upload File or URL */}
                    <div className="space-y-2">
                      <label className="block text-xs text-stone-300 font-medium">
                        Pilih File Foto atau Masukkan URL
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer border border-stone-600 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>{isUploading ? 'Memuat...' : 'Upload dari HP / Laptop'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>

                        <input
                          type="url"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="Atau tempel Link URL Foto (https://...)"
                          className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {newPhotoUrl && (
                        <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-stone-900 border border-stone-800">
                          <img
                            src={newPhotoUrl}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="text-[11px] text-stone-400 truncate">
                            Preview foto siap ditambahkan
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambahkan ke Galeri</span>
                    </button>
                  </form>

                  {/* Existing Photo List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-stone-300">
                      Daftar Foto Saat Ini ({content.gallery.length} foto)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {content.gallery.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-3 justify-between"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg shrink-0 bg-stone-900"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <p className="text-xs font-bold text-white truncate">{item.title}</p>
                            <p className="text-[11px] text-amber-400 capitalize">
                              {item.category === 'box_speaker' ? 'Box Speaker' : 'Studio Musik'}
                            </p>
                            <p className="text-[11px] text-stone-400 line-clamp-1">{item.caption}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Hapus foto "${item.title}"?`)) {
                                deleteGalleryItem(item.id);
                              }
                            }}
                            className="p-2 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-900 transition-colors"
                            title="Hapus foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS & RATINGS MANAGER */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="border-b border-stone-800 pb-3">
                    <h3 className="font-bold text-base text-white">Kelola Ulasan & Rating Bintang 5</h3>
                    <p className="text-xs text-stone-400">
                      Tambah testimoni baru, edit siapa saja yang memberi review, ubah rating bintang (1-5), atau ubah isi komentar.
                    </p>
                  </div>

                  {/* Add New Review Form */}
                  <form
                    onSubmit={handleAddReview}
                    className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-4"
                  >
                    <h4 className="font-bold text-xs text-amber-400 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Tambah Ulasan / Testimoni Baru</span>
                    </h4>

                    {/* Star Rating Picker */}
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-stone-200 block">Rating Bintang:</span>
                        <span className="text-[11px] text-amber-400 font-semibold">
                          {newRevRating} dari 5 Bintang Sempurna
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRevRating(star)}
                            className="p-1 cursor-pointer hover:scale-125 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newRevRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Nama Pengirim Review (Customer) <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={newRevName}
                          onChange={(e) => setNewRevName(e.target.value)}
                          placeholder="Cth: Rian Pratama"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Profesi / Band / Usaha
                        </label>
                        <input
                          type="text"
                          value={newRevRole}
                          onChange={(e) => setNewRevRole(e.target.value)}
                          placeholder="Cth: Gitaris Band / Rental Sound"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Kategori Layanan
                        </label>
                        <select
                          value={newRevCategory}
                          onChange={(e) =>
                            setNewRevCategory(e.target.value as 'studio' | 'box_speaker')
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="studio">Studio Musik</option>
                          <option value="box_speaker">Custom Box Speaker</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-stone-300 font-medium mb-1">
                          Tanggal Ulasan
                        </label>
                        <input
                          type="text"
                          value={newRevDate}
                          onChange={(e) => setNewRevDate(e.target.value)}
                          placeholder="Cth: Agustus 2024 (Kosongkan utk hari ini)"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        Isi Ulasan / Testimoni <span className="text-amber-400">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={newRevComment}
                        onChange={(e) => setNewRevComment(e.target.value)}
                        placeholder="Tulis ulasan customer seputar kenyamanan studio atau kualitas box speaker..."
                        className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="verified-check"
                        checked={newRevVerified}
                        onChange={(e) => setNewRevVerified(e.target.checked)}
                        className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                      />
                      <label htmlFor="verified-check" className="text-xs text-stone-300 cursor-pointer">
                        Tandai sebagai Pelanggan Terverifikasi (Badge Centang Biru/Hijau)
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambahkan Ulasan</span>
                    </button>
                  </form>

                  {/* List of Existing Reviews with Edit and Delete options */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs text-stone-300">
                      Daftar Ulasan Saat Ini ({content.reviews?.length || 0} ulasan)
                    </h4>

                    <div className="space-y-3">
                      {(content.reviews || []).map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-xs text-white">{item.customerName}</span>
                              {item.roleOrBand && (
                                <span className="text-[11px] text-stone-400">({item.roleOrBand})</span>
                              )}
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  item.category === 'studio'
                                    ? 'bg-amber-500/10 text-amber-400'
                                    : 'bg-cyan-500/10 text-cyan-400'
                                }`}
                              >
                                {item.category === 'studio' ? 'Studio' : 'Box Speaker'}
                              </span>
                              {item.isVerified !== false && (
                                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                  <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < item.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'fill-stone-800 text-stone-700'
                                  }`}
                                />
                              ))}
                              <span className="text-[10px] text-stone-400 ml-1.5">{item.date}</span>
                            </div>

                            <p className="text-xs text-stone-300 line-clamp-2 italic">
                              "{item.comment}"
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleStartEditReview(item)}
                              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Edit Pengirim & Ulasan"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteReview(item.id, item.customerName)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-stone-900 border border-transparent hover:border-red-900 transition-colors cursor-pointer"
                              title="Hapus Ulasan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: SECURITY & RESET */}
              {activeTab === 'security' && (
                <div className="space-y-8 max-w-xl">
                  {/* Change PIN Form */}
                  <form onSubmit={handleChangePin} className="space-y-4">
                    <div className="border-b border-stone-800 pb-3">
                      <h3 className="font-bold text-base text-white">Ganti PIN Keamanan Admin</h3>
                      <p className="text-xs text-stone-400">
                        Pastikan PIN mudah diingat oleh pemilik dan tidak diketahui pihak lain.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        PIN Lama Saat Ini
                      </label>
                      <input
                        type="password"
                        value={oldPin}
                        onChange={(e) => setOldPin(e.target.value)}
                        placeholder="PIN lama (default: 0410)"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1">
                        PIN Baru (Minimal 4 digit)
                      </label>
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="Masukkan PIN baru"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    {pinMsg && (
                      <p
                        className={`text-xs flex items-center gap-1.5 ${
                          pinMsg.isError ? 'text-red-400' : 'text-emerald-400'
                        }`}
                      >
                        {pinMsg.isError ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        <span>{pinMsg.text}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Simpan PIN Baru</span>
                    </button>
                  </form>

                  {/* Reset Website Data */}
                  <div className="pt-6 border-t border-stone-800 space-y-3">
                    <h4 className="font-bold text-xs text-red-400">Reset Data Website</h4>
                    <p className="text-xs text-stone-400">
                      Kembalikan seluruh teks, kontak, galeri foto, dan ulasan ke pengaturan default awal.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Kembalikan ke Data Default</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Review Modal Dialog */}
      {editingReview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl w-full max-w-lg shadow-2xl text-stone-100 overflow-hidden my-auto animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Edit Ulasan Pelanggan</h3>
                  <p className="text-[11px] text-stone-400">
                    Ubah nama pengirim, rating bintang, dan isi komentar
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEditReview} className="p-6 space-y-4">
              {/* Star Rating Picker */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-1.5">
                <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Rating Bintang: {editRevRating} / 5
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setEditRevRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= editRevRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Nama Pengirim (Customer) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editRevName}
                    onChange={(e) => setEditRevName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Profesi / Band / Usaha
                  </label>
                  <input
                    type="text"
                    value={editRevRole}
                    onChange={(e) => setEditRevRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Kategori Layanan
                  </label>
                  <select
                    value={editRevCategory}
                    onChange={(e) =>
                      setEditRevCategory(e.target.value as 'studio' | 'box_speaker')
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="studio">Studio Musik</option>
                    <option value="box_speaker">Custom Box Speaker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Tanggal Tampilan
                  </label>
                  <input
                    type="text"
                    value={editRevDate}
                    onChange={(e) => setEditRevDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 font-medium mb-1">
                  Isi Ulasan / Testimoni <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={editRevComment}
                  onChange={(e) => setEditRevComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-verified-check"
                  checked={editRevVerified}
                  onChange={(e) => setEditRevVerified(e.target.checked)}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="edit-verified-check" className="text-xs text-stone-300 cursor-pointer">
                  Tandai sebagai Pelanggan Terverifikasi
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
