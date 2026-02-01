
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { customerApi } from '../api';

export const Search: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await customerApi.getCategories();
        if (res.success) {
          setCategories(res.data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const trendingSearches = [
    'Solitaire', 'Rose Gold', 'Emerald Cut', 'Royal Crowns', 'Tennis Bracelets'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      localStorage.setItem('search_query', searchValue);
      onNavigate('home'); // Home will handle search if query exists or add a dedicated SearchResults
    }
  };

  const handleCategoryClick = (id: string, name: string) => {
    localStorage.setItem('filter_category_id', id);
    localStorage.setItem('filter_category_name', name);
    onNavigate('home');
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      {/* Search Bar Section */}
      <div className="px-4 py-6 relative">
        <form onSubmit={handleSearch}>
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
        </form>

        {/* Live Suggestions Dropdown (Static for now, can be dynamic later) */}
        {showSuggestions && (
          <div className="absolute left-4 right-4 top-20 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl border border-primary/10 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className="p-4 flex items-center gap-3 border-b border-zinc-50 dark:border-white/5 hover:bg-primary/5 cursor-pointer"
              onClick={() => { setSearchValue('Solitaire'); setShowSuggestions(false); }}
            >
              <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              <p className="text-sm dark:text-zinc-200"><span className="font-bold">Solitaire</span> Engagement Rings</p>
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
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 transition-all active:scale-95 ${searchValue === tag
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
          <h3 className="text-[#181611] dark:text-[#f8f8f5] text-lg font-bold leading-tight tracking-tight">Handcrafted Collections</h3>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id, cat.name)}
                className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 shadow-lg group cursor-pointer"
              >
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop'}
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
        )}
      </section>
    </div>
  );
};
