"use client";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Send, Heart } from "lucide-react";
import { SITE, PAGES } from "@/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="container-x py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="#home" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-bg font-display font-black">F</span>
              <span className="font-display text-xl font-bold tracking-[0.25em] text-white">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-white/60 leading-relaxed">
              Born in the shadows, living without limits. Building the dark future one commit at a time.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE.socials.telegram} aria-label="Telegram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:text-primary transition"><Send size={14} /></a>
              <a href={SITE.socials.github} aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:text-primary transition"><Github size={14} /></a>
              <a href={SITE.socials.instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:text-primary transition"><Instagram size={14} /></a>
              <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:text-primary transition"><Twitter size={14} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary">// pages</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {PAGES.map((p) => <li key={p.href}><Link href={p.href} className="hover:text-primary transition">{p.label}</Link></li>)}
              <li><a href="#blog" className="hover:text-primary transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary">// stack</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Next.js 15 · TS 5</li>
              <li>Tailwind · Framer Motion</li>
              <li>Three.js · Lenis</li>
              <li>PWA · i18n · Vercel Edge</li>
            </ul>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-white/40">
          <p>© 2026 {SITE.fullName}. Crafted in the dark.</p>
          <p className="flex items-center gap-1.5">Built with <Heart size={11} className="text-rose-400 fill-rose-400" /> from {SITE.country}</p>
        </motion.div>
      </div>
    </footer>
  );
}
