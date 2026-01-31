
import React, { useState } from 'react';
import { CollectionItem } from '../types';

const ITEMS: CollectionItem[] = [
  {
    id: '1',
    title: 'Royal Marquise Pendant',
    description: 'A masterpiece of precision and heritage.',
    category: 'Necklaces',
    tag: 'High Jewelry',
    carat: '1.25ct',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrp3UyyZDobM8H6YXmXIcLIyX9NYXnQWyqURXcpDrbsP4gGc5zn4OFKIhxfC7OwYFLAaL3F_zLG3ctjDWNkM2Bl4cfReQHvmEuw36DIvwyFMeB_e1s5QVAJiAOb04WNVzg9iVh5RNj5uKgA3zBnfVWTfaosVO1wipVtOOjkxpWGH-3e3UiT58i3YlVspSDLfIuzlN2HufxBklOXk8Wr9HcyCGHHR7S89NPapoGMOAASLNrNcIF5DrJmxk5qs5X9Doaj9YXmJ-ePPn4',
    price: '$12,500'
  },
  {
    id: '2',
    title: 'Sultan Halo Ring',
    description: 'The ultimate statement of bridal elegance.',
    category: 'Rings',
    tag: 'Bridal Elite',
    carat: '0.95ct',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2oFT6P_mZs5sswbfE0vwXRUckKl6CM0AOtnp8nTD2-NzagZ-Mz3XWaachhcqPOZp9_A2aA9dg2Miu5bfFqE5jfHlNQG1hOZ97Ux4xCDuE1e4WyZzjCX4z6BsMTkq9FYInSgFwsZLJWZPq_oI5gFRJ4KvvFDWRXJPtlpNSlKNNsP138-7EgU6TYRNO4tuRmaHt3vbMMDXkx8mVtQVQeTYYF4fkcB70gLGEkGD4fu_xojkaZCrUShhyy0o-8eeF2dNHEj73jU-KG4IE',
    price: '$8,900'
  },
  {
    id: '3',
    title: 'Starlight Studs',
    description: 'Celestial brilliance captured in diamonds.',
    category: 'Earrings',
    tag: 'Celestial',
    carat: '0.50ct',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfTwbl3XyfTesaUlHECx044oi7uDCjEaknpmjTQoS3hQWwU8yZzBhlaVRQJ39VtB_nEWN4vCs9CUs_7fwyrqi2HlLNc8kQqvXOXc52xk4fQVzoN7gUmc6D4uUGW7wX5AWULZo9fE29fu7je9t0Zk7dwAucVI3yuz-dxXE4Wq0cfP_jcrm56B96tAqey8YOi2BkBBwTXo_WW0c0dHHs9egplY08nU2hSfumqZOdAX0vx0aAvj1qv6HOML3y_sDnpKfwuqYUmxvAXuY0',
    price: '$4,200'
  },
  {
    id: '4',
    title: 'Infinite Link Bangle',
    description: 'A legacy of continuous craftsmanship.',
    category: 'Bracelets',
    tag: 'Legacy',
    carat: '2.10ct',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnxqnPOA4YJzvEZS2d672Jiq4wAAlMtatrODfUb5wAbsb_lwjMuZvCIyeE04puuQhbajjCgk0G9R8Ue38Hlb-h0f-cPpgY9v0cwTascDKtr7R228xr1Cxv7FqQ0Ics5HOgtnpBEUzQoqGV2--ooJRXhr61u0S2-8-UKlx9WhthE349dzE55Oiq1-ZfjRxG1qrqFADqFrbQ1whiopxS9QEfgyhs13aYfsnbDaUrMULrAGe8g0g_9PC1ikucxaWAzWiah7ijVlYRooUx',
    price: '$15,800'
  }
];

const CATEGORIES = ['All Collection', 'Necklaces', 'Rings', 'Earrings', 'Bracelets'];
const FILTERS = ['Price', 'Carat', 'Metal', 'Shape'];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Collection');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark font-noto overflow-y-auto no-scrollbar pb-24">
      {/* Horizontal Categories */}
      <div className="pt-4 px-4 overflow-x-auto no-scrollbar sticky top-0 z-20 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 gap-8 whitespace-nowrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 transition-all ${
                activeCategory === cat 
                  ? 'border-primary text-charcoal dark:text-white' 
                  : 'border-transparent text-gold-muted hover:text-charcoal'
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">{cat}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="sticky top-[45px] z-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-4 border-b border-zinc-50 dark:border-zinc-800">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-white dark:bg-zinc-900 shadow-sm whitespace-nowrap active:scale-95 transition-transform"
            >
              <span className="text-[11px] font-semibold text-charcoal dark:text-zinc-200 tracking-wide">{filter}</span>
              <span className="material-symbols-outlined text-primary text-lg">expand_more</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-medium text-gold-muted italic tracking-wide">Showing {ITEMS.length} results</h3>
          <div className="flex items-center gap-1 border border-primary/30 rounded-full px-3 py-1 bg-primary/5 cursor-pointer active:scale-95 transition-transform">
            <span className="text-gold-muted text-[10px] font-bold uppercase tracking-widest">Sort</span>
            <span className="material-symbols-outlined text-sm text-primary">expand_more</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {ITEMS.map((item) => (
          <div key={item.id} className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-50 dark:border-zinc-800 flex flex-col">
            <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <button className="absolute top-2 right-2 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full text-zinc-400 hover:text-primary transition-colors active:scale-90">
                <span className="material-symbols-outlined text-lg">favorite</span>
              </button>
            </div>
            
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-gold-muted text-[9px] uppercase tracking-[0.2em] mb-1">{item.tag}</p>
                <h4 className="text-charcoal dark:text-zinc-100 text-[13px] font-semibold mb-2 leading-tight line-clamp-2">{item.title}</h4>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-primary font-bold text-[13px]">{item.price}</span>
                <span className="text-[10px] text-gold-muted font-medium">{item.carat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-24 shrink-0"></div>
    </div>
  );
};
