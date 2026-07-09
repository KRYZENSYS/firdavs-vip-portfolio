"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = "fvip-visits";
    let n = 0;
    try { n = parseInt(localStorage.getItem(key) || "0", 10) || 0; } catch {}
    n += 1;
    try { localStorage.setItem(key, String(n)); } catch {}
    setCount(n);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
      className="fixed bottom-6 right-6 z-[100] hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur-xl">
      <Eye size={11} className="text-primary" />
      <span>visits: {count ?? "—"}</span>
    </motion.div>
  );
}
