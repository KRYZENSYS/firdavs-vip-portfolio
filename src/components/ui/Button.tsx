"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Props = { children: ReactNode; href?: string; external?: boolean; variant?: Variant; className?: string; icon?: ReactNode; onClick?: () => void; };

const variants: Record<Variant, string> = {
  primary: "text-bg bg-gradient-to-r from-primary via-secondary to-accent shadow-neon-cyan hover:shadow-neon-purple",
  ghost: "text-white bg-white/5 border border-white/10 hover:bg-white/10",
  outline: "text-white border border-white/20 hover:border-primary/60",
};

export default function Button({ children, href, external, variant = "primary", className, icon, onClick }: Props) {
  const cls = cn("group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-out", variants[variant], className);
  const inner = <><span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-0" />{icon}<span className="relative">{children}</span></>;
  const motionInner = <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2">{inner}</motion.span>;
  if (href) return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{motionInner}</a> : <Link href={href} className={cls}>{motionInner}</Link>;
  return <button onClick={onClick} className={cls}>{motionInner}</button>;
}
