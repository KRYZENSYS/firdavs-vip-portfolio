"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, X } from "lucide-react";
import { useXp, XP_BADGES } from "@/lib/xp";
import { useEffect, useState } from "react";

export default function XpHud() {
  const { xp, level, next, badges, addBadge } = useXp();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    addBadge("first-visit");
    const visits = Number(localStorage.getItem("fvip-visits") || "0") + 1;
    localStorage.setItem("fvip-visits", String(visits));
    if (visits >= 5) addBadge("fan");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => { if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) addBadge("scroll-hero"); };
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const triggerBadge = (id: string) => {
    if (badges.includes(id)) return;
    addBadge(id);
    const b = XP_BADGES.find((x) => x.id === id);
    if (b) { setToast(b.label); setTimeout(() => setToast(null), 3000); }
  };

  useEffect(() => {
    (window as any).fvipUnlockBadge = triggerBadge;
  }, [badges]);

  const pct = ((xp % 100) / 100) * 100;

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed top-20 right-6 z-[90] hidden md:flex h-9 items-center gap-2 rounded-full border border-amber-300/30 bg-bg/80 px-3 text-xs text-amber-200 backdrop-blur-xl shadow-amber-500/10 hover:scale-105 transition" title="XP & Badges">
        <Zap size={12} className="text-amber-300" />
        <span className="font-mono">L{level} · {xp}xp</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[220] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-[min(500px,92vw)] rounded-2xl border border-amber-300/30 bg-bg/95 p-6 shadow-amber-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-amber-300">// achievements.terminal</div>
                  <h3 className="text-xl font-bold text-white mt-0.5">Level {level} · {xp} XP</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X size={16} /></button>
              </div>
              <div className="mb-5">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                  <span>progress to L{level + 1}</span>
                  <span>{xp % 100}/100</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/40" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {XP_BADGES.map((b) => {
                  const earned = badges.includes(b.id);
                  return (
                    <div key={b.id} className={`flex items-center gap-2 rounded-xl border p-3 ${earned ? "border-amber-300/30 bg-amber-300/5" : "border-white/5 bg-white/[0.02] opacity-50"}`}>
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${earned ? "bg-amber-300/20 text-amber-300" : "bg-white/5 text-white/30"}`}><Trophy size={14} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{b.label}</div>
                        <div className="text-[10px] text-white/50 truncate">{b.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] text-white/40">explore the site to earn more</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed top-6 right-1/2 translate-x-1/2 z-[270] flex items-center gap-2 rounded-full border border-amber-300/50 bg-bg/95 px-4 py-2 text-sm shadow-amber-500/30">
            <Trophy size={14} className="text-amber-300" /> <span className="text-white">Badge unlocked: {toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
