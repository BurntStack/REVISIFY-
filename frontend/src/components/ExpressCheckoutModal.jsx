import React, { useState, useEffect } from 'react';
import { X, Zap, Clock, Truck, ShieldCheck, QrCode, Banknote, CreditCard, Lock, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpressCheckoutModal({ isOpen, onClose, product, size, cartItems = [] }) {
  const [timeLeft, setTimeLeft] = useState(582); // 09:42 in seconds
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAutoFill = (city) => {
    if (city === 'Tirupur') {
      setFormData({
        fullName: 'Siva Kumar',
        phone: '9500744975',
        address: 'No 2 Housing Unit Main Road',
        city: 'Tirupur',
        pincode: '641602'
      });
    } else if (city === 'Bengaluru') {
      setFormData({
        fullName: 'Rahul Sharma',
        phone: '9876543210',
        address: '123 Tech Park, Whitefield',
        city: 'Bengaluru',
        pincode: '560066'
      });
    } else if (city === 'Mumbai') {
      setFormData({
        fullName: 'Priya Desai',
        phone: '9123456789',
        address: '45 Sea View Apts, Bandra West',
        city: 'Mumbai',
        pincode: '400050'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : (product?.price || 0);
  const itemCount = cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-zinc-100 flex items-start justify-between bg-white relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                <Zap className="text-[#f5bd02] fill-[#f5bd02]" size={24} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950 leading-none mb-1.5">
                  1-Page Express Fast Checkout
                </h2>
                <p className="text-zinc-500 text-xs sm:text-sm font-medium">
                  Direct dispatch from Tirupur factory studio. Total: <span className="font-bold text-zinc-950">₹{subtotal}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 bg-zinc-50/50 space-y-6">
            {/* Timer Banner */}
            <div className="flex items-center justify-between bg-orange-50 border border-orange-200/60 rounded-xl p-3 px-4">
              <div className="flex items-center gap-2 text-orange-600 font-medium text-xs sm:text-sm">
                <Clock size={16} />
                <span>Cart reserved for you for {formatTime(timeLeft)} mins</span>
              </div>
              <span className="bg-orange-100 text-orange-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                High Demand
              </span>
            </div>

            {/* Autofill */}
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Quick Auto-Fill Address For Testing:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tirupur', 'Bengaluru', 'Mumbai'].map(city => (
                  <button
                    key={city}
                    onClick={() => handleAutoFill(city)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs font-semibold text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-colors shadow-sm"
                  >
                    <MapPin size={12} className="text-red-500" />
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck size={18} className="text-zinc-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
                  1. Contact & Shipping Address
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Phone (For Bluedart OTP)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Delivery Address / House / Flat</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className="text-zinc-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
                  2. Select Payment Method
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all bg-white shadow-sm text-left ${
                    paymentMethod === 'upi' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex w-full justify-between items-start mb-2">
                    <QrCode size={20} className={paymentMethod === 'upi' ? 'text-emerald-500' : 'text-zinc-600'} />
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">Fastest</span>
                  </div>
                  <span className="font-bold text-zinc-900 text-sm">Instant UPI</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">GPay, PhonePe, Paytm QR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all bg-white shadow-sm text-left ${
                    paymentMethod === 'cod' ? 'border-zinc-900 ring-2 ring-zinc-900/20' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex w-full justify-between items-start mb-2">
                    <Banknote size={20} className={paymentMethod === 'cod' ? 'text-zinc-900' : 'text-zinc-600'} />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider px-1.5 py-0.5">₹0 Extra</span>
                  </div>
                  <span className="font-bold text-zinc-900 text-sm">Cash on Delivery</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">Pay at doorstep</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all bg-white shadow-sm text-left ${
                    paymentMethod === 'card' ? 'border-zinc-900 ring-2 ring-zinc-900/20' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex w-full justify-between items-start mb-2">
                    <CreditCard size={20} className={paymentMethod === 'card' ? 'text-zinc-900' : 'text-zinc-600'} />
                  </div>
                  <span className="font-bold text-zinc-900 text-sm">Cards & Netbanking</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">Visa, Mastercard, RuPay</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-zinc-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-zinc-600">Total Payable ({itemCount} item{itemCount !== 1 ? 's' : ''}):</span>
              <span className="text-xl sm:text-2xl font-black text-zinc-950">₹{subtotal}</span>
            </div>
            
            <button className="w-full py-4 bg-zinc-950 text-white rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-900/20 mb-3">
              <Zap size={16} className="text-[#f5bd02] fill-[#f5bd02]" />
              Confirm Order • Pay ₹{subtotal}
              <ArrowRight size={16} />
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 font-medium">
              <Lock size={12} className="text-emerald-500" />
              <span>256-bit bank encrypted. Hassle-free 30-day exchange directly handled by REVISIFY Tirupur.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
