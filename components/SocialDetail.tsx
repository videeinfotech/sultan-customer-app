
import React, { useState, useEffect, useRef } from 'react';
import { customerApi, formatPrice } from '../api';

export const SocialDetail: React.FC = () => {
  const [contest, setContest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, mins: 0, secs: 0 });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchContest = async () => {
    const contestId = localStorage.getItem('current_contest_id');
    if (!contestId) return;

    try {
      setLoading(true);
      const res = await customerApi.getContest(contestId);
      if (res.success) {
        setContest(res.data.contest);
      }
    } catch (error) {
      console.error('Error fetching contest:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  useEffect(() => {
    if (!contest?.end_date) return;

    const timer = setInterval(() => {
      const end = new Date(contest.end_date).getTime();
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  const handleFollow = () => {
    window.open('https://instagram.com/sultanjewels', '_blank');
    setToast({ message: 'Welcome to our social inner circle!', type: 'success' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contest?.title || 'Sultan Jewels Contest',
          text: 'I just entered the royal draw at Sultan Jewels! Join the brilliance.',
          url: window.location.href,
        });
        setToast({ message: 'Exquisite! Influence shared.', type: 'success' });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setToast({ message: 'Link copied to clipboard. Spread the word!', type: 'success' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setToast({ message: 'Style captured. Your look is ready for submission.', type: 'success' });
    }
  };

  const handleJoin = async () => {
    if (contest.has_participated) {
      setToast({ message: "You have already joined this contest!", type: 'error' });
      return;
    }

    try {
      setJoining(true);

      const formData = new FormData();
      formData.append('platform', 'App');
      formData.append('entry_url', window.location.href);
      formData.append('social_handle', 'app_user');

      if (uploadedImage) {
        formData.append('entry_file', uploadedImage);
      }

      const res = await customerApi.participateInContest(contest.id, formData);
      if (res.success) {
        setToast({ message: "You've been entered into the royal draw!", type: 'success' });
        await fetchContest();
        setUploadedImage(null);
        setUploadPreview(null);
      }
    } catch (error: any) {
      setToast({ message: error.message || "Entry failed. Please try again.", type: 'error' });
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <p className="text-zinc-500 mb-6 font-serif">Contest not found.</p>
        <button onClick={() => window.history.back()} className="text-primary font-bold uppercase tracking-widest text-xs underline">Go Back</button>
      </div>
    );
  }

  const isEnded = new Date(contest.end_date) < new Date();

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-40">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Internal Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
        <button onClick={() => window.history.back()} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-serif font-bold tracking-tight">Contest Details</h2>
        <div className="w-12"></div>
      </div>

      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none text-center">
          <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${toast.type === 'success' ? 'bg-white/90 dark:bg-zinc-900/90 border-primary/20 text-charcoal' : 'bg-red-50/90 border-red-200 text-red-600'
            }`}>
            <p className="text-xs font-bold tracking-wide text-center uppercase">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Hero Image & Live Badge */}
      <div className="p-4">
        <div
          className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[380px] shadow-xl"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), url("${contest.image}")`,
          }}
        >
          <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg ${!isEnded ? 'bg-primary' : 'bg-zinc-500'}`}>
            {!isEnded && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            )}
            <p className="text-[#181611] text-[10px] font-bold tracking-widest uppercase">{!isEnded ? 'Open' : 'Ended'}</p>
          </div>
          <div className="p-6">
            <h1 className="text-white text-3xl font-serif font-bold leading-tight mb-2 tracking-tight">{contest.title}</h1>
            <p className="text-white/80 text-sm leading-relaxed font-noto italic mb-4">Win exquisite prizes valued at millions.</p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/10">
              <span className="material-symbols-outlined text-primary text-sm whitespace-nowrap">groups</span>
              <p className="text-white text-[10px] font-bold uppercase tracking-wider">{contest.participants_count || 0} Entrants joined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      {!isEnded && (
        <div className="px-4 py-4">
          <p className="text-gold-muted text-[10px] font-bold tracking-[0.2em] text-center mb-4 uppercase">Entries Close In</p>
          <div className="flex gap-3 justify-center">
            {[
              { val: String(timeLeft.hours).padStart(2, '0'), label: 'Hours' },
              { val: String(timeLeft.mins).padStart(2, '0'), label: 'Minutes' },
              { val: String(timeLeft.secs).padStart(2, '0'), label: 'Seconds' }
            ].map((time, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-2 w-20">
                  <div className="flex h-14 w-full items-center justify-center rounded-xl bg-white dark:bg-white/5 shadow-sm border border-zinc-100 dark:border-white/5">
                    <p className="text-charcoal dark:text-white text-2xl font-bold font-serif">{time.val}</p>
                  </div>
                  <p className="text-gold-muted text-[10px] font-bold uppercase tracking-widest">{time.label}</p>
                </div>
                {i < 2 && <div className="text-2xl font-bold mt-3 text-primary">:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="px-6 py-6 font-noto">
        <h3 className="text-charcoal dark:text-white text-base font-bold mb-3">About the Contest</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          {contest.description || "Purchase any item above ₹5,000 to enter. Multiple entries allowed for every ₹5,000 spent."}
        </p>
      </div>

      {/* Participation Steps */}
      <div className="px-4 py-4 space-y-3 font-noto">
        <h3 className="px-2 text-charcoal dark:text-white text-base font-bold mb-1">How to Join</h3>

        {/* Follow Step */}
        <button
          onClick={handleFollow}
          className="w-full flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border-l-4 border-primary shadow-sm active:scale-95 transition-all text-left"
        >
          <div className="flex-shrink-0 size-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold text-lg">public</span>
          </div>
          <div className="flex-1">
            <p className="text-charcoal dark:text-white text-sm font-bold">Follow @SultanJewels</p>
            <p className="text-gold-muted text-[10px]">Join our social inner circle</p>
          </div>
          <span className="material-symbols-outlined text-zinc-300">open_in_new</span>
        </button>

        {/* Share Step */}
        <button
          onClick={handleShare}
          className="w-full flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border border-zinc-100 dark:border-white/5 shadow-sm active:scale-95 transition-all text-left"
        >
          <div className="flex-shrink-0 size-9 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-gold-muted text-lg">share</span>
          </div>
          <div className="flex-1">
            <p className="text-charcoal dark:text-white text-sm font-bold">Share to Story</p>
            <p className="text-gold-muted text-[10px]">Spread the brilliance with friends</p>
          </div>
          <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
        </button>

        {/* Upload Step */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex flex-col gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border border-zinc-100 dark:border-white/5 shadow-sm active:scale-95 transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 size-9 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center overflow-hidden">
              {uploadPreview ? (
                <img src={uploadPreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="material-symbols-outlined text-gold-muted text-lg">upload</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-charcoal dark:text-white text-sm font-bold">{uploadedImage ? 'Look Captured' : 'Upload Your Look'}</p>
              <p className="text-gold-muted text-[10px]">{uploadedImage ? uploadedImage.name : 'Show us your regal style'}</p>
            </div>
            <span className="material-symbols-outlined text-zinc-300">{uploadedImage ? 'check_circle' : 'chevron_right'}</span>
          </div>
          {uploadPreview && (
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-primary/20">
              <img src={uploadPreview} className="w-full h-full object-cover shadow-inner" alt="Preview" />
            </div>
          )}
        </button>
      </div>

      <div className="h-20 shrink-0"></div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-zinc-100 dark:border-white/10 p-6 z-40 flex justify-center">
        <div className="w-full max-w-[430px] flex flex-col gap-2">
          <button
            onClick={handleJoin}
            disabled={joining || contest.has_participated || isEnded}
            className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${contest.has_participated
              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none'
              : isEnded
                ? 'bg-zinc-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-primary via-[#ffe08a] to-primary bg-[length:200%_auto] animate-shimmer text-[#181611] shadow-primary/20'
              }`}
          >
            <span>
              {joining
                ? 'Summoning Entry...'
                : contest.has_participated
                  ? 'Entry Secured'
                  : isEnded
                    ? 'Contest Ended'
                    : 'Join Contest'}
            </span>
            {!joining && !contest.has_participated && !isEnded && (
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            )}
            {contest.has_participated && (
              <span className="material-symbols-outlined text-lg">verified</span>
            )}
          </button>
          <p className="text-gold-muted text-[10px] text-center mt-2 font-noto uppercase tracking-widest font-bold">
            {contest.has_participated ? 'Your name is in the royal ledger' : 'Winner announced periodically'}
          </p>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};
