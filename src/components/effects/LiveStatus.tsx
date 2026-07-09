"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const ACTIVITIES = [
  { status: "online", text: "Online · coding", color: "bg-emerald-400" },
  { status: "online", text: "Online · reviewing PRs", color: "bg-emerald-400" },
  { status: "busy", text: "In a CTF challenge", color: "bg-amber-400" },
  { status: "online", text: "Online · building a bot", color: "bg-emerald-400" },
  { status: "idle", text: "Idle · 12m", color: "bg-cyan-400" },
];

export default function LiveStatus() {
  const [act, setAct] = useState(ACTIVITIES[0]);

  useEffect(() => {
    const i = setInterval(() => {
      const next = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
      setAct(next);
    }, 12000);
    return () => clearInterval(i);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
      className="fixed bottom-6 left-1/2 z-[100] hidden -translate-x-1/2 md:flex items-center gap-2 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/60 backdrop-blur-xl">
      <span className="relative flex h-2 w-2">
        <span className={`absolute inset-0 rounded-full ${act.color} animate-ping opacity-75`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${act.color}`} />
      </span>
      <Activity size={11} className="text-primary" />
      <span>{act.text}</span>
    </motion.div>
  );
}
