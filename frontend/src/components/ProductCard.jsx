import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Eye, 
  Star, 
  Check, 
  Plus
} from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist, 
  isWishlisted 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image & Quick Action Overlay */}
      <div 
        className="relative aspect-[3/4] bg-zinc-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-sm ${
              product.badgeType === 'hot' 
                ? 'bg-red-600 text-white' 
                : product.badgeType === 'sale' 
                  ? 'bg-[#f5bd02] text-zinc-950'
                  : 'bg-zinc-950 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900/80 backdrop-blur-sm text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button - Top Right */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            isWishlisted 
              ? 'bg-red-600 text-white scale-105' 
              : 'bg-white/90 backdrop-blur-sm text-zinc-800 hover:bg-white hover:text-red-600'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart size={16} className={isWishlisted ? "fill-white" : ""} />
        </button>

        {/* Product Images (Smooth hover transition) */}
        <img 
          src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleQuickView}
            className="flex-1 py-2.5 bg-zinc-900/90 hover:bg-zinc-950 text-white backdrop-blur-md font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye size={14} /> Quick View
          </button>
          
          <button 
            onClick={handleAddToCart}
            className={`px-3.5 py-2.5 font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              justAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-950 hover:bg-[#f5bd02] hover:text-zinc-950 text-white'
            }`}
            title="Quick Add to Cart"
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between gap-2 sm:gap-3">
        <div>
          {/* Category & rating — hidden on mobile to save space */}
          <div className="hidden sm:flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-wider mb-1">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center text-amber-500">
              <Star size={12} className="fill-amber-400" />
              <span className="ml-1 font-bold text-zinc-700">{product.rating}.0</span>
              <span className="text-zinc-400 ml-0.5">({product.reviews})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-zinc-900 text-xs sm:text-sm leading-snug group-hover:text-zinc-500 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-1.5 sm:pt-2 border-t border-zinc-100 flex items-center justify-between gap-1">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-zinc-950 text-sm sm:text-base">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-zinc-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
              justAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-950 hover:bg-zinc-700 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={12} strokeWidth={2.5} />
                <span className="hidden sm:inline">ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span className="hidden sm:inline">ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
