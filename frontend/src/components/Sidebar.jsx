import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Clock, 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Sparkles 
} from 'lucide-react';
import { SPECIAL_OFFER, BEST_SELLERS_MINI } from '../data/products';

export default function Sidebar({ onAddToCart, onQuickView }) {
  // Countdown timer for the Special Offer
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <aside className="w-full space-y-6">
      
      {/* 1. SPECIAL OFFERS Card matching screenshot */}
      <div className="bg-white rounded-2xl border-2 border-zinc-200 overflow-hidden shadow-sm hover:border-zinc-950 transition-colors">
        
        {/* Header */}
        <div className="bg-zinc-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-[#f5bd02] fill-[#f5bd02]" />
            <h3 className="font-black text-xs uppercase tracking-wider">
              SPECIAL OFFERS
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-[#f5bd02] text-zinc-950 px-2 py-0.5 rounded">
            LIMITED
          </span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div 
            className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 cursor-pointer group"
            onClick={() => onQuickView(SPECIAL_OFFER)}
          >
            <img 
              src={SPECIAL_OFFER.image} 
              alt={SPECIAL_OFFER.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow">
              {SPECIAL_OFFER.discount}
            </span>
          </div>

          <div>
            <div className="flex items-center text-amber-500 text-xs mb-1">
              <Star size={12} className="fill-amber-400" />
              <span className="ml-1 font-bold text-zinc-800">5.0</span>
              <span className="text-zinc-400 ml-1">({SPECIAL_OFFER.reviews} reviews)</span>
            </div>
            
            <h4 
              onClick={() => onQuickView(SPECIAL_OFFER)}
              className="font-black text-sm text-zinc-950 leading-snug hover:text-zinc-500 cursor-pointer transition-colors"
            >
              {SPECIAL_OFFER.name}
            </h4>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-black text-zinc-950">₹{SPECIAL_OFFER.price.toLocaleString()}</span>
              <span className="text-xs text-zinc-400 line-through">₹{SPECIAL_OFFER.originalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Live Countdown */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-zinc-600 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Clock size={13} className="text-[#f5bd02]" />
              <span>OFFER EXPIRES IN:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-950 text-white rounded-lg py-1.5 px-2">
                <span className="block font-black text-sm text-white">{String(hours).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Hours</span>
              </div>
              <div className="bg-zinc-950 text-white rounded-lg py-1.5 px-2">
                <span className="block font-black text-sm text-white">{String(minutes).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Mins</span>
              </div>
              <div className="bg-zinc-950 text-white rounded-lg py-1.5 px-2">
                <span className="block font-black text-sm text-white">{String(seconds).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Secs</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button 
            onClick={() => onAddToCart(SPECIAL_OFFER)}
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>CLAIM DEAL NOW</span>
          </button>
        </div>
      </div>

      {/* 2. BESTSELLERS MINI LIST matching screenshot */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
          <h3 className="font-black text-xs uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#f5bd02]" />
            BEST SELLERS
          </h3>
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Top 3</span>
        </div>

        <div className="space-y-4">
          {BEST_SELLERS_MINI.map((item) => (
            <div 
              key={item.id}
              onClick={() => onQuickView(item)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors group"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-zinc-900 group-hover:text-zinc-500 transition-colors truncate">
                  {item.name}
                </h4>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-black text-xs text-zinc-950">₹{item.price.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Promotional Streetwear Badge */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-5 text-center relative overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#f5bd02]/10 rounded-full blur-xl pointer-events-none" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block mb-1">
          REVISIFY MEMBER CLUB
        </span>
        <h4 className="font-black text-base uppercase leading-snug mb-2">
          GET 15% OFF YOUR FIRST ORDER
        </h4>
        <p className="text-xs text-zinc-400 mb-4">
          Subscribe to our drops newsletter & receive secret discount codes.
        </p>
        <div className="inline-block bg-[#f5bd02] text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
          PROMO: STREET15
        </div>
      </div>

    </aside>
  );
}
