"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Code2, Sparkles, BookOpen, Layers, Star, Check } from "lucide-react";

const PRODUCTS = [
  { id: "starter-bot", name: "Starter Telegram Bot", price: 49, desc: "Custom-built aiogram bot with admin panel, database, and deployment. 7-day delivery.", features: ["1 server-side bot", "PostgreSQL/SQLite", "Admin panel", "7-day delivery", "Source code"], icon: Code2, tint: "from-cyan-500/30 to-blue-500/10" },
  { id: "pro-bot", name: "Pro AI Bot", price: 199, desc: "AI-powered Telegram bot with OpenAI integration, payments, and full analytics.", features: ["Everything in Starter", "OpenAI integration", "CryptoCard / Click payments", "Analytics dashboard", "30-day support"], icon: Sparkles, tint: "from-purple-500/30 to-pink-500/10", popular: true },
  { id: "kryzen-theme", name: "KRYZEN Next.js Theme", price: 39, desc: "Production-ready dark cyber Next.js 15 template. Your portfolio, your rules.", features: ["Next.js 15 + TS", "Tailwind + Framer Motion", "PWA + i18n + SEO", "Unlimited projects", "Lifetime updates"], icon: Layers, tint: "from-emerald-500/30 to-cyan-500/10" },
  { id: "course-intro", name: "Python Bot Course", price: 29, desc: "Build 5 production-grade Telegram bots from scratch. 8 hours of video.", features: ["8 hours of video", "5 hands-on bots", "Source code", "Discord community", "Lifetime access"], icon: BookOpen, tint: "from-amber-500/30 to-orange-500/10" },
  { id: "audit", name: "Security Audit", price: 299, desc: "Full penetration test of your web app or API. Report + remediation guidance.", features: ["OWASP Top 10 check", "API endpoint scan", "PDF report", "1-on-1 call", "30-day support"], icon: Code2, tint: "from-rose-500/30 to-pink-500/10" },
  { id: "consult", name: "1-on-1 Consulting", price: 79, desc: "60-minute video call. Architecture, code review, career advice, anything.", features: ["60 min Zoom call", "Recording included", "Follow-up notes", "Slack follow-up", "Async Q&A for 7 days"], icon: Star, tint: "from-sky-500/30 to-emerald-500/10" },
];

const checkout = (id: string) => {
  // In production: window.location = `/api/stripe/checkout?product=${id}`
  // Demo: open a confirmation modal via alert
  alert(`Checkout flow for ${id} — Stripe integration placeholder. Connect STRIPE_SECRET_KEY env to enable real payments.`);
};

export default function ShopPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><ShoppingBag size={12} /> // dark_market.terminal</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">SHOP</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Digital products, services, and tools crafted with care. Payments via Stripe / crypto.</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border ${p.popular ? "border-primary/50 shadow-neon-cyan" : "border-white/10"} bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:-translate-y-1.5`}>
              <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${p.tint} blur-3xl opacity-60 group-hover:opacity-100 transition`} />
              {p.popular && <span className="absolute top-3 right-3 rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">popular</span>}
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/70"><Check size={12} className="mt-0.5 text-primary shrink-0" />{f}</li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <div><span className="font-display text-3xl font-black text-white">${p.price}</span><span className="text-xs text-white/40 ml-1">USD</span></div>
                  <button onClick={() => checkout(p.id)} className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-bold text-bg shadow-neon-cyan hover:shadow-neon-purple transition">Buy now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
