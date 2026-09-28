import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';

export default function QuickViewModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const currentSize = selectedSize || (product.sizes ? product.sizes[1] || product.sizes[0] : 'L');
  const currentImage = activeImage || product.image;

  const images = [
    product.image,
    product.hoverImage || product.image,
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
  ];

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize: currentSize,
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-zinc-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          
          {/* Images Column */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-inner">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-[#f5bd02] text-zinc-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded shadow">
                  {product.badge}
                </span>
              )}
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    currentImage === img ? 'border-[#f5bd02] ring-2 ring-[#f5bd02]/40' : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between text-xs text-zinc-500 uppercase tracking-widest font-bold">
                <span>{product.categoryLabel || 'RSV Streetwear'}</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  IN STOCK (SHIPS TODAY)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-700">5.0</span>
                <span className="text-xs text-zinc-400">({product.reviews || 120} verified customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-black text-zinc-950">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base font-bold text-zinc-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-black uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {product.description || "Crafted from 100% bio-washed combed cotton with premium drop-shoulder construction. Features fade-resistant vintage graphic print and pre-shrunk weave."}
              </p>

              {/* Size Selection */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                    Select Size
                  </span>
                  <button className="text-xs font-bold text-zinc-500 hover:text-zinc-900 underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        currentSize === size
                          ? 'bg-zinc-950 text-[#f5bd02] ring-2 ring-zinc-950 shadow-md scale-105'
                          : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-1">
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900 block mb-2">
                  Quantity
                </span>
                <div className="flex items-center w-36 border-2 border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-2.5 hover:bg-zinc-200 text-zinc-800 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-zinc-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-2.5 hover:bg-zinc-200 text-zinc-800 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

            </div>

            {/* Buttons: Add to Cart & Wishlist */}
            <div className="space-y-4 pt-4 border-t border-zinc-200">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 py-4 px-6 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#f5bd02] hover:bg-[#e0ac00] text-zinc-950 shadow-[#f5bd02]/20'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} strokeWidth={3} />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ADD TO CART &bull; ₹{(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-4 rounded-xl border-2 transition-colors flex items-center justify-center cursor-pointer ${
                    isWishlisted 
                      ? 'border-red-600 bg-red-50 text-red-600' 
                      : 'border-zinc-300 hover:border-zinc-950 text-zinc-800'
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={20} className={isWishlisted ? "fill-red-600" : ""} />
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="flex flex-col items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
                  <Truck size={16} className="text-zinc-800" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
                  <RefreshCcw size={16} className="text-zinc-800" />
                  <span>7 Days Return</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
                  <ShieldCheck size={16} className="text-zinc-800" />
                  <span>100% Genuine</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
