
import React, { useState, useEffect } from 'react';
import { customerApi, formatPrice } from '../api';
import { View } from '../types';

interface AuctionsProps {
  onNavigate: (view: View) => void;
}

export const Auctions: React.FC<AuctionsProps> = ({ onNavigate }) => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchAuctions = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const res = await customerApi.getAuctions(page);
      if (res.success) {
        const newAuctions = res.data.auctions || [];
        const pagination = res.data.pagination;

        if (append) {
          setAuctions(prev => [...prev, ...newAuctions]);
        } else {
          setAuctions(newAuctions);
        }

        // Check if there are more pages
        setHasMore(pagination && pagination.current_page < pagination.last_page);
        setCurrentPage(pagination?.current_page || 1);
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchAuctions(1, false);
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchAuctions(currentPage + 1, true);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <p className="text-zinc-500 mb-6 font-serif">No active auctions at the moment.</p>
        <button onClick={() => window.location.reload()} className="text-primary font-bold uppercase tracking-widest text-xs underline">Refresh Page</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32 font-noto">
      {/* Live Countdown Summary */}
      <div className="px-4 pt-6">
        <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <p className="text-charcoal dark:text-white text-[10px] font-bold uppercase tracking-widest text-center mb-3">Next Major Event Ends In</p>
          <div className="flex gap-4 justify-center">
            {[
              { val: '04', label: 'HOURS' },
              { val: '22', label: 'MINS' },
              { val: '18', label: 'SECS', active: true }
            ].map((time, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 shadow-sm ${time.active ? 'border border-primary/40' : ''}`}>
                  <p className={`text-lg font-bold ${time.active ? 'text-primary' : 'text-charcoal dark:text-white'}`}>{time.val}</p>
                </div>
                <p className="text-gold-muted text-[10px] mt-1 font-bold">{time.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {auctions.map((auc, i) => (
          <div
            key={auc.id}
            onClick={() => {
              localStorage.setItem('current_auction_id', auc.id.toString());
              onNavigate('auctionDetail');
            }}
            className="flex flex-col bg-white dark:bg-zinc-800/50 rounded-xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <img src={auc.product?.image} className="w-full h-full object-cover" alt={auc.title} />
              <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Live</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-charcoal dark:text-white text-sm font-bold leading-tight mb-1 truncate">{auc.title}</h3>
              <div className="mb-3">
                <p className="text-primary text-base font-bold leading-none">{formatPrice(auc.current_bid || auc.start_price)}</p>
                <p className="text-gold-muted text-[10px] font-medium">Starts at {formatPrice(auc.start_price)}</p>
              </div>
              <button className="mt-auto w-full py-2 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all">
                View Auction
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination/Load More */}
      {hasMore && (
        <div className="flex justify-center p-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-[#181611] dark:bg-primary text-white dark:text-[#181611] rounded-full text-sm font-bold tracking-wide active:scale-95 transition-transform disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More Pieces'}
            {!loadingMore && <span className="material-symbols-outlined text-sm">expand_more</span>}
          </button>
        </div>
      )}
    </div>
  );
};
