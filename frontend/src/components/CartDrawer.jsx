import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = Math.round(subtotal * appliedDiscount);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'RSV10') {
      setAppliedDiscount(0.10);
      setPromoMessage('10% Discount applied successfully!');
    } else if (cleanCode === 'STREET15') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% VIP Member discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try RSV10 or STREET15');
    }
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      setIsCheckingOut(true);
      setTimeout(() => {
        setIsCheckingOut(false);
        setOrderComplete(true);
        onClearCart();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#f5bd02]" />
              <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3 bg-zinc-950 text-white text-xs">
            <div className="flex justify-between items-center mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-[#f5bd02]">
                <Truck size={14} />
                {amountToFreeShipping === 0 
                  ? 'YOU UNLOCKED FREE EXPRESS SHIPPING!' 
                  : `Add ₹${amountToFreeShipping.toLocaleString()} more for FREE Delivery`}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#f5bd02] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-black uppercase text-zinc-900">Order Placed!</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Thank you for shopping with RSV Clothing. Your order confirmation and tracking details will be sent via SMS.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-3 bg-zinc-950 text-[#f5bd02] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-800"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 bg-zinc-100 rounded-full mx-auto flex items-center justify-center text-zinc-400">
                  <ShoppingBag size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-black uppercase text-zinc-900">Your Cart is Empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore our latest drop of heavyweight oversized tees and streetwear essentials.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#f5bd02] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#e0ac00] cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize || 'default'}`}
                  className="flex gap-4 p-3.5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-24 object-cover rounded-xl bg-zinc-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-xs text-zinc-900 leading-tight">
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        {item.selectedSize && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        <span className="text-xs font-bold text-zinc-950">
                          ₹{item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-200"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 font-bold text-xs text-zinc-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-200"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-black text-xs text-zinc-950">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Coupon: RSV10" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs font-bold uppercase tracking-wider bg-white border border-zinc-300 rounded-lg px-3 py-2.5 outline-none focus:border-zinc-950"
                  />
                  <Tag size={14} className="absolute right-3 top-3 text-zinc-400" />
                </div>
                <button 
                  type="submit"
                  className="bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-bold ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 font-medium pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedDiscount * 100}%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-zinc-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-black uppercase">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total Due</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#f5bd02] hover:bg-[#e0ac00] text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl transition-all shadow-xl shadow-[#f5bd02]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>PROCESSING ORDER...</span>
                  </>
                ) : (
                  <>
                    <span>PROCEED TO CHECKOUT &bull; ₹{grandTotal.toLocaleString()}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 uppercase font-bold text-center">
                <ShieldCheck size={14} className="text-zinc-600" />
                <span>256-Bit SSL Encrypted &bull; 100% Risk-Free Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
