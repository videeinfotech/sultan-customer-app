
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface CheckoutProps {
  onNavigate: (view: View) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<any>(null);
  const [cartSummary, setCartSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const userData = localStorage.getItem('customer_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchCart = async () => {
      try {
        const res = await customerApi.getCart();
        if (res.success) {
          setCartSummary(res.data.summary);
        }
      } catch (error) {
        console.error('Error fetching cart summary:', error);
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const res = await customerApi.checkout({
        payment_method: 'credit_card',
      });

      if (res.success) {
        localStorage.setItem('last_order_id', res.data.order.id.toString());
        setToast({ message: 'Order placed with royal excellence.', type: 'success' });
        setTimeout(() => onNavigate('orderSuccess'), 2000);
      } else {
        setToast({ message: res.message || 'The treasury is busy. Please try again.', type: 'error' });
      }
    } catch (error: any) {
      console.error('Order error:', error);
      setToast({ message: error.message || 'An error occurred while placing your order.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Internal Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
        <button onClick={() => onNavigate('cart')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-serif font-bold tracking-tight">Secure Checkout</h2>
        <div className="w-12"></div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${toast.type === 'success' ? 'bg-white/90 dark:bg-zinc-900/90 border-primary/20 text-charcoal' : 'bg-red-50/90 border-red-200 text-red-600'
            }`}>
            <p className="text-xs font-bold tracking-wide text-center uppercase">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Progress Indicators */}
      <div className="flex w-full flex-row items-center justify-center gap-4 py-6">
        {[
          { label: 'Shipping', active: true },
          { label: 'Payment', active: false },
          { label: 'Review', active: false }
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`h-1.5 w-16 rounded-full ${step.active ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${step.active ? 'text-primary' : 'text-gold-muted'}`}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4 flex justify-between items-center">
        <h3 className="text-charcoal dark:text-white text-lg font-bold leading-tight">Shipping Address</h3>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4 rounded-xl bg-white dark:bg-zinc-800 p-5 shadow-sm border border-zinc-100 dark:border-zinc-700">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-charcoal dark:text-white text-base font-bold">{user?.name || 'Alexandra Vanderbilt'}</p>
                <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded font-bold uppercase">Default</span>
              </div>
              <p className="text-gold-muted dark:text-zinc-400 text-sm leading-relaxed mt-1">
                {user?.address || 'Set your delivery address'}<br />
                {user?.city}{user?.city && user?.state ? ', ' : ''}{user?.state} {user?.zip}<br />
                {user?.country || 'India'}
              </p>
              <p className="text-gold-muted dark:text-zinc-400 text-sm font-normal mt-1">{user?.phone}</p>
            </div>
            <button
              onClick={() => onNavigate('addresses')}
              className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors gap-2 text-xs font-bold w-fit mt-2"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Change</span>
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-charcoal dark:text-white text-lg font-bold px-4 pb-2 pt-6">Delivery Method</h3>
      <div className="px-4 pb-8 flex flex-col gap-3">
        <label className="flex items-center justify-between p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
              <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-charcoal dark:text-white text-sm">Express Insured Shipping</span>
              <span className="text-[11px] text-gold-muted dark:text-zinc-400">Delivered within 3-5 business days</span>
            </div>
          </div>
          <span className="font-bold text-sm text-charcoal dark:text-white">Complimentary</span>
        </label>

        <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
          <p className="text-[11px] leading-relaxed text-gold-muted dark:text-zinc-400">
            All shipments are fully insured and require an adult signature upon delivery to ensure your high-value purchase arrives safely.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 p-4 z-40 flex justify-center">
        <div className="w-full max-w-[430px] flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-gold-muted uppercase font-bold tracking-widest">Total Payable</span>
              <span className="text-2xl font-extrabold text-charcoal dark:text-white tracking-tight">
                {cartSummary ? formatPrice(cartSummary.total) : '...'}
              </span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[9px] text-gold-muted uppercase tracking-widest">Incl. VAT & Insurance</span>
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handlePlaceOrder}
            className={`w-full flex items-center justify-center gap-3 bg-primary text-[#181611] font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all ${loading ? 'opacity-70 scale-95' : 'active:scale-[0.98]'}`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#181611]"></div>
            ) : (
              <>
                <span className="material-symbols-outlined font-bold">lock</span>
                <span className="text-sm uppercase tracking-wider">Complete Order</span>
              </>
            )}
          </button>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};
