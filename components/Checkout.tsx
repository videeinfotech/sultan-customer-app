
import React from 'react';
import { View } from '../types';

interface CheckoutProps {
  onNavigate: (view: View) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
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
                <p className="text-charcoal dark:text-white text-base font-bold">Alexandra Vanderbilt</p>
                <span className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded font-bold uppercase">Default</span>
              </div>
              <p className="text-gold-muted dark:text-zinc-400 text-sm leading-relaxed mt-1">
                742 Fifth Avenue, Penthouse B<br/>
                New York, NY 10019<br/>
                United States
              </p>
              <p className="text-gold-muted dark:text-zinc-400 text-sm font-normal mt-1">+1 (212) 555-0198</p>
            </div>
            <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors gap-2 text-xs font-bold w-fit mt-2">
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Change</span>
            </button>
          </div>
          <div 
            className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg border border-zinc-100 dark:border-zinc-700 shrink-0" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtFGUsrtlobVQ8mnfK1bHeoUR_Lj16GmFLfh0QQWCWsdAhjWMmhKOX4Jeas7vS0Xs4M1Kg2SayhY3FqbHt1R4Zrbl5nH3mr4qnXgB2rtdBS9iOZkcVJW2jF4CN-M43LOZoiZ8AiepbKHkfWIjF0Qdt3P945cjJvvU2Si2t7fN11gSwNjeZoopsC5AepWWJr5Jp3fBnJUyEd4-KoLwU8mzzllmr4GAAbmTz7_o5Lq5grtr_0S-azkLojwSzXisyab1y3RMp2PomC5wJ")' }}
          ></div>
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
              <span className="text-[11px] text-gold-muted dark:text-zinc-400">Delivered by Oct 24 - Oct 26</span>
            </div>
          </div>
          <span className="font-bold text-sm text-charcoal dark:text-white">Complimentary</span>
        </label>

        <label className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-300 dark:border-zinc-600"></div>
            <div className="flex flex-col">
              <span className="font-bold text-charcoal dark:text-white text-sm">Priority Overnight</span>
              <span className="text-[11px] text-gold-muted dark:text-zinc-400">Next business day arrival</span>
            </div>
          </div>
          <span className="font-bold text-sm text-charcoal dark:text-white">$45.00</span>
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
              <span className="text-2xl font-extrabold text-charcoal dark:text-white tracking-tight">$12,450.00</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[9px] text-gold-muted uppercase tracking-widest">Incl. VAT & Insurance</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('orders')}
            className="w-full flex items-center justify-center gap-3 bg-primary text-[#181611] font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined font-bold">lock</span>
            <span className="text-sm uppercase tracking-wider">Continue to Payment</span>
          </button>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};
