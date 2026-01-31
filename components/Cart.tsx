
import React from 'react';
import { View } from '../types';

interface CartProps {
  onNavigate: (view: View) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const cartItems = [
    {
      id: '1',
      title: 'Solitaire Diamond Ring',
      specs: '18kt Yellow Gold | 0.5ct Diamond',
      price: '$2,450',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx3jxX4F6TCEs0SK5B5wS2GN8nHFBeZiERTaMWJ71ftpOed9Fb4obabU8-OWR1TpL0h9ihzOnGXsxS2kpdhDFFkVBDNbzLUy0c4oDhnA5VxWY-cboM6SfFY8oH4yTLAq6l1409Wqwb1ojxudDPq4o06UBmYQlvPgOxUgNf8Nms-LKhOUamxhjdelhOHoJ18chk6covfBP55uzTW1KNYYVVzkK5BbmtQMtXunpBqIbtBUoE-x4M4desj3FxWI_uPctcF6yR6g4xBmZY'
    },
    {
      id: '2',
      title: 'Infinity Bracelet',
      specs: '14kt Rose Gold | 1.2ct Diamond',
      price: '$3,800',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy4Jt6ub_DKUh_Cbk4bpqYHfaAO-g_uaT9boig2cEWinl9LoNeK5gqZ4mn_0PiQzRtRRNi-UMB4Pq_zTN0p_rK-YzrT-rsZEHioKt_7T1rzG-qu85MbtRhKFPYDgKapRBy4wpPpp5pM2ZP8j5btlYPYdh2bzFocmozlP-ebF821_wx4gvJcnfRDoV2r8wuJXHvgIFn7d4gcTJxD7z8BNRUZ7tD-eojll9QNm0TnC27FlLk5VeHcpI_R50he_VsHvkiA7fK2Fdy0Xg3'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-40">
      {/* Header handled by App.tsx, but this is the cart specific content */}
      <div className="px-4 pt-6 pb-2">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gold-muted uppercase">Selected Items</span>
      </div>

      <div className="flex flex-col gap-4 px-4 py-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-zinc-800 p-3 border border-zinc-100 dark:border-zinc-700 shadow-sm">
            <div 
              className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0" 
              style={{ backgroundImage: `url("${item.img}")` }}
            ></div>
            <div className="flex flex-1 flex-col justify-between py-1">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <p className="text-charcoal dark:text-white text-sm font-bold leading-tight">{item.title}</p>
                  <span className="material-symbols-outlined text-gold-muted text-lg cursor-pointer hover:text-red-500">close</span>
                </div>
                <p className="text-gold-muted dark:text-zinc-400 text-[11px] font-medium">{item.specs}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button className="flex min-w-[70px] cursor-pointer items-center justify-center rounded-lg h-8 px-2 flex-row-reverse bg-zinc-50 dark:bg-zinc-700 text-charcoal dark:text-white gap-1 text-[11px] font-bold border border-zinc-200 dark:border-zinc-600">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                  <span className="truncate">Qty: 1</span>
                </button>
                <p className="text-charcoal dark:text-primary font-bold text-sm">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-charcoal dark:text-white text-base font-bold px-4 pb-2 pt-8">Offers & Coupons</h3>
      <div className="px-4">
        <div className="flex items-center gap-4 bg-white dark:bg-zinc-800 px-4 py-3 rounded-xl border border-dashed border-primary/50 justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
              <span className="material-symbols-outlined">sell</span>
            </div>
            <div className="flex flex-col">
              <p className="text-charcoal dark:text-white text-sm font-bold leading-none">Apply Coupon</p>
              <p className="text-gold-muted text-[10px] font-medium leading-normal">Save up to 10% on making charges</p>
            </div>
          </div>
          <button className="flex min-w-[70px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 border-2 border-primary text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary hover:text-[#181611] transition-all">
            Apply
          </button>
        </div>
      </div>

      <h3 className="text-charcoal dark:text-white text-base font-bold px-4 pb-2 pt-8">Order Summary</h3>
      <div className="mx-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-gold-muted dark:text-zinc-400 text-sm">Gold Value (32.4g)</span>
          <span className="text-charcoal dark:text-white text-sm font-medium">$2,100.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gold-muted dark:text-zinc-400 text-sm">Diamond Value (1.7ct)</span>
          <span className="text-charcoal dark:text-white text-sm font-medium">$3,200.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gold-muted dark:text-zinc-400 text-sm">Making Charges</span>
          <span className="text-charcoal dark:text-white text-sm font-medium">$650.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gold-muted dark:text-zinc-400 text-sm">GST (3%)</span>
          <span className="text-charcoal dark:text-white text-sm font-medium">$300.00</span>
        </div>
        <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1"></div>
        <div className="flex justify-between items-center">
          <span className="text-charcoal dark:text-white text-base font-bold">Total Payable</span>
          <span className="text-primary text-lg font-extrabold">$6,250.00</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 py-10 opacity-60">
        {['verified', 'local_shipping', 'history'].map((icon, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
            <span className="text-[8px] uppercase font-bold tracking-widest">{['Certified', 'Insured', 'Returns'][i]}</span>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 border-t border-zinc-100 dark:border-zinc-800 z-40 flex justify-center">
        <div className="w-full max-w-[430px] flex flex-col gap-3">
          <div className="flex justify-between items-end px-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-gold-muted uppercase font-bold tracking-widest">Total Amount</span>
              <span className="text-charcoal dark:text-white text-xl font-extrabold leading-tight">$6,250.00</span>
            </div>
            <div className="text-primary text-[10px] font-bold cursor-pointer">View Breakup</div>
          </div>
          <button 
            onClick={() => onNavigate('checkout')}
            className="w-full bg-primary text-[#181611] py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};
