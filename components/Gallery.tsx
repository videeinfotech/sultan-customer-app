
import React, { useState, useEffect, useCallback } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface GalleryProps {
  onNavigate: (view: View) => void;
}

type SortOption = 'latest' | 'price-low-high' | 'price-high-low' | 'a-z';

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await customerApi.getCategories();
        if (res.success) {
          setCategories(res.data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async (pageNum: number, categoryId: string, sort: SortOption, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      let params = `?page=${pageNum}&per_page=20&sort=${sort}`;
      if (categoryId !== 'all') {
        params += `&category_id=${categoryId}`;
      }

      const res = await customerApi.getProducts(params);
      if (res.success) {
        const newProducts = res.data.products || [];

        if (isLoadMore) {
          setProducts(prev => {
            // Filter out duplicates based on ID
            const existingIds = new Set(prev.map(p => p.id));
            const filteredNew = newProducts.filter((p: any) => !existingIds.has(p.id));
            return [...prev, ...filteredNew];
          });
        } else {
          setProducts(newProducts);
        }

        const pagination = res.data.pagination;
        if (pagination) {
          setHasMore(pagination.current_page < pagination.last_page);
        } else {
          setHasMore(newProducts.length === 20);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchProducts(1, activeCategory, sortBy, false);
  }, [activeCategory, sortBy, fetchProducts]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, activeCategory, sortBy, true);
    }
  };

  const sortOptions: { label: string, value: SortOption }[] = [
    { label: 'Latest Arrivals', value: 'latest' },
    { label: 'Price: Low to High', value: 'price-low-high' },
    { label: 'Price: High to Low', value: 'price-high-low' },
    { label: 'Alphabetical (A-Z)', value: 'a-z' },
  ];

  const toggleWishlist = async (productId: number, currentlyWishlisted: boolean) => {
    try {
      if (currentlyWishlisted) {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_wishlisted: false } : p));
        await customerApi.removeFromWishlist(productId);
        setToast({ message: 'Removed from your treasures.', type: 'success' });
      } else {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_wishlisted: true } : p));
        await customerApi.addToWishlist(productId);
        setToast({ message: 'Saved to your treasures.', type: 'success' });
      }
    } catch (error: any) {
      // Revert on error
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, is_wishlisted: currentlyWishlisted } : p));
      setToast({ message: error.message || 'Failed to update treasures.', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark font-noto overflow-y-auto no-scrollbar pb-24">
      {/* Premium Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none">
          <div className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${toast.type === 'success'
            ? 'bg-white/90 dark:bg-zinc-900/90 border-primary/20 text-charcoal dark:text-white'
            : 'bg-red-50/90 dark:bg-red-950/90 border-red-200 text-red-600 dark:text-red-400'
            }`}>
            <span className={`material-symbols-outlined ${toast.type === 'success' ? 'text-primary' : 'text-red-500'}`}>
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <p className="text-xs font-bold tracking-wide">{toast.message}</p>
          </div>
        </div>
      )}
      {/* Horizontal Categories */}
      <div className="pt-4 px-4 overflow-x-auto no-scrollbar sticky top-0 z-20 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 gap-8 whitespace-nowrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex flex-col items-center justify-center border-b-2 pb-3 transition-all ${activeCategory === 'all'
              ? 'border-primary text-charcoal dark:text-white'
              : 'border-transparent text-gold-muted hover:text-charcoal'
              }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.15em]">All Collection</p>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id.toString())}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 transition-all ${activeCategory === cat.id.toString()
                ? 'border-primary text-charcoal dark:text-white'
                : 'border-transparent text-gold-muted hover:text-charcoal'
                }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Results Header & Sorting */}
      <div className="px-4 py-6 relative">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-medium text-gold-muted italic tracking-wide">
            {loading ? 'Discovering...' : `Showing ${products.length} results`}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 border border-primary/30 rounded-full px-3 py-1 bg-primary/5 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="text-gold-muted text-[10px] font-bold uppercase tracking-widest">
                {sortOptions.find(o => o.value === sortBy)?.label.split(':')[0]}
              </span>
              <span className="material-symbols-outlined text-sm text-primary">sort</span>
            </button>

            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowSortMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-100 dark:border-white/10 overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-200">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${sortBy === opt.value
                        ? 'bg-primary text-white'
                        : 'text-charcoal dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="px-4 grid grid-cols-2 gap-4">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  localStorage.setItem('current_product_id', item.id);
                  onNavigate('productDetail');
                }}
                className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-50 dark:border-zinc-800 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id, item.is_wishlisted);
                    }}
                    className={`absolute top-2 right-2 size-8 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur rounded-full transition-all active:scale-90 ${item.is_wishlisted ? 'text-red-500 shadow-sm' : 'text-zinc-400 hover:text-primary'}`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: `'FILL' ${item.is_wishlisted ? 1 : 0}` }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gold-muted text-[9px] uppercase tracking-[0.2em] mb-1">{item.category?.name || 'Luxury'}</p>
                    <h4 className="text-charcoal dark:text-zinc-100 text-[13px] font-semibold mb-2 leading-tight line-clamp-2">{item.name}</h4>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-primary font-bold text-[13px]">{formatPrice(item.price)}</span>
                    {item.carat && item.carat !== 'Varies by selection' && (
                      <span className="text-[10px] text-gold-muted font-bold tracking-tight bg-zinc-50 dark:bg-white/5 px-2 py-0.5 rounded-full border border-zinc-100 dark:border-white/10">{item.carat}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center p-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-4 bg-[#181611] dark:bg-primary text-white dark:text-[#181611] rounded-full text-xs font-bold tracking-widest uppercase active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
              >
                {loadingMore ? 'Summoning More...' : 'Load More Masterpieces'}
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          )}
        </>
      )}

      {products.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-400 italic">
          <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
          <p>No products found in this collection.</p>
        </div>
      ) : null}

      <div className="h-24 shrink-0"></div>
    </div>
  );
};
