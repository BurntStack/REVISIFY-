import React, { useState } from 'react';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExploreArchives({ 
  products = [], 
  onAddToCart,
  onExpressBuy,
  onOpenQuickView, 
  onViewCatalog 
}) {
  // Default to DROP 02 so it matches the reference mockup immediately
  const [activeDropId, setActiveDropId] = useState('drop-02');
  const [selectedSizes, setSelectedSizes] = useState({
    'drop-01': 'M',
    'drop-02': 'L',
    'drop-03': 'L',
    'drop-04': 'M',
  });

  // Match the exact drops from the reference screenshot
  const drops = [
    {
      id: 'drop-01',
      badge: 'DEAL OF THE WEEK',
      badgeType: 'neutral',
      price: '₹699',
      subtitle: 'DROP 01',
      title: 'BOXY FIT\nTEES',
      description: 'Drop-Shoulder Cut • High-Density Drape',
      image: '/images/drop1_boxy.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.category === 'boxy' || p.name?.toLowerCase().includes('boxy')
    },
    {
      id: 'drop-02',
      badge: 'STREET DROP',
      badgeType: 'accent', // Vibrant yellow pill matching screenshot
      price: '₹699',
      subtitle: 'DROP 02',
      title: 'OVERSIZED GRAPHICS',
      description: 'Tokyo Glitch Print • Ultra Breathable',
      image: '/images/drop2_oversized.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.category === 'oversized' || p.name?.toLowerCase().includes('oversized')
    },
    {
      id: 'drop-03',
      badge: 'LIMITED DROP',
      badgeType: 'neutral',
      price: '₹699',
      subtitle: 'DROP 03',
      title: 'JAPANESE\nONI\nARCHIVE',
      description: 'Edo Demon Artwork • Puff Screenprint',
      image: '/images/drop3_oni.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.name?.toLowerCase().includes('oni') || p.category === 'oversized'
    },
    {
      id: 'drop-04',
      badge: 'TEXTURED',
      badgeType: 'neutral',
      price: '₹699',
      subtitle: 'DROP 04',
      title: 'WAFFLE\nTHERMAL\nKNITS',
      description: 'Honey-Comb Knit • Year-Round Layering',
      image: '/images/drop4_waffle.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.category === 'waffle' || p.name?.toLowerCase().includes('waffle')
    }
  ];

  const handleSizeSelect = (dropId, size, e) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [dropId]: size }));
  };

  const handleExpressBuy = (drop, e) => {
    e.stopPropagation();
    const matchedProduct = products.find(drop.productMatcher) || products[0];
    const size = selectedSizes[drop.id] || 'M';
    if (onExpressBuy && matchedProduct) {
      onExpressBuy(matchedProduct, size);
    }
  };

  const handleExplore = (drop, e) => {
    e.stopPropagation();
    const matchedProduct = products.find(drop.productMatcher) || products[0];
    if (onOpenQuickView && matchedProduct) {
      onOpenQuickView(matchedProduct);
    } else if (onViewCatalog) {
      onViewCatalog();
    }
  };

  return (
    <section className="pt-14 pb-10 bg-[#f7f7f8] border-b border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1.5">
              <span>INTERACTIVE TILES</span>
              <span className="text-zinc-300">•</span>
              <span>HOVER TO REVEAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 font-heading">
              EXPLORE MEN&apos;S ARCHIVES
            </h2>
          </div>

          <button
            onClick={onViewCatalog}
            className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-950 hover:text-zinc-600 transition-colors group cursor-pointer w-fit self-start md:self-end"
          >
            <span>VIEW FULL CATALOG</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Interactive Tiles Deck */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-5 items-stretch min-h-[340px] sm:min-h-[360px]">
          {drops.map((drop) => {
            const isHovered = activeDropId === drop.id;
            const currentSize = selectedSizes[drop.id] || 'M';

            return (
              <div
                key={drop.id}
                onMouseEnter={() => setActiveDropId(drop.id)}
                onClick={() => setActiveDropId(drop.id)}
                className={`relative rounded-[28px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none flex flex-col justify-between ${
                  isHovered
                    ? 'flex-[1_1_100%] lg:flex-[2.6] min-w-[320px] lg:min-w-[440px] shadow-2xl ring-1 ring-black/10'
                    : 'flex-[1_1_220px] lg:flex-1 min-w-[200px] bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-md'
                } p-6 sm:p-7`}
                style={{ minHeight: '340px' }}
              >
                {/* Background Image & Vignette for Expanded State */}
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={drop.image}
                    alt={drop.title.replace('\n', ' ')}
                    className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Cinematic dark gradients for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                {/* Top Bar: Badge & Price */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                      drop.badgeType === 'accent'
                        ? 'bg-[#facc15] text-zinc-950 shadow-sm'
                        : isHovered
                        ? 'bg-white/20 text-white backdrop-blur-md border border-white/20'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200/70'
                    }`}
                  >
                    {drop.badge}
                  </span>

                  <span
                    className={`text-sm sm:text-base font-black tracking-tight transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-zinc-950'
                    }`}
                  >
                    {drop.price}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 mt-auto pt-6">
                  {/* Drop Subtitle */}
                  <span
                    className={`block text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 transition-colors duration-300 ${
                      isHovered ? 'text-zinc-400' : 'text-zinc-400'
                    }`}
                  >
                    {drop.subtitle}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-black uppercase tracking-tight leading-[1.05] whitespace-pre-line mb-2 transition-all duration-300 ${
                      isHovered
                        ? 'text-2xl sm:text-3xl text-white'
                        : 'text-xl sm:text-2xl text-zinc-950'
                    }`}
                  >
                    {drop.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs font-medium transition-colors duration-300 mb-4 ${
                      isHovered ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {drop.description}
                  </p>

                  {/* Expanded Only: Size Chips & CTA Buttons */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isHovered ? 'max-h-40 opacity-100 translate-y-0 mt-3' : 'max-h-0 opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    {/* Size Selector */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-4">
                      {drop.sizes.map((size) => {
                        const isSelected = currentSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={(e) => handleSizeSelect(drop.id, size, e)}
                            className={`w-8 h-8 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-white text-zinc-950 shadow-md scale-105'
                                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Buttons: Express Buy & Explore */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleExpressBuy(drop, e)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                      >
                        <Zap size={14} className="fill-current text-zinc-950" />
                        <span>EXPRESS BUY</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleExplore(drop, e)}
                        className="px-5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700/70 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                      >
                        EXPLORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
