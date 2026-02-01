
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { customerApi, formatPrice } from '../api';

interface ProductDetailProps {
  onNavigate: (view: View) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onNavigate }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<any>(null);
  const [selectedShape, setSelectedShape] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('6');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const productId = localStorage.getItem('current_product_id');
    if (!productId) {
      onNavigate('home');
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await customerApi.getProduct(productId);
        if (res.success && res.data?.product) {
          setProduct(res.data.product);
          setRelatedProducts(res.data.related_products || []);
          setIsWishlisted(res.data.product.is_wishlisted || false);

          if (res.data.product.metal_pricing?.length > 0) {
            setSelectedMetal(res.data.product.metal_pricing[0]);
          }
          if (res.data.product.shapes?.length > 0) {
            setSelectedShape(res.data.product.shapes[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        setError(error.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [onNavigate]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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

  const toggleWishlist = async () => {
    if (!product) return;
    try {
      if (isWishlisted) {
        await customerApi.removeFromWishlist(product.id);
        setIsWishlisted(false);
        setToast({ message: 'Removed from your treasures.', type: 'success' });
      } else {
        await customerApi.addToWishlist(product.id);
        setIsWishlisted(true);
        setToast({ message: 'Saved to your treasures.', type: 'success' });
      }
    } catch (error: any) {
      setToast({ message: error.message || 'Failed to update treasures.', type: 'error' });
    }
  };

  const handleAddToCart = async (destination: View = 'cart') => {
    if (!product || addingToCart) return;

    // Check if user is logged in
    const token = localStorage.getItem('customer_token');
    if (!token) {
      setToast({ message: 'Please sign in to add items to your bag.', type: 'error' });
      setTimeout(() => onNavigate('login'), 1500);
      return;
    }

    try {
      setAddingToCart(true);
      // total_price includes tax, so we need to subtract tax to get the base price for cart
      // Backend will add tax separately: total = (price * qty) + (tax * qty)
      const totalPrice = selectedMetal ? selectedMetal.total_price : product.price;
      const taxAmount = selectedMetal ? selectedMetal.tax : product.tax;
      const unitPrice = totalPrice - taxAmount; // Price without tax

      const payload = {
        product_id: product.id,
        quantity: 1,
        unit_price: unitPrice,
        gst_amount: taxAmount,
        selected_metal_id: selectedMetal?.id,
        selected_metal_name: selectedMetal?.name,
        selected_metal_price: selectedMetal?.price,
        selected_shape_id: selectedShape?.id,
        selected_shape_name: selectedShape?.title,
        size: selectedSize,
      };

      const res = await customerApi.addToCart(payload);
      console.log('Add to cart response:', res);

      if (res.success) {
        setToast({ message: 'Exquisite choice. Added to your bag.', type: 'success' });
        // Wait a bit before navigating to ensure cart is updated
        if (destination === 'cart') {
          setTimeout(() => onNavigate('cart'), 800);
        } else {
          setTimeout(() => onNavigate(destination), 800);
        }
      } else {
        setToast({ message: 'Failed to add item to bag.', type: 'error' });
      }
    } catch (error: any) {
      console.error('Add to cart error:', error);
      setToast({ message: error.message || 'Failed to add item to bag.', type: 'error' });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <span className="material-symbols-outlined text-6xl text-zinc-300 mb-4">error</span>
        <p className="text-zinc-500 mb-2 font-serif text-lg">{error || 'Product not found.'}</p>
        <p className="text-zinc-400 mb-6 text-sm">We couldn't load this exquisite piece.</p>
        <button onClick={() => onNavigate('home')} className="bg-primary text-[#181611] px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Return Home</button>
      </div>
    );
  }

  const galleryImages = product?.images?.length > 0 ? product.images : (product?.image ? [product.image] : []);
  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-[480px] mx-auto overflow-x-hidden pb-40 bg-background-light dark:bg-background-dark text-charcoal dark:text-white antialiased">
      {/* Premium Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300">
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

      {/* Sticky Top Bar - Replaced Global Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between">
        <div
          onClick={() => onNavigate('home')}
          className="text-charcoal dark:text-white flex size-12 shrink-0 items-center cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
        </div>
        <h2 className="text-charcoal dark:text-white text-lg font-serif font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-4">{product.name}</h2>
        <div className="flex w-12 items-center justify-end">
          <button
            onClick={toggleWishlist}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-charcoal dark:text-white gap-2 transition-all active:scale-90"
          >
            <span
              className={`material-symbols-outlined ${isWishlisted ? 'text-red-500' : ''}`}
              style={{ fontVariationSettings: `'FILL' ${isWishlisted ? 1 : 0}` }}
            >
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
          {galleryImages.map((img: string, i: number) => (
            <div
              key={i}
              className="flex-shrink-0 w-full snap-center flex flex-col justify-end min-h-[420px] bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 30%), url("${img}")`
              }}
            />
          ))}
        </div>

        {/* Thumbnail Preview strip below main image */}
        <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar">
          {galleryImages.map((img: string, i: number) => (
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

      {/* Product Information */}
      <div className="px-4 mt-2">
        <div className="flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">star</span>
          <span className="text-xs font-bold tracking-widest uppercase">{product.category || 'Premium Artisan Selection'}</span>
        </div>
        <h1 className="text-charcoal dark:text-white tracking-tight text-3xl font-serif font-bold leading-tight pb-2">{product.name}</h1>
        <div className="flex items-baseline gap-2">
          <h2 className="price-display text-primary text-3xl pb-6">
            {formatPrice(selectedMetal ? selectedMetal.total_price : product.price)}
          </h2>
          {product.originalPrice && (
            <span className="text-charcoal/50 dark:text-white/50 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>

      {/* Metal Selection */}
      {product.metal_pricing?.length > 0 && (
        <div className="px-4 py-4">
          <p className="text-charcoal/70 dark:text-white/70 text-sm font-bold uppercase tracking-wider mb-4">Select Metal</p>
          <div className="flex gap-4">
            {product.metal_pricing.map((metal: any) => (
              <div key={metal.id} className="flex flex-col items-center gap-1">
                <button
                  onClick={() => setSelectedMetal(metal)}
                  className={`size-12 rounded-full border-2 transition-all ${selectedMetal?.id === metal.id ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-200'} bg-gradient-to-tr from-[#f8f8f5] to-[#f2b90d]`}
                  style={metal.name.toLowerCase().includes('white') ? { backgroundColor: '#e5e5e5' } : metal.name.toLowerCase().includes('rose') ? { backgroundColor: '#f4c2c2' } : {}}
                ></button>
                <span className={`text-[10px] uppercase font-bold tracking-tighter ${selectedMetal?.id === metal.id ? 'text-primary' : 'text-charcoal/40 dark:text-white/40'}`}>{metal.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shape Selection */}
      {product.shapes?.length > 0 && (
        <div className="px-4 py-4">
          <p className="text-charcoal/70 dark:text-white/70 text-sm font-bold uppercase tracking-wider mb-4">Select Diamond Shape</p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {product.shapes.map((shape: any) => (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all min-w-[80px] ${selectedShape?.id === shape.id
                  ? 'border-primary bg-primary/5 scale-105 shadow-md shadow-primary/10'
                  : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                  }`}
              >
                <span className="material-symbols-outlined text-2xl text-primary">diamond</span>
                <span className={`text-[10px] font-bold uppercase tracking-tight text-center ${selectedShape?.id === shape.id ? 'text-primary' : 'text-charcoal/60 dark:text-white/60'}`}>
                  {shape.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection - Only for Rings */}
      {(product.name?.toLowerCase().includes('ring') || product.category?.toLowerCase().includes('ring')) && (
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-charcoal/70 dark:text-white/70 text-sm font-bold uppercase tracking-wider">Select Size (US)</p>
            <button className="text-primary text-xs font-bold underline">Size Guide</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`flex-shrink-0 size-12 rounded-lg border flex items-center justify-center font-bold transition-all active:scale-95 ${selectedSize === s
                  ? 'border-2 border-primary bg-primary/5 text-primary'
                  : 'border-charcoal/10 dark:border-white/10 text-charcoal dark:text-white'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Specifications */}
      <div className="px-4 py-10">
        <h3 className="font-serif font-bold text-xl mb-6">Specifications</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {product.specifications && Object.entries(product.specifications).map(([key, value]: any) => (
            <div key={key} className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-1">{key}</p>
              <p className="font-bold text-sm">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/50 dark:text-white/50 mb-2">Description</p>
          <p className="text-sm leading-relaxed text-charcoal/80 dark:text-white/80 whitespace-pre-line">{product.description}</p>
        </div>
      </div>

      {/* Diamond Details Table */}
      {product.diamond_details?.length > 0 && (
        <div className="px-4 py-10 border-t border-charcoal/5 dark:border-white/5">
          <h3 className="font-serif font-bold text-xl mb-6">Diamond Details</h3>
          <div className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-white/60">Diamond</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-white/60 text-center">Weight</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-white/60 text-center">Pieces</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-white/60 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {product.diamond_details.map((stone: any, idx: number) => (
                  <tr key={idx}>
                    <td className="p-4">
                      <p className="text-xs font-bold">{stone.name}</p>
                      <p className="text-[10px] text-zinc-400">{stone.shape}</p>
                    </td>
                    <td className="p-4 text-center text-xs font-medium">{stone.weight}</td>
                    <td className="p-4 text-center text-xs font-medium">{stone.pieces}</td>
                    <td className="p-4 text-right text-xs font-bold text-primary">{formatPrice(stone.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Price Breakup Accordion */}
      {(selectedMetal || (product.price_breakup?.length > 0)) && (
        <div className="px-4 py-4 border-t border-charcoal/5 dark:border-white/5">
          <div
            onClick={() => setIsPriceBreakupOpen(!isPriceBreakupOpen)}
            className="flex items-center justify-between cursor-pointer py-2 group"
          >
            <h3 className="font-serif font-bold text-xl">Price Breakup</h3>
            <span className={`material-symbols-outlined transition-transform duration-300 text-primary ${isPriceBreakupOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </div>

          {isPriceBreakupOpen && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
              {selectedMetal ? (
                <>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                    <p className="text-sm font-serif">Base Price ({selectedMetal.name})</p>
                    <p className="font-sans font-bold">{formatPrice(selectedMetal.price)}</p>
                  </div>
                  {selectedMetal.stone_price > 0 && (
                    <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                      <p className="text-sm font-serif">Diamond & Stone</p>
                      <p className="font-sans font-bold">{formatPrice(selectedMetal.stone_price)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                    <p className="text-sm font-serif">Making Charges</p>
                    <p className="font-sans font-bold">{formatPrice(selectedMetal.making_charge)}</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                    <p className="text-sm font-serif">GST ({selectedMetal.tax_rate}%)</p>
                    <p className="font-sans font-bold">{formatPrice(selectedMetal.tax)}</p>
                  </div>
                  {selectedMetal.b2b_discount && (
                    <div className="flex justify-between items-center border-b border-primary/10 pb-3 text-green-600">
                      <p className="text-sm font-serif">B2B Special Discount</p>
                      <p className="font-sans font-bold">-{formatPrice(selectedMetal.b2b_discount.original_price - selectedMetal.b2b_discount.discounted_price)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <p className="font-serif font-bold text-lg text-charcoal dark:text-white uppercase tracking-wider">Total Amount</p>
                    <p className="price-display text-3xl text-primary">{formatPrice(selectedMetal.total_price)}</p>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center pt-2">
                  <p className="font-serif font-bold text-lg text-charcoal dark:text-white uppercase tracking-wider">Total Amount</p>
                  <p className="price-display text-3xl text-primary">{formatPrice(product.price)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-charcoal/5 dark:border-white/5 p-4 pb-10">
        <div className="max-w-[480px] mx-auto flex gap-3">
          <button
            disabled={addingToCart}
            onClick={() => handleAddToCart()}
            className="flex-1 h-14 rounded-xl border-2 border-primary/20 bg-transparent text-charcoal dark:text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] active:bg-zinc-50 dark:active:bg-zinc-800 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            {addingToCart ? 'Adding...' : 'Add to Bag'}
          </button>
          <button
            disabled={addingToCart}
            onClick={() => handleAddToCart('checkout')}
            className="flex-[1.5] h-14 rounded-xl bg-primary text-charcoal font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] active:brightness-110 disabled:opacity-50"
          >
            {addingToCart ? 'Preparing...' : 'Proceed to Buy'}
            {!addingToCart && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
