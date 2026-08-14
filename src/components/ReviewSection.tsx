import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  PlusCircle,
  X,
  MessageSquare,
  Sparkles,
  Music,
  Box,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ReviewItem } from '../types';

export const ReviewSection: React.FC = () => {
  const { content, addReview, setIsAdminOpen } = useSite();
  const [filterCategory, setFilterCategory] = useState<'all' | 'studio' | 'box_speaker'>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  // Form State for User Review Submission
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('');
  const [reviewCategory, setReviewCategory] = useState<'studio' | 'box_speaker'>('studio');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  const reviews = content.reviews || [];

  // Filter reviews
  const filteredReviews = reviews.filter((rev) => {
    if (filterCategory === 'all') return true;
    return rev.category === filterCategory;
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
      : '5.0';
  const count5Star = reviews.filter((r) => r.rating === 5).length;
  const countStudio = reviews.filter((r) => r.category === 'studio').length;
  const countBox = reviews.filter((r) => r.category === 'box_speaker').length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      alert('Mohon lengkapi nama dan isi ulasan Anda.');
      return;
    }

    const currentDate = new Intl.DateTimeFormat('id-ID', {
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    addReview({
      customerName: reviewerName.trim(),
      roleOrBand: reviewerRole.trim() || (reviewCategory === 'studio' ? 'Musisi / Band' : 'Pelanggan Box Speaker'),
      category: reviewCategory,
      rating: reviewRating,
      date: currentDate,
      comment: reviewComment.trim(),
      isVerified: true,
    });

    // Reset Form
    setReviewerName('');
    setReviewerRole('');
    setReviewComment('');
    setReviewRating(5);
    setIsModalOpen(false);

    // Toast
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4500);
  };

  // Helper for avatar colors
  const getAvatarBg = (name: string) => {
    const colors = [
      'bg-amber-500 text-stone-950',
      'bg-orange-500 text-white',
      'bg-emerald-500 text-stone-950',
      'bg-blue-500 text-white',
      'bg-purple-500 text-white',
      'bg-rose-500 text-white',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % colors.length;
    return colors[idx];
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'C').toUpperCase();
  };

  return (
    <section id="review-section" className="py-16 sm:py-24 bg-stone-900/60 text-white border-b border-stone-800 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ulasan & Kepuasan Pelanggan</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apa Kata Musisi & Pemesan Box Speaker?
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Pengalaman jujur dari teman-teman band yang rutin latihan di studio ber-AC serta para pecinta audio sound system yang memesan box speaker custom ke Pak Aris Satria.
          </p>
        </div>

        {/* Highlight Stats Bar & Give Review Button */}
        <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Overall Rating Card */}
            <div className="md:col-span-4 flex items-center gap-5 border-b md:border-b-0 md:border-r border-stone-800 pb-6 md:pb-0 md:pr-6">
              <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-black text-amber-400 leading-none">{avgRating}</span>
                <span className="text-[10px] text-amber-400/80 font-bold mt-0.5">dari 5.0</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-white">Bintang 5 & Sangat Puas</p>
                <p className="text-[11px] text-stone-400">
                  Berdasarkan {totalReviews} ulasan terverifikasi
                </p>
              </div>
            </div>

            {/* Middle: Highlights / Mini Stats */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 text-center sm:text-left">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 space-y-0.5">
                <div className="text-amber-400 font-bold text-lg leading-tight">{count5Star} Ulasan</div>
                <div className="text-[11px] text-stone-400 font-medium">Bintang 5 Sempurna</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 space-y-0.5">
                <div className="text-emerald-400 font-bold text-lg leading-tight">100%</div>
                <div className="text-[11px] text-stone-400 font-medium">Rekomendasi Positif</div>
              </div>
            </div>

            {/* Right: CTA Button to Give Rating */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-center items-stretch md:items-end gap-3">
              <button
                onClick={() => {
                  setReviewRating(5);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer group"
              >
                <Star className="w-5 h-5 fill-stone-950 group-hover:rotate-12 transition-transform" />
                <span>★ Beri Bintang 5 Sekarang!</span>
              </button>
              
              {/* Fast Star Rating Clicker */}
              <div className="flex items-center justify-center md:justify-end gap-1 text-amber-400">
                <span className="text-[11px] text-stone-400 mr-1.5 font-medium">Klik bintang:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setReviewRating(star);
                      setIsModalOpen(true);
                    }}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    title={`Beri rating ${star} bintang`}
                  >
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              Semua Ulasan ({totalReviews})
            </button>
            <button
              onClick={() => setFilterCategory('studio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                filterCategory === 'studio'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Studio Musik ({countStudio})</span>
            </button>
            <button
              onClick={() => setFilterCategory('box_speaker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                filterCategory === 'box_speaker'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Box Speaker ({countBox})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Semua ulasan asli & transparan</span>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] font-semibold text-stone-400 hover:text-amber-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 hover:border-amber-500/30 transition-all cursor-pointer"
              title="Buka panel admin untuk melihat, menyunting, dan menghapus ulasan"
            >
              <span>⚙️ Panel Admin Ulasan</span>
            </button>
          </div>
        </div>


        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <MessageSquare className="w-8 h-8 text-stone-500 mx-auto" />
            <p className="text-stone-400 text-sm">Belum ada ulasan untuk kategori ini.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-amber-400 font-bold hover:underline"
            >
              Jadilah yang pertama memberikan ulasan!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 relative group shadow-md hover:shadow-xl hover:-translate-y-1 duration-200"
              >
                {/* Subtle Quote Watermark */}
                <Quote className="absolute top-5 right-5 w-8 h-8 text-stone-800/40 pointer-events-none group-hover:text-amber-500/10 transition-colors" />

                {/* Top Card Info */}
                <div className="space-y-3">
                  {/* Rating Stars & Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-800 text-stone-700'
                          }`}
                        />
                      ))}
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        item.category === 'studio'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >
                      {item.category === 'studio' ? 'Studio Musik' : 'Box Speaker'}
                    </span>
                  </div>

                  {/* Comment Quote */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{item.comment}"
                  </p>
                </div>

                {/* Customer Profile Bottom */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${getAvatarBg(
                        item.customerName
                      )}`}
                    >
                      {getInitials(item.customerName)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white truncate">
                          {item.customerName}
                        </span>
                        {item.isVerified !== false && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Pelanggan Terverifikasi" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 truncate">
                        {item.roleOrBand || (item.category === 'studio' ? 'Musisi Studio' : 'Pemesan Box')}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 shrink-0 font-medium">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Success Toast */}
      {submittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-600 text-emerald-200 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-xs text-white">Ulasan Berhasil Dikirim!</p>
            <p className="text-[11px] text-emerald-300">
              Terima kasih atas ulasan bintang 5 Anda untuk Satria Musik.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Modal: Beri Ulasan Bintang 5 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl text-stone-100 overflow-hidden my-auto animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-stone-950" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Tulis Ulasan & Beri Bintang</h3>
                  <p className="text-xs text-stone-400">
                    Bantu kami dan musisi lain dengan pengalaman Anda
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              {/* Star Rating Picker */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-2">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Pilih Rating Bintang
                </label>
                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating !== null ? hoverRating : reviewRating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs font-bold text-white">
                  {reviewRating === 5 && '⭐⭐⭐⭐⭐ Luar Biasa (5 Bintang Sempurna)'}
                  {reviewRating === 4 && '⭐⭐⭐⭐ Sangat Bagus (4 Bintang)'}
                  {reviewRating === 3 && '⭐⭐⭐ Cukup Bagus (3 Bintang)'}
                  {reviewRating === 2 && '⭐⭐ Kurang Puas (2 Bintang)'}
                  {reviewRating === 1 && '⭐ Perlu Perbaikan (1 Bintang)'}
                </p>
              </div>

              {/* Service Category */}
              <div>
                <label className="block text-xs text-stone-300 font-medium mb-1.5">
                  Layanan yang Anda Gunakan <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewCategory('studio')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      reviewCategory === 'studio'
                        ? 'bg-amber-500 text-stone-950 border-amber-500'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    <span>Studio Musik</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewCategory('box_speaker')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      reviewCategory === 'box_speaker'
                        ? 'bg-amber-500 text-stone-950 border-amber-500'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    <span>Pembuatan Box Speaker</span>
                  </button>
                </div>
              </div>

              {/* Name and Band/Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Nama Anda / Nama Band <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Cth: Rian Pratama"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Profesi / Keterangan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="Cth: Gitaris Band / Rental Sound"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs text-stone-300 font-medium mb-1">
                  Ulasan / Cerita Pengalaman Anda <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Ceritakan kepuasan Anda seputar studio latihan (AC, alat, suara) atau kualitas box speaker (kayu multiplek, kerapian lem, suara bass)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 leading-relaxed"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Ulasan Bintang 5</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
