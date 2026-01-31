
import React from 'react';

export const Social: React.FC = () => {
  const posts = [
    { user: '@ELARA_V', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WLPe5Xu1PsQi6-v33QaIltw-2hQxvXdSu8NOpiX4k-xWqdPRKhmd9EBS8B-k0MZzbEs8VsWMx941UYt__bOBIKh3gfa-rVV15TEh-pstQRiQa7fsjiNxs8OJiHGENkI6t9QhlXnvYIFVV8tNGkpAbDVU_ZmQgzka-Sfe9zupguIdJ-F1P4rf_lcxRAxC8RsLgm9Z_AZq4IT5F8XK-NNDzmRTXUL2TLaP2dDsScO3xUT5QzK9rCrByuIX0aE6cBwA-HRUXknr9cHP' },
    { user: '@MAESTRO_J', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbtR26YgrtzsSAfUC4ZegCUNGHYKQFrsiyl-NJO2xv-9YLWMnm7W-ZvDtevM1jfG7Bp6vCRrhlERVQAa8jlGFkQY9sTlmEJqYQsc2k1aZqn3blq8Hur5sWBSE0TcCoqklzs0lteslg-BYMuMKWxz57lpuwvWvy4z2bBe_AvEfvhr3pCCxKF4PKdsQ8-HUh4oHt6KKZqUWa3fIwJ3l6cLhG7RWi07JjM1QcJSBiKGApLjn8NVujwAW8ZPoaTTUqWhoF71iy-6x9vaV' },
    { user: '@SULTAN_STYLE', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3GTjtoC4gT78A8QBNsmgxS_7vozkgHuvIjulpcS5V43VV9OOpS1LW-4f07B-EAqjp_W-I-o25apRXN625sd0sgrvZrWvCKryNlUI6gFFTgzVWsDKD__GkfoEWkyyJWEx2NpKidwHKWEykQbCpa16SG5wzXqBkn7Yy2NkS-EzpbNg085mbddVmkDKQi47YgCesPQpOMfbZ6I_1xLkaIWehkQcWCkcO-tZQB5vt9dtcCazinnlx4iWoRuOIbLRho40RIK_iVxMAStbm' },
    { user: '@DIAMOND_LIFE', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOw6B1lrZ9DtdgvZHhV0X4Ie1voZ4yePTZT4fIhHcyhRRCMYKuIZJ_bZPmeF2YwiQmXivYtFPtk_R-Vp9h7Sogz3XNvLGM_SD3g1IRVvjOJgk9CLmh12MPP8JkSic2KLmkMutWKVq60vGVmww74gZnK4F6ktFTimBcdgJHiG5-DvKGQt2VCZOfp0fDxjt4DPkOpVbtsWy3Z0tKdTgww5ydmemPSwXhrc80pFoSkhdN7yuHVcLnLzUmANMIufiaVUNj2-iPMXCjGwxl' },
    { user: '@ROYAL_GEMS', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_vE3XFZriCiiuzxCB61c9TKl8xWzzUr9HIrPGs9CswbVv29eeJEG4FWz4jP5DvRTNOiSdwrYOe4A_t7Ok09DVC7D77Ze9vIXhymTSZwN_Sn2R_8cEft-zr4Ey5J_dB0w0WGrPNfXK9Icm4VCwan5EGs6KPYMe2n23GaEm92jQqLvAmCHcbY-B7wBc_SpIOL1vHxQyRcU2VcsoSyu91I69USMUwmyXq0lYlbdd9Shi7eDTCGWBxpyGYY_t0YRiuzcvvh1JENTQXJ3q' },
    { user: '@HERITAGE_COLLECTOR', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWzuMyXPhiYTUsfcto6vkDTN8WNtJzNB4LROFVOQ2aMBtDEe_XvdnUgTmR52T9XM4RgjaNkScWbMFieedzOTTkzw0QytxIcUqCI92TQ3WOkjb_kCs5PLSpveATHcUfwxos_p1x_ZdbjpoPcEzikPaOn9y18DIZk0Ja2YWx8BmEFqNH2RTj8JxvORAJytKZD-Hl24nSihVucYoby32ICVQSrzD6Gjd-UilCbPLW98BbbWLvFugNxh6ySbmERCjargUtGJw8c8AxXEK9' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Contest Hero */}
      <div className="relative w-full aspect-video flex items-center justify-center p-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[#181611]/80 z-10"></div>
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWzuMyXPhiYTUsfcto6vkDTN8WNtJzNB4LROFVOQ2aMBtDEe_XvdnUgTmR52T9XM4RgjaNkScWbMFieedzOTTkzw0QytxIcUqCI92TQ3WOkjb_kCs5PLSpveATHcUfwxos_p1x_ZdbjpoPcEzikPaOn9y18DIZk0Ja2YWx8BmEFqNH2RTj8JxvORAJytKZD-Hl24nSihVucYoby32ICVQSrzD6Gjd-UilCbPLW98BbbWLvFugNxh6ySbmERCjargUtGJw8c8AxXEK9" className="absolute inset-0 w-full h-full object-cover blur-sm scale-110" alt="Contest Background" />
        
        <div className="relative z-20 flex flex-col items-center">
          <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2">The Sultan Heritage Contest</p>
          <h2 className="text-white text-3xl font-serif mb-4 italic">A Legacy to Share</h2>
          <p className="text-white/70 text-xs mb-6 max-w-xs">Show us how you wear your Sultan masterpieces and win an exclusive bespoke piece from our master artisans.</p>
          <button className="bg-primary text-[#181611] px-8 py-3 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-xl active:scale-95 transition-transform">
            Enter Now
          </button>
        </div>
      </div>

      {/* Community Grid */}
      <div className="px-4 mt-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Sultan Community</h4>
            <h3 className="text-2xl font-serif tracking-tight">Recent Submissions</h3>
          </div>
          <button className="text-primary text-[10px] font-bold tracking-widest uppercase border-b border-primary/30 pb-1">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {posts.map((post, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden relative group shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${post.img}")` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="size-6 rounded-full border border-white/40 overflow-hidden bg-zinc-200">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[10px]">person</span>
                  </div>
                </div>
                <span className="text-white text-[9px] font-bold tracking-wider">{post.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contest Rules Banner */}
      <div className="px-4 mt-10">
        <div className="bg-[#221e10] rounded-2xl p-6 relative overflow-hidden flex flex-col items-start">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-white text-7xl">celebration</span>
          </div>
          <h5 className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-4 relative z-10">How to Participate</h5>
          <ul className="space-y-4 relative z-10">
            {[
              { icon: 'camera_enhance', text: 'Capture your bespoke Sultan moment' },
              { icon: 'tag', text: 'Share with #SultanHeritage' },
              { icon: 'favorite', text: 'Our artisans will select the top 3 weekly winners' }
            ].map((rule, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-primary border border-white/5">
                  <span className="material-symbols-outlined text-lg">{rule.icon}</span>
                </div>
                <p className="text-white/80 text-xs font-medium italic">{rule.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};
