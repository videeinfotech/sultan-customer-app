
import React from 'react';
import { View } from '../types';

interface SocialProps {
  onNavigate: (view: View) => void;
}

export const Social: React.FC<SocialProps> = ({ onNavigate }) => {
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
        {/* Contest Card 1: The Royal Gala */}
        <div className="group">
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all duration-300">
            <div 
              className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8kzq19oL0VK88U3nyy3dG-PDpsxMHs6e14DXzOoWJThuDi8cC_Wedb3edTMjIciug52iKwiTL5TgeEK1UUw0v0cb-PN6s9DbhhKqE3XfLKAjPlZT5TzAzJgUNRltchqLG-JrUZc9X-fqcrSdo75zViD-GbDCx0CTLTW9lwjXCuQVX9-dEkLbhJm2BbGpyEJJvz38tvSEzl6isoCe7-VUtKljDlEsPsDomoel9i14RrST1Fyw7PUdjsKbkdshZQB01Lw6eFeyBkFe9")' }}
            >
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-[#181611] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">Joined</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-charcoal dark:text-white leading-tight">The Royal Gala</h3>
                <span className="text-primary text-xs font-bold">$12k Value</span>
              </div>
              <p className="text-gold-muted text-sm leading-relaxed mb-6 font-light font-noto">
                Win a signature 2-carat Emerald Cut Ring. Inspired by the golden hues of desert sunsets and royal heritage.
              </p>
              <div className="flex items-center justify-between border-t border-primary/10 pt-4">
                <span className="text-[10px] text-gold-muted italic uppercase tracking-widest font-noto">Entry Confirmed</span>
                <button 
                  onClick={() => onNavigate('socialDetail')}
                  className="text-charcoal dark:text-white text-[11px] font-bold tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all uppercase"
                >
                  View Entry <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contest Card 2: Midnight Sparkle */}
        <div className="group">
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all duration-300">
            <div 
              className="aspect-[4/5] w-full bg-center bg-no-repeat bg-cover" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQmc0ADEQbsTXVGH3gayK9QW6bsPVvUQWcc9X3rXCViLvgq584mxTMg3oUQ8b_JhASPRDCaALpnws0ykj0v_K4zv7h08WlyI9lFIRMgsy5BLjNVL0R2YbID-r9Nk1Yr4pPwNkVh4OnCCnJfMzKzY_8hSkP0BJ3n2tF4WxuHU9MzPzFWGBtGo_pjJX4NjcCjEmpWtlIuIgkD5HHc8PR9KOj2cGpYQZe4Ar1fP5qFKMFpyUymtBdekXMBKW_F3Ku1bFlee9yp4mWU5Ow")' }}
            >
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 dark:bg-zinc-900/90 text-charcoal dark:text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/30">Open</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-charcoal dark:text-white leading-tight">Midnight Sparkle</h3>
                <span className="text-primary text-xs font-bold italic font-noto">Ends in 3 days</span>
              </div>
              <p className="text-gold-muted text-sm leading-relaxed mb-6 font-light font-noto">
                Showcase your unique aesthetic to win a bespoke 18k Gold bracelet set with rare ethical diamonds.
              </p>
              <div className="flex items-center justify-between border-t border-primary/10 pt-4 font-noto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gold-muted uppercase tracking-[0.1em]">Participating</span>
                  <span className="text-xs font-bold text-charcoal dark:text-white">1.2k Entrants</span>
                </div>
                <button 
                  onClick={() => onNavigate('socialDetail')}
                  className="bg-primary hover:bg-primary/90 text-[#181611] px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider transition-colors uppercase"
                >
                  Enter Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contest Card 3: Desert Bloom */}
        <div className="group">
          <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm border border-primary/20 transition-all duration-300">
            <div 
              className="aspect-video w-full bg-center bg-no-repeat bg-cover" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuv9gne2kMpus4kvOObFFcWhPAA7inc-g2WpUp-isxFL8mRx6C3eWI4uRRY4Ry9dw49aqMmXbjBTRZMKNUO1asy8OHOBRbFIhixRR_LQeth3OOXJeDfefcF3DP92kvhemCqY-RL4o289B2dXBDjRa-fYgCMM47YRe8BlZAKQY3jiCkV271Cyb6R7XapnRengpH90KmyLokP06cSz8noYP4uTtJw7dQPDpJzRAEsf6mO-bZO3N-bgwDywpbhA8ds3nx60ROCu1NcVTL")' }}
            ></div>
            <div className="p-6 text-center">
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">Featured Series</span>
              <h3 className="text-2xl font-light italic text-charcoal dark:text-white mb-3">Desert Bloom</h3>
              <p className="text-xs text-gold-muted italic mb-4 font-noto">A weekly curation of botanical-inspired masterpieces.</p>
              <button className="inline-flex items-center justify-center w-full bg-transparent border border-primary text-charcoal dark:text-primary py-3 rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-[#181611] transition-all">
                Discover Prizes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Editorial Text */}
      <footer className="mt-20 px-6 text-center font-noto">
        <p className="text-gold-muted text-[10px] font-normal leading-normal tracking-wider opacity-70 uppercase">
          Crafting moments of luxury, one contest at a time.<br/>
          Sultan Luxe Exclusive Membership
        </p>
        <div className="flex justify-center gap-6 mt-6 pb-12">
          {['share', 'bookmark', 'info'].map((icon) => (
            <span key={icon} className="material-symbols-outlined text-gold-muted cursor-pointer hover:text-primary transition-colors">{icon}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};
