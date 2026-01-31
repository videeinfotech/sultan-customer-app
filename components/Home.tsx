
import React, { useState, useEffect, useRef } from 'react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Latest Collections',
    subtitle: 'Exclusive Release',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPRedqBCYRuoPTe_aBT2Sf-wa9Z94qoA341aUrSqHn8ATvX1Uqp4T49NPR3mkmeusMP25ZHcMSGKQeoFTAFm4tQkWkiDrIMxsy0FW6QGHcn1qY4PE5y-yYKWBY3uezQ2SaWfVafwC2Nu1nybmm19FJLMa8uTz1Nm9hrfYVkxQdUf6r3_XcwRKniQLHw_6nsgz-tA4KUfzQtwWmrEJG4PNR5M0OpjvHMp-1NMGw9EKZ79OkQcLJaC4nTArgVcH6MHUFyQIvkwBU5EjK'
  },
  {
    id: 2,
    title: 'Heritage Polki',
    subtitle: 'Timeless Artistry',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2oFT6P_mZs5sswbfE0vwXRUckKl6CM0AOtnp8nTD2-NzagZ-Mz3XWaachhcqPOZp9_A2aA9dg2Miu5bfFqE5jfHlNQG1hOZ97Ux4xCDuE1e4WyZzjCX4z6BsMTkq9FYInSgFwsZLJWZPq_oI5gFRJ4KvvFDWRXJPtlpNSlKNNsP138-7EgU6TYRNO4tuRmaHt3vbMMDXkx8mVtQVQeTYYF4fkcB70gLGEkGD4fu_xojkaZCrUShhyy0o-8eeF2dNHEj73jU-KG4IE'
  },
  {
    id: 3,
    title: 'The Royal Solitaire',
    subtitle: 'Pure Brilliance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMXuLxBJfNfqMIo0i-X7GQsI6D2Y8nWxQMN03Jt8IQzyW6kCWvoK_qv9AzQkeIT9AKAFpQRv_vypGukbADLFtC5r5LxEq8EyFPew13jaqbXQwBN_V2hswfpKLZtOdYKQiRqoyhNxd97aINK7NTJczJn5xvF_GLbGJVOmh6QvGFmvfaWKBSLHjzHm4ezeDRy2qoiLuLjX1K5-gFsMMMDMlpeZJweCeWTVRuLAQ9wtWz4r0y7W4KZv2w5GMfEo1bqUdUiM0xQLin2owe'
  }
];

