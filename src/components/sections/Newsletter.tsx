"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Send } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      const list = JSON.parse(localStorage.getItem("fvip-newsletter") || "[]");
      list.push({ email, at: new Date().toISOString() });
      localStorage.setItem("fvip-newsletter", JSON.stringify(list));
    } catch {}
    setDone(true);
  };

  return (
    <section id="newsletter" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// signal.subscribe" title="NEWSLETTER" subtitle="Get monthly cyber-thoughts. No spam. No tracking." icon={<Mail size={12} />} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative text-center">
            {done ? (
              <div className="py-6">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><Check size={24} /></div>
                <h3 className="text-xl font-bold text-white">Welcome to the dark side.</h3>
                <p className="mt-2 text-sm text-white/60">Confirmation sent to {email}. See you in the inbox.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-bg/60 px-4 py-3">
                  <Mail size={16} className="text-primary" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@darkweb.io" className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30" />
                </div>
                <button type="submit" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-bg shadow-neon-cyan hover:shadow-neon-purple transition">
                  <Send size={14} /> Subscribe
                </button>
              </form>
            )}
            <p className="mt-3 text-[10px] uppercase tracking-widest text-white/40">encrypted · unsubscribe anytime · zero tracking</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
