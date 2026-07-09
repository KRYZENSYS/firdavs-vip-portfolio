"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, X, Sparkles, Zap, BookOpen, MessageCircle, Bot, Download, Palette } from "lucide-react";

const FREE_FEATURES = ["Public portfolio", "Standard contact form", "Free public tools", "Community Discord"];
const PRO_FEATURES = ["AI chat assistant (unlimited)", "Private source code (15+ repos)", "1-on-1 monthly call", "Custom theme pack", "Resume PDF (premium templates)", "Discounts on shop products", "Private Telegram channel", "Priority support (12h response)"];

const TIERS = [
  { id: "free", name: "Free", price: 0, features: FREE_FEATURES, icon: Sparkles, tint: "from-white/20 to-white/5", cta: "Current plan" },
  { id: "pro", name: "Pro", price: 9, features: [...FREE_FEATURES, ...PRO_FEATURES], icon: Crown, tint: "from-primary/30 to-secondary/10", cta: "Upgrade to Pro", popular: true },
  { id: "team", name: "Team", price: 29, features: [...FREE_FEATURES, ...PRO_FEATURES, "Team licenses (5 seats)", "Custom integrations", "Dedicated account manager", "SLA 99.9%"], icon: Zap, tint: "from-amber-500/30 to-orange-500/10", cta: "Contact for Team" },
];

export default function PremiumPage() {
  const [plan, setPlan] = useState<"free" | "pro" | "team">("free");
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><Crown size={12} /> // premium.tier</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">GO PREMIUM</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Unlock the full FIRDAVS VIP experience. AI assistant, private repos, and direct access.</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => {
            const Icon = t.icon;
            const selected = plan === t.id;
            return (
              <motion.button key={t.id} onClick={() => setPlan(t.id as any)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative overflow-hidden rounded-2xl border ${selected ? "border-primary/50 shadow-neon-cyan" : t.popular ? "border-primary/30" : "border-white/10"} bg-white/[0.04] p-6 backdrop-blur-xl text-left transition-all hover:-translate-y-1.5`}>
                <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${t.tint} blur-3xl opacity-60 group-hover:opacity-100 transition`} />
                {t.popular && <span className="absolute top-3 right-3 rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">popular</span>}
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{t.name}</h3>
                  <div className="mt-2"><span className="font-display text-4xl font-black text-white">${t.price}</span><span className="text-xs text-white/40 ml-1">/ month</span></div>
                  <ul className="mt-5 space-y-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/75"><Check size={12} className="mt-0.5 text-primary shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <div className={`mt-5 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold transition ${selected ? "bg-gradient-to-r from-primary to-secondary text-bg" : "border border-white/15 text-white/70"}`}>
                    {t.cta}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary">// why_pro</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-white/80">
            <div className="flex items-center gap-2"><Bot size={14} className="text-primary" /> AI Chat unlimited</div>
            <div className="flex items-center gap-2"><BookOpen size={14} className="text-primary" /> Private repos</div>
            <div className="flex items-center gap-2"><MessageCircle size={14} className="text-primary" /> Direct line</div>
            <div className="flex items-center gap-2"><Palette size={14} className="text-primary" /> Custom theme</div>
            <div className="flex items-center gap-2"><Download size={14} className="text-primary" /> Resume templates</div>
            <div className="flex items-center gap-2"><Sparkles size={14} className="text-primary" /> Shop discounts</div>
            <div className="flex items-center gap-2"><Zap size={14} className="text-primary" /> Priority support</div>
            <div className="flex items-center gap-2"><Crown size={14} className="text-primary" /> VIP role</div>
          </div>
        </div>
      </div>
    </main>
  );
}
