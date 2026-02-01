
import React, { useState, useEffect, useRef } from 'react';
import { customerApi, formatPrice } from '../api';

export const Home: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [banners, setBanners] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = localStorage.getItem('search_query');
        const catId = localStorage.getItem('filter_category_id');
        const catName = localStorage.getItem('filter_category_name');

        setSearchQuery(query);
        setCategoryId(catId);
        setCategoryName(catName);

        if (query || catId) {
          // Fetch filtered products
          let apiParams = '';
          if (query) apiParams = `?search=${encodeURIComponent(query)}`;
          else if (catId) apiParams = `?category_id=${catId}`;

          const productRes = await customerApi.getProducts(apiParams);
          if (productRes.success) {
            setProducts(productRes.data.products);
          }
        } else {
          // Normal home data
          const [bannerRes, productRes] = await Promise.all([
            customerApi.getBanners(),
            customerApi.getProducts('?per_page=6')
          ]);

          if (bannerRes.success) {
            setBanners(bannerRes.data.banners);
          }
          if (productRes.success) {
            setProducts(productRes.data.products);
          }
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [onNavigate]); // Re-run if we navigate back to home

  const clearFilters = () => {
    localStorage.removeItem('search_query');
    localStorage.removeItem('filter_category_id');
    localStorage.removeItem('filter_category_name');
    setSearchQuery(null);
    setCategoryId(null);
    setCategoryName(null);
    // Trigger re-fetch
    window.location.reload();
  };

  useEffect(() => {
    if (isInteracting || banners.length === 0) return;

    const slideInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % banners.length;
      setCurrentSlide(nextSlide);
      scrollToSlide(nextSlide);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, isInteracting, banners]);

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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const displayBanners = banners.length > 0 ? banners : [
    {
      id: 1,
      title: 'Latest Collections',
      description: 'Exclusive Release',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPRedqBCYRuoPTe_aBT2Sf-wa9Z94qoA341aUrSqHn8ATvX1Uqp4T49NPR3mkmeusMP25ZHcMSGKQeoFTAFm4tQkWkiDrIMxsy0FW6QGHcn1qY4PE5y-yYKWBY3uezQ2SaWfVafwC2Nu1nybmm19FJLMa8uTz1Nm9hrfYVkxQdUf6r3_XcwRKniQLHw_6nsgz-tA4KUfzQtwWmrEJG4PNR5M0OpjvHMp-1NMGw9EKZ79OkQcLJaC4nTArgVcH6MHUFyQIvkwBU5EjK'
    }
  ];

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

      {/* Results Header if filtering */}
      {(searchQuery || categoryId) && (
        <div className="px-6 py-8 bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gold-muted text-[10px] font-bold uppercase tracking-widest mb-1">Search Results</p>
              <h2 className="text-2xl font-serif text-charcoal dark:text-white">
                {searchQuery ? `"${searchQuery}"` : categoryName}
              </h2>
            </div>
            <button
              onClick={clearFilters}
              className="size-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm text-zinc-400 hover:text-red-500"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <p className="text-gold-muted text-xs mt-2 italic">{products.length} pieces found</p>
        </div>
      )}

      {!searchQuery && !categoryId && (
        <>
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
              {displayBanners.map((slide, index) => (
                <div
                  key={slide.id}
                  className="flex-shrink-0 w-full snap-center relative flex flex-col items-center justify-center p-8 bg-center bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${slide.image}")`,
                  }}
                >
                  <div className="text-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-3 drop-shadow-md">
                      {slide.description || 'Exclusive Release'}
                    </p>
                    <h1 className="text-white text-4xl md:text-5xl font-light leading-tight tracking-[0.1em] uppercase font-serif drop-shadow-xl mb-8">
                      {slide.title?.split(' ')[0]}<br />
                      <span className="font-bold text-primary">{slide.title?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <button
                      onClick={() => onNavigate('search')}
                      className="bg-primary text-[#181611] px-10 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
                    >
                      Explore Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            {displayBanners.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-20">
                {displayBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`transition-all duration-500 rounded-full shadow-md ${index === currentSlide ? 'h-1.5 w-8 bg-primary' : 'h-1.5 w-1.5 bg-white/40'
                      }`}
                  />
                ))}
              </div>
            )}
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
                onClick={() => onNavigate('search')}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-3.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-lg active:scale-95 transition-transform hover:bg-white hover:text-black"
              >
                Discover Collection
              </button>
            </div>
          </div>
        </>
      )}

      {/* Products Grid (Used for both home and filtered results) */}
      <div className={`${(searchQuery || categoryId) ? 'mt-8' : 'mt-24'} shrink-0`}>
        <div className="flex items-end justify-between px-6 mb-8">
          <div>
            <h4 className="text-gold-muted text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
              {(searchQuery || categoryId) ? 'Exquisite Pieces' : 'Latest Masterpieces'}
            </h4>
            <h3 className="text-3xl font-serif tracking-tight text-charcoal dark:text-white">
              {(searchQuery || categoryId) ? 'Filtered Selection' : 'New Arrivals'}
            </h3>
          </div>
        </div>

        {products.length > 0 ? (
          <div className={`grid ${(searchQuery || categoryId) ? 'grid-cols-2 px-4 gap-4 pb-20' : 'flex overflow-x-auto px-6 gap-6 no-scrollbar pb-4'}`}>
            {products.map((item, i) => (
              <div key={item.id} className={`${(searchQuery || categoryId) ? 'w-full' : 'min-w-[240px]'} flex flex-col group cursor-pointer`} onClick={() => {
                localStorage.setItem('current_product_id', item.id);
                onNavigate('productDetail');
              }}>
                <div className="relative aspect-square mb-5 rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-primary/10 shadow-sm transition-all hover:shadow-xl">
                  <div
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  ></div>
                  {item.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="text-center px-2">
                  <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em] mb-1.5">{item.category?.name || 'Luxury Elite'}</p>
                  <h5 className="text-base font-serif font-bold mb-2 text-charcoal dark:text-white group-hover:text-primary transition-colors line-clamp-1">{item.name}</h5>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-gold-muted font-bold tracking-wider">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-zinc-300 mb-4 font-light">inventory_2</span>
            <p className="text-zinc-400 italic">No products matched your criteria.</p>
            <button onClick={clearFilters} className="mt-4 text-primary font-bold uppercase tracking-widest text-[10px] border-b border-primary">Clear all filters</button>
          </div>
        )}
      </div>

      {!searchQuery && !categoryId && (
        <>
          {/* 6. Live Auctions Preview */}
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
            {/* ... rest of the static preview ... */}
          </div>

          {/* ... regular home sections ... */}
        </>
      )}

      {/* Footer spacing */}
      <div className="h-32"></div>
    </div>
  );
};
