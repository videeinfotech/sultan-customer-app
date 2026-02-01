
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface CartProps {
  onNavigate: (view: View) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await customerApi.getCart();
      console.log('Cart API Response:', res);
      if (res.success) {
        setCartData(res.data);
      } else {
        setError('Failed to load cart');
      }
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      setError(error.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Cart component mounted');
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      setUpdatingId(itemId);
      const res = await customerApi.updateCartItem(itemId, newQty);
      if (res.success) {
        setCartData(res.data);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      setUpdatingId(itemId);
      const res = await customerApi.removeCartItem(itemId);
      if (res.success) {
        setCartData(res.data);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading && !cartData) {
    return (
      <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
        <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
          <button onClick={() => onNavigate('home')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-lg font-serif font-bold tracking-tight">Shopping Bag</h2>
          <div className="w-12"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark">
        <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
          <button onClick={() => onNavigate('home')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-lg font-serif font-bold tracking-tight">Shopping Bag</h2>
          <div className="w-12"></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <span className="material-symbols-outlined text-6xl text-red-300 mb-4">error</span>
          <p className="text-zinc-500 mb-2 font-serif text-lg">{error}</p>
          <button onClick={fetchCart} className="mt-4 bg-primary text-[#181611] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Retry</button>
        </div>
      </div>
    );
  }

  const items = cartData?.items || [];
  const summary = cartData?.summary || { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  console.log('Cart items:', items);
  console.log('Cart summary:', summary);

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Internal Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 justify-between border-b border-primary/5">
        <button onClick={() => onNavigate('home')} className="size-12 flex items-center justify-center text-charcoal dark:text-white active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-serif font-bold tracking-tight">Shopping Bag</h2>
        <div className="w-12"></div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center mt-20">
          <div className="size-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-zinc-400">shopping_bag</span>
          </div>
          <p className="text-zinc-500 mb-6 font-serif">Your shopping bag is empty.</p>
          <button onClick={() => onNavigate('home')} className="bg-primary text-[#181611] px-10 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 pt-6 pb-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gold-muted uppercase">Selected Items ({items.length})</span>
          </div>

          <div className="flex flex-col gap-4 px-4 py-2">
            {items.map((item: any) => (
              <div key={item.id} className={`flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-zinc-800 p-3 border border-zinc-100 dark:border-zinc-700 shadow-sm transition-opacity ${updatingId === item.id ? 'opacity-50' : ''}`}>
                <div
                  className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 cursor-pointer"
                  style={{ backgroundImage: `url("${item.image}")` }}
                  onClick={() => {
                    localStorage.setItem('current_product_id', item.product_id);
                    onNavigate('productDetail');
                  }}
                ></div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <p className="text-charcoal dark:text-white text-sm font-bold leading-tight line-clamp-2">{item.name}</p>
                      <span
                        onClick={() => handleRemoveItem(item.id)}
                        className="material-symbols-outlined text-zinc-400 text-lg cursor-pointer hover:text-red-500"
                      >close</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-primary dark:text-primary text-[9px] font-bold px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20 uppercase tracking-tighter">
                        {item.options?.metal?.name || '18K Gold'}
                      </span>
                      {item.options?.shape?.name && (
                        <span className="text-charcoal/50 dark:text-white/50 text-[9px] font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-full border border-zinc-200 dark:border-zinc-600 uppercase tracking-tighter">
                          {item.options.shape.name}
                        </span>
                      )}
                      {item.options?.size && (
                        <span className="text-charcoal/50 dark:text-white/50 text-[9px] font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded-full border border-zinc-200 dark:border-zinc-600 uppercase tracking-tighter">
                          Size: {item.options.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="size-7 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700 text-charcoal dark:text-white active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">remove</span>
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="size-7 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-700 text-charcoal dark:text-white active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">add</span>
                      </button>
                    </div>
                    <p className="text-primary text-sm font-bold">{formatPrice(item.total)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 px-6 py-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gold-muted dark:text-zinc-400 text-sm">Subtotal</span>
              <span className="text-charcoal dark:text-white text-sm font-medium">{formatPrice(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gold-muted dark:text-zinc-400 text-sm">Shipping</span>
              <span className="text-charcoal dark:text-white text-sm font-medium">{summary.shipping === 0 ? 'FREE' : formatPrice(summary.shipping)}</span>
            </div>
            <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1"></div>
            <div className="flex justify-between items-center">
              <span className="text-charcoal dark:text-white text-base font-bold">Total Amount</span>
              <span className="text-primary text-lg font-extrabold">{formatPrice(summary.total)}</span>
            </div>
          </div>

          {/* Fixed Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 pb-8 border-t border-zinc-100 dark:border-zinc-800 z-40">
            <div className="w-full max-w-[480px] mx-auto flex flex-col gap-3">
              <div className="flex justify-between items-end px-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gold-muted uppercase font-bold tracking-widest">Total Amount</span>
                  <span className="text-charcoal dark:text-white text-xl font-extrabold leading-tight">{formatPrice(summary.total)}</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-primary text-[#181611] py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
