import React, { useState } from 'react';
import { X, Package, MapPin } from 'lucide-react';

export default function AccountModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('orders');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl z-10 border border-zinc-200">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-950 text-[#f5bd02] flex items-center justify-center font-black">
              R
            </div>
            <div>
              <h3 className="font-black text-sm uppercase text-zinc-950">RSV Streetwear Member</h3>
              <p className="text-xs text-zinc-500">member#88294 &bull; Gold Tier</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 border border-zinc-200 text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'border-zinc-950 text-zinc-950' : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Saved Addresses
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {activeTab === 'orders' ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-800">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-zinc-950 uppercase">Order #RSV-98124</h4>
                    <p className="text-[11px] text-zinc-500">LC79 Land Cruiser Heavyweight Tee (L)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Delivered
                  </span>
                  <span className="block text-xs font-bold text-zinc-900 mt-1">₹1,299</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-800">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-zinc-950 uppercase">Order #RSV-92410</h4>
                    <p className="text-[11px] text-zinc-500">Tactical Multi-Pocket Cargo Pants (32)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    In Transit
                  </span>
                  <span className="block text-xs font-bold text-zinc-900 mt-1">₹2,199</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase text-zinc-900 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f5bd02]" /> Primary Shipping Address
                </span>
                <span className="text-[10px] bg-zinc-950 text-white font-bold px-2 py-0.5 rounded uppercase">
                  Default
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                402, Streetwear Lofts, 100 Feet Road, Indiranagar, Bengaluru, KA - 560038
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-100 text-center border-t border-zinc-200">
          <p className="text-[11px] font-bold text-zinc-500">
            Need help with an order? Contact 1800 233 4455 or support@rsvclothing.com
          </p>
        </div>
      </div>
    </div>
  );
}
