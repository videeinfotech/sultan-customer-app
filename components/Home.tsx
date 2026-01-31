
import React from 'react';

export const Home: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in duration-1000">
      {/* Trust Badges Banner */}
      <div className="bg-[#181611] dark:bg-black text-white py-2 flex justify-start overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-2 px-6">
          <span className="material-symbols-outlined text-primary text-sm">verified</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">GIA Certified</span>
        </div>
        <div className="flex items-center gap-2 px-6 border-l border-white/20">
          <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Insured Shipping</span>
        </div>
        <div className="flex items-center gap-2 px-6 border-l border-white/20">
          <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Lifetime Warranty</span>
        </div>
      </div>

      {/* Hero Banner Slider */}
      <div className="px-4 py-6">
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-primary/5">
          <div 
            className="bg-cover bg-center flex flex-col items-center justify-center overflow-hidden min-h-[420px] relative" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPRedqBCYRuoPTe_aBT2Sf-wa9Z94qoA341aUrSqHn8ATvX1Uqp4T49NPR3mkmeusMP25ZHcMSGKQeoFTAFm4tQkWkiDrIMxsy0FW6QGHcn1qY4PE5y-yYKWBY3uezQ2SaWfVafwC2Nu1nybmm19FJLMa8uTz1Nm9hrfYVkxQdUf6r3_XcwRKniQLHw_6nsgz-tA4KUfzQtwWmrEJG4PNR5M0OpjvHMp-1NMGw9EKZ79OkQcLJaC4nTArgVcH6MHUFyQIvkwBU5EjK")' 
            }}
          >
            <div className="z-10 text-center">
              <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Exclusive Release</p>
              <h1 className="text-primary text-3xl font-light leading-tight tracking-[0.15em] uppercase font-serif">
                Latest<br/><span className="font-bold">Collections</span>
              </h1>
              <div className="mt-6">
                <button 
                  onClick={() => onNavigate('collection')}
                  className="bg-primary/90 text-white px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:bg-primary active:scale-95 shadow-md"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-sm"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-sm"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_vE3XFZriCiiuzxCB61c9TKl8xWzzUr9HIrPGs9CswbVv29eeJEG4FWz4jP5DvRTNOiSdwrYOe4A_t7Ok09DVC7D77Ze9vIXhymTSZwN_Sn2R_8cEft-zr4Ey5J_dB0w0WGrPNfXK9Icm4VCwan5EGs6KPYMe2n23GaEm92jQqLvAmCHcbY-B7wBc_SpIOL1vHxQyRcU2VcsoSyu91I69USMUwmyXq0lYlbdd9Shi7eDTCGWBxpyGYY_t0YRiuzcvvh1JENTQXJ3q")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full px-8 flex flex-col items-center text-center">
          <p className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-3">Exquisite Craftsmanship</p>
          <h2 className="text-white text-4xl font-serif tracking-tight mb-8">The Bridal Heritage</h2>
          <button 
            onClick={() => onNavigate('collection')}
            className="bg-primary text-[#181611] px-10 py-3.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-lg active:scale-95 transition-transform"
          >
            Discover Collection
          </button>
        </div>
      </div>

      {/* Curated Departments */}
      <div className="mt-12">
        <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.3em] px-4 mb-6 text-center uppercase">Curated Departments</h4>
        <div className="flex w-full overflow-x-auto px-6 py-2 no-scrollbar">
          <div className="flex flex-row items-start justify-start gap-8">
            {[
              { label: 'Rings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WLPe5Xu1PsQi6-v33QaIltw-2hQxvXdSu8NOpiX4k-xWqdPRKhmd9EBS8B-k0MZzbEs8VsWMx941UYt__bOBIKh3gfa-rVV15TEh-pstQRiQa7fsjiNxs8OJiHGENkI6t9QhlXnvYIFVV8tNGkpAbDVU_ZmQgzka-Sfe9zupguIdJ-F1P4rf_lcxRAxC8RsLgm9Z_AZq4IT5F8XK-NNDzmRTXUL2TLaP2dDsScO3xUT5QzK9rCrByuIX0aE6cBwA-HRUXknr9cHP' },
              { label: 'Necklaces', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbtR26YgrtzsSAfUC4ZegCUNGHYKQFrsiyl-NJO2xv-9YLWMnm7W-ZvDtevM1jfG7Bp6vCRrhlERVQAa8jlGFkQY9sTlmEJqYQsc2k1aZqn3blq8Hur5sWBSE0TcCoqklzs0lteslg-BYMuMKWxz57lpuwvWvy4z2bBe_AvEfvhr3pCCxKF4PKdsQ8-HUh4oHt6KKZqUWa3fIwJ3l6cLhG7RWi07JjM1QcJSBiKGApLjn8NVujwAW8ZPoaTTUqWhoF71iy-6x9vaV' },
              { label: 'Earrings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3GTjtoC4gT78A8QBNsmgxS_7vozkgHuvIjulpcS5V43VV9OOpS1LW-4f07B-EAqjp_W-I-o25apRXN625sd0sgrvZrWvCKryNlUI6gFFTgzVWsDKD__GkfoEWkyyJWEx2NpKidwHKWEykQbCpa16SG5wzXqBkn7Yy2NkS-EzpbNg085mbddVmkDKQi47YgCesPQpOMfbZ6I_1xLkaIWehkQcWCkcO-tZQB5vt9dtcCazinnlx4iWoRuOIbLRho40RIK_iVxMAStbm' },
              { label: 'Bracelets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOw6B1lrZ9DtdgvZHhV0X4Ie1voZ4yePTZT4fIhHcyhRRCMYKuIZJ_bZPmeF2YwiQmXivYtFPtk_R-Vp9h7Sogz3XNvLGM_SD3g1IRVvjOJgk9CLmh12MPP8JkSic2KLmkMutWKVq60vGVmww74gZnK4F6ktFTimBcdgJHiG5-DvKGQt2VCZOfp0fDxjt4DPkOpVbtsWy3Z0tKdTgww5ydmemPSwXhrc80pFoSkhdN7yuHVcLnLzUmANMIufiaVUNj2-iPMXCjGwxl' }
            ].map((dept, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer" onClick={() => onNavigate('collection')}>
                <div className={`size-20 rounded-full border p-1.5 bg-white dark:bg-zinc-900 shadow-sm ${i === 0 ? 'border-primary/40' : 'border-primary/20'}`}>
                  <div 
                    className="w-full h-full rounded-full bg-center bg-cover" 
                    style={{ backgroundImage: `url("${dept.img}")` }}
                  ></div>
                </div>
                <p className={`text-[#181611] dark:text-white text-[11px] tracking-widest uppercase ${i === 0 ? 'font-bold' : 'font-medium'}`}>{dept.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="mt-20">
        <div className="flex items-end justify-between px-6 mb-6">
          <div>
            <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Latest Masterpieces</h4>
            <h3 className="text-2xl font-serif tracking-tight">New Arrivals</h3>
          </div>
          <button 
            onClick={() => onNavigate('collection')}
            className="text-primary text-[10px] font-bold tracking-widest uppercase border-b border-primary/30 pb-1"
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto px-6 gap-6 no-scrollbar">
          {[
            { label: 'Emerald Cut Brilliance', price: '$12,450', cat: 'Solitaire Elite', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WLPe5Xu1PsQi6-v33QaIltw-2hQxvXdSu8NOpiX4k-xWqdPRKhmd9EBS8B-k0MZzbEs8VsWMx941UYt__bOBIKh3gfa-rVV15TEh-pstQRiQa7fsjiNxs8OJiHGENkI6t9QhlXnvYIFVV8tNGkpAbDVU_ZmQgzka-Sfe9zupguIdJ-F1P4rf_lcxRAxC8RsLgm9Z_AZq4IT5F8XK-NNDzmRTXUL2TLaP2dDsScO3xUT5QzK9rCrByuIX0aE6cBwA-HRUXknr9cHP' },
            { label: 'Diamond Halo Band', price: '$8,900', cat: 'Pavé Collection', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv21wFSazT1EaJ1OKzG3ewmqEMtkmVjM8e_7kmkP2e2-1SaTGL0LyBZPfh8fm14n4VP73gTMWq3savRoIjnK8RoXeWaHZiCZoNWeESO8cD5NT1zLz3h_6OL3UYsti9oKUjeNi_K246vBLKH5F84KWGFP73MPLXTddmyhlNCMidJCUz31IP5eLeUFxZQLBcwZ_szpBz5Gn5qj_-roUeXAgp5k_dZmR3ohh8guFtGncg-Iczx-S-ltuQAe-UZyOTYFbNHD_sOfkPLfuh' }
          ].map((item, i) => (
            <div key={i} className="min-w-[200px] flex flex-col group cursor-pointer" onClick={() => onNavigate('productDetail')}>
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-[#f9f9f9] dark:bg-white/5 border border-primary/5">
                <div 
                  className="absolute inset-0 bg-center bg-cover" 
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gold-muted hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gold-muted uppercase tracking-widest mb-1">{item.cat}</p>
                <h5 className="text-sm font-semibold mb-2">{item.label}</h5>
                <p className="text-primary font-bold tracking-wider">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bespoke Services */}
      <div className="mt-20 px-4">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
          <div 
            className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWzuMyXPhiYTUsfcto6vkDTN8WNtJzNB4LROFVOQ2aMBtDEe_XvdnUgTmR52T9XM4RgjaNkScWbMFieedzOTTkzw0QytxIcUqCI92TQ3WOkjb_kCs5PLSpveATHcUfwxos_p1x_ZdbjpoPcEzikPaOn9y18DIZk0Ja2YWx8BmEFqNH2RTj8JxvORAJytKZD-Hl24nSihVucYoby32ICVQSrzD6Gjd-UilCbPLW98BbbWLvFugNxh6ySbmERCjargUtGJw8c8AxXEK9")' }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
            <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2">The Personal Touch</p>
            <h3 className="text-white text-2xl font-serif mb-4">Bespoke Design Services</h3>
            <button 
              onClick={() => onNavigate('studio')}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Start Your Creation
            </button>
          </div>
        </div>
      </div>

      <div className="h-20 shrink-0"></div>
    </div>
  );
};
