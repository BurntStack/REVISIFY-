import React from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  RefreshCw, 
  Headphones, 
  Award 
} from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <Rocket size={24} className="text-[#f5bd02]" />,
      title: "FAST SHIPPING",
      desc: "Dispatched within 24 hours"
    },
    {
      icon: <ShieldCheck size={24} className="text-[#f5bd02]" />,
      title: "BUYER PROTECTION",
      desc: "100% Secure SSL Checkout"
    },
    {
      icon: <RefreshCw size={24} className="text-[#f5bd02]" />,
      title: "EASY RETURNS",
      desc: "7-Day Hassle-free Exchange"
    },
    {
      icon: <Headphones size={24} className="text-[#f5bd02]" />,
      title: "24/7 SUPPORT",
      desc: "Direct WhatsApp & Phone"
    },
    {
      icon: <Award size={24} className="text-[#f5bd02]" />,
      title: "PREMIUM QUALITY",
      desc: "240+ GSM Combed Cotton"
    }
  ];

  return (
    <section className="bg-white border-t border-zinc-200 py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {badges.map((badge, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-zinc-50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <h4 className="font-black text-xs uppercase tracking-wider text-zinc-950 mb-1">
                {badge.title}
              </h4>
              <p className="text-[11px] text-zinc-500 font-medium">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
