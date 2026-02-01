
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface SocialProps {
  onNavigate: (view: View) => void;
}

export const Social: React.FC<SocialProps> = ({ onNavigate }) => {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const res = await customerApi.getContests();
        if (res.success) {
          setContests(res.data.contests || []);
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (contests.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <p className="text-zinc-500 mb-6 font-serif">No active contests at the moment.</p>
        <button onClick={() => window.location.reload()} className="text-primary font-bold uppercase tracking-widest text-xs underline">Refresh Page</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-serif overflow-y-auto no-scrollbar pb-32">
      {/* Hero Section */}
      <section className="pt-10 pb-6 px-6 text-center">
        <p className="text-gold-muted text-xs font-medium tracking-[0.3em] uppercase mb-3">The Editorial Collection</p>
        <h2 className="text-4xl font-light leading-tight text-charcoal dark:text-white italic">Exquisite Contests</h2>
        <div className="w-12 h-[1px] bg-primary mx-auto mt-6"></div>
      </section>

      {/* Editorial List */}
      <div className="space-y-12 px-4">
        {contests.map((contest: any) => (
          <div key={contest.id} className="group">
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all duration-300">
              <div
                className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url("${contest.image}")` }}
              >
                <div className="absolute top-4 left-4">
                  <span className={`text-[#181611] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm ${contest.status === 'Open' ? 'bg-primary' : 'bg-white/90'}`}>
                    {contest.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold text-charcoal dark:text-white leading-tight truncate px-1">{contest.title}</h3>
                  <span className="text-primary text-xs font-bold whitespace-nowrap">{formatPrice(contest.prize_value)} Value</span>
                </div>
                <p className="text-gold-muted text-sm leading-relaxed mb-6 font-light font-noto line-clamp-2">
                  {contest.description}
                </p>
                <div className="flex items-center justify-between border-t border-primary/10 pt-4 font-noto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gold-muted uppercase tracking-[0.1em]">Participating</span>
                    <span className="text-xs font-bold text-charcoal dark:text-white">{contest.participants_count || 0} Entrants</span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem('current_contest_id', contest.id);
                      onNavigate('socialDetail');
                    }}
                    className="bg-primary hover:bg-primary/90 text-[#181611] px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider transition-colors uppercase"
                  >
                    Enter Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Editorial Text */}
      <footer className="mt-20 px-6 text-center font-noto">
        <p className="text-gold-muted text-[10px] font-normal leading-normal tracking-wider opacity-70 uppercase">
          Crafting moments of luxury, one contest at a time.<br />
          Sultan Luxe Exclusive Membership
        </p>
      </footer>
    </div>
  );
};
