"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/data";

function useTyping(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const id = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) { setDel(true); }
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, del ? speed / 1.8 : speed);
    return () => clearTimeout(id);
  }, [text, del, i, words, speed, pause]);
  return text;
}

export default function Hero() {
  const typed = useTyping(SITE.typingTitles);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      <div className="container-x text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-3xl animate-pulse-glow" />
          <div className="relative h-full w-full rounded-full border-2 border-white/10 bg-gradient-to-br from-surface to-bg p-1">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              <div className="relative flex h-full w-full items-center justify-center font-display text-5xl md:text-7xl font-black text-gradient neon-text">F</div>
            </div>
            <span className="absolute inset-0 -m-1 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
            <span className="absolute inset-0 -m-3 rounded-full border border-secondary/20 animate-[spin_14s_linear_infinite_reverse]" />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.05em] leading-none">
          <span className="text-gradient neon-text">{SITE.name}</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base text-white/70">
          {SITE.subtitles.map((s, idx) => (
            <span key={s} className="flex items-center gap-3 font-mono">
              <span className="text-primary/80">{["☠", "⚡", "🌌"][idx]}</span> <span>{s}</span>
              {idx < SITE.subtitles.length - 1 && <span className="text-white/30">/</span>}
            </span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-6 flex h-8 items-center justify-center font-mono text-lg md:text-2xl text-primary">
          <span>&gt;_</span><span className="ml-2">{typed}</span><span className="ml-1 inline-block h-6 w-2 bg-primary animate-pulse" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#projects" icon={<Sparkles size={16} />}>View Projects</Button>
          <Button href="#contact" variant="outline" icon={<ArrowRight size={16} />}>Contact Me</Button>
          <Button href={SITE.socials.telegram} external variant="ghost" icon={<Mail size={16} />}>Telegram</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-white/40">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for work</span>
          <span>Uzbekistan · UTC+5</span>
          <span>{SITE.username}</span>
        </motion.div>
      </div>

      <a href="#about" aria-label="scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-primary transition">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-10 w-6 rounded-full border border-white/30 flex items-start justify-center p-1">
          <span className="h-2 w-1 rounded-full bg-primary" />
        </motion.div>
      </a>
    </section>
  );
}
