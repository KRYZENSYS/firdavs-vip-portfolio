"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const LINES = {
  en: "Welcome to FIRDAVS VIP. The dark future begins now.",
  uz: "FIRDAVS VIP ga xush kelibsiz. Qorong'u kelajak shu yerdan boshlanadi.",
  ru: "Добро пожаловать в FIRDAVS VIP. Тёмное будущее начинается здесь.",
};

export default function VoiceGreeting() {
  const [enabled, setEnabled] = useState(false);
  const [played, setPlayed] = useState(false);
  const [open, setOpen] = useState(true);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!enabled || playedRef.current) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const lang = (typeof navigator !== "undefined" && (navigator.language || "en").slice(0, 2)) as keyof typeof LINES;
    const text = LINES[lang] || LINES.en;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95; u.pitch = 0.85; u.volume = 0.7;
    u.lang = lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    playedRef.current = true; setPlayed(true);
  }, [enabled]);

  if (played) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[120] max-w-xs">
          <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-bg/90 p-4 backdrop-blur-xl shadow-neon-cyan">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-bg">
              {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">// voice.greeting</div>
              <div className="text-sm text-white/90">Enable sound for a surprise welcome?</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setEnabled(true)} className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-bg hover:bg-primary/80">Yes</button>
                <button onClick={() => { setPlayed(true); setOpen(false); }} className="rounded-lg border border-white/15 px-3 py-1 text-xs text-white/70 hover:bg-white/5">Skip</button>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="close" className="text-white/40 hover:text-white">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
