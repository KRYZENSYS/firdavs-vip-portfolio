"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, Award } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import CountUp from "@/components/ui/CountUp";
import { STATS } from "@/data";

const ICONS = [Briefcase, Rocket, Users, Award];
const TINT = ["text-cyan-300", "text-purple-300", "text-emerald-300", "text-pink-300"];

export default function Stats() {
  return (
    <section id="stats" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// metrics" title="STATS" subtitle="Numbers from the dark laboratory" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Icon className={`h-7 w-7 ${TINT[i % TINT.length]} mb-4`} />
                <div className="font-display text-4xl md:text-5xl font-black text-gradient">
                  <CountUp to={s.value} />{s.suffix}
                </div>
                <div className="mt-2 text-sm text-white/60 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
