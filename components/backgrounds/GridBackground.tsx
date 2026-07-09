"use client";
import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vh] -translate-x-1/2 rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.25) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/4 h-[80vh] w-[80vh] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(123,46,255,0.3) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/0 to-bg" />
    </div>
  );
}
