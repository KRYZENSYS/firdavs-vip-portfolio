"use client";
import { motion } from "framer-motion";
import { Bot, Shield, Download, Sparkles, Tv, Gamepad2, ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import { PROJECTS, type Project } from "@/data";

const ICONS: Record<string, any> = { Bot, Shield, Download, Sparkles, Tv, Gamepad2 };
const GLOW: Record<Project["glow"], string> = {
  cyan: "from-cyan-500/30 to-blue-500/10", purple: "from-purple-500/30 to-pink-500/10",
  blue: "from-sky-500/30 to-emerald-500/10", pink: "from-pink-500/30 to-rose-500/10",
};
const BORDER_HOVER: Record<Project["glow"], string> = {
  cyan: "hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(0,245,255,0.3)]",
  purple: "hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(123,46,255,0.35)]",
  blue: "hover:border-sky-400/50 hover:shadow-[0_0_50px_rgba(77,166,255,0.3)]",
  pink: "hover:border-pink-400/50 hover:shadow-[0_0_50px_rgba(255,46,154,0.35)]",
};

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// project_log" title="PROJECTS" subtitle="Selected works from the dark laboratory" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Bot;
            return (
              <motion.article key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 ${BORDER_HOVER[p.glow]}`}>
                <div className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${GLOW[p.glow]} blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
                <div className="absolute inset-0 grid-bg opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10 group-hover:from-primary/20 group-hover:to-secondary/20 group-hover:ring-primary/40 transition">
                      <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">/{String(p.id).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.description}</p>
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">{p.tag}</div>
                  <div className="mt-6 flex items-center justify-between">
                    <button className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <div className="h-1 w-12 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full w-0 bg-gradient-to-r ${GLOW[p.glow]} group-hover:w-full transition-all duration-700`} />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
