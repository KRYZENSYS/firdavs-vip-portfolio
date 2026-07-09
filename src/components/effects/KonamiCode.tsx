"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Lock, Terminal } from "lucide-react";

const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function KonamiCode() {
  const [pos, setPos] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const next = SEQ[pos] === e.key || SEQ[pos] === k;
      if (next) {
        const np = pos + 1;
        if (np === SEQ.length) { setOpen(true); setPos(0); setTimeout(() => setOpen(false), 6000); }
        else setPos(np);
      } else {
        setPos(e.key === SEQ[0] || k === SEQ[0] ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setOpen(false)}>
          <motion.div initial={{ scale: 0.5, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.5 }}
            transition={{ type: "spring", damping: 18 }} className="relative max-w-md rounded-2xl border border-primary/40 bg-bg/90 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan">
              <Ghost size={28} />
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// root_access.granted</div>
            <h3 className="font-display text-3xl font-black text-gradient neon-text">FIRDAVS VIP</h3>
            <p className="mt-3 text-sm text-white/70">You unlocked the dark layer. Welcome, insider.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-primary">
              <Terminal size={14} /> <Lock size={14} /> <span>access_token: firdavsvip_1337</span>
            </div>
            <p className="mt-5 text-[10px] uppercase tracking-widest text-white/40">Tap anywhere to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
