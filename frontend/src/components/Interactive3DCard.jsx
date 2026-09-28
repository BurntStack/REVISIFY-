import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap, Check, Sparkles } from 'lucide-react';

export default function Interactive3DCard({ onQuickAdd }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [added, setAdded] = useState(false);

  // Hotspots matching the reference picture
  const hotspots = [
    {
      id: 1,
      x: 47,
      y: 25,
      title: "Reinforced Ribbed Collar",
      detail: "Double-needle stitched anti-sag collar with 240 GSM structure."
    },
    {
      id: 2,
      x: 26,
      y: 32,
      title: "Drop-Shoulder Cut",
      detail: "Engineered boxy streetwear drape with relaxed armhole profile."
    },
    {
      id: 3,
      x: 47,
      y: 39,
      title: "High-Density Screenprint",
      detail: "Eco-pigment vintage wash graphic print that never cracks or fades."
    },
    {
      id: 4,
      x: 64,
      y: 51,
      title: "Heavyweight Boxy Hem",
      detail: "100% pre-shrunk combed cotton with rigid, structured streetwear silhouette."
    }
  ];

  // Mouse move handler for realistic 3D tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12; // max 12 deg tilt
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setGlarePos({
      x: xPercent,
      y: yPercent,
      opacity: 0.25
    });

    if (isZoomActive) {
      setZoomOrigin({ x: xPercent, y: yPercent });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
    setActiveHotspot(null);
  };

  const handleQuickAddClick = (e) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd({
        id: 17396,
        name: "Global Chaos 99 Boxy Fit T-Shirt",
        price: 699,
        category: "Boxy Fit Tees",
        image: "https://storage.strackit.com/products/feature/17396.webp"
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div 
      className="relative w-full max-w-[480px] mx-auto select-none"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5
        }}
        className="relative bg-white rounded-[2.2rem] p-4 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)] border border-zinc-200/90 transition-shadow duration-500 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Main Image Frame */}
        <div 
          className="relative aspect-[3/4] rounded-[1.8rem] overflow-hidden bg-zinc-100 cursor-crosshair"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Top-Left Badge: POPULAR • ₹699 */}
          <div className="absolute top-4 left-4 z-30">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950 text-white text-[11px] font-black uppercase tracking-wider shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              POPULAR &bull; ₹699
            </span>
          </div>

          {/* Model Photo with 3D Zoom Support */}
          <div 
            className="w-full h-full overflow-hidden"
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZoomActive ? 'scale(1.8)' : 'scale(1)',
              transition: isZoomActive ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out'
            }}
          >
            <img 
              src="/images/boxy_graphic_tee.jpg" 
              alt="Global Chaos 99 Boxy Fit T-Shirt"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>

          {/* Dynamic 3D Glare Sheen */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              opacity: glarePos.opacity
            }}
          />

          {/* Interactive Hotspot Pins (1, 2, 3, 4) matching the screenshot */}
          {!isZoomActive && hotspots.map((spot) => {
            const isActive = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                style={{
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                  transform: 'translate(-50%, -50%) translateZ(40px)'
                }}
                className="absolute z-30 cursor-pointer"
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onClick={() => setActiveHotspot(isActive ? null : spot.id)}
              >
                {/* Pin Button */}
                <div className="relative group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-xl cursor-pointer ${
                    isActive 
                      ? 'bg-[#f5bd02] text-zinc-950 scale-125 ring-4 ring-black/20' 
                      : 'bg-zinc-950/80 backdrop-blur-md text-white border border-white/30 hover:scale-110 hover:bg-zinc-950'
                  }`}>
                    {spot.id}
                  </div>
                  {/* Subtle Radar Ring */}
                  <span className="absolute inset-0 rounded-full bg-white/40 -z-10 animate-ping opacity-60" />
                </div>

                {/* Popover / Tooltip */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 bg-zinc-950 text-white rounded-xl shadow-2xl border border-zinc-800 z-40 text-left pointer-events-none"
                    >
                      <div className="flex items-center gap-1.5 text-[#f5bd02] text-[10px] font-black uppercase tracking-wider mb-1">
                        <Sparkles size={12} />
                        <span>Feature {spot.id}</span>
                      </div>
                      <h4 className="font-bold text-xs leading-snug text-white mb-1">
                        {spot.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-tight">
                        {spot.detail}
                      </p>
                      {/* Triangle Pointer */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-zinc-950" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Bottom-Right 3D ZOOM Button */}
          <div className="absolute bottom-4 right-4 z-30">
            <button
              onClick={() => setIsZoomActive(!isZoomActive)}
              className={`px-3.5 py-2 rounded-full font-bold uppercase tracking-wider text-[11px] backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer ${
                isZoomActive 
                  ? 'bg-zinc-950 text-white ring-2 ring-white/50' 
                  : 'bg-white/90 text-zinc-900 hover:bg-white hover:scale-105'
              }`}
            >
              <Eye size={14} />
              <span>{isZoomActive ? 'RESET ZOOM' : '3D ZOOM'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Card Label matching screenshot */}
        <div 
          className="mt-4 pt-1 flex items-center justify-between gap-3 px-1"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex flex-col">
            <h3 className="font-black text-base sm:text-lg tracking-tight uppercase text-zinc-950 leading-snug">
              GLOBAL CHAOS 99 <br className="hidden sm:inline" />
              BOXY FIT T-SHIRT
            </h3>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              240 GSM Combed Cotton &bull; Boxy Fit
            </p>
          </div>

          {/* Circular Action Button with Lightning Bolt */}
          <button
            onClick={handleQuickAddClick}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl flex-shrink-0 cursor-pointer ${
              added 
                ? 'bg-emerald-600 text-white scale-110' 
                : 'bg-zinc-950 text-[#f5bd02] hover:bg-[#f5bd02] hover:text-zinc-950 hover:scale-110'
            }`}
            title="Quick Add Global Chaos Tee"
          >
            {added ? <Check size={20} strokeWidth={3} /> : <Zap size={20} className="fill-current" />}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
