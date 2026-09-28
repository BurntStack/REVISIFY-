import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles,
  Flame
} from 'lucide-react';

export default function Header({ 
  cartCount, 
  cartSubtotal,
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist,
  activeCategory, 
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAccount
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState('All');

  const navLinks = [
    { id: 'all', label: 'ALL COLLECTIONS' },
    { id: 't-shirts', label: 'T-SHIRTS' },
    { id: 'oversized', label: 'OVERSIZED' },
    { id: 'hoodies', label: 'HOODIES' },
    { id: 'bottoms', label: 'PANTS' },
    { id: 'accessories', label: 'ACCESSORIES' }
  ];

  return (
    <header className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50 shadow-sm">
      {/* Top micro banner */}
      <div className="bg-zinc-950 text-white text-[11px] py-1.5 px-4 font-semibold tracking-wider flex justify-between items-center">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-[#f5bd02] text-zinc-950 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
            <Flame size={11} className="fill-zinc-950" /> FLASH SALE
          </span>
          <span className="hidden sm:inline text-zinc-300">FREE DOMESTIC SHIPPING ON ORDERS OVER ₹1,999!</span>
          <span className="sm:hidden text-zinc-300">FREE SHIPPING OVER ₹1,999</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-zinc-400">
          <span>COD AVAILABLE</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#f5bd02] font-bold">USE CODE: RSV10 FOR 10% OFF</span>
        </div>
      </div>

      {/* Main Header / Search row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu button & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-zinc-950 text-white flex items-center justify-center font-black text-lg tracking-tighter rounded-md shadow-sm group-hover:bg-[#f5bd02] group-hover:text-zinc-950 transition-colors">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-zinc-950 leading-none">
                REV <span className="text-[#f5bd02]">REVISIFY</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-zinc-400">
                CLOTHING
              </span>
            </div>
          </a>
        </div>

        {/* Search Bar - Center matching the picture */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          <div className="w-full flex items-center border-2 border-zinc-200 focus-within:border-zinc-950 rounded-full overflow-hidden transition-all bg-zinc-50/70">
            <select 
              value={selectedSearchCat}
              onChange={(e) => setSelectedSearchCat(e.target.value)}
              className="bg-transparent text-xs font-bold text-zinc-700 px-4 py-2.5 outline-none border-r border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="t-shirts">Graphic Tees</option>
              <option value="oversized">Oversized</option>
              <option value="hoodies">Hoodies</option>
              <option value="bottoms">Pants</option>
            </select>

            <div className="flex-1 flex items-center px-3 gap-2">
              <Search size={16} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search products, tees, hoodies, oversized..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-zinc-900 placeholder:text-zinc-400 outline-none py-2"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="text-zinc-400 hover:text-zinc-800 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button 
              onClick={() => {
                const targetEl = document.getElementById('featured-products-section');
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#f5bd02] hover:bg-[#e0ac00] text-zinc-950 font-black text-xs uppercase tracking-wider px-7 py-2.5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Header Right Icons */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Wishlist */}
          <button 
            onClick={onOpenWishlist}
            className="flex items-center gap-1.5 text-zinc-800 hover:text-zinc-950 transition-colors p-1.5 relative group"
            title="Wishlist"
          >
            <div className="relative">
              <Heart size={22} strokeWidth={1.75} className="group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-xs font-bold uppercase tracking-wider text-zinc-600">Wishlist</span>
          </button>

          {/* User Account */}
          <button 
            onClick={onOpenAccount}
            className="flex items-center gap-1.5 text-zinc-800 hover:text-zinc-950 transition-colors p-1.5 group"
            title="Account"
          >
            <User size={22} strokeWidth={1.75} className="group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline text-xs font-bold uppercase tracking-wider text-zinc-600">Account</span>
          </button>

          {/* Cart Icon & Subtotal */}
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-800 text-white px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-sm group cursor-pointer"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform text-[#f5bd02]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-[#f5bd02] text-zinc-950 text-[10px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-zinc-400 leading-none">Cart</span>
              <span className="text-xs font-black text-white leading-tight">₹{cartSubtotal.toLocaleString()}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile search bar if on small screen */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
          <input 
            type="text" 
            placeholder="Search graphic tees, pants, oversized..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-xs font-medium text-zinc-900 placeholder:text-zinc-400 outline-none px-3 py-2"
          />
          <button 
            onClick={() => {
              const targetEl = document.getElementById('featured-products-section');
              if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#f5bd02] text-zinc-950 font-black text-xs px-4 py-2 uppercase"
          >
            Go
          </button>
        </div>
      </div>

      {/* Bright Yellow Navigation Banner Bar matching the image */}
      <div className="bg-[#f5bd02] text-zinc-950 border-t border-b border-[#e5b000]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Main category links */}
          <nav className="flex items-center overflow-x-auto no-scrollbar py-1">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    const targetEl = document.getElementById('featured-products-section');
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs font-black tracking-wider uppercase px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-950 text-[#f5bd02] rounded-md shadow-sm' 
                      : 'text-zinc-950 hover:bg-black/10 rounded-md'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right side contact & special tag */}
          <div className="hidden lg:flex items-center space-x-4 text-xs font-black tracking-wider text-zinc-950">
            <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-full text-[11px]">
              <Sparkles size={13} />
              NEW STREET DROP '26
            </span>
            <a 
              href="tel:18002334455" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneCall size={14} />
              <span>1800 233 4455</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 text-white p-6 border-b border-zinc-800 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f5bd02]">
              Store Categories
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectCategory(link.id);
                  setIsMobileMenuOpen(false);
                  const targetEl = document.getElementById('featured-products-section');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left font-bold text-sm uppercase py-2 border-b border-zinc-900 transition-colors ${
                  activeCategory === link.id ? 'text-[#f5bd02]' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2 text-xs text-zinc-400">
              <p>📍 Flagship Store: Tokyo / Berlin / New Delhi</p>
              <p>📞 Helpline: 1800 233 4455</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
