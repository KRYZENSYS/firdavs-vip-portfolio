"use client";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";

const QUOTES = [
  { name: "Aziz Karimov", role: "Founder, CyberUz Academy", text: "Firdavs builds like a hacker thinks — fast, secure, and elegant. His bots are the cleanest I've seen in the region.", tint: "from-cyan-500/30 to-blue-500/10" },
  { name: "Malika Yusupova", role: "Community Lead, UZ Devs", text: "Reliable, creative, and always shipping. We trust KRYZEN with our most critical automations.", tint: "from-purple-500/30 to-pink-500/10" },
  { name: "Jasur Tursunov", role: "CTF Teammate", text: "During CTFs he sees vectors nobody else does. Patient mentor and ruthless competitor — at the same time.", tint: "from-sky-500/30 to-emerald-500/10" },
  { name: "Dilshod Akbarov", role: "Product Manager, SaveBot", text: "Took our prototype and turned it into a 10k+ user product in 6 weeks. Flawless execution.", tint: "from-pink-500/30 to-rose-500/10" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// trusted.signal" title="TESTIMONIALS" subtitle="Words from the people who built with us" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUOTES.map((q, i) => (
            <motion.figure key={q.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
              <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${q.tint} blur-3xl opacity-50 group-hover:opacity-100 transition`} />
              <Quote className="h-7 w-7 text-primary/60 mb-3" />
              <blockquote className="text-base md:text-lg text-white/85 leading-relaxed">"{q.text}"</blockquote>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{q.name}</div>
                  <div className="text-xs text-white/50">{q.role}</div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-300">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={12} className="fill-current" />)}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
