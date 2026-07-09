"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProgressBar({ name, level, color = "from-primary to-secondary", delay = 0 }: { name: string; level: number; color?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="group/skill">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm md:text-base font-semibold text-white tracking-wider uppercase">{name}</span>
        <span className="font-mono text-xs text-primary group-hover/skill:text-secondary transition-colors">{level}%</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}} transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`relative h-full rounded-full bg-gradient-to-r ${color}`} />
      </div>
    </div>
  );
}
