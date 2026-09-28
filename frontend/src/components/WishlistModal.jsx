import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({ 
  isOpen, 
  onClose, 
  wishlistItems, 
  onRemoveFromWishlist, 
  onMoveToCart 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl z-10 border border-zinc-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-red-500 fill-red-500" />
            <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">
              Saved Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full mx-auto flex items-center justify-center">
                <Heart size={32} />
              </div>
              <h3 className="text-base font-black uppercase text-zinc-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Tap the heart icon on any product to save your favorite streetwear pieces for later.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-800"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-24 object-cover rounded-xl bg-zinc-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-black text-sm text-zinc-950">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      onMoveToCart(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="px-4 py-2 bg-[#f5bd02] hover:bg-[#e0ac00] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Cart</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-2 border border-zinc-200 text-zinc-400 hover:text-red-600 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
