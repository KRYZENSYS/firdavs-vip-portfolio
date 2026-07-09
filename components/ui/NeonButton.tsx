"use client";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  external?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
} & Omit<HTMLMotionProps<"button">, "children">;

export default function NeonButton({ children, href, variant = "primary", external, className, icon, onClick }: Props) {
  const base = "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium tracking-wide text-sm transition-all duration-500 ease-cyber overflow-hidden group";
  const variants = {
    primary: "text-bg bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-blue shadow-[0_0_30px_rgba(0,245,255,0.45)] hover:shadow-[0_0_50px_rgba(123,46,255,0.6)]",
    ghost: "text-white bg-white/5 border border-white/10 hover:bg-white/10",
    outline: "text-white bg-transparent border border-white/20 hover:border-cyber-cyan/60",
  };
  const cls = cn(base, variants[variant], className);

  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="relative z-10 flex items-center gap-2"
    >
      {icon}
      {children}
    </motion.span>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    ) : (
      <Link href={href} className={cls}>{inner}</Link>
    );
  }
  return <button onClick={onClick} className={cls}>{inner}</button>;
}
