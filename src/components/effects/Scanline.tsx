"use client";
import { motion } from "framer-motion";
export default function Scanline() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[58] overflow-hidden">
      <motion.div className="absolute left-0 right-0 h-24 opacity-30"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,245,255,0.18), transparent)" }}
        animate={{ y: ["-10%", "110%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}
