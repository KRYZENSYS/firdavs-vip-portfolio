"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "@/data";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.random() * 14 + 6);
      setProgress(n);
      if (n >= 100) { clearInterval(id); setTimeout(() => setDone(true), 380); }
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-black tracking-[0.2em] text-gradient neon-text">{SITE.name}</motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-sm md:text-base uppercase tracking-[0.5em] text-white/60">{SITE.tagline}</motion.div>
          <div className="relative mt-12 h-1 w-72 md:w-96 overflow-hidden rounded-full bg-white/5">
            <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
          <div className="mt-3 font-mono text-xs tracking-widest text-primary">{Math.floor(progress)}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
