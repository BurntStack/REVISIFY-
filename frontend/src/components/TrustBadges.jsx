import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap,
  ShieldCheck, 
  RefreshCw, 
  Headphones, 
  Award,
  ArrowRight
} from 'lucide-react';

const badges = [
  {
    icon: Zap,
    accent: '#f5bd02',
    label: '24H',
    title: 'Lightning Dispatch',
    desc: 'Orders shipped within 24 hours, tracked end-to-end.',
    stat: '98%',
    statLabel: 'on-time rate'
  },
  {
    icon: ShieldCheck,
    accent: '#f5bd02',
    label: 'SSL',
    title: 'Secure Checkout',
    desc: '256-bit encrypted payments. Your data is always safe.',
    stat: '100%',
    statLabel: 'safe & encrypted'
  },
  {
    icon: RefreshCw,
    accent: '#f5bd02',
    label: '7D',
    title: 'Easy Returns',
    desc: 'Changed your mind? Hassle-free exchange within 7 days.',
    stat: '7',
    statLabel: 'day return window'
  },
  {
    icon: Headphones,
    accent: '#f5bd02',
    label: '24/7',
    title: 'Always-On Support',
    desc: 'Real humans via WhatsApp & phone. No bots, ever.',
    stat: '< 2h',
    statLabel: 'avg. response time'
  },
  {
    icon: Award,
    accent: '#f5bd02',
    label: 'GSM',
    title: 'Premium Quality',
    desc: '240+ GSM combed cotton. Built to last, feels incredible.',
    stat: '240+',
    statLabel: 'GSM heavyweight'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  })
};

export default function TrustBadges() {
  return (
    <section className="relative bg-zinc-950 overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5bd02]/60 to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-14 relative z-10">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#f5bd02] rounded-full" />
            <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.25em]">
              Why Shop With Us
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500 font-bold uppercase tracking-wider cursor-pointer hover:text-[#f5bd02] transition-colors group">
            <span>Learn More</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Badge grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="relative group bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${badge.accent}14 0%, transparent 70%)`
                  }}
                />

                {/* Top row: icon + label badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors border border-zinc-700 group-hover:border-[#f5bd02]/40">
                    <Icon size={20} className="text-[#f5bd02]" strokeWidth={1.8} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                    {badge.label}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-black text-white text-xs sm:text-sm leading-snug mb-1.5 group-hover:text-[#f5bd02] transition-colors">
                  {badge.title}
                </h4>

                {/* Description — hidden on mobile */}
                <p className="hidden sm:block text-[11px] text-zinc-500 leading-relaxed mb-4">
                  {badge.desc}
                </p>

                {/* Bottom stat */}
                <div className="flex items-end gap-1.5 mt-2 sm:mt-0">
                  <span className="text-lg sm:text-xl font-black text-white leading-none">
                    {badge.stat}
                  </span>
                  <span className="text-[10px] text-zinc-500 pb-0.5 leading-tight">
                    {badge.statLabel}
                  </span>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#f5bd02] to-[#e0ac00] transition-all duration-500 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust strip */}
        <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            40,000+ Happy Customers
          </span>
          <span className="hidden sm:block text-zinc-700">·</span>
          <span>Made in India</span>
          <span className="hidden sm:block text-zinc-700">·</span>
          <span>Global Shipping</span>
          <span className="hidden sm:block text-zinc-700">·</span>
          <span>COD Available</span>
        </div>

      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
    </section>
  );
}
