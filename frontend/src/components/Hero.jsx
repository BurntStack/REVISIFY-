import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Feather, 
  Sparkles, 
  ShieldCheck, 
  Flame,
  Maximize2,
  Zap
} from 'lucide-react';

export default function Hero({ onShopNow, onQuickViewHeroProduct, onExpressBuy }) {
  return (
    <section className="relative w-full bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1920')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

      {/* Decorative Stamp / Watermark */}
      <div className="absolute top-10 right-10 pointer-events-none select-none hidden lg:block opacity-10">
        <span className="text-[120px] font-black uppercase tracking-tighter leading-none">
          LC79
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-12 pb-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Small accent badge — 10% yellow accent */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-zinc-300 text-xs font-black uppercase tracking-widest">
              <Flame size={14} className="fill-[#f5bd02] text-[#f5bd02]" />
              <span>OFF-ROAD HERITAGE CAPSULE</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-zinc-400 font-extrabold uppercase tracking-[0.3em] text-xs sm:text-sm">
                BUILT FOR THE WILD
              </h3>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95]">
                LC79 <br />
                {/* Brand color white for primary headline */}
                <span className="text-white">
                  CRUISER TEE
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400 pt-1">
                HEAVYWEIGHT 240 GSM &bull; OVERSIZED DROP SHOULDER &bull; VINTAGE SCREENPRINT
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              Engineered for endurance. Inspired by the legendary indestructible Land Cruiser LC79 off-road beast. Custom-milled heavyweight combed cotton with vintage weathered artwork.
            </p>

            {/* Price & Action button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-baseline gap-2 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-lg">
                <span className="text-2xl font-black text-white">₹1,299</span>
                <span className="text-sm font-bold text-zinc-500 line-through">₹1,799</span>
                {/* Small accent badge — yellow used minimally */}
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#f5bd02] text-zinc-950 px-1.5 py-0.5 rounded">
                  28% OFF
                </span>
              </div>

              {/* Primary CTA — black (brand color, 30%) */}
              <button 
                onClick={onShopNow}
                className="bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA — zinc-800 (dark grey) */}
              <button 
                onClick={onExpressBuy}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-zinc-700"
              >
                <Zap size={16} className="text-[#f5bd02] fill-[#f5bd02]" />
                <span>EXPRESS BUY</span>
              </button>

              <button 
                onClick={onQuickViewHeroProduct}
                className="border-2 border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-black/30 backdrop-blur-sm"
              >
                <Maximize2 size={16} />
                <span>QUICK VIEW</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Product Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Subtle glow — very low opacity accent */}
            <div className="absolute w-[360px] h-[360px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative group w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-800/80 bg-zinc-900/90 shadow-2xl p-4 sm:p-6 backdrop-blur-sm">
                
                {/* Badge overlay — yellow accent (small, 10%) */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <span className="bg-[#f5bd02] text-zinc-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    FEATURED DROP
                  </span>
                  <span className="bg-zinc-950/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    240 GSM HEAVYWEIGHT
                  </span>
                </div>

                {/* Main Product Image */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000" 
                    alt="LC79 Land Cruiser Streetwear Heavyweight Tee" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-5">
                    <span className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em]">
                      LEGENDARY 4X4 SERIES
                    </span>
                    <span className="text-white text-lg font-black tracking-tight uppercase">
                      LAND CRUISER LC79 SPECIAL EDITION
                    </span>
                  </div>
                </div>
              </div>

              {/* Float tag — yellow accent dot only */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-zinc-950 border border-zinc-700 text-white px-4 py-2 rounded-xl shadow-xl hidden sm:flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5bd02] animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider">Only 42 Left in Stock</span>
              </div>
            </div>
          </div>

        </div>

        {/* Hero Features Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-xl">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
              <Layers size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">240 GSM FABRIC</h4>
              <p className="text-[11px] text-zinc-400">Custom heavyweight knit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-xl">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
              <Feather size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">100% COMBED COTTON</h4>
              <p className="text-[11px] text-zinc-400">Ultra-soft bio-washed feel</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-xl">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">PRE-SHRUNK FIT</h4>
              <p className="text-[11px] text-zinc-400">Zero shrinkage after wash</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-xl">
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">DROP SHOULDER</h4>
              <p className="text-[11px] text-zinc-400">Authentic boxy streetwear</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
