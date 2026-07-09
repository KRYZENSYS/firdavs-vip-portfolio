"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionTitle({ eyebrow, title, subtitle, icon }: { eyebrow?: string; title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
      className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary">
          {icon}{eyebrow}
        </span>
      )}
      <h2 className="mt-5 font-display text-4xl md:text-6xl font-black tracking-tight">
        <span className="text-gradient neon-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-white/60 md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
