"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Flame, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { key: "love", icon: Heart, tint: "text-rose-400", glow: "shadow-rose-500/40" },
  { key: "fire", icon: Flame, tint: "text-orange-400", glow: "shadow-orange-500/40" },
  { key: "zap", icon: Zap, tint: "text-amber-300", glow: "shadow-amber-500/40" },
  { key: "magic", icon: Sparkles, tint: "text-cyan-300", glow: "shadow-cyan-500/40" },
];

export default function ReactionBar({ id }: { id: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(`fvip-rx-c-${id}`) || "{}");
      const m = JSON.parse(localStorage.getItem(`fvip-rx-m-${id}`) || "{}");
      setCounts(c); setMine(m);
    } catch {}
  }, [id]);

  const react = (k: string) => {
    const has = !!mine[k];
    const newMine = { ...mine, [k]: !has };
    const newCounts = { ...counts, [k]: (counts[k] || 0) + (has ? -1 : 1) };
    setCounts(newCounts); setMine(newMine);
    try {
      localStorage.setItem(`fvip-rx-c-${id}`, JSON.stringify(newCounts));
      localStorage.setItem(`fvip-rx-m-${id}`, JSON.stringify(newMine));
    } catch {}
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {REACTIONS.map((r) => (
        <motion.button key={r.key} whileTap={{ scale: 0.85 }} whileHover={{ y: -2 }} onClick={() => react(r.key)}
          className={cn("group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs transition",
            mine[r.key] && `border-primary/50 bg-primary/10 ${r.tint} shadow-md ${r.glow}`)}>
          <r.icon className={cn("h-3.5 w-3.5", mine[r.key] ? r.tint : "text-white/60 group-hover:text-white")} />
          <span className="font-mono text-white/80">{counts[r.key] || 0}</span>
        </motion.button>
      ))}
    </div>
  );
}
