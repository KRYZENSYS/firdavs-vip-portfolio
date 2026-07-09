"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Shield, Download, Sparkles, Tv, Gamepad2, Star, GitFork, Github, ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import { PROJECTS } from "@/data";
import CountUp from "@/components/ui/CountUp";

const ICONS: Record<string, any> = { Bot, Shield, Download, Sparkles, Tv, Gamepad2 };

type RepoMeta = { stars: number; forks: number; lang: string };

const REPO_MAP: Record<string, string> = {
  "1": "KRYZENSYS/savebot-ai",
  "2": "KRYZENSYS/cyberuz-academy",
  "3": "KRYZENSYS/savebot-ai",
  "4": "KRYZENSYS/ai-video-creator",
  "5": "KRYZENSYS/iptv-platform",
  "6": "KRYZENSYS/game-projects",
};

export default function Projects() {
  const [meta, setMeta] = useState<Record<string, RepoMeta>>({});
  useEffect(() => {
    (async () => {
      const entries = await Promise.all(
        Object.entries(REPO_MAP).map(async ([id, repo]) => {
          try {
            const r = await fetch(`https://api.github.com/repos/${repo}`);
            if (!r.ok) return [id, { stars: 0, forks: 0, lang: "" }] as const;
            const j = await r.json();
            return [id, { stars: j.stargazers_count, forks: j.forks_count, lang: j.language || "" }] as const;
          } catch { return [id, { stars: 0, forks: 0, lang: "" }] as const; }
        })
      );
      setMeta(Object.fromEntries(entries));
    })();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// repository.manifest" title="PROJECTS" subtitle="Things I've built, broken, and rebuilt. Live GitHub data." icon={<Github size={12} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => {
            const Icon = ICONS[p.icon] || Bot;
            const m = meta[String(p.id)];
            return (
              <motion.article key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
                <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${p.glow === "cyan" ? "from-cyan-500/30 to-blue-500/10" : p.glow === "purple" ? "from-purple-500/30 to-pink-500/10" : p.glow === "blue" ? "from-sky-500/30 to-emerald-500/10" : "from-pink-500/30 to-rose-500/10"} blur-3xl opacity-60 group-hover:opacity-100 transition`} />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10 group-hover:scale-110 transition`}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.description}</p>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-primary/80">#{p.tag}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3 text-[11px] text-white/60">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-300" /> <CountUp to={m?.stars || 0} /></span>
                      <span className="flex items-center gap-1"><GitFork className="h-3 w-3 text-cyan-300" /> <CountUp to={m?.forks || 0} /></span>
                    </div>
                    {m?.lang && <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{m.lang}</span>}
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
