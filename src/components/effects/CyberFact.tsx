"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X } from "lucide-react";

const FACTS = [
  "The first computer virus was created in 1971 — it was called Creeper.",
  "A single Bitcoin transaction uses ~2,264 kWh — enough for an average U.S. household for 75 days.",
  "The word 'hacker' originally meant someone who makes furniture with an axe.",
  "Stuxnet physically destroyed 1,000 centrifuges in Iran — a real cyber weapon.",
  "The average cost of a data breach in 2024 is $4.88M.",
  "SQL injection still tops the OWASP Top 10 after 25+ years.",
  "Dark web hosts ~5% of the entire internet.",
  "The fastest password cracker cracks 95 billion NTLM hashes per second.",
  "90% of all data was created in the last 2 years.",
  "A quantum computer can break 2048-bit RSA in 8 hours.",
  "The first webcam was used to check a coffee pot at Cambridge.",
  "There are 6 billion Google searches per day.",
  "WannaCry ransomware hit 230,000 computers in 150 countries in 24 hours.",
  "The creator of Linux, Linus Torvalds, named it after himself.",
  "Wi-Fi was invented by accident — it's a play on 'Hi-Fi'.",
];

export default function CyberFact() {
  const [fact, setFact] = useState<string | null>(null);

  useEffect(() => {
    const show = () => {
      const f = FACTS[Math.floor(Math.random() * FACTS.length)];
      setFact(f);
    };
    const t1 = setTimeout(show, 8000);
    const interval = setInterval(show, 45000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {fact && (
        <motion.div initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 320, opacity: 0 }}
          className="fixed right-6 top-24 z-[90] hidden md:flex max-w-sm gap-3 rounded-2xl border border-primary/30 bg-bg/90 p-4 backdrop-blur-xl shadow-neon-cyan">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-bg">
            <Brain size={16} />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary">// did_you_know</div>
            <p className="mt-1 text-sm text-white/85 leading-relaxed">{fact}</p>
          </div>
          <button onClick={() => setFact(null)} className="text-white/40 hover:text-white"><X size={14} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
