import React, { useState, useRef } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function ExploreArchives({ 
  products = [], 
  onAddToCart,
  onExpressBuy,
  onOpenQuickView, 
  onViewCatalog 
}) {
  const [activeDropId, setActiveDropId] = useState('drop-02');
  const [selectedSizes, setSelectedSizes] = useState({
    'drop-01': 'M',
    'drop-02': 'L',
    'drop-03': 'L',
    'drop-04': 'M',
  });

  const mobileScrollRef = useRef(null);

  const drops = [
    {
      id: 'drop-01',
      badge: 'DEAL OF THE WEEK',
      badgeType: 'accent',
      price: '₹699',
      originalPrice: '₹1,499',
      subtitle: 'DROP 01',
      tag: 'BOXY CUT',
      title: 'BOXY FIT\nTEES',
      description: 'Drop-Shoulder Cut • High-Density Drape',
      image: '/images/drop1_boxy.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.category === 'boxy' || p.name?.toLowerCase().includes('boxy')
    },
    {
      id: 'drop-02',
      badge: 'STREET DROP',
      badgeType: 'accent',
      price: '₹699',
      originalPrice: '₹1,499',
      subtitle: 'DROP 02',
      tag: 'OVERSIZED',
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
      originalPrice: '₹1,499',
      subtitle: 'DROP 03',
      tag: 'ONI ARCHIVE',
      title: 'JAPANESE\nONI ARCHIVE',
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
      originalPrice: '₹1,499',
      subtitle: 'DROP 04',
      tag: 'THERMAL',
      title: 'WAFFLE\nTHERMAL KNITS',
      description: 'Honey-Comb Knit • Year-Round Layering',
      image: '/images/drop4_waffle.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      productMatcher: (p) => p.category === 'waffle' || p.name?.toLowerCase().includes('waffle')
    }
  ];

  const handleSizeSelect = (dropId, size, e) => {
    e?.stopPropagation?.();
    setSelectedSizes(prev => ({ ...prev, [dropId]: size }));
  };

  const handleExpressBuy = (drop, e) => {
    e?.stopPropagation?.();
    const matchedProduct = products.find(drop.productMatcher) || products[0];
    const size = selectedSizes[drop.id] || 'M';
    if (onExpressBuy && matchedProduct) {
      onExpressBuy(matchedProduct, size);
    }
  };

  const handleExplore = (drop, e) => {
    e?.stopPropagation?.();
    const matchedProduct = products.find(drop.productMatcher) || products[0];
    if (onOpenQuickView && matchedProduct) {
      onOpenQuickView(matchedProduct);
    } else if (onViewCatalog) {
      onViewCatalog();
    }
  };

  // Scroll mobile carousel to specific drop index
  const scrollToDrop = (dropId) => {
    setActiveDropId(dropId);
    const dropIndex = drops.findIndex(d => d.id === dropId);
    if (mobileScrollRef.current && dropIndex !== -1) {
      const container = mobileScrollRef.current;
      const card = container.children[dropIndex];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  // Sync scroll on mobile to active drop
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.offsetWidth || 300;
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    if (drops[newIndex] && drops[newIndex].id !== activeDropId) {
      setActiveDropId(drops[newIndex].id);
    }
  };

  return (
    <section className="relative pt-14 pb-14 bg-[#f7f7f8] text-zinc-950 border-b border-zinc-200/80 overflow-hidden">
      {/* Subtle warm ambient highlight */}
      <div 
        className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-yellow-400/8 rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 font-black text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#f5bd02] animate-pulse" />
              <span className="text-zinc-900">REV ARCHIVES</span>
              <span className="text-zinc-400">•</span>
              <span>CURATED STREETWEAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 font-heading">
              EXPLORE MEN&apos;S ARCHIVES
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewCatalog}
              className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-950 hover:text-zinc-600 transition-colors group cursor-pointer"
            >
              <span>VIEW FULL CATALOG</span>
              <ArrowRight size={16} className="text-zinc-950 group-hover:translate-x-1.5 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* MOBILE VIEW (< lg): Interactive Tab Pills + Swipeable Dark Deck */}
        <div className="lg:hidden">
          {/* Drop Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
            {drops.map((drop, idx) => {
              const isActive = activeDropId === drop.id;
              return (
                <button
                  key={drop.id}
                  onClick={() => scrollToDrop(drop.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-md scale-[1.02]'
                      : 'bg-white text-zinc-600 border border-zinc-200/90 hover:border-zinc-300'
                  }`}
                >
                  <span className={isActive ? 'text-yellow-400' : 'text-zinc-400'}>0{idx + 1}</span>
                  <span>{drop.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Swipeable Cards Carousel (Dark photographic cards on clean white background) */}
          <div 
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {drops.map((drop) => {
              const currentSize = selectedSizes[drop.id] || 'M';
              return (
                <div
                  key={drop.id}
                  className="w-[84vw] max-w-[340px] shrink-0 snap-center rounded-[24px] relative overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col justify-between p-6 select-none"
                  style={{ minHeight: '440px' }}
                >
                  {/* High Definition Cinematic Image with Deep Gradient */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src={drop.image}
                      alt={drop.title.replace('\n', ' ')}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Top Bar: Badge & Price Tag */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
                        drop.badgeType === 'accent'
                          ? 'bg-yellow-400 text-zinc-950 font-black'
                          : 'bg-white/20 text-white backdrop-blur-md border border-white/20'
                      }`}
                    >
                      {drop.badge}
                    </span>

                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-sm font-black text-yellow-400">
                        {drop.price}
                      </span>
                      {drop.originalPrice && (
                        <span className="text-[10px] text-zinc-400 line-through">
                          {drop.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Area: Drop Info, Size Picker & Action Buttons */}
                  <div className="relative z-10 mt-auto pt-6">
                    <span className="block text-[11px] font-black text-yellow-400 uppercase tracking-widest mb-1">
                      {drop.subtitle}
                    </span>

                    <h3 className="font-black text-2xl uppercase tracking-tight text-white leading-tight mb-1.5">
                      {drop.title.replace('\n', ' ')}
                    </h3>

                    <p className="text-xs text-zinc-300 font-medium line-clamp-2 mb-4">
                      {drop.description}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-3.5">
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Select Size
                      </div>
                      <div className="flex items-center gap-1.5">
                        {drop.sizes.map((size) => {
                          const isSelected = currentSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={(e) => handleSizeSelect(drop.id, size, e)}
                              className={`w-9 h-9 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                                isSelected
                                  ? 'bg-yellow-400 text-zinc-950 shadow-md scale-105'
                                  : 'bg-black/60 text-zinc-300 border border-white/15 hover:bg-zinc-800'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleExpressBuy(drop, e)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-yellow-400/20 transition-all cursor-pointer"
                      >
                        <Zap size={14} className="fill-current text-zinc-950" />
                        <span>EXPRESS BUY</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleExplore(drop, e)}
                        className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator & Swipe Hint */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-1.5">
              {drops.map((drop) => (
                <button
                  key={drop.id}
                  onClick={() => scrollToDrop(drop.id)}
                  aria-label={`Go to ${drop.subtitle}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeDropId === drop.id ? 'w-6 bg-zinc-950' : 'w-1.5 bg-zinc-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-zinc-500 font-medium tracking-wide">
              Swipe to explore drops →
            </span>
          </div>
        </div>

        {/* DESKTOP VIEW (>= lg): Premium Interactive Expanding Accordion with Dark Cards on White Background */}
        <div className="hidden lg:flex gap-4 sm:gap-5 items-stretch min-h-[380px]">
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
                    ? 'flex-[2.6] min-w-[420px] shadow-2xl ring-2 ring-zinc-950/20'
                    : 'flex-1 min-w-[180px] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 shadow-lg'
                } p-7`}
                style={{ minHeight: '380px' }}
              >
                {/* Background Image: always subtly visible even collapsed, full brilliance when expanded */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  <img
                    src={drop.image}
                    alt={drop.title.replace('\n', ' ')}
                    className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                      isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-40 grayscale-[25%]'
                    }`}
                    loading="lazy"
                  />
                  {/* Dark gradients for perfect text readability */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isHovered
                      ? 'bg-gradient-to-t from-black via-black/75 to-black/35 opacity-100'
                      : 'bg-gradient-to-t from-black/90 via-black/60 to-black/40 opacity-100'
                  }`} />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Top Bar: Badge & Price */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 ${
                      drop.badgeType === 'accent' || isHovered
                        ? 'bg-yellow-400 text-zinc-950 font-black shadow-sm'
                        : 'bg-white/15 text-zinc-200 backdrop-blur-md border border-white/10'
                    }`}
                  >
                    {drop.badge}
                  </span>

                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-sm font-black text-yellow-400">
                      {drop.price}
                    </span>
                    {isHovered && drop.originalPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        {drop.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 mt-auto pt-6">
                  {/* Drop Subtitle */}
                  <span className="block text-xs font-black uppercase tracking-widest mb-1.5 text-yellow-400">
                    {drop.subtitle}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-black uppercase tracking-tight leading-[1.05] whitespace-pre-line mb-2 transition-all duration-300 ${
                      isHovered
                        ? 'text-3xl text-white'
                        : 'text-xl text-zinc-200'
                    }`}
                  >
                    {drop.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs font-medium transition-colors duration-300 mb-4 ${
                      isHovered ? 'text-zinc-300' : 'text-zinc-400'
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
                    <div className="flex items-center gap-2 mb-4">
                      {drop.sizes.map((size) => {
                        const isSelected = currentSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={(e) => handleSizeSelect(drop.id, size, e)}
                            className={`w-8 h-8 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-yellow-400 text-zinc-950 shadow-md scale-105'
                                : 'bg-black/60 hover:bg-zinc-800 text-zinc-200 border border-white/15'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Buttons: Express Buy & Explore */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleExpressBuy(drop, e)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-yellow-400/20 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                      >
                        <Zap size={14} className="fill-current text-zinc-950" />
                        <span>EXPRESS BUY</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleExplore(drop, e)}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
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
