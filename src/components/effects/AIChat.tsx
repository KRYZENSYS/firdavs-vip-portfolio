"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "What does Firdavs do?",
  "Tell me about KRYZEN",
  "How can I hire him?",
  "Top projects?",
  "Cyber security skills?",
];

const FALLBACK_REPLIES: Record<string, string> = {
  "what does firdavs do": "Firdavs is a 19 y.o. Cyber Security student, Python & Telegram Bot developer, and AI enthusiast from Uzbekistan. He runs the KRYZEN studio and has built 100+ bots and 15+ open-source projects.",
  "kryzen": "KRYZEN is a cyber-themed product studio Firdavs founded — focused on automation, AI pipelines, education, and Telegram products. Think 'dark future' software.",
  "hire": "Drop a message via the Contact form on this site, or DM @FirdavsVIP on Telegram. He usually replies within 12 hours and is open to freelance and full-time work.",
  "projects": "Top projects: SaveBot (universal media downloader), CyberUz Academy (edtech), AI Video Creator (genmedia pipeline), IPTV Platform, and the FIRDAVS VIP portfolio you're exploring right now.",
  "security": "Firdavs is a Cyber Security student at TUIT with focus on networking, exploit development, CTF competitions, and red team exercises. TryHackMe Top 1% and HackTheBox Pro Hacker.",
};

function pickFallback(q: string): string {
  const k = q.toLowerCase();
  for (const key of Object.keys(FALLBACK_REPLIES)) if (k.includes(key)) return FALLBACK_REPLIES[key];
  return "I'm a local demo assistant. For deep answers, ping Firdavs on Telegram @FirdavsVIP. Try one of the suggested questions above 👆";
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hey 👋 I'm Firdavs' AI shadow. Ask me anything about him, his projects, or KRYZEN. Pick a suggestion below or type your own." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, open]);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    const userMsg: Msg = { role: "user", text };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: msgs }) });
      const j = await r.json();
      setMsgs((m) => [...m, { role: "assistant", text: j.reply || pickFallback(text) }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: pickFallback(text) }]);
    }
    setBusy(false);
  };

  return (
    <>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => setOpen((v) => !v)} aria-label="AI chat"
        className="fixed bottom-6 right-24 z-[105] hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan">
        <Bot size={18} />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-bg animate-pulse" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 250 }}
            className="fixed bottom-24 right-6 z-[200] flex h-[min(560px,80vh)] w-[min(420px,92vw)] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-bg/95 shadow-neon-cyan backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-bg">
                <Sparkles size={16} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-bg animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Firdavs AI</div>
                <div className="font-mono text-[10px] text-primary">// online · local-first</div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto rounded-lg p-1 text-white/50 hover:bg-white/5 hover:text-white"><X size={16} /></button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === "user" ? "bg-gradient-to-br from-primary to-secondary text-bg rounded-br-sm" : "bg-white/5 text-white/90 border border-white/10 rounded-bl-sm"}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {busy && <div className="flex justify-start"><div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/60"><Loader2 size={14} className="inline animate-spin mr-1" /> thinking...</div></div>}
            </div>
            <div className="border-t border-white/5 px-3 py-2 flex gap-1.5 overflow-x-auto">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 hover:border-primary/40 hover:text-primary transition whitespace-nowrap">{s}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 rounded-full border border-white/10 bg-bg/60 px-4 py-2 text-sm text-white outline-none placeholder-white/30 focus:border-primary/40" />
              <button type="submit" disabled={busy} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan disabled:opacity-50"><Send size={14} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
