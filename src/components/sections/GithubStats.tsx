"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, BookOpen, Users, ExternalLink } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import { SITE } from "@/data";
import CountUp from "@/components/ui/CountUp";

type GH = { public_repos: number; followers: number; following: number; stars: number };

export default function GithubStats() {
  const [data, setData] = useState<GH | null>(null);
  const [error, setError] = useState(false);
  const user = "FirdavsVIP";

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const r = await fetch(`https://api.github.com/users/${user}`, { cache: "no-store" });
        if (!r.ok) throw new Error("gh error");
        const j = await r.json();
        if (!abort) {
          setData({ public_repos: j.public_repos, followers: j.followers, following: j.following, stars: 0 });
        }
      } catch { if (!abort) setError(true); }
    })();
    return () => { abort = true; };
  }, []);

  const stats = data
    ? [
        { icon: BookOpen, label: "Repositories", value: data.public_repos, tint: "text-cyan-300" },
        { icon: Users, label: "Followers", value: data.followers, tint: "text-purple-300" },
        { icon: GitFork, label: "Following", value: data.following, tint: "text-emerald-300" },
        { icon: Star, label: "Stars", value: data.stars, tint: "text-pink-300" },
      ]
    : [
        { icon: BookOpen, label: "Repositories", value: 0, tint: "text-cyan-300" },
        { icon: Users, label: "Followers", value: 0, tint: "text-purple-300" },
        { icon: GitFork, label: "Following", value: 0, tint: "text-emerald-300" },
        { icon: Star, label: "Stars", value: 0, tint: "text-pink-300" },
      ];

  return (
    <section id="github" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// open_source.activity" title="GITHUB" subtitle="Live stats from the dark network" icon={<Github size={12} />} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-secondary/10 blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan">
                <Github size={28} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary">// github.com/{user}</div>
                <div className="font-display text-2xl font-bold text-white">{user}</div>
                <div className="text-xs text-white/50">{error ? "offline · cached" : "live · api.github.com"}</div>
              </div>
            </div>
            <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-primary/50 hover:text-primary transition">
              Open Profile <ExternalLink size={12} />
            </a>
          </div>
          <div className="relative mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="group rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-primary/40">
                <s.icon className={`h-5 w-5 ${s.tint} mb-3`} />
                <div className="font-display text-3xl font-black text-gradient"><CountUp to={s.value} /></div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
