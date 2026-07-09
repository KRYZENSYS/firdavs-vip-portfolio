"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export default function FavoriteButton({ id, label, className }: { id: string; label?: string; className?: string }) {
  const { has, toggle } = useFavorites();
  const active = has(id);
  return (
    <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.05 }} onClick={() => toggle(id)} aria-label="Toggle favorite"
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition", active ? "border-amber-300/50 bg-amber-300/10 text-amber-300 shadow-md shadow-amber-500/20" : "border-white/10 bg-white/5 text-white/70 hover:border-amber-300/40 hover:text-amber-300", className)}>
      <Star className={cn("h-3.5 w-3.5", active && "fill-current")} />
      {label && <span>{label}</span>}
    </motion.button>
  );
}
