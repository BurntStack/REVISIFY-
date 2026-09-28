import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Send,
  MapPin,
  Clock,
  Heart,
  ShoppingBag,
  Zap,
  Shield,
  Plus,
  Minus,
  RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TrackOrderModal({ isOpen, onClose }) {
  const [orderNumber, setOrderNumber] = useState('RSV-98124');
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200"
        >
          <div className="flex justify-between items-center pb-4 border-b border-zinc-200 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#f5bd02] text-zinc-950 flex items-center justify-center">
                <Truck size={20} />
              </div>
              <div>
                <h3 className="font-black text-lg uppercase tracking-tight text-zinc-900">
                  Track Your Order
                </h3>
                <p className="text-xs text-zinc-500">Live courier tracking</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSearched(true); }} className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. RSV-98124)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 outline-none focus:border-zinc-950"
            />
            <button 
              type="submit"
              className="bg-zinc-950 text-[#f5bd02] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Track
            </button>
          </form>

          {searched && (
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-5">
              <div className="flex justify-between items-start pb-3 border-b border-zinc-200">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Order ID</span>
                  <h4 className="font-black text-sm text-zinc-900 uppercase">{orderNumber || 'RSV-98124'}</h4>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Transit
                </span>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4 pt-1">
                {[
                  { title: "Order Confirmed", time: "Sep 27, 10:30 AM", done: true },
                  { title: "Quality Check & Custom Packaging", time: "Sep 27, 04:15 PM", done: true },
                  { title: "Dispatched via Express Courier", time: "Sep 28, 08:00 AM", done: true },
                  { title: "Out for Delivery", time: "Estimated Today by 6:00 PM", done: false, active: true },
                  { title: "Delivered to Doorstep", time: "Pending", done: false }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      step.done 
                        ? 'bg-zinc-950 text-[#f5bd02]' 
                        : step.active 
                          ? 'bg-[#f5bd02] text-zinc-950 animate-bounce' 
                          : 'bg-zinc-200 text-zinc-400'
                    }`}>
                      {step.done ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className={`font-bold text-xs ${step.active ? 'text-zinc-950 font-black' : 'text-zinc-700'}`}>
                        {step.title}
                      </h5>
                      <p className="text-[10px] text-zinc-400">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="bg-zinc-50 text-zinc-950 pt-24 pb-12 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200">
          <div className="flex justify-between items-center pb-8 border-b border-zinc-200 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-[#f5bd02] flex items-center justify-center shadow-md">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-black text-3xl uppercase tracking-tight text-zinc-900">
                  Get In Touch
                </h3>
                <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-1">Connect / Performance Support</p>
              </div>
            </div>
          </div>

          {/* 4 Info Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col items-center text-center hover:border-zinc-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#18181b] text-[#f5bd02] flex items-center justify-center mb-4">
                <Phone size={20} />
              </div>
              <h5 className="font-black text-sm uppercase tracking-wider text-zinc-900 mb-1">Call Us</h5>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Technical Support</span>
              <p className="text-sm font-black text-zinc-950 mt-auto">9500744975</p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col items-center text-center hover:border-zinc-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#f5bd02] text-zinc-950 flex items-center justify-center mb-4">
                <Mail size={20} />
              </div>
              <h5 className="font-black text-sm uppercase tracking-wider text-zinc-900 mb-1">Email Us</h5>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Direct Inquiry</span>
              <p className="text-xs font-bold text-zinc-950 mt-auto">support@revisify.in</p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col items-center text-center hover:border-zinc-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#18181b] text-[#f5bd02] flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h5 className="font-black text-sm uppercase tracking-wider text-zinc-900 mb-1">Visit Us</h5>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Our Headquarters</span>
              <p className="text-[10px] leading-relaxed font-bold text-zinc-600 mt-auto px-2">REVISE APPARELS NO 2 HOUSING UNIT MAIN ROAD,, TIRUPUR, TAMIL NADU, INDIA - 641602</p>
            </div>

            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col items-center text-center hover:border-zinc-300 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#f5bd02] text-zinc-950 flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <h5 className="font-black text-sm uppercase tracking-wider text-zinc-900 mb-1">Working Hours</h5>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Mon - Sat</span>
              <p className="text-sm font-black text-zinc-950 mt-auto">09:00 AM - 08:00 PM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map iframe */}
            <div className="w-full h-64 lg:h-auto rounded-2xl overflow-hidden border border-zinc-200">
              <iframe 
                src="https://maps.google.com/maps?q=11.115488,77.3181664&hl=en&z=15&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '250px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Headquarters Location"
              ></iframe>
            </div>

            {/* Contact Form */}
            <div className="flex flex-col justify-center">
              {submitted ? (
                <div className="py-12 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 h-full flex flex-col items-center justify-center">
                  <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-600" />
                  <h4 className="font-black text-sm uppercase">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-600 mt-2 font-medium">Our support team will reply within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-bold text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-colors"
                    />
                    <input 
                      type="email" 
                      required
                      placeholder="Your Email Address" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-bold text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-colors"
                    />
                  </div>
                  <textarea 
                    rows="4" 
                    required
                    placeholder="How can we assist you with your order or collection enquiry?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-bold text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white transition-colors resize-none"
                  />
                  <button 
                    type="submit"
                    className="w-full py-4 bg-zinc-950 text-[#f5bd02] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const blogs = [
    {
      id: 1,
      title: "Why Heavyweight 240 GSM is the Gold Standard for Boxy Streetwear",
      date: "Sep 2026",
      readTime: "4 min read",
      category: "Textile Engineering",
      snippet: "How custom-milled combed cotton creates the structured, drape-retaining streetwear silhouette without losing breathability."
    },
    {
      id: 2,
      title: "Tokyo to Berlin: The Evolution of Industrial & Automotive Graphic Tees",
      date: "Aug 2026",
      readTime: "5 min read",
      category: "Culture & Style",
      snippet: "From legendary off-road vehicles like the LC79 to Shibuya street art, exploring the raw mechanics behind our aesthetic."
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-zinc-200 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center pb-4 border-b border-zinc-200 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-[#f5bd02] flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-black text-lg uppercase tracking-tight text-zinc-900">
                  RSV Journal &amp; Blogs
                </h3>
                <p className="text-xs text-zinc-500">Streetwear editorials &amp; garment care</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {blogs.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-900 transition-colors">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#b38600] mb-1.5">
                  <span>{b.category}</span>
                  <span className="text-zinc-400">{b.date} &bull; {b.readTime}</span>
                </div>
                <h4 className="font-black text-sm text-zinc-950 uppercase leading-snug mb-2">
                  {b.title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  {b.snippet}
                </p>
                <button 
                  onClick={onClose} 
                  className="text-xs font-bold text-zinc-950 flex items-center gap-1.5 hover:gap-2 transition-all uppercase tracking-wider"
                >
                  Read Editorial <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity, size: selectedSize });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity, size: selectedSize });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl z-10 border border-zinc-200 flex flex-col md:flex-row gap-6 lg:gap-8 max-h-[95vh] overflow-y-auto no-scrollbar"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#f5bd02] hover:bg-yellow-400 text-zinc-900 rounded-xl flex items-center justify-center transition-colors shadow-md"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-[45%] flex-shrink-0 relative">
            <div className="aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden relative">
              <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-zinc-950 text-white rounded-md shadow-lg">
                {product.badge || 'DEAL OF THE WEEK'}
              </span>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full flex flex-col justify-center py-2 pr-2">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Boxy Heavyweight</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-right">Tirupur Atelier &bull; Ready For Dispatch</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-[#1e2749] mb-4 leading-none">
              {product.name}
            </h2>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-black text-[#1e2749] leading-none">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm font-medium text-zinc-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100 mb-1 tracking-widest">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed flex items-start gap-2">
                <span className="text-zinc-300 mt-0.5">&bull;</span>
                {product.name} brings bold graphic streetwear to your wardrobe with a striking collage-inspired print on a classic black base.
              </p>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed flex items-start gap-2">
                <span className="text-zinc-300 mt-0.5">&bull;</span>
                Its relaxed boxy fit delivers a modern, effortless look with an edgy urban vibe.
              </p>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">10 IN STOCK</span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Size:</span>
                <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Selected: {selectedSize}</span>
              </div>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-zinc-950 text-white shadow-md'
                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-1 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-full flex items-center justify-center text-zinc-400 hover:text-zinc-950"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-full flex items-center justify-center text-zinc-400 hover:text-zinc-950"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-[1.5] h-12 bg-zinc-800 text-white rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors shadow-lg"
              >
                {added ? <CheckCircle2 size={16} /> : <ShoppingBag size={16} />} 
                {added ? 'Added' : 'Add To Cart'}
              </button>

              <button 
                onClick={handleBuyNow}
                className="flex-1 h-12 bg-zinc-950 text-[#f5bd02] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-widest hover:bg-[#f5bd02] hover:text-zinc-950 transition-colors shadow-lg"
              >
                <Zap size={16} className="fill-current" /> Buy
              </button>
            </div>

            {/* Wishlist */}
            <button className="flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-widest mb-8 hover:text-rose-700 transition-colors">
              <Heart size={14} className="fill-current" /> Wishlisted (In Wishlist)
            </button>

            {/* Guarantees */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                <Truck size={14} /> Express Ship
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                <RefreshCcw size={14} /> 30-Day Return
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                <Shield size={14} /> 100% Genuine
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
