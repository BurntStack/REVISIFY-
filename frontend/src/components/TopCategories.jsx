import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function TopCategories({ activeCategory, onSelectCategory }) {
  // Filter out 'all' for the category showcase cards
  const displayCats = CATEGORIES.filter(c => c.id !== 'all');

  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching screenshot */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#f5bd02] bg-zinc-950 px-3 py-1 rounded-full">
            EXPLORE THE RANGE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 mt-3">
            TOP CATEGORIES
          </h2>
          <div className="w-12 h-1 bg-[#f5bd02] mx-auto mt-2 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayCats.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <div 
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const targetEl = document.getElementById('featured-products-section');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#f5bd02] shadow-xl ring-2 ring-[#f5bd02]' 
                    : 'border-zinc-200 hover:border-zinc-900 hover:shadow-lg'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Corner arrow icon */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 group-hover:bg-[#f5bd02] text-zinc-950 flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Content on image */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-black text-sm uppercase tracking-wider leading-tight group-hover:text-[#f5bd02] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-zinc-300 font-medium mt-0.5">
                      {cat.count} Items Available
                    </p>
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
