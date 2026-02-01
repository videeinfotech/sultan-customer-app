
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { customerApi, formatPrice } from '../api';
import { View } from '../types';

interface AuctionDetailProps {
    onNavigate: (view: View) => void;
}

export const AuctionDetail: React.FC<AuctionDetailProps> = ({ onNavigate }) => {
    const [auction, setAuction] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, mins: 0, secs: 0 });

    const fetchAuction = useCallback(async (isSilent: boolean = false) => {
        const auctionId = localStorage.getItem('current_auction_id');
        if (!auctionId) {
            onNavigate('auctions');
            return;
        }

        try {
            if (!isSilent) setLoading(true);
            const res = await customerApi.getAuction(auctionId);
            if (res.success) {
                setAuction(res.data.auction);
                // Only update bid amount if not currently submitting/interacting
                const minBid = (res.data.auction.current_bid || res.data.auction.starting_bid) + (res.data.auction.bid_increment || 50);
                setBidAmount(minBid.toString());
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        } finally {
            if (!isSilent) setLoading(false);
        }
    }, [onNavigate]);

    useEffect(() => {
        fetchAuction();
    }, [fetchAuction]);

    useEffect(() => {
        if (!auction?.end_time) return;

        const timer = setInterval(() => {
            const end = new Date(auction.end_time).getTime();
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
    }, [auction]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handlePlaceBid = async () => {
        const amount = parseFloat(bidAmount);
        const currentHighest = (auction.current_bid || auction.starting_bid);
        const increment = (auction.bid_increment || 50);
        const minRequired = currentHighest + increment;

        if (isNaN(amount) || amount < minRequired) {
            setToast({ message: `Minimum bid required is ${formatPrice(minRequired)}`, type: 'error' });
            return;
        }

        try {
            setSubmitting(true);
            const res = await customerApi.placeBid(auction.id, amount);
            if (res.success) {
                setToast({ message: 'Bid placed successfully!', type: 'success' });
                // Re-fetch auction details to update full UI state correctly
                await fetchAuction(true);
            }
        } catch (error: any) {
            setToast({ message: error.message || 'The vault refused your bid.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!auction) return null;

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
            {/* Internal Header */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
                <button onClick={() => onNavigate('auctions')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <h2 className="text-lg font-serif font-bold tracking-tight">Auction Portfolio</h2>
                <div className="size-12 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">share</span>
                </div>
            </div>

            {toast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${toast.type === 'success' ? 'bg-white/90 dark:bg-zinc-900/90 border-primary/20 text-charcoal' : 'bg-red-50/90 border-red-200 text-red-600'
                        }`}>
                        <p className="text-xs font-bold tracking-wide text-center uppercase">{toast.message}</p>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <img src={auction.product?.image} className="w-full h-full object-cover" alt={auction.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181611]/60 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-2">
                            <span className="size-1.5 rounded-full bg-white animate-pulse"></span>
                            Live Auction
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-white leading-tight">{auction.title}</h1>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="flex bg-white dark:bg-zinc-800 border-b border-zinc-100 dark:border-white/5 divide-x divide-zinc-100 dark:divide-white/5">
                <div className="flex-1 p-4 flex flex-col items-center">
                    <p className="text-[10px] text-gold-muted font-bold uppercase tracking-widest mb-1">Current Bid</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(auction.current_bid)}</p>
                </div>
                <div className="flex-1 p-4 flex flex-col items-center">
                    <p className="text-[10px] text-gold-muted font-bold uppercase tracking-widest mb-1">Time Remaining</p>
                    <p className="text-xl font-bold text-charcoal dark:text-white font-mono">
                        {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.mins).padStart(2, '0')}:{String(timeLeft.secs).padStart(2, '0')}
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Bidding Section */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-100 dark:border-white/5 shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">Submit Proposal</h3>
                        <span className="text-[10px] font-bold text-gold-muted">{auction.bid_count || 0} Bids Logged</span>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-muted text-sm font-bold">₹</span>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full h-14 bg-white dark:bg-zinc-800 rounded-2xl pl-10 pr-4 text-charcoal dark:text-white font-bold outline-none border border-zinc-100 dark:border-white/10 focus:border-primary transition-colors"
                                disabled={submitting}
                            />
                        </div>
                        <button
                            onClick={handlePlaceBid}
                            disabled={submitting}
                            className="h-14 px-8 bg-primary dark:bg-primary text-white dark:text-zinc-950 font-bold uppercase tracking-widest text-xs rounded-2xl active:scale-95 transition-all disabled:opacity-50"
                        >
                            {submitting ? '...' : 'Place Bid'}
                        </button>
                    </div>
                    <p className="text-[9px] text-gold-muted mt-3 italic text-center uppercase tracking-widest font-bold">
                        All bids at Sultan Jewels are legally binding commitments.
                    </p>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest pb-2 border-b border-primary/10">About this Artifact</h3>
                    <p className="text-sm text-gold-muted leading-relaxed italic">
                        {auction.product?.details || 'A masterpiece of royal heritage, handcrafted by our master artisans. This piece represents the pinnacle of jewelry craftsmanship and luxury.'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-100 dark:border-white/5">
                            <p className="text-[8px] uppercase tracking-widest text-gold-muted font-bold mb-1">Metal</p>
                            <p className="text-xs font-bold text-charcoal dark:text-white uppercase">18K Solid Gold</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-100 dark:border-white/5">
                            <p className="text-[8px] uppercase tracking-widest text-gold-muted font-bold mb-1">Certification</p>
                            <p className="text-xs font-bold text-charcoal dark:text-white uppercase">GIA Certified</p>
                        </div>
                    </div>
                </div>

                {/* Recent Bids Placeholder */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-charcoal dark:text-white uppercase tracking-widest">Recent Activity</h3>
                    <div className="space-y-2 opacity-50">
                        <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-4 rounded-xl">
                            <span className="text-xs font-bold tracking-widest">V***T</span>
                            <span className="text-xs font-bold text-primary">{formatPrice(auction.current_bid)}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-4 rounded-xl">
                            <span className="text-xs font-bold tracking-widest">A***S</span>
                            <span className="text-xs font-bold text-gold-muted">{formatPrice(auction.current_bid - (auction.bid_increment || 50))}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
