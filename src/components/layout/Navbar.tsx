"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data";
import { cn } from "@/lib/utils";
import LangSwitcher from "@/components/layout/LangSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-bg/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent")}>
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="group flex items-center gap-2">
          <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-neon-cyan flex items-center justify-center font-display text-sm font-black text-bg">F</span>
          <span className="font-display text-lg font-bold tracking-[0.25em] text-white group-hover:text-primary transition-colors">{SITE.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group relative px-3 py-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition">
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
          <a href="#contact" className="ml-2 rounded-full border border-primary/40 bg-primary/5 px-5 py-2 text-sm font-medium text-primary shadow-neon-cyan hover:bg-primary/10 transition">Hire Me</a>
          <div className="ml-2"><LangSwitcher /></div>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher />
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-white/10 bg-bg/90 backdrop-blur-xl">
          <div className="container-x flex flex-col py-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-sm uppercase tracking-widest text-white/80 hover:text-primary">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-center text-sm font-medium text-primary">Hire Me</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
