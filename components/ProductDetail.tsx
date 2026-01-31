
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';

interface ProductDetailProps {
  onNavigate: (view: View) => void;
  product?: {
    id: string;
    title: string;
    image: string;
    price: string;
    tag?: string;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onNavigate, product }) => {
  const [selectedMetal, setSelectedMetal] = useState('yellow');
  const [selectedSize, setSelectedSize] = useState('6');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayProduct = product || {
    id: '1',
    title: 'The Royal Solitaire',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMXuLxBJfNfqMIo0i-X7GQsI6D2Y8nWxQMN03Jt8IQzyW6kCWvoK_qv9AzQkeIT9AKAFpQRv_vypGukbADLFtC5r5LxEq8EyFPew13jaqbXQwBN_V2hswfpKLZtOdYKQiRqoyhNxd97aINK7NTJczJn5xvF_GLbGJVOmh6QvGFmvfaWKBSLHjzHm4ezeDRy2qoiLuLjX1K5-gFsMMMDMlpeZJweCeWTVRuLAQ9wtWz4r0y7W4KZv2w5GMfEo1bqUdUiM0xQLin2owe',
    price: '$18,450',
    tag: 'Premium Artisan Selection'
  };

  const galleryImages = [
    displayProduct.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAQDNNGxz1JHdu31suMN_0it41iHx4uoYZnAzW-94IINNHiCSzbyNn5eTfNDwcbXpT9rPuCbmCLIvKfQ4ApnOAdpYBv4REgwKyxEqd0CgOxayLjtuGfEFnB2cgaalC0SL73KLr8N1JNXEH4Mu-Nq9eSEsc9TAOqd6bbvLUi18H7GF8CF6DwEKp6a3nsydzIS-1AteZ2zJDy11ma9sRh4GuKX9ApEkCUMvCSmniMbBLkTb19u8QYuPk_E1l-aK5bwNjB8mPa7DiItM7A',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOd5h6UAo41CPT3KFqW_kyHZcssY7jmakqYwiNKzWTMaVgM99NxdozcQpmHm0t0XET8defrpKbwRSRVuOJYCzfQvx4E-Z2fOrsbBF6Fy4E7GGMyNV0q0yeU8wMHH3GZwarZuHiNeMwGSbpgDMUUIDASeQc29cPLfU9pSMGQ4LVTnov67e6ILXl1_mqfDL6yTSaNf6OWf81VS6RKuVc40y1nd2V487gqF6iTUlkt_l3oHhkA1GC8Q0XcWuBGIdqLjMv9eXs63tViSdK',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBrp3UyyZDobM8H6YXmXIcLIyX9NYXnQWyqURXcpDrbsP4gGc5zn4OFKIhxfC7OwYFLAaL3F_zLG3ctjDWNkM2Bl4cfReQHvmEuw36DIvwyFMeB_e1s5QVAJiAOb04WNVzg9iVh5RNj5uKgA3zBnfVWTfaosVO1wipVtOOjkxpWGH-3e3UiT58i3YlVspSDLfIuzlN2HufxBklOXk8Wr9HcyCGHHR7S89NPapoGMOAASLNrNcIF5DrJmxk5qs5X9Doaj9YXmJ-ePPn4'
  ];

  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5'];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / width);
    if (newIndex !== activeImageIndex) {
      setActiveImageIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-[480px] mx-auto overflow-x-hidden pb-40 bg-background-light dark:bg-background-dark text-charcoal dark:text-white antialiased">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between">
        <div 
          onClick={() => onNavigate('collection')}
          className="text-charcoal dark:text-white flex size-12 shrink-0 items-center cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
        </div>
        <h2 className="text-charcoal dark:text-white text-lg font-serif font-bold leading-tight tracking-[-0.015em] flex-1 text-center">The Imperial Collection</h2>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-charcoal dark:text-white gap-2 text-base font-bold leading-normal transition-all active:scale-90"
          >
            <span className={`material-symbols-outlined ${isWishlisted ? 'text-red-500 fill-1' : ''}`} style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
          </button>
        </div>
      </div>

      {/* Swipable Hero Image Section */}
      <div className="relative group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-white dark:bg-zinc-950 min-h-[420px]"
        >
          {galleryImages.map((img, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-full snap-center flex flex-col justify-end min-h-[420px] bg-center bg-no-repeat bg-contain"
              style={{ 
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 30%), url("${img}")` 
              }}
            />
          ))}
        </div>

        {/* Floating Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {galleryImages.map((_, i) => (
            <div 
              key={i}
              onClick={() => scrollToImage(i)}
              className={`size-2 rounded-full cursor-pointer transition-all pointer-events-auto ${activeImageIndex === i ? 'bg-primary w-5' : 'bg-white opacity-40 shadow-sm'}`}
            ></div>
          ))}
        </div>

        {/* Thumbnail Preview strip below main image */}
        <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollToImage(i)}
              className={`flex-shrink-0 size-14 rounded-lg border-2 overflow-hidden transition-all ${activeImageIndex === i ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-zinc-100 dark:border-zinc-800 opacity-60'}`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Virtual Try-On */}
      <div className="flex px-4 py-4 justify-center">
        <button className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 bg-primary/10 border border-primary/30 text-charcoal dark:text-white gap-3 text-base font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>view_in_ar</span>
          <span className="font-serif">Virtual Try-On</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="px-4">
        <div className="flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">star</span>
          <span className="text-xs font-bold tracking-widest uppercase">Premium Artisan Selection</span>
        </div>
        <h1 className="text-charcoal dark:text-white tracking-tight text-3xl font-serif font-bold leading-tight pb-2">{displayProduct.title}</h1>
        <div className="flex items-baseline gap-2">
          <h2 className="text-primary text-2xl font-serif font-bold leading-tight tracking-[-0.015em] pb-6">{displayProduct.price}</h2>
          <span className="text-charcoal/50 dark:text-white/50 text-sm line-through">$22,000</span>
        </div>
      </div>

      {/* Metal Selection */}
      <div className="px-4 py-4">
        <p className="text-charcoal/70 dark:text-white/70 text-sm font-bold uppercase tracking-wider mb-4">Select Metal</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setSelectedMetal('yellow')}
              className={`size-12 rounded-full border-2 transition-all ${selectedMetal === 'yellow' ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-200'} bg-gradient-to-tr from-[#f8f8f5] to-[#f2b90d]`}
            ></button>
            <span className={`text-xs ${selectedMetal === 'yellow' ? 'font-bold' : 'text-charcoal/60 dark:text-white/60'}`}>Yellow Gold</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setSelectedMetal('white')}
              className={`size-12 rounded-full border-2 transition-all ${selectedMetal === 'white' ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-200'} bg-gradient-to-tr from-[#f8f8f5] to-[#e5e5e5]`}
            ></button>
            <span className={`text-xs ${selectedMetal === 'white' ? 'font-bold' : 'text-charcoal/60 dark:text-white/60'}`}>White Gold</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setSelectedMetal('rose')}
              className={`size-12 rounded-full border-2 transition-all ${selectedMetal === 'rose' ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-200'} bg-gradient-to-tr from-[#f8f8f5] to-[#f4c2c2]`}
            ></button>
            <span className={`text-xs ${selectedMetal === 'rose' ? 'font-bold' : 'text-charcoal/60 dark:text-white/60'}`}>Rose Gold</span>
          </div>
        </div>
      </div>

      {/* Size Selection */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-charcoal/70 dark:text-white/70 text-sm font-bold uppercase tracking-wider">Select Size (US)</p>
          <button className="text-primary text-xs font-bold underline">Size Guide</button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {sizes.map((s) => (
            <button 
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`flex-shrink-0 size-12 rounded-lg border flex items-center justify-center font-bold transition-all active:scale-95 ${
                selectedSize === s 
                  ? 'border-2 border-primary bg-primary/5 text-primary' 
                  : 'border-charcoal/10 dark:border-white/10 text-charcoal dark:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Sultan's Promise */}
      <div className="mt-8 bg-charcoal text-white py-12 px-6">
        <div className="max-w-xs mx-auto text-center">
          <h3 className="font-serif italic text-2xl mb-4">The Sultan's Promise</h3>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          <div 
            className="mb-8 rounded-lg overflow-hidden h-48 w-full bg-cover bg-center shadow-2xl" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOd5h6UAo41CPT3KFqW_kyHZcssY7jmakqYwiNKzWTMaVgM99NxdozcQpmHm0t0XET8defrpKbwRSRVuOJYCzfQvx4E-Z2fOrsbBF6Fy4E7GGMyNV0q0yeU8wMHH3GZwarZuHiNeMwGSbpgDMUUIDASeQc29cPLfU9pSMGQ4LVTnov67e6ILXl1_mqfDL6yTSaNf6OWf81VS6RKuVc40y1nd2V487gqF6iTUlkt_l3oHhkA1GC8Q0XcWuBGIdqLjMv9eXs63tViSdK")' }}
          ></div>
          <p className="font-serif text-sm leading-relaxed text-white/80 italic">
            "Each diamond is hand-selected by our master jewelers, ensuring a brilliance that matches the sun over the palace. Crafted with 24-carat precision for the modern royalty."
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="px-4 py-10">
        <h3 className="font-serif font-bold text-xl mb-6">Specifications</h3>
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">Carat Weight</p>
            <p className="font-bold">2.50 CT</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">Clarity</p>
            <p className="font-bold">VVS1</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">Metal</p>
            <p className="font-bold">18K Solid Gold</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">Cut</p>
            <p className="font-bold">Excellent</p>
          </div>
        </div>
      </div>

      {/* Price Breakup Accordion */}
      <div className="px-4 py-6 border-t border-charcoal/5 dark:border-white/5">
        <div 
          onClick={() => setIsPriceBreakupOpen(!isPriceBreakupOpen)}
          className="flex items-center justify-between cursor-pointer py-2 group"
        >
          <h3 className="font-serif font-bold text-xl">Price Breakup</h3>
          <span className={`material-symbols-outlined transition-transform duration-300 text-primary ${isPriceBreakupOpen ? 'rotate-180' : ''}`}>expand_more</span>
        </div>
        
        {isPriceBreakupOpen && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
              <p className="text-sm font-serif">Gold Value (18K, 4.2g)</p>
              <p className="font-sans font-bold">$3,120.00</p>
            </div>
            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
              <p className="text-sm font-serif">Diamond Value (2.50 CT, VVS1)</p>
              <p className="font-sans font-bold">$13,850.00</p>
            </div>
            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
              <p className="text-sm font-serif">Labour & Making Charges</p>
              <p className="font-sans font-bold">$943.00</p>
            </div>
            <div className="flex justify-between items-center border-b border-primary/10 pb-3">
              <p className="text-sm font-serif">GST (3%)</p>
              <p className="font-sans font-bold">$537.00</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="font-serif font-bold text-lg text-charcoal dark:text-white uppercase tracking-wider">Total Amount</p>
              <p className="font-serif font-bold text-2xl text-primary">$18,450.00</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Masterpieces */}
      <div className="py-10 bg-white dark:bg-charcoal/20">
        <div className="px-4 mb-6 flex justify-between items-end">
          <div>
            <h3 className="font-serif font-bold text-xl">Related Masterpieces</h3>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Curated for your taste</p>
          </div>
          <button 
            onClick={() => onNavigate('collection')}
            className="text-xs font-bold uppercase tracking-wider text-charcoal/50 dark:text-white/50 border-b border-charcoal/20 pb-0.5"
          >
            View All
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto px-4 pb-6 no-scrollbar">
          {[
            { id: 'rel1', title: "The Sultan's Crest", tag: 'Eternity Band', price: '$12,200', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQDNNGxz1JHdu31suMN_0it41iHx4uoYZnAzW-94IINNHiCSzbyNn5eTfNDwcbXpT9rPuCbmCLIvKfQ4ApnOAdpYBv4REgwKyxEqd0CgOxayLjtuGfEFnB2cgaalC0SL73KLr8N1JNXEH4Mu-Nq9eSEsc9TAOqd6bbvLUi18H7GF8CF6DwEKp6a3nsydzIS-1AteZ2zJDy11ma9sRh4GuKX9ApEkCUMvCSmniMbBLkTb19u8QYuPk_E1l-aK5bwNjB8mPa7DiItM7A" },
            { id: 'rel2', title: "Noor-e-Almas", tag: 'Bridal Halo', price: '$15,800', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOd5h6UAo41CPT3KFqW_kyHZcssY7jmakqYwiNKzWTMaVgM99NxdozcQpmHm0t0XET8defrpKbwRSRVuOJYCzfQvx4E-Z2fOrsbBF6Fy4E7GGMyNV0q0yeU8wMHH3GZwarZuHiNeMwGSbpgDMUUIDASeQc29cPLfU9pSMGQ4LVTnov67e6ILXl1_mqfDL6yTSaNf6OWf81VS6RKuVc40y1nd2V487gqF6iTUlkt_l3oHhkA1GC8Q0XcWuBGIdqLjMv9eXs63tViSdK" },
            { id: 'rel3', title: "Royal Marquis Pearl", tag: 'Marquis Cut', price: '$21,400', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMXuLxBJfNfqMIo0i-X7GQsI6D2Y8nWxQMN03Jt8IQzyW6kCWvoK_qv9AzQkeIT9AKAFpQRv_vypGukbADLFtC5r5LxEq8EyFPew13jaqbXQwBN_V2hswfpKLZtOdYKQiRqoyhNxd97aINK7NTJczJn5xvF_GLbGJVOmh6QvGFmvfaWKBSLHjzHm4ezeDRy2qoiLuLjX1K5-gFsMMMDMlpeZJweCeWTVRuLAQ9wtWz4r0y7W4KZv2w5GMfEo1bqUdUiM0xQLin2owe" }
          ].map((item) => (
            <div key={item.id} className="flex-shrink-0 w-64 bg-background-light dark:bg-charcoal/50 rounded-2xl overflow-hidden shadow-sm border border-charcoal/5 dark:border-white/5">
              <div className="relative aspect-square">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 size-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase font-bold text-charcoal/40 dark:text-white/40 tracking-widest mb-1">{item.tag}</p>
                <h4 className="font-serif font-bold text-base mb-2 text-charcoal dark:text-white">{item.title}</h4>
                <p className="font-serif text-primary font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-charcoal/5 dark:border-white/5 p-4 pb-10">
        <div className="max-w-[480px] mx-auto flex gap-3">
          <button 
            onClick={() => onNavigate('cart')}
            className="flex-1 h-14 rounded-xl border border-charcoal/20 dark:border-white/20 bg-transparent text-charcoal dark:text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] active:bg-zinc-50 dark:active:bg-zinc-800"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            Add to Bag
          </button>
          <button 
            onClick={() => onNavigate('checkout')}
            className="flex-[1.5] h-14 rounded-xl bg-primary text-charcoal font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] active:brightness-110"
          >
            Proceed to Buy
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
