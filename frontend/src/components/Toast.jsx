import React from 'react';
import { ShoppingBag, Heart, X } from 'lucide-react';

export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-800 animate-slideUp">
      <div className="w-8 h-8 rounded-full bg-[#f5bd02] text-zinc-950 flex items-center justify-center font-bold">
        {type === 'wishlist' ? (
          <Heart size={16} className="fill-zinc-950" />
        ) : (
          <ShoppingBag size={16} />
        )}
      </div>
      <div className="flex-1 pr-2">
        <p className="text-xs font-black uppercase tracking-wider text-white">
          {message}
        </p>
      </div>
      <button 
        onClick={onClose}
        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
