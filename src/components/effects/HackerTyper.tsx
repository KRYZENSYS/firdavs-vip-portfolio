"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

const CODE = [
  "$ ssh root@firdavsvip.uz",
  "Password: ********",
  "Welcome to FIRDAVS VIP v3.0",
  "Last login: Thu Jul  9 13:18:42 from 192.168.1.1",
  "$ whoami",
  "firdavs",
  "$ cat /etc/shadow",
  "root:$6$ab12cd34ef56gh78$1a2b3c4d5e6f...:19000:0:99999:7:::",
  "$ sudo -i",
  "[sudo] password for firdavs: ********",
  "root@firdavsvip:~# nmap -sS 0.0.0.0/0",
  "Starting Nmap 7.94 ( https://nmap.org )",
  "Scanning 4294967296 hosts...",
  "Host is up (0.0034s latency).",
  "PORT     STATE SERVICE",
  "22/tcp   open  ssh",
  "80/tcp   open  http",
  "443/tcp  open  https",
  "8080/tcp open  http-proxy",
  "$ python3 exploit.py --target darkweb.onion",
  "[*] Connecting to darkweb.onion...",
  "[+] Bypassing firewall...",
  "[+] Injecting payload...",
  "[+] Root shell obtained!",
  "root@darkweb:~# rm -rf /logs",
  "$ exit",
  "logout",
  "Connection to firdavsvip.uz closed.",
];

export default function HackerTyper() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Backspace") { setCurrent((c) => c.slice(0, -1)); return; }
      if (e.key.length === 1) setCurrent((c) => c + e.key);
      if (e.key === "Enter") { enter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, current, idx]);

  const enter = useCallback(() => {
    setText((t) => [...t, current]);
    setCurrent("");
    setIdx((i) => (i + 1) % CODE.length);
    setTyped((n) => n + 1);
  }, [current]);

  return (
    <>
      <button onClick={() => setOpen((v) => !v)} aria-label="Hacker typer" className="fixed bottom-24 right-6 z-[105] hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-bg/80 text-primary shadow-neon-cyan backdrop-blur-xl hover:bg-primary/10 transition">
        <Terminal size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[260] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-[min(900px,95vw)] h-[min(560px,90vh)] overflow-hidden rounded-2xl border border-primary/30 bg-black shadow-neon-cyan">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <span className="h-3 w-3 rounded-full bg-red-500" /><span className="h-3 w-3 rounded-full bg-amber-500" /><span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/50">/bin/bash — root@firdavsvip</span>
                <button onClick={() => setOpen(false)} className="ml-auto text-white/50 hover:text-white"><X size={14} /></button>
              </div>
              <div className="h-[calc(100%-80px)] overflow-y-auto p-5 font-mono text-xs md:text-sm text-emerald-300">
                {text.map((l, i) => <div key={i} className="text-white/70">{l}</div>)}
                {CODE.slice(idx, idx + 1).map((c, i) => (
                  <div key={i}>
                    {c}<span className="inline-block h-4 w-2 align-middle bg-emerald-400 animate-pulse ml-1" />
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] text-white/40">
                Type anything · Press ENTER to "execute" · ESC to close · Typed lines: {typed}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
