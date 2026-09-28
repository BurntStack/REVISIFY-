import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-16 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-zinc-800 text-white flex items-center justify-center font-black text-lg tracking-tighter rounded-md">
                R
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                REV <span className="text-[#f5bd02]">REVISIFY</span>
              </span>
            </a>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              RSV Clothing is a high-street menswear label redefining urban utility with heavyweight textiles, vintage motorsport culture, and unapologetic character.
            </p>

            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                <span>Revisify Atelier, Streetwear District 7, Indiranagar, Bengaluru / Tokyo Studio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-zinc-400 flex-shrink-0" />
                <span>support@revisify.com</span>
              </div>
            </div>

            {/* Helpline Banner matching screenshot */}
            <div className="inline-flex items-center gap-3.5 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center font-black">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  CUSTOMER HELPLINE
                </span>
                <span className="text-base font-black text-white tracking-wider">
                  1800 233 4455
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              EXPLORE LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Story &amp; Ethos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LC79 Heritage Capsule</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tokyo Drift Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Heavyweight 240 GSM Fabric</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability &amp; Care</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">7-Day Return &amp; Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Domestic &amp; International Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men's Oversized Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Stay Connected & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300">
              STAY CONNECTED
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Join 40,000+ streetwear enthusiasts. Get early access to limited edition drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-zinc-600"
                />
                <button 
                  type="submit"
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-black px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> You're on the VIP drop list!
                </p>
              )}
            </form>

            {/* Social SVGs matching the icons in screenshot */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} REV REVISIFY. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="text-zinc-400">100% SECURE CHECKOUT</span>
            <span>&bull;</span>
            <span className="text-zinc-400">MADE IN INDIA / GLOBAL SHIPPING</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
