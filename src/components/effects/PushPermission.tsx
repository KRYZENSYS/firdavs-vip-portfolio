"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check } from "lucide-react";

export default function PushPermission() {
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const status = Notification.permission;
    if (status === "granted") setGranted(true);
    if (status === "default" && !localStorage.getItem("fvip-push-asked")) {
      const t = setTimeout(() => setShow(true), 18000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = async () => {
    try { localStorage.setItem("fvip-push-asked", "1"); } catch {}
    setShow(false);
    if (!("Notification" in window)) return;
    const r = await Notification.requestPermission();
    if (r === "granted") {
      setGranted(true);
      new Notification("FIRDAVS VIP", { body: "You’re in. New posts and updates will land here.", icon: "/icon-192.png" });
    }
  };

  const decline = () => { try { localStorage.setItem("fvip-push-asked", "1"); } catch {} setShow(false); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-24 left-6 z-[100] hidden md:flex max-w-sm gap-3 rounded-2xl border border-primary/30 bg-bg/95 p-4 backdrop-blur-xl shadow-neon-cyan">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-bg">
            <Bell size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Enable notifications?</div>
            <p className="mt-0.5 text-xs text-white/55">Get a ping when there’s a new post, release, or shop drop.</p>
            <div className="mt-3 flex gap-2">
              <button onClick={accept} className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-bg hover:shadow-neon-cyan transition"><Check size={11} /> Allow</button>
              <button onClick={decline} className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70 hover:border-rose-300/40 hover:text-rose-300 transition">Not now</button>
            </div>
          </div>
          <button onClick={decline} className="text-white/30 hover:text-white"><X size={14} /></button>
        </motion.div>
      )}
      {granted && !show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed bottom-24 left-6 z-[100] hidden md:flex items-center gap-2 rounded-full border border-emerald-400/30 bg-bg/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-300 backdrop-blur-xl">
          <Bell size={11} /> notifications on
        </motion.div>
      )}
    </AnimatePresence>
  );
}
