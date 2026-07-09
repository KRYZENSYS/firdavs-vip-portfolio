"use client";
import { motion } from "framer-motion";
import { GraduationCap, PlayCircle, Clock, Users, Star, Award } from "lucide-react";

const COURSES = [
  { id: 1, title: "Telegram Bots: Zero to Production", level: "Beginner", hours: 8, students: 1240, rating: 4.9, price: 29, modules: 12, badge: "Bestseller", cover: "from-cyan-500/30 to-blue-500/10" },
  { id: 2, title: "AI Pipelines for Content Creators", level: "Intermediate", hours: 6, students: 680, rating: 4.8, price: 49, modules: 10, badge: "New", cover: "from-purple-500/30 to-pink-500/10" },
  { id: 3, title: "Cyber Security: Hands-On CTF Path", level: "Intermediate", hours: 14, students: 920, rating: 4.9, price: 79, modules: 22, badge: "Pro", cover: "from-rose-500/30 to-amber-500/10" },
  { id: 4, title: "Next.js 15 Dark Portfolio Build", level: "Beginner", hours: 4, students: 410, rating: 4.7, price: 19, modules: 8, badge: "Hot", cover: "from-emerald-500/30 to-cyan-500/10" },
  { id: 5, title: "Linux for Hackers", level: "Beginner", hours: 5, students: 540, rating: 4.8, price: 0, modules: 9, badge: "Free", cover: "from-amber-500/30 to-orange-500/10" },
  { id: 6, title: "Mastering aiogram 3", level: "Advanced", hours: 10, students: 320, rating: 4.9, price: 59, modules: 16, badge: "Advanced", cover: "from-sky-500/30 to-indigo-500/10" },
];

const BADGE_TINT: Record<string, string> = {
  Bestseller: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  New: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  Pro: "text-purple-300 border-purple-400/30 bg-purple-500/10",
  Hot: "text-rose-300 border-rose-400/30 bg-rose-500/10",
  Free: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
  Advanced: "text-sky-300 border-sky-400/30 bg-sky-500/10",
};

export default function CoursesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><GraduationCap size={12} /> // academy.catalogue</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">COURSES</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Learn directly from real production code. No fluff, no filler — just what works.</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-white/20">
              <div className={`relative aspect-[16/9] bg-gradient-to-br ${c.cover}`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${BADGE_TINT[c.badge]}`}>{c.badge}</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:scale-110 transition">
                  <PlayCircle className="h-14 w-14 text-white drop-shadow-2xl" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors leading-snug">{c.title}</h3>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-white/50">
                  <span className="flex items-center gap-1"><Clock size={11} /> {c.hours}h</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {c.students.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={11} className="text-amber-300 fill-current" /> {c.rating}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="font-display text-2xl font-black text-white">{c.price === 0 ? "FREE" : `$${c.price}`}</span>
                  <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 text-xs font-bold text-bg shadow-neon-cyan hover:shadow-neon-purple transition">{c.price === 0 ? "Enroll free" : "Enroll"}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