export const Home: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isInteracting) return;
    
    const slideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % HERO_SLIDES.length;
      setCurrentSlide(nextSlide);
      scrollToSlide(nextSlide);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, isInteracting]);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    const width = sliderRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / width);
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in duration-1000 bg-background-light dark:bg-background-dark">
      
      {/* 1. Trust Badges Banner */}
      <div className="bg-[#181611] dark:bg-black text-white py-3 flex justify-start overflow-x-auto no-scrollbar whitespace-nowrap shrink-0 border-b border-primary/20">
        <div className="flex items-center gap-2 px-6">
          <span className="material-symbols-outlined text-primary text-sm">verified</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">GIA Certified</span>
        </div>
        <div className="flex items-center gap-2 px-6 border-l border-white/10">
          <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Insured Shipping</span>
        </div>
        <div className="flex items-center gap-2 px-6 border-l border-white/10">
          <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Lifetime Warranty</span>
        </div>
      </div>

      {/* 2. Swipable Auto-Scrolling Hero Slider */}
      <div className="px-0 py-0 shrink-0 relative group">
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          onMouseDown={() => setIsInteracting(true)}
          onMouseUp={() => setIsInteracting(false)}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full min-h-[460px] bg-white dark:bg-zinc-950"
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full snap-center relative flex flex-col items-center justify-center p-8 bg-center bg-cover"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${slide.image}")`,
              }}
            >
              <div className="text-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-3 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <h1 className="text-white text-4xl md:text-5xl font-light leading-tight tracking-[0.1em] uppercase font-serif drop-shadow-xl mb-8">
                  {slide.title.split(' ')[0]}<br/>
                  <span className="font-bold text-primary">{slide.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <button 
                  onClick={() => onNavigate('collection')}
                  className="bg-primary text-[#181611] px-10 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`transition-all duration-500 rounded-full shadow-md ${
                index === currentSlide ? 'h-1.5 w-8 bg-primary' : 'h-1.5 w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Heritage Banner Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden shrink-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_vE3XFZriCiiuzxCB61c9TKl8xWzzUr9HIrPGs9CswbVv29eeJEG4FWz4jP5DvRTNOiSdwrYOe4A_t7Ok09DVC7D77Ze9vIXhymTSZwN_Sn2R_8cEft-zr4Ey5J_dB0w0WGrPNfXK9Icm4VCwan5EGs6KPYMe2n23GaEm92jQqLvAmCHcbY-B7wBc_SpIOL1vHxQyRcU2VcsoSyu91I69USMUwmyXq0lYlbdd9Shi7eDTCGWBxpyGYY_t0YRiuzcvvh1JENTQXJ3q")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-0 w-full px-8 flex flex-col items-center text-center">
          <p className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-3">Exquisite Craftsmanship</p>
          <h2 className="text-white text-4xl font-serif tracking-tight mb-8">The Bridal Heritage</h2>
          <button 
            onClick={() => onNavigate('collection')}
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-3.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-lg active:scale-95 transition-transform hover:bg-white hover:text-black"
          >
            Discover Collection
          </button>
        </div>
      </div>

      {/* 4. Curated Departments */}
      <div className="mt-16 shrink-0">
        <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.3em] px-4 mb-8 text-center uppercase">Curated Departments</h4>
        <div className="flex w-full overflow-x-auto px-6 py-2 no-scrollbar">
          <div className="flex flex-row items-start justify-start gap-8">
            {[
              { label: 'Rings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WLPe5Xu1PsQi6-v33QaIltw-2hQxvXdSu8NOpiX4k-xWqdPRKhmd9EBS8B-k0MZzbEs8VsWMx941UYt__bOBIKh3gfa-rVV15TEh-pstQRiQa7fsjiNxs8OJiHGENkI6t9QhlXnvYIFVV8tNGkpAbDVU_ZmQgzka-Sfe9zupguIdJ-F1P4rf_lcxRAxC8RsLgm9Z_AZq4IT5F8XK-NNDzmRTXUL2TLaP2dDsScO3xUT5QzK9rCrByuIX0aE6cBwA-HRUXknr9cHP' },
              { label: 'Necklaces', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbtR26YgrtzsSAfUC4ZegCUNGHYKQFrsiyl-NJO2xv-9YLWMnm7W-ZvDtevM1jfG7Bp6vCRrhlERVQAa8jlGFkQY9sTlmEJqYQsc2k1aZqn3blq8Hur5sWBSE0TcCoqklzs0lteslg-BYMuMKWxz57lpuwvWvy4z2bBe_AvEfvhr3pCCxKF4PKdsQ8-HUh4oHt6KKZqUWa3fIwJ3l6cLhG7RWi07JjM1QcJSBiKGApLjn8NVujwAW8ZPoaTTUqWhoF71iy-6x9vaV' },
              { label: 'Earrings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3GTjtoC4gT78A8QBNsmgxS_7vozkgHuvIjulpcS5V43VV9OOpS1LW-4f07B-EAqjp_W-I-o25apRXN625sd0sgrvZrWvCKryNlUI6gFFTgzVWsDKD__GkfoEWkyyJWEx2NpKidwHKWEykQbCpa16SG5wzXqBkn7Yy2NkS-EzpbNg085mbddVmkDKQi47YgCesPQpOMfbZ6I_1xLkaIWehkQcWCkcO-tZQB5vt9dtcCazinnlx4iWoRuOIbLRho40RIK_iVxMAStbm' },
              { label: 'Bracelets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOw6B1lrZ9DtdgvZHhV0X4Ie1voZ4yePTZT4fIhHcyhRRCMYKuIZJ_bZPmeF2YwiQmXivYtFPtk_R-Vp9h7Sogz3XNvLGM_SD3g1IRVvjOJgk9CLmh12MPP8JkSic2KLmkMutWKVq60vGVmww74gZnK4F6ktFTimBcdgJHiG5-DvKGQt2VCZOfp0fDxjt4DPkOpVbtsWy3Z0tKdTgww5ydmemPSwXhrc80pFoSkhdN7yuHVcLnLzUmANMIufiaVUNj2-iPMXCjGwxl' }
            ].map((dept, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[80px] cursor-pointer group" onClick={() => onNavigate('collection')}>
                <div className={`size-20 rounded-full border-2 p-1.5 bg-white dark:bg-zinc-900 shadow-md transition-all group-hover:border-primary ${i === 0 ? 'border-primary/60' : 'border-primary/20'}`}>
                  <div 
                    className="w-full h-full rounded-full bg-center bg-cover" 
                    style={{ backgroundImage: `url("${dept.img}")` }}
                  ></div>
                </div>
                <p className={`text-[#181611] dark:text-white text-[11px] tracking-widest uppercase transition-colors group-hover:text-primary ${i === 0 ? 'font-bold' : 'font-medium'}`}>{dept.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. New Arrivals Section */}
      <div className="mt-24 shrink-0">
        <div className="flex items-end justify-between px-6 mb-8">
          <div>
            <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Latest Masterpieces</h4>
            <h3 className="text-3xl font-serif tracking-tight text-charcoal dark:text-white">New Arrivals</h3>
          </div>
          <button 
            onClick={() => onNavigate('collection')}
            className="text-primary text-[10px] font-bold tracking-widest uppercase border-b-2 border-primary/30 pb-1.5 transition-all hover:border-primary"
          >
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto px-6 gap-6 no-scrollbar pb-4">
          {[
            { label: 'Emerald Cut Brilliance', price: '$12,450', cat: 'Solitaire Elite', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WLPe5Xu1PsQi6-v33QaIltw-2hQxvXdSu8NOpiX4k-xWqdPRKhmd9EBS8B-k0MZzbEs8VsWMx941UYt__bOBIKh3gfa-rVV15TEh-pstQRiQa7fsjiNxs8OJiHGENkI6t9QhlXnvYIFVV8tNGkpAbDVU_ZmQgzka-Sfe9zupguIdJ-F1P4rf_lcxRAxC8RsLgm9Z_AZq4IT5F8XK-NNDzmRTXUL2TLaP2dDsScO3xUT5QzK9rCrByuIX0aE6cBwA-HRUXknr9cHP' },
            { label: 'Diamond Halo Band', price: '$8,900', cat: 'Pavé Collection', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv21wFSazT1EaJ1OKzG3ewmqEMtkmVjM8e_7kmkP2e2-1SaTGL0LyBZPfh8fm14n4VP73gTMWq3savRoIjnK8RoXeWaHZiCZoNWeESO8cD5NT1zLz3h_6OL3UYsti9oKUjeNi_K246vBLKH5F84KWGFP73MPLXTddmyhlNCMidJCUz31IP5eLeUFxZQLBcwZ_szpBz5Gn5qj_-roUeXAgp5k_dZmR3ohh8guFtGncg-Iczx-S-ltuQAe-UZyOTYFbNHD_sOfkPLfuh' }
          ].map((item, i) => (
            <div key={i} className="min-w-[240px] flex flex-col group cursor-pointer" onClick={() => onNavigate('productDetail')}>
              <div className="relative aspect-square mb-5 rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-primary/10 shadow-sm transition-all hover:shadow-xl">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="absolute top-4 right-4 size-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gold-muted hover:text-red-500 transition-all active:scale-90 shadow-sm"
                >
                  <span className="material-symbols-outlined text-xl">favorite</span>
                </button>
              </div>
              <div className="text-center px-2">
                <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em] mb-1.5">{item.cat}</p>
                <h5 className="text-base font-serif font-bold mb-2 text-charcoal dark:text-white group-hover:text-primary transition-colors">{item.label}</h5>
                <p className="text-gold-muted font-bold tracking-wider">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Live Auctions Preview (NEW) */}
      <div className="mt-24 shrink-0 bg-primary/5 py-12">
        <div className="flex items-center justify-between px-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Live Now</h4>
            </div>
            <h3 className="text-3xl font-serif tracking-tight text-charcoal dark:text-white">Elite Auctions</h3>
          </div>
          <button 
            onClick={() => onNavigate('auctions')}
            className="bg-[#181611] dark:bg-primary text-white dark:text-[#181611] px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all active:scale-95"
          >
            Enter Gallery
          </button>
        </div>
        <div className="flex overflow-x-auto px-6 gap-6 no-scrollbar pb-2">
          {[
            { title: 'Pear Drop Diamond', price: '$24,500', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvvCEJ1WeRGneQq7N1X60az1VJ_5_z_sQc7FQVYE2buPegqEq-jQEHVRmtr5s00UuWSGyaCF7I40FjbAEk87GoXLX_zPoISa5TGsu7Ji4sZ4-5ugptvY9pT1B5bzh99KogqdVyOW4PS_77y5vtBsu-Kvefx-w98lVniNUVSwpF_wwMO5QGsYfYvBfI2Ln04xYxLzuSh7ZvMI-O_0BUGimuvNlJnbX1rMGMbgzfLYd4aLyzJPl19oFlCGNCxdBR4YnH1FMUzmWgmQPd' },
            { title: 'Imperial Canary Ring', price: '$12,200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy5uKsdTJvtQDVWeEB8yPh8fWp8pAmuQbwoqw-E8zIdrErBa641KlPs9sdSCG8AAc3egUsDgy_h0ECYgpT-Bu-hbl1HH9c7MNc-yhiGNDnUIZS3Qed1_OMyEs0syfLyP_zdMf492y94W01C-GLbB46prDopQtNq4NzipO8NqiKctBxOmpqUnv80Kk_z0d8z1UoWeRw_a6tsq7fi4lsB2YirAw-SaDKThgncf9NXQGz3XrF-8nTny3s1wMUD8j4e4tTOj3etIWGXmjP' }
          ].map((auc, i) => (
            <div key={i} className="min-w-[280px] bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-xl border border-primary/10 flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={auc.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={auc.title} />
                <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-tighter">
                  Lot #00{i+1}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-charcoal dark:text-white text-lg font-serif font-bold mb-1">{auc.title}</h3>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-gold-muted text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Current Bid</p>
                    <p className="text-primary text-2xl font-bold leading-none">{auc.price}</p>
                  </div>
                  <button className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Exquisite Contests Preview (NEW) */}
      <div className="mt-24 px-6 shrink-0">
        <div className="text-center mb-10">
          <p className="text-gold-muted text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Editorial Series</p>
          <h3 className="text-3xl font-serif text-charcoal dark:text-white italic">Exquisite Contests</h3>
          <div className="w-12 h-[1px] bg-primary mx-auto mt-4"></div>
        </div>
        
        <div 
          onClick={() => onNavigate('social')}
          className="relative group cursor-pointer aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-primary/10"
        >
          <div 
            className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8kzq19oL0VK88U3nyy3dG-PDpsxMHs6e14DXzOoWJThuDi8cC_Wedb3edTMjIciug52iKwiTL5TgeEK1UUw0v0cb-PN6s9DbhhKqE3XfLKAjPlZT5TzAzJgUNRltchqLG-JrUZc9X-fqcrSdo75zViD-GbDCx0CTLTW9lwjXCuQVX9-dEkLbhJm2BbGpyEJJvz38tvSEzl6isoCe7-VUtKljDlEsPsDomoel9i14RrST1Fyw7PUdjsKbkdshZQB01Lw6eFeyBkFe9")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-black text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">Active Contest</span>
              <span className="text-white/60 text-[10px] font-medium tracking-wider">Join 1.2k participants</span>
            </div>
            <h4 className="text-white text-2xl font-serif font-bold mb-2">The Royal Gala Giveaway</h4>
            <p className="text-white/70 text-sm leading-tight max-w-[280px] mb-6 font-noto">Win a signature 2-carat Emerald Cut Ring inspired by royal heritage.</p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg group-hover:bg-primary transition-colors">
                Enter Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Bespoke Services Banner (Updated numbering) */}
      <div className="mt-24 px-6 shrink-0 pb-32">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden group shadow-2xl">
          <div 
            className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWzuMyXPhiYTUsfcto6vkDTN8WNtJzNB4LROFVOQ2aMBtDEe_XvdnUgTmR52T9XM4RgjaNkScWbMFieedzOTTkzw0QytxIcUqCI92TQ3WOkjb_kCs5PLSpveATHcUfwxos_p1x_ZdbjpoPcEzikPaOn9y18DIZk0Ja2YWx8BmEFqNH2RTj8JxvORAJytKZD-Hl24nSihVucYoby32ICVQSrzD6Gjd-UilCbPLW98BbbWLvFugNxh6ySbmERCjargUtGJw8c8AxXEK9")' }}
          ></div>
          <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center">
            <p className="text-primary text-[11px] font-bold tracking-[0.4em] uppercase mb-4">The Personal Touch</p>
            <h3 className="text-white text-3xl font-serif mb-6 leading-tight">Bespoke Heritage<br/>Design Studio</h3>
            <button 
              onClick={() => onNavigate('studio')}
              className="bg-primary text-[#181611] px-10 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Your Creation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
