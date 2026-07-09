"use client";
import { motion } from "framer-motion";
import { Clock, Flag } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";

const STEPS = [
  { year: "2021", title: "First Line of Python", desc: "Wrote 'Hello, world' and instantly fell in love with code." },
  { year: "2022", title: "Telegram Bot Era", desc: "Built first aiogram bot, scaled to 1k+ users." },
  { year: "2023", title: "Cyber Security Path", desc: "Joined CTFs, learned networking, Linux, exploitation basics." },
  { year: "2024", title: "AI + Automation", desc: "Built end-to-end content AI pipelines and viral generators." },
  { year: "2025", title: "Founded KRYZEN", desc: "Cyber-themed product studio with multiple open-source projects." },
  { year: "2026", title: "FIRDAVS VIP Launched", desc: "This portfolio. Dark future. Only the beginning." },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// journey.log" title="TIMELINE" subtitle="From first 'Hello, world' to the dark future" icon={<Clock size={12} />} />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent md:left-1/2" />
          <ul className="space-y-8">
            {STEPS.map((s, i) => (
              <motion.li key={s.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`relative flex items-start gap-4 ${i % 2 ? "md:flex-row-reverse md:text-right" : ""}`}>
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-bg text-primary shadow-neon-cyan md:absolute md:left-1/2 md:-translate-x-1/2">
                  <Flag size={12} />
                </span>
                <div className={`flex-1 ${i % 2 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-primary/30">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{s.year}</div>
                    <div className="mt-1 text-lg font-bold text-white">{s.title}</div>
                    <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
