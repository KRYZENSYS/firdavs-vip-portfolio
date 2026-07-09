"use client";
import { motion } from "framer-motion";
import { User2, MapPin, Calendar, AtSign, Briefcase, Code2 } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { SITE } from "@/data";

const INFO = [
  { icon: User2, label: "Name", value: "Firdavs" },
  { icon: Calendar, label: "Age", value: `${SITE.age}` },
  { icon: AtSign, label: "Username", value: SITE.username },
  { icon: MapPin, label: "Country", value: SITE.country },
  { icon: Briefcase, label: "Role", value: SITE.role },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// about_me.exe" title="ABOUT ME" subtitle="A glimpse into the mind behind the code" icon={<Code2 size={12} />} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <GlassCard glow="cyan" className="lg:col-span-2 p-8">
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">/root/identity</div>
            <h3 className="text-2xl font-bold mb-3 text-white">Firdavs</h3>
            <p className="text-white/70 leading-relaxed">
              I'm a <span className="text-primary font-semibold">{SITE.role}</span> building secure, intelligent, automated systems. I love exploring the shadows of the digital world and turning ideas into production-grade software.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SITE.focus.map((f) => (
                <span key={f} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">{f}</span>
              ))}
            </div>
          </GlassCard>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO.map((row, i) => (
              <motion.div key={row.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/30 group-hover:scale-110 transition">
                  <row.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{row.label}</div>
                  <div className="text-base font-semibold text-white">{row.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
