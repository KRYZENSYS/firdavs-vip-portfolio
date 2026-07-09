"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, User, BookOpen, Code2 } from "lucide-react";
import { PROJECTS, POSTS, SKILLS, NAV_LINKS } from "@/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Result = { title: string; sub: string; href: string; icon: any; group: string };

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results: Result[] = useMemo(() => {
    const r: Result[] = [];
    NAV_LINKS.forEach((l) => r.push({ title: l.label, sub: l.href, href: l.href, icon: ArrowRight, group: "Section" }));
    PROJECTS.forEach((p) => r.push({ title: p.title, sub: p.description, href: "#projects", icon: Code2, group: "Project" }));
    POSTS.forEach((p) => r.push({ title: p.title, sub: p.excerpt, href: `/blog/${p.slug}`, icon: BookOpen, group: "Blog" }));
    SKILLS.forEach((s) => r.push({ title: s.name, sub: `Skill · ${s.level}%`, href: "#skills", icon: User, group: "Skill" }));
    r.push({ title: "Resume", sub: "Download PDF CV", href: "/resume", icon: FileText, group: "Page" });
    r.push({ title: "Team", sub: "KRYZEN team page", href: "/team", icon: User, group: "Page" });
    r.push({ title: "Changelog", sub: "Release history", href: "/changelog", icon: FileText, group: "Page" });
    r.push({ title: "TIL", sub: "Today I Learned", href: "/til", icon: BookOpen, group: "Page" });
    r.push({ title: "Shop", sub: "Digital products", href: "/shop", icon: Code2, group: "Page" });
    r.push({ title: "Book a call", sub: "Schedule 15 min intro", href: "/book", icon: ArrowRight, group: "Page" });
    r.push({ title: "Courses", sub: "Academy catalogue", href: "/courses", icon: BookOpen, group: "Page" });
    r.push({ title: "Premium", sub: "Pro tier benefits", href: "/premium", icon: ArrowRight, group: "Page" });
    r.push({ title: "Reading List", sub: "Saved posts", href: "/reading-list", icon: BookOpen, group: "Page" });
    if (!q) return r;
    const k = q.toLowerCase();
    return r.filter((x) => x.title.toLowerCase().includes(k) || x.sub.toLowerCase().includes(k));
  }, [q]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("/")) router.push(href);
    else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[260] flex items-start justify-center bg-black/70 backdrop-blur-sm pt-24" onClick={() => setOpen(false)}>
          <motion.div initial={{ y: -20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: -20, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
            className="w-[min(680px,92vw)] overflow-hidden rounded-2xl border border-primary/30 bg-bg/95 shadow-neon-cyan">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-primary" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(results[0].href); }}
                placeholder="Search projects, blog, skills, pages..." className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30" />
              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">ESC</span>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-white/40">no matches</li>
              ) : results.map((r, i) => (
                <li key={i}>
                  <button onClick={() => go(r.href)} onMouseEnter={() => {}} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 hover:bg-primary/10 hover:text-white">
                    <r.icon className="h-4 w-4 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{r.title}</div>
                      <div className="truncate text-xs text-white/40">{r.sub}</div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{r.group}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] text-white/40">↑↓ navigate · ⏎ open · ESC close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
