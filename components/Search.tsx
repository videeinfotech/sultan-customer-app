
import React, { useState } from 'react';
import { View } from '../types';

export const Search: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trendingSearches = [
    'Solitaire', 'Rose Gold', 'Emerald Cut', 'Royal Crowns', 'Tennis Bracelets'
  ];

  const categories = [
    { name: 'Royal Rings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrVgKb_363FZ-AqhDR3m1bGscWSFFxMeDvfUkcdpOSo8yyvglpkR9fzK9AUWGjYzLHHyddmcB0w2tpyH6QrPrJXHKsvGFQqSJ9HSYG1jLv4SRni-4oh2NL7gYS5IO_PQOpEGOUNh5BJO_GmWGC0j4iXFcvn_LvJUWi09jNTdANpL-sgz8uWmHUVElQ8XstEIj_iD7gI_ZB1-BfHl2t5JAnpli1EYu3vFpOUvXLTmAV5SouoKFDOAN35goNeszzuykcTszKsJ2t6MqF' },
    { name: 'Necklaces', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT40VCKuZt4NuvBH1V3YIkZ2NjD2kTSNXrPuZc1o_WuqkNDUz9Cox6t7AJYKMfJP_J2XdQ3dmC3nGlNNIAdSyIc1s1jFH5Lu2-cfTHqxIyRFAdJdiLIwgE3H9kuBLGdk0EfSjMEQcQDAvNKgVdZft0BHFKV0u3dF8owh54whjuhAHkoy3dwHN_KM3XWjSR9tzM8HRjOBZshn4ZWBOAHeHQ6GBDAOTf1WLO3yU5YxaOZrC_38wcWJsyJ2C3Q3tubFPZmgfgdZRjT5XG' },
    { name: 'Bracelets', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC9lgjNG110ZCOiKXPsHZ7rInzulCFtRVdzFWSA3sKVU-nQ7kxnmmQkRjEVm67JCRGs2SaiU3l7lE5Je_0Zx7AZp3OTMye7g9-CQFdsVXo_YgICbNd8WrqjS_PghoR2ocjrCwHCctfv1lUovzZ8tDJdfdixKi7r9goeHQBohGcFXp_6blHaMj1-dnbtgfiuOYJohXFPRtBwqepVwclhX0h85gKpNuinOtgFErKO3vgMYb12PkhuJnofPG2p0AW6hUf8bMfs36AKlVm' },
    { name: 'Earrings', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQtRRD5Mn93-jsCEgCmNp8DcFJFvQl0667o6FGYORYFRZhGMoTMofy5d9MFSo29Ch7psA58CPsM27qhXR5-orEMer1KsqHVjs5Xz326DAnVPNpkk0DLhYcpVB8kCVSmuGWpvHTGrZFAxD7lYmm15a_SJp2QnAscOyRzlFc6fQZF8hyrIoO_54PsBY3VOMTUFxBFsK97JGgpRGp7QYt7dV3qdz5oB5rs1jmFBtqM5nTFxhc1-FPnolmrsYsY7d7Qv1zrbGBq2QZ0HSZ' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      {/* Top Header Placeholder spacing (if needed, but main App handles it) */}
      
      {/* Search Bar Section */}
      <div className="px-4 py-6 relative">
        <label className="flex flex-col min-w-40 h-14 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-full h-full shadow-sm border border-primary/20">
            <div className="text-primary flex bg-white dark:bg-zinc-800 items-center justify-center pl-6 rounded-l-full">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-zinc-800 h-full placeholder:text-[#8a8060] px-4 rounded-l-none pl-3 text-base font-normal" 
              placeholder="Find your masterpiece..." 
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchValue.length > 0)}
            />
          </div>
        </label>

        {/* Live Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute left-4 right-4 top-20 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-primary/10 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div 
              className="p-4 flex items-center gap-3 border-b border-zinc-50 dark:border-white/5 hover:bg-primary/5 cursor-pointer"
              onClick={() => { setSearchValue('Solitaire Engagement Rings'); setShowSuggestions(false); }}
            >
              <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              <p className="text-sm dark:text-zinc-200"><span className="font-bold">Solitaire</span> Engagement Rings</p>
            </div>
            <div 
              className="p-4 flex items-center gap-3 border-b border-zinc-50 dark:border-white/5 hover:bg-primary/5 cursor-pointer"
              onClick={() => { setSearchValue('Solitaire Diamond Pendants'); setShowSuggestions(false); }}
            >
              <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              <p className="text-sm dark:text-zinc-200"><span className="font-bold">Solitaire</span> Diamond Pendants</p>
            </div>
            <div 
              className="p-4 flex items-center gap-3 hover:bg-primary/5 cursor-pointer"
              onClick={() => { setSearchValue('Solitaire Stud Earrings'); setShowSuggestions(false); }}
            >
              <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              <p className="text-sm dark:text-zinc-200"><span className="font-bold">Solitaire</span> Stud Earrings</p>
            </div>
          </div>
        )}
      </div>

      <div className="h-4"></div>

      {/* Trending Searches */}
      <section>
        <h3 className="text-[#181611] dark:text-[#f8f8f5] text-lg font-bold leading-tight tracking-tight px-4 pb-4">Trending Searches</h3>
        <div className="flex gap-3 px-4 flex-wrap">
          {trendingSearches.map((tag) => (
            <button 
              key={tag}
              onClick={() => setSearchValue(tag)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 transition-all active:scale-95 ${
                searchValue === tag 
                  ? 'border-primary bg-primary/10 text-primary font-semibold' 
                  : 'border-primary/30 bg-white dark:bg-transparent text-[#181611] dark:text-[#f8f8f5] text-sm font-medium'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <div className="h-8"></div>

      {/* Popular Categories */}
      <section className="px-4">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-[#181611] dark:text-[#f8f8f5] text-lg font-bold leading-tight tracking-tight">Popular Categories</h3>
          <button 
            onClick={() => onNavigate('collection')}
            className="text-primary text-sm font-semibold uppercase tracking-wider"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              onClick={() => onNavigate('collection')}
              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 shadow-lg group cursor-pointer"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm font-bold uppercase tracking-widest">{cat.name}</p>
                <div className="h-0.5 w-8 bg-primary mt-1"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
