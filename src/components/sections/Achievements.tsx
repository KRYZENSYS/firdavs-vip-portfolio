"use client";
import { motion } from "framer-motion";
import { Trophy, Award, Target, Zap, Crown, Star } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";

const BADGES: { icon: any; title: string; sub: string; tint: string; glow: string }[] = [
  { icon: Crown, title: "100+ Telegram Bots", sub: "Built and deployed at scale", tint: "text-amber-300", glow: "from-amber-500/30 to-orange-500/10" },
  { icon: Trophy, title: "CyberUz Founder", sub: "First cyber security community in UZ region", tint: "text-cyan-300", glow: "from-cyan-500/30 to-blue-500/10" },
  { icon: Target, title: "4+ Years Hacking", sub: "Active CTF player & bug bounty hunter", tint: "text-purple-300", glow: "from-purple-500/30 to-pink-500/10" },
  { icon: Zap, title: "AI Pipeline Pioneer", sub: "End-to-end content automation", tint: "text-emerald-300", glow: "from-emerald-500/30 to-cyan-500/10" },
  { icon: Award, title: "Open Source", sub: "15+ public repositories on GitHub", tint: "text-pink-300", glow: "from-pink-500/30 to-rose-500/10" },
  { icon: Star, title: "Founder of KRYZEN", sub: "Cyber-themed product studio", tint: "text-sky-300", glow: "from-sky-500/30 to-emerald-500/10" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// trophy.cabinet" title="ACHIEVEMENTS" subtitle="Milestones from the dark path" icon={<Trophy size={12} />} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BADGES.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 30, rotate: -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
              <div className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br ${b.glow} blur-3xl opacity-60 group-hover:opacity-100 transition`} />
              <div className="relative flex items-center gap-4">
                <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.glow} ring-1 ring-white/10 group-hover:scale-110 transition`}>
                  <b.icon className={`h-6 w-6 ${b.tint}`} />
                  <span className="absolute inset-0 rounded-2xl ring-1 ring-primary/30 group-hover:ring-primary/70 transition" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-white group-hover:text-primary transition-colors">{b.title}</div>
                  <div className="mt-1 text-xs text-white/50">{b.sub}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">badge_{String(i + 1).padStart(2, "0")}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary">✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
