"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Check, Video, X, ChevronLeft, ChevronRight } from "lucide-react";

const SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

function generateMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const start = first.getDay();
  const days = last.getDate();
  const grid: (number | null)[] = [];
  for (let i = 0; i < start; i++) grid.push(null);
  for (let d = 1; d <= days; d++) grid.push(d);
  while (grid.length % 7) grid.push(null);
  return { grid, monthName: first.toLocaleString("en", { month: "long" }), year };
}

export default function BookPage() {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("intro");
  const [done, setDone] = useState(false);

  const grid = useMemo(() => generateMonth(view.y, view.m), [view]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !slot) return;
    try {
      const list = JSON.parse(localStorage.getItem("fvip-bookings") || "[]");
      list.push({ name, email, topic, day, slot, y: view.y, m: view.m, at: new Date().toISOString() });
      localStorage.setItem("fvip-bookings", JSON.stringify(list));
    } catch {}
    setDone(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x max-w-5xl">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><Calendar size={12} /> // meeting.scheduler</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">BOOK A CALL</h1>
        <p className="mt-3 text-white/60 max-w-2xl">15-minute intro call. Pick a date and time, fill in your details, and you’re set. No payment required.</p>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"><Check size={28} /></div>
              <h2 className="mt-4 text-2xl font-bold text-white">Booked for {grid.monthName} {day} · {slot}</h2>
              <p className="mt-2 text-white/70">A confirmation will be sent to {email}. Check your inbox and spam folder.</p>
              <button onClick={() => { setDone(false); setDay(null); setSlot(null); setName(""); setEmail(""); }} className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-white hover:border-primary/50 hover:text-primary">Book another</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} className="mt-10 grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white">{grid.monthName} {grid.year}</h3>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => setView((v) => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 })} className="rounded-lg border border-white/10 p-1.5 text-white/70 hover:border-primary/40"><ChevronLeft size={14} /></button>
                    <button type="button" onClick={() => setView((v) => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 })} className="rounded-lg border border-white/10 p-1.5 text-white/70 hover:border-primary/40"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <span key={d}>{d}</span>)}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {grid.grid.map((d, i) => {
                    const isPast = d ? new Date(view.y, view.m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate()) : false;
                    const isWeekend = i % 7 === 0 || i % 7 === 6;
                    return (
                      <button key={i} type="button" disabled={!d || isPast || isWeekend} onClick={() => setDay(d)}
                        className={`aspect-square rounded-lg text-sm font-medium transition ${!d ? "" : isPast || isWeekend ? "text-white/15 cursor-not-allowed" : day === d ? "bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan" : "text-white/80 hover:border-primary/40 hover:bg-primary/10 border border-white/5"}`}>
                        {d || ""}
                      </button>
                    );
                  })}
                </div>
                {day && (
                  <div className="mt-5">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2 flex items-center gap-1.5"><Clock size={11} /> available slots</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {SLOTS.map((s) => (
                        <button key={s} type="button" onClick={() => setSlot(s)} className={`rounded-lg border px-2 py-1.5 text-xs transition ${slot === s ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 bg-white/5 text-white/70 hover:border-primary/40"}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <h3 className="font-display text-lg font-bold text-white">Your details</h3>
                <div className="mt-4 space-y-3">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white outline-none placeholder-white/30 focus:border-primary/40" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white outline-none placeholder-white/30 focus:border-primary/40" />
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white outline-none focus:border-primary/40">
                    <option value="intro">General intro chat</option>
                    <option value="project">Project discussion</option>
                    <option value="hire">Hiring / freelance</option>
                    <option value="security">Security audit inquiry</option>
                  </select>
                  <div className="rounded-xl border border-white/10 bg-bg/40 p-4 text-xs text-white/60">
                    {day && slot ? <span>Selected: <b className="text-white">{grid.monthName} {day}</b> at <b className="text-primary">{slot}</b> (UTC+5)</span> : <span>Pick a date and time first</span>}
                  </div>
                  <button type="submit" disabled={!day || !slot || !name || !email} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary py-3 text-sm font-bold text-bg shadow-neon-cyan hover:shadow-neon-purple transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <Video size={14} /> Confirm booking
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
