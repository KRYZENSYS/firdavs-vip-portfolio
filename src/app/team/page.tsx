"use client";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Crown } from "lucide-react";

export default function TeamPage() {
  const TEAM = [
    { name: "Firdavs", role: "Founder & CEO", bio: "Cyber Security student, full-stack developer, hacker mindset.", skills: ["Architecture", "Security", "AI"], initials: "FV", tint: "from-cyan-500 to-blue-500", badge: "founder" },
    { name: "Aziz Karimov", role: "CTO · CyberUz", bio: "EdTech veteran, built learning platforms for 100k+ students.", skills: ["EdTech", "DevOps", "Cloud"], initials: "AK", tint: "from-purple-500 to-pink-500" },
    { name: "Malika Yusupova", role: "Community Lead", bio: "Built developer communities across Central Asia.", skills: ["Community", "Marketing", "PR"], initials: "MY", tint: "from-sky-500 to-emerald-500" },
    { name: "Jasur Tursunov", role: "Security Engineer", bio: "Top-100 CTF player, ex-red team intern.", skills: ["Pentest", "CTF", "Reverse Eng"], initials: "JT", tint: "from-pink-500 to-rose-500" },
    { name: "Dilshod Akbarov", role: "Product Manager", bio: "Took 5 products from zero to first 10k users.", skills: ["Product", "Analytics", "UX"], initials: "DA", tint: "from-amber-500 to-orange-500" },
    { name: "Nigora Saidova", role: "Designer · UI/UX", bio: "Cyber-noir visual identity specialist.", skills: ["Figma", "3D", "Motion"], initials: "NS", tint: "from-emerald-500 to-cyan-500" },
  ];
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// core.collective</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">THE KRYZEN TEAM</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Operators behind the dark products. Small, fast, and obsessed with quality.</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-white/20">
              <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${m.tint} opacity-20 blur-3xl group-hover:opacity-40 transition`} />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.tint} text-white font-display text-lg font-black ring-1 ring-white/10`}>
                    {m.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{m.name}</h3>
                      {m.badge === "founder" && <Crown size={14} className="text-amber-300" />}
                    </div>
                    <div className="text-xs text-primary">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/65 leading-relaxed">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60">{s}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-white/40">
                  <Github size={14} className="hover:text-primary cursor-pointer" />
                  <Twitter size={14} className="hover:text-primary cursor-pointer" />
                  <Linkedin size={14} className="hover:text-primary cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
