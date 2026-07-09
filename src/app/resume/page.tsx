"use client";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, Code2 } from "lucide-react";

export default function ResumePage() {
  const print = () => typeof window !== "undefined" && window.print();

  const SKILLS = [
    { name: "Python", level: 95 }, { name: "Telegram Bots (aiogram)", level: 100 },
    { name: "Cyber Security", level: 80 }, { name: "Linux / Bash", level: 85 },
    { name: "AI / ML", level: 90 }, { name: "Next.js / React", level: 82 },
    { name: "PostgreSQL / SQLite", level: 78 }, { name: "Docker", level: 72 },
    { name: "FastAPI", level: 88 }, { name: "Network Pentest", level: 70 },
  ];
  const EXP = [
    { y: "2025 - Present", role: "Founder & Lead Engineer", company: "KRYZEN", desc: "Built cyber-themed product studio. 15+ public projects, 100+ bots deployed." },
    { y: "2024 - Present", role: "Cyber Security Student", company: "TUIT · Tashkent", desc: "Networking, exploit development, CTF competitions, red team exercises." },
    { y: "2023 - 2025", role: "Freelance Bot Developer", company: "Upwork / Direct", desc: "100+ Telegram bots delivered for clients across CIS, EU, and SEA markets." },
  ];
  const CERTS = [
    { name: "TryHackMe · Top 1%", org: "Ranked in top 1% of global security learners" },
    { name: "HackTheBox · Pro Hacker", org: "Multiple machines rooted across Linux & Windows" },
    { name: "Google Cybersecurity Certificate", org: "Foundations of security operations" },
    { name: "Cisco · Networking Basics", org: "CCNA-level network fundamentals" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20 print:pt-6 print:pb-6">
      <div className="container-x print:max-w-none">
        <div className="flex items-center justify-between flex-wrap gap-4 print:hidden">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// cv.render</div>
            <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">RESUME</h1>
          </div>
          <button onClick={print} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-bold text-bg shadow-neon-cyan hover:shadow-neon-purple transition">
            <Download size={16} /> Save as PDF
          </button>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">// contact</h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li>📍 Tashkent, Uzbekistan</li>
                <li>📧 hello@firdavsvip.uz</li>
                <li>💬 t.me/FirdavsVIP</li>
                <li>💻 github.com/FirdavsVIP</li>
                <li>🎂 19 y.o · UTC+5</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5"><Code2 size={11} /> skills</h2>
              <ul className="space-y-3">
                {SKILLS.map((s) => (
                  <li key={s.name}>
                    <div className="flex justify-between text-xs text-white/75"><span>{s.name}</span><span className="font-mono text-primary">{s.level}%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${s.level}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <section className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5"><Briefcase size={11} /> experience</h2>
              <ul className="space-y-5">
                {EXP.map((e) => (
                  <li key={e.role} className="relative pl-4 border-l-2 border-primary/30">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{e.y}</div>
                    <div className="text-base font-bold text-white">{e.role}</div>
                    <div className="text-xs text-primary mb-1">{e.company}</div>
                    <p className="text-sm text-white/65">{e.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5"><GraduationCap size={11} /> education</h2>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">2024 - 2028</div>
              <div className="text-base font-bold text-white">TUIT · Tashkent University of Information Technologies</div>
              <div className="text-sm text-white/65">Cyber Security · Bachelor's · GPA 4.0</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5"><Award size={11} /> certifications</h2>
              <ul className="space-y-3">
                {CERTS.map((c) => (
                  <li key={c.name} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div><div className="font-semibold">{c.name}</div><div className="text-xs text-white/50">{c.org}</div></div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
