"use client";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; glow?: "cyan" | "purple" | "blue" | "pink" | "none" } & HTMLMotionProps<"div">;

const glowMap = {
  cyan: "hover:shadow-[0_0_60px_rgba(0,245,255,0.35)]",
  purple: "hover:shadow-[0_0_60px_rgba(123,46,255,0.4)]",
  blue: "hover:shadow-[0_0_60px_rgba(77,166,255,0.35)]",
  pink: "hover:shadow-[0_0_60px_rgba(255,46,154,0.4)]",
  none: "",
};

export default function GlassCard({ children, className, glow = "none", ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-500 ease-cyber",
        "hover:border-white/20 hover:-translate-y-1.5",
        glowMap[glow],
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
