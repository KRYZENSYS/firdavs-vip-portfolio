"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Glow = "cyan" | "purple" | "blue" | "pink" | "none";
const glowMap: Record<Glow, string> = {
  cyan: "hover:shadow-[0_0_50px_rgba(0,245,255,0.35)]",
  purple: "hover:shadow-[0_0_50px_rgba(123,46,255,0.4)]",
  blue: "hover:shadow-[0_0_50px_rgba(77,166,255,0.35)]",
  pink: "hover:shadow-[0_0_50px_rgba(255,46,154,0.4)]",
  none: "",
};

export default function GlassCard({ children, glow = "none", className, delay = 0 }: { children: ReactNode; glow?: Glow; className?: string; delay?: number; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:border-white/20", glowMap[glow], className)}>
      {children}
    </motion.div>
  );
}
