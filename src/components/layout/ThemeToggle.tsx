"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:border-primary/40 hover:text-white transition overflow-hidden">
      <motion.span key={theme} initial={{ y: -20, opacity: 0, rotate: -180 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute">
        {theme === "dark" ? <Moon size={15} /> : <Sun size={15} className="text-amber-400" />}
      </motion.span>
    </button>
  );
}
