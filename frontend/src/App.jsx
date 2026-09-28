import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Plus,
  Minus,
  Trash2,
  Check,
  Truck,
  Shield,
  RefreshCcw,
  Headphones,
  Zap,
  MapPin,
  Heart,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Interactive3DCard from './components/Interactive3DCard';
import { TrackOrderModal, ContactUsPage, BlogModal, ProductModal } from './components/HeaderModals';
import ExploreArchives from './components/ExploreArchives';
import ExpressCheckoutModal from './components/ExpressCheckoutModal';
import TrustBadges from './components/TrustBadges';

import { PRODUCTS, CATEGORIES } from './data/products';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Navbar = ({ 
  toggleCart, 
  cartCount, 
  onOpenSearch, 
  onNavigateSection,
  onOpenTrackOrder,
  onOpenContact,
  onOpenBlog,
  onOpenWishlist,
  wishlistCount,
  onGoHome,
  onOpenAbout,
  onOpenProducts
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainHeaders = ['HOME', 'PRODUCTS', 'BLOGS', 'ABOUT US', 'CONTACT US'];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (item === 'HOME') {
      onGoHome();
    } else if (item === 'PRODUCTS') {
      onOpenProducts();
    } else if (item === 'BLOGS') {
      onOpenBlog();
    } else if (item === 'ABOUT US') {
      onOpenAbout();
    } else if (item === 'CONTACT US') {
      onOpenContact();
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md"
    >
      {/* Unified Single Header Row: Logo | Nav Tabs | Track + Icons */}
      <div className={`transition-all duration-300 border-b border-zinc-200 ${
        isScrolled ? 'bg-zinc-50/95 backdrop-blur-md py-2.5' : 'bg-white py-3'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-zinc-900 p-1 cursor-pointer flex-shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            className="text-xl font-black tracking-tighter text-zinc-900 uppercase cursor-pointer flex-shrink-0"
          >
            REV <span className="text-[#f5bd02]">REVISIFY</span>
          </a>

          {/* Center Nav Tabs */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center overflow-x-auto no-scrollbar">
            {mainHeaders.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-xs font-black uppercase tracking-wider text-zinc-800 hover:text-zinc-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right: Track Order + Icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="hidden lg:flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-800 hover:text-zinc-400 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Truck size={15} strokeWidth={2.5} />
              <span>TRACK ORDER</span>
            </button>

            <button 
              onClick={onOpenSearch}
              className="text-zinc-900 hover:text-zinc-500 transition-colors cursor-pointer"
              aria-label="Search items"
            >
              <Search size={21} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={onOpenWishlist}
              className="text-zinc-900 hover:text-zinc-500 transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart size={21} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={toggleCart}
              className="text-zinc-900 hover:text-zinc-500 transition-colors relative cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 text-white border-b border-zinc-800 px-6 py-6"
          >
            <nav className="flex flex-col space-y-4">
              {mainHeaders.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-sm font-bold uppercase tracking-widest text-zinc-200 hover:text-[#f5bd02] py-1 border-b border-zinc-900"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTrackOrder();
                }}
                className="flex items-center gap-2 text-left text-sm font-black uppercase tracking-widest text-[#f5bd02] py-2"
              >
                <Truck size={16} />
                <span>TRACK YOUR ORDER</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const CartSidebar = ({ 
  isOpen, 
  toggleCart, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  onCheckout
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * 0.15); // Hardcoded 15% discount for visual match
  const grandTotal = subtotal - discountAmount;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      setIsCheckingOut(true);
      setTimeout(() => {
        setIsCheckingOut(false);
        setOrderComplete(true);
        onClearCart();
      }, 1200);
    }
  };

  const handleClose = () => {
    setOrderComplete(false);
    toggleCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-zinc-950" />
                <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                  Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button 
                onClick={handleClose} 
                className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            {orderComplete ? (
              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-black uppercase text-zinc-900 mb-2">Order Confirmed!</h3>
                <p className="text-zinc-500 font-medium text-sm max-w-xs mb-8">
                  Thank you for your purchase. We are preparing your order for worldwide express shipment.
                </p>
                <button 
                  onClick={handleClose} 
                  className="px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors rounded-full cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center">
                <ShoppingBag size={56} className="text-zinc-300 mb-6" strokeWidth={1} />
                <p className="text-zinc-500 font-medium text-sm">Your cart is currently empty.</p>
                <button 
                  onClick={() => {
                    handleClose();
                    onContinueShopping();
                  }} 
                  className="mt-8 px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors rounded-full cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Free Shipping Banner */}
                <div className="px-6 py-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
                  <span>🎉</span>
                  <span className="text-[11px] font-bold text-emerald-600">You unlocked FREE EXPRESS SHIPPING!</span>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-zinc-100 items-start">
                      <div className="w-[84px] h-[100px] rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-black text-[13px] uppercase tracking-tight text-zinc-950 leading-snug truncate">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="text-zinc-300 hover:text-red-500 transition-colors flex-shrink-0"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-medium mt-1">
                          Size: <span className="font-bold text-zinc-950">{item.selectedSize || 'L'}</span> • 240 GSM
                        </p>
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-zinc-200 rounded-full bg-white h-8 w-24">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="flex-1 text-center font-bold text-[13px] text-zinc-950">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-black text-sm text-zinc-950">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer calculations & checkout */}
                <div className="px-6 py-6 border-t border-zinc-100 bg-white">
                  {/* Promo code pill */}
                  <div className="flex items-center justify-between bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5 mb-5">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Tag size={14} className="fill-emerald-600/20" />
                      <span className="text-[11px] font-bold">WILD15 (15% OFF)</span>
                    </div>
                    <button className="text-[11px] font-bold text-red-500 hover:text-red-600">
                      Remove
                    </button>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-zinc-500 font-medium">Subtotal</span>
                      <span className="font-bold text-zinc-950">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-emerald-600 font-bold">Discount (15%)</span>
                      <span className="font-bold text-emerald-600">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-zinc-500 font-medium">Shipping</span>
                      <span className="font-bold text-zinc-950">FREE</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px] pt-3 border-t border-zinc-100 mt-2">
                      <span className="font-black text-zinc-950">Total</span>
                      <span className="font-black text-zinc-950">₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full h-[52px] bg-zinc-950 text-white rounded-xl font-bold uppercase tracking-wide text-xs sm:text-[13px] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-950/20"
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={16} className="text-[#f5bd02] fill-[#f5bd02]" />
                        <span>PROCEED TO FAST CHECKOUT (₹{grandTotal.toLocaleString('en-IN')})</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1 mt-4 text-[9px] font-bold text-zinc-500 tracking-wider">
                    <ShieldCheck size={12} />
                    <span>UPI • COD • ALL CARDS ACCEPTED • ENCRYPTED</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const WishlistSidebar = ({ 
  isOpen, 
  toggleWishlist, 
  wishlistItems, 
  onRemoveItem,
  onAddToCart,
  onContinueShopping 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-50 shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-zinc-200">
              <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                Wishlist ({wishlistItems.length})
              </h2>
              <button 
                onClick={toggleWishlist} 
                className="p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer text-zinc-500 hover:text-zinc-900"
              >
                <X size={20} />
              </button>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <Heart size={48} strokeWidth={1} className="text-zinc-200 mb-6" />
                <h3 className="text-lg font-black text-zinc-900 mb-2 uppercase tracking-wide">Your Wishlist is Empty</h3>
                <p className="text-xs text-zinc-500 mb-8 max-w-[250px] leading-relaxed">
                  Looks like you haven't added any products to your wishlist yet.
                </p>
                <button 
                  onClick={onContinueShopping}
                  className="px-8 py-3.5 bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {wishlistItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 pb-6 border-b border-zinc-200 items-center group relative"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-32 object-cover rounded-xl bg-zinc-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm text-zinc-900 leading-snug truncate">
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-rose-500 transition-colors p-1 flex-shrink-0"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1 mb-2">
                        {item.category}
                      </p>
                      <span className="font-black text-sm text-zinc-900 block mb-4">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button 
                        onClick={() => {
                          onAddToCart(item);
                          onRemoveItem(item.id);
                        }}
                        className="w-full py-2.5 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-md"
                      >
                        <ShoppingBag size={14} /> Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SearchModal = ({ isOpen, onClose, searchQuery, onSearchChange, onSelectProduct }) => {
  if (!isOpen) return null;

  const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-start justify-center pt-24 px-4 bg-zinc-950/40 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 border border-zinc-200"
        >
          <div className="flex items-center gap-3 border-b border-zinc-200 pb-4">
            <Search size={22} className="text-zinc-400" />
            <input 
              type="text" 
              autoFocus
              placeholder="Search by product name, category (e.g. Tee, Hoodie, Pants)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 bg-transparent text-base font-semibold text-zinc-900 placeholder:text-zinc-400 outline-none"
            />
            <button 
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-zinc-900 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
            {results.length === 0 ? (
              <p className="text-zinc-400 text-xs py-6 text-center">No products match your search.</p>
            ) : (
              results.map(prod => (
                <div 
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  <img src={prod.image} alt={prod.name} className="w-12 h-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-zinc-900">{prod.name}</h4>
                    <p className="text-[11px] text-zinc-400">{prod.category}</p>
                  </div>
                  <span className="font-black text-xs text-zinc-900">₹{prod.price.toLocaleString('en-IN')}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Hero = ({ onShopNow, onAddToCart, onExpressBuy }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#f4f4f0] flex items-center pt-24 pb-12 overflow-hidden" style={{ clipPath: 'inset(0)' }}>
      
      {/* Animated Wavy/Zig-Zag SVG Line Overlay with RSV Brand Name Inside */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" style={{ clipPath: 'inset(0)' }}>
        <svg 
          className="w-full h-full opacity-90 block" 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="xMidYMid slice"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Guide curve path */}
            <path
              id="zigzag-curve"
              d="M-100,350 C150,250 350,100 500,300 C650,500 400,650 300,700 C150,780 400,850 700,750 C1100,600 1200,350 1600,200"
            />

            {/* Revealing Mask that comes across every 4 seconds */}
            <mask id="zigzag-mask" maskUnits="userSpaceOnUse">
              <motion.path
                d="M-100,350 C150,250 350,100 500,300 C650,500 400,650 300,700 C150,780 400,850 700,750 C1100,600 1200,350 1600,200"
                stroke="#ffffff"
                strokeWidth="54"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  times: [0, 0.72, 0.88, 1]
                }}
              />
            </mask>
          </defs>

          {/* Masked Group containing both the dark ribbon and the RSV text inside it */}
          <g mask="url(#zigzag-mask)">
            {/* Dark Streetwear Ribbon Line */}
            <path
              d="M-100,350 C150,250 350,100 500,300 C650,500 400,650 300,700 C150,780 400,850 700,750 C1100,600 1200,350 1600,200"
              stroke="#18181b"
              strokeWidth="44"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Brand Name "RSV RSV" embedded inside the line */}
            <text
              fill="#ffffff"
              fontSize="13"
              fontWeight="900"
              letterSpacing="5"
              dominantBaseline="central"
              className="select-none pointer-events-none uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              <textPath href="#zigzag-curve" startOffset="0%">
                RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV &bull; RSV
                <animate 
                  attributeName="startOffset" 
                  from="0%" 
                  to="-30%" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 pt-12 lg:pt-0"
          >

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black uppercase text-zinc-900 leading-[0.95] tracking-tighter mb-8">
              Cool and <br/>
              Classy: <br/>
              <span className="text-zinc-600">Discover</span> <br/>
              Our Finest <br/>
              Fashion.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-zinc-600 max-w-sm text-sm leading-relaxed mb-12 font-medium">
              Elegant classics and modern style for real men in the heart of the city. Uncompromising quality and character.
            </motion.p>

            {/* Call To Action Buttons matching screenshot */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExpressBuy}
                className="group px-7 py-3.5 sm:px-8 sm:py-4 bg-zinc-950 text-white rounded-full text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-zinc-800 transition-all hover:scale-[1.02] shadow-xl flex items-center gap-2.5 cursor-pointer"
              >
                <Zap size={16} className="text-[#f5bd02] fill-[#f5bd02] transition-transform group-hover:scale-110" />
                <span>EXPRESS BUY FLAGSHIP TEE (₹699)</span>
              </button>

              <button
                onClick={onShopNow}
                className="group px-7 py-3.5 sm:px-8 sm:py-4 bg-white border-2 border-zinc-950 text-zinc-950 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-zinc-950 hover:text-white transition-all hover:scale-[1.02] shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>BROWSE ALL DROPS</span>
                <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive 3D Product Card matching screenshot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-5 relative w-full flex justify-center items-center py-2"
          >
            <Interactive3DCard onQuickAdd={onAddToCart} />

            {/* Subtle Overlay text at bottom right */}
            <div className="absolute -bottom-6 -right-6 hidden xl:block pointer-events-none">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 rotate-90 origin-bottom-left">
                Worldwide Shipping
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onAddToCart, onProductClick, isWishlisted, onToggleWishlist }) => {
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

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

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div 
      variants={fadeInUp}
      className="group flex flex-col cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => onProductClick && onProductClick(product)}
    >
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5
        }}
        className="relative aspect-[3/4] mb-5 rounded-2xl bg-zinc-100 shadow-lg border border-transparent hover:border-zinc-200/50 hover:shadow-2xl transition-shadow"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ transform: 'translateZ(10px)' }}>
          {product.badge && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist && onToggleWishlist(product);
            }}
            className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
              isWishlisted 
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' 
                : 'bg-white/90 text-zinc-400 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
          </button>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Dynamic 3D Glare Sheen */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              opacity: glarePos.opacity
            }}
          />
        </div>
        
        {/* Quick Add Button - LIVE AND WORKING */}
        <div 
          className="absolute inset-x-4 bottom-4 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20"
          style={{ transform: 'translateZ(30px)' }}
        >
          <button 
            onClick={handleAdd}
            className={`w-full py-3.5 backdrop-blur-md font-bold uppercase tracking-wider text-xs rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isAdded 
                ? 'bg-zinc-900 text-white' 
                : 'bg-white/95 text-zinc-900 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Added to Cart
              </>
            ) : (
              <>
                <Plus size={16} /> Quick Add
              </>
            )}
          </button>
        </div>
      </motion.div>
      
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-zinc-900 text-sm leading-snug group-hover:text-zinc-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {product.originalPrice && (
              <span className="text-zinc-400 line-through text-xs font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="font-black text-zinc-900 text-sm">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider">{product.categoryLabel || product.category}</p>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="bg-white text-zinc-950 flex flex-col md:flex-row min-h-[600px] border-t border-zinc-200 pt-24 pb-12">
      {/* Left side: Content */}
      <div className="w-full md:w-1/2 px-8 py-12 md:p-16 lg:p-24 flex flex-col justify-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1e2749] font-bold tracking-tight leading-[1.1] mb-6">
          ABOUT REVISIFY'S<br />BIRTH HISTORY AND<br />HISTORIC MISSION
        </h2>
        
        <div className="w-16 h-1.5 bg-[#f5bd02] mb-10" />

        <p className="text-zinc-500 leading-relaxed mb-12 max-w-xl text-sm md:text-base">
          Welcome to Revisify, your premier destination for high-performance Product. Founded on the principles of excellence and athletic integrity, we've dedicated ourselves to providing only the most elite formulas to our community. Our journey began with a simple mission: to empower every athlete with the tools they need to achieve their legendary status.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 max-w-2xl">
          <div>
            <h3 className="font-serif text-[#1e2749] font-bold text-lg mb-4">OUR MISSION</h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              To empower every customer and seller by providing high-quality products, exceptional service, and a seamless shopping experience—helping communities thrive and grow.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[#1e2749] font-bold text-lg mb-4">OUR VISION</h3>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              To be the trusted destination for all retail needs, where every goal is achievable and every business and shopper finds the support and resources to succeed.
            </p>
          </div>
        </div>

        <div className="pl-6 border-l-4 border-[#f5bd02] max-w-xl">
          <p className="text-[#1e2749] font-bold italic text-sm md:text-base leading-relaxed">
            "There are many variations of passages but the majority have suffered alteration in some form, randomized words which don't look even slightly believable."
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="w-full md:w-1/2 bg-zinc-950 flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-full max-w-lg">
          {/* Main REV Logo Graphic */}
          <div className="w-full text-white font-black italic flex flex-col items-center text-center">
            <span className="text-[12rem] leading-none tracking-tighter">REV</span>
            <span className="text-4xl tracking-[0.4em] uppercase mt-4 text-[#f5bd02]">REVISIFY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Truck size={24} strokeWidth={1.5}/>, title: "Worldwide Shipping", desc: "Fast & reliable delivery" },
    { icon: <RefreshCcw size={24} strokeWidth={1.5}/>, title: "30 Days Return", desc: "No questions asked" },
    { icon: <Shield size={24} strokeWidth={1.5}/>, title: "Secure Checkout", desc: "Encrypted payments" },
    { icon: <Headphones size={24} strokeWidth={1.5}/>, title: "Premium Support", desc: "24/7 dedicated help" }
  ];

  return (
    <div id="features" className="border-t border-zinc-200 bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4">
              <div className="text-zinc-900 bg-zinc-50 p-4 rounded-full">{feat.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-1">{feat.title}</h4>
                <p className="text-xs text-zinc-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNavigateSection, onFilterCategory }) => {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4 pr-0 md:pr-12">
            <a href="#" className="flex items-center text-2xl font-bold uppercase tracking-widest text-white mb-10">
              <span className="font-black italic mr-2 text-3xl">REV</span> REVISIFY
            </a>
            
            <div className="flex items-start gap-4 text-zinc-400 text-xs leading-relaxed max-w-xs mb-10">
              <MapPin size={18} className="text-[#f5bd02] flex-shrink-0 mt-0.5" />
              <p>
                Revise apparels No 2 housing unit main road,,<br/>
                Tirupur, Tamil Nadu, India - 641602
              </p>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#f5bd02] rounded-full flex items-center justify-center text-zinc-950 flex-shrink-0">
                <Headphones size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Call Us 24/7 Anytime</span>
                <span className="text-[#f5bd02] font-black text-xl tracking-wider">9500744975</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-black uppercase tracking-[0.15em] mb-8 text-xs text-zinc-300">Explore Store</h4>
            <ul className="space-y-5 text-zinc-400 text-xs font-medium">
              <li><button onClick={() => onNavigateSection('about')} className="hover:text-white transition-colors cursor-pointer text-left">About Our Store</button></li>
              <li><button onClick={() => { onFilterCategory('All'); onNavigateSection('collection'); }} className="hover:text-white transition-colors cursor-pointer text-left">Shop All Products</button></li>
              <li><button className="hover:text-white transition-colors cursor-pointer text-left">Contact Us</button></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-black uppercase tracking-[0.15em] mb-8 text-xs text-zinc-300">Customer Care</h4>
            <ul className="space-y-5 text-zinc-400 text-xs font-medium">
              <li><button className="hover:text-white transition-colors text-left">Shipping & Returns</button></li>
              <li><button className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors text-left">Terms & Conditions</button></li>
              <li><button className="hover:text-white transition-colors text-left">Cancellation Policy</button></li>
              <li><button className="hover:text-white transition-colors text-left">Payment Security</button></li>
              <li><button className="hover:text-white transition-colors text-left">Terms Of Use</button></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-black uppercase tracking-[0.15em] mb-8 text-xs text-zinc-300">Stay Connected</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#f5bd02] hover:text-zinc-950 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#f5bd02] hover:text-zinc-950 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-[#f5bd02] hover:text-zinc-950 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 pb-4 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold text-zinc-600 uppercase tracking-[0.15em] relative gap-4 md:gap-0">
          <p>© 2026 REVISIFY. ALL RIGHTS RESERVED.</p>
          <div className="md:absolute left-1/2 md:-translate-x-1/2">
            VERSION 1.0.3
          </div>
          <p>DEVELOPED BY: <span className="text-zinc-400 ml-1">STRACKIT PVT LTD</span></p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      quantity: 1
    }
  ]);

  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [expressCheckoutProduct, setExpressCheckoutProduct] = useState(null);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const [currentView, setCurrentView] = useState('home');

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

  useEffect(() => {
    if (isCartOpen || isSearchOpen || isTrackOrderOpen || isBlogOpen || quickViewProduct || isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, isSearchOpen, isTrackOrderOpen, isBlogOpen, quickViewProduct, isWishlistOpen]);

  const handleToggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered Products
  const displayedProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = 
        selectedCategory === 'All' || selectedCategory === 'all'
          ? true 
          : selectedCategory === 'New In' 
            ? p.badge === 'New Arrival' 
            : p.category.toLowerCase() === selectedCategory.toLowerCase() ||
              (p.categoryLabel && p.categoryLabel.toLowerCase() === selectedCategory.toLowerCase());
      
      const matchSearch = searchQuery.trim() === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar 
        toggleCart={toggleCart} 
        cartCount={totalCartCount} 
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenContact={() => {
          setCurrentView('contact');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenBlog={() => setIsBlogOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistItems.length}
        onGoHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenAbout={() => {
          setCurrentView('about');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenProducts={() => {
          setCurrentView('products');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => scrollToSection('collection')}
        onCheckout={() => {
          if (cartItems.length > 0) {
            setIsCartOpen(false);
            setExpressCheckoutProduct(cartItems[0]);
          }
        }}
      />

      <WishlistSidebar
        isOpen={isWishlistOpen}
        toggleWishlist={toggleWishlist}
        wishlistItems={wishlistItems}
        onRemoveItem={(id) => setWishlistItems(prev => prev.filter(item => item.id !== id))}
        onAddToCart={handleAddToCart}
        onContinueShopping={() => {
          setIsWishlistOpen(false);
          scrollToSection('products');
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProduct={(_p) => {
          setSelectedCategory('All');
          setCurrentView('home');
          setTimeout(() => scrollToSection('collection'), 0);
        }}
      />
      
      {currentView === 'home' ? (
        <main>
          <Hero 
            onShopNow={() => scrollToSection('collection')}
            onAddToCart={handleAddToCart}
            onExpressBuy={() => {
              handleAddToCart({ ...PRODUCTS[0], selectedSize: 'M' });
              setExpressCheckoutProduct({ ...PRODUCTS[0], selectedSize: 'M' });
            }}
            onQuickViewHeroProduct={() => setQuickViewProduct(PRODUCTS[0])}
          />
          
          <ExploreArchives 
            products={PRODUCTS}
            onAddToCart={(product, size, openCart = false) => {
              handleAddToCart({ ...product, selectedSize: size || 'M' });
              if (openCart) setIsCartOpen(true);
            }}
            onExpressBuy={(product, size) => {
              handleAddToCart({ ...product, selectedSize: size || 'M' });
              setExpressCheckoutProduct({ ...product, selectedSize: size || 'M' });
            }}
            onOpenQuickView={(product) => setQuickViewProduct(product)}
            onViewCatalog={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          />

          <section id="collection" className="pt-16 pb-24 max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  Latest Drops
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider bg-zinc-950 text-white px-3 py-1 rounded-full">
                  New Arrivals
                </span>
              </div>
              <p className="text-zinc-500 text-sm font-medium">Original streetwear essentials straight from the Revisify atelier.</p>
            </div>
            
            <button 
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="hidden md:flex items-center gap-2 px-8 py-3.5 bg-zinc-950 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
            >
              Shop All Archive
              <ArrowRight size={16} />
            </button>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-16"
          >
            {PRODUCTS.slice(0, 8).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onProductClick={setQuickViewProduct}
                  isWishlisted={wishlistItems.some(item => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </motion.div>
          
          <div className="mt-16 flex justify-center md:hidden">
            <button 
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="w-full py-4 rounded-full bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs shadow-xl cursor-pointer"
            >
              Shop All Archive
            </button>
          </div>
        </section>
        <Features />
      </main>
      ) : currentView === 'products' ? (
      <main className="pt-[116px]">
        {/* Banner */}
        <div className="bg-[#18181b] text-white py-24 flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-4">REVISIFY</h1>
          <p className="text-[#f5bd02] font-black uppercase tracking-[0.3em] text-[10px]">HOME <span className="mx-3">/</span> SHOP ARCHIVE</p>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12 bg-white border border-zinc-200 p-2 shadow-sm rounded-lg">
            <button className="bg-zinc-950 text-white font-black text-xs uppercase tracking-widest px-6 py-4 flex items-center justify-center gap-2 rounded hover:bg-zinc-800 transition-colors whitespace-nowrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              REFINE
            </button>
            <div className="flex-1 relative flex items-center border border-zinc-200 rounded px-4 bg-zinc-50">
              <Search size={16} className="text-zinc-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-4 text-xs font-bold outline-none placeholder:text-zinc-400"
              />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-black uppercase tracking-widest px-4 py-4 rounded outline-none cursor-pointer appearance-none lg:w-48"
            >
              <option value="All">CATEGORIES</option>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select className="bg-zinc-50 border border-zinc-200 text-zinc-400 text-xs font-black uppercase tracking-widest px-4 py-4 rounded outline-none cursor-pointer appearance-none lg:w-48">
              <option>SUB CATEGORY</option>
            </select>
            <select className="bg-zinc-950 border border-zinc-950 text-white text-xs font-black uppercase tracking-widest px-4 py-4 rounded outline-none cursor-pointer appearance-none lg:w-48">
              <option>LATEST</option>
            </select>
          </div>

          {/* Product Grid */}
          {displayedProducts.length === 0 ? (
            <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-300">
              <p className="text-sm font-bold text-zinc-600 mb-4">No products found in this category.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <motion.div 
              key={`products-${selectedCategory}-${searchQuery}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-16 pb-24"
            >
              {displayedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onProductClick={setQuickViewProduct}
                  isWishlisted={wishlistItems.some(item => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      ) : currentView === 'about' ? (
      <main>
        <AboutUs />
      </main>
      ) : (
      <main>
        <ContactUsPage />
      </main>
      )}

      <TrustBadges />

      <Footer 
        onNavigateSection={scrollToSection} 
        onFilterCategory={setSelectedCategory} 
      />

      {/* Header Modals */}
      <TrackOrderModal 
        isOpen={isTrackOrderOpen} 
        onClose={() => setIsTrackOrderOpen(false)} 
      />
      <BlogModal 
        isOpen={isBlogOpen} 
        onClose={() => setIsBlogOpen(false)} 
      />
      <ProductModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        onAddToCart={handleAddToCart}
      />

      <ExpressCheckoutModal 
        isOpen={!!expressCheckoutProduct}
        onClose={() => setExpressCheckoutProduct(null)}
        product={expressCheckoutProduct}
        size={expressCheckoutProduct?.selectedSize}
        cartItems={cartItems}
      />
    </div>
  );
}
