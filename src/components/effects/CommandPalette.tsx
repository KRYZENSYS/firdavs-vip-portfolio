"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, Search } from "lucide-react";

type Cmd = { id: string; label: string; group: string; run: () => void; hint?: string };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [log, setLog] = useState<string[]>(["root@firdavsvip:~$ type 'help' to begin"]);

  const commands: Cmd[] = useMemo(() => [
    { id: "home", label: "Go to Home", group: "Navigation", run: () => scroll("#home") },
    { id: "about", label: "Go to About", group: "Navigation", run: () => scroll("#about") },
    { id: "skills", label: "Go to Skills", group: "Navigation", run: () => scroll("#skills") },
    { id: "projects", label: "Go to Projects", group: "Navigation", run: () => scroll("#projects") },
    { id: "blog", label: "Go to Blog", group: "Navigation", run: () => scroll("#blog") },
    { id: "contact", label: "Go to Contact", group: "Navigation", run: () => scroll("#contact") },
    { id: "theme", label: "Toggle theme", group: "System", run: () => { document.documentElement.classList.toggle("light"); push("theme toggled"); } },
    { id: "telegram", label: "Open Telegram", group: "External", run: () => window.open("https://t.me/FirdavsVIP", "_blank") },
    { id: "github", label: "Open GitHub", group: "External", run: () => window.open("https://github.com/FirdavsVIP", "_blank") },
    { id: "konami", label: "Trigger easter egg", group: "Easter", run: () => { push("easter egg requires ↑↑↓↓←→←→BA"); } },
    { id: "clear", label: "Clear log", group: "System", run: () => setLog([]) },
    { id: "exit", label: "Close palette", group: "System", run: () => setOpen(false) },
  ], []);

  function scroll(sel: string) { const el = document.querySelector(sel); if (el) el.scrollIntoView({ behavior: "smooth" }); push(`scrolled to ${sel}`); }
  function push(s: string) { setLog((l) => [...l, `root@firdavsvip:~$ ${s}`].slice(-8)); }

  const filtered = useMemo(() => {
    if (!q) return commands;
    const k = q.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(k) || c.id.includes(k));
  }, [q, commands]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (open) { setQ(""); setI(0); } }, [open]);

  const run = (c: Cmd) => { c.run(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-start justify-center bg-black/70 backdrop-blur-sm pt-20" onClick={() => setOpen(false)}>
          <motion.div initial={{ y: -20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }} onClick={(e) => e.stopPropagation()}
            className="w-[min(640px,92vw)] overflow-hidden rounded-2xl border border-primary/30 bg-bg/95 shadow-neon-cyan">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">terminal@firdavsvip</span>
              <span className="ml-auto rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">ESC</span>
            </div>
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-white/40" />
              <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(filtered.length - 1, v + 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
                if (e.key === "Enter") { e.preventDefault(); const c = filtered[i]; if (c) { run(c); setOpen(false); } }
              }} placeholder="Type a command, section, or 'help'..." className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30" />
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-white/40">no command found</li>
              ) : filtered.map((c, idx) => (
                <li key={c.id}>
                  <button onClick={() => { run(c); setOpen(false); }}
                    onMouseEnter={() => setI(idx)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${idx === i ? "bg-primary/10 text-primary" : "text-white/80 hover:bg-white/5"}`}>
                    <span className="flex items-center gap-2"><ChevronRight size={12} /> {c.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{c.group}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 bg-black/30 px-4 py-2 font-mono text-[10px] text-white/40">
              {log.slice(-3).map((l, k) => <div key={k}>{l}</div>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
