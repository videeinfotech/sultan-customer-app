
import React from 'react';

export const SocialDetail: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Hero Image & Live Badge */}
      <div className="p-4">
        <div 
          className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[380px] shadow-xl" 
          style={{ 
            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuD4q08MkvEvLCIaaV4JHptD0q_evZlK2lniY-qIYU7fWC1Ma0LDKdCxYSQIYrCCVnW_TfiREDu3Wwv3pudEw2GsaPUtdEuyeHKLSSU0Ik83lde8VOeGNMPrrUcIcsuSpK6CEcO0BOs-HyBlCn6J0QIZCSn6XS8m6UO42FWO7Vadjw5UH1D_CvKq3B4APJfLc2CykArhrjWiupSEVNjCpO9G5wX-04mwcXHBPNJD6cOjQvrgyF8eI__5LvYh2llhlLwsGot0-rB9CH")',
          }}
        >
          {/* Live Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <p className="text-[#181611] text-[10px] font-bold tracking-widest uppercase">Live</p>
          </div>
          <div className="p-6">
            <h1 className="text-white text-3xl font-serif font-bold leading-tight mb-2 tracking-tight">The Royal Diamond Giveaway</h1>
            <p className="text-white/80 text-sm leading-relaxed font-noto italic">Enter for a chance to win the exclusive Sultan's Legacy diamond set valued at $25,000.</p>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="px-4 py-4">
        <p className="text-gold-muted text-[10px] font-bold tracking-[0.2em] text-center mb-4 uppercase">Entries Close In</p>
        <div className="flex gap-3 justify-center">
          {[
            { val: '04', label: 'Hours' },
            { val: '22', label: 'Minutes' },
            { val: '59', label: 'Seconds' }
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

      {/* Participation Progress */}
      <div className="p-4 mt-4">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-zinc-100 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-end mb-4 font-noto">
            <div>
              <h3 className="text-charcoal dark:text-white text-base font-bold">Your Entry Progress</h3>
              <p className="text-gold-muted text-[11px]">1 of 3 steps completed</p>
            </div>
            <p className="text-primary font-bold text-lg">33%</p>
          </div>
          <div className="h-2 w-full bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '33%' }}></div>
          </div>
        </div>
      </div>

      {/* Participation Steps */}
      <div className="px-4 py-4 space-y-3 font-noto">
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border-l-4 border-primary shadow-sm">
          <div className="flex-shrink-0 size-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold text-lg">check</span>
          </div>
          <div className="flex-1">
            <p className="text-charcoal dark:text-white text-sm font-bold">Follow @SultanJewels</p>
            <p className="text-gold-muted text-[10px]">Stay updated with luxury</p>
          </div>
        </div>
        
        {[
          { icon: 'share', title: 'Share to Story', desc: 'Spread the brilliance' },
          { icon: 'upload', title: 'Upload Your Look', desc: 'Show us your style' }
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-xl border border-zinc-100 dark:border-white/5 shadow-sm">
            <div className="flex-shrink-0 size-9 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-gold-muted text-lg">{step.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-charcoal dark:text-white text-sm font-bold">{step.title}</p>
              <p className="text-gold-muted text-[10px]">{step.desc}</p>
            </div>
            <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
          </div>
        ))}
      </div>

      {/* Recent Entries Gallery */}
      <div className="mt-6 px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-charcoal dark:text-white text-base font-bold tracking-tight">Recent Entries</h3>
          <button className="text-primary text-[11px] font-bold uppercase tracking-widest">View All</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW7zbKYjSV42gm9HanqLscL2UnKxD9rji2ruyfqcTVZ-f6dycyAx88Kc9vmjRfE2hoEBeujigDwkhT9gkwJ3JRv2jM7NYXG6ziYUKV9dEhVXZWMS15YF5uC-zGYJNW4h-AAql7jATcz6wNZanN0w4F9xWniwMRXRXgUrwRIQ1mbOwtdOpuVyF9i_tEq51L6oitM_JkLfdwylnldngozCHi6lqBZ0mxZLxGWJGmb0jEUb-Wvyqs3N8i8-AeDEaEA5i8XimnZCXePFPU", likes: '1.2k' },
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBecpSbC1HYYJ--9d53JOEb-PM9C3rfjVh95m3IipvCJH_T_C2HD9_UJJvJMbtR9CH3StPZzET156MFZ7zILNcD48KTaVAkCcO6Mjq32GUY1zVO0E5wx7IwUrrZoHIENqA_jzA0P02pinZMOQEl29hGs7l0Wnf_V55cITkL7G2vMOMFnqr2T_-fV8e1kvcF0iYPe_71SO4RAMXXBpkXjW8PLOKvRwT0uDHGIPJ0E9513Yux2lBZkVn_5AqrgCPk_yyVZ01BemkXmiA-", likes: '842' },
            { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-IPKkkq3jaP0PfU1-AX2zEo0PsHc9_dW4HEeTXYGXZSpJrUtRE5rI8TS_Tya_pFOg3Xjkqt-pSQVnFmxdLHdiGBaEJ9x9D9XDqgVi-RTzL3ZTGJcDITWtHP42BaNrqw8Xybek8F8CBB43tpMJmiLX6nvRtVbwFGolVPvgRAv5L2nviY_vN3qzVjl772YAyW4IXgc4MdqEYKp4twAx-PJSABP6RfOX08NiOlD5I6Ei7YLxKjQeJ6xKfh5vy1dpnpQ02_fuHGAjD5Q", likes: '2.4k' }
          ].map((entry, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-100 group">
              <img src={entry.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Entry ${i}`} />
              <div className="absolute bottom-1 right-1 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-white text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                <span className="text-white text-[9px] font-medium">{entry.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-zinc-100 dark:border-white/10 p-6 z-50 flex justify-center">
        <div className="w-full max-w-[430px] flex flex-col gap-2">
          <button className="w-full py-4 rounded-xl text-[#181611] font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-gradient-to-r from-primary via-[#ffe08a] to-primary bg-[length:200%_auto] animate-shimmer">
            <span>Join Contest</span>
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
          </button>
          <p className="text-gold-muted text-[10px] text-center mt-2 font-noto">Winner announced Oct 30, 2023</p>
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};
