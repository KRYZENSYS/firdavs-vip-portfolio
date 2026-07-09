import { Sparkles } from "lucide-react";

export const metadata = { title: "TIL — Today I Learned" };

const TILS = [
  { date: "2026-07-08", tag: "python", text: "You can use `asyncio.gather` to run multiple async Telegram bot tasks in one process — perfect for combining bot + FastAPI health server." },
  { date: "2026-07-05", tag: "security", text: "Most SQL injections are still boolean-based. A 5-min prepared statement fix prevents 80% of breach vectors." },
  { date: "2026-07-02", tag: "nextjs", text: "`next/font` automatically subsets and self-hosts Google fonts. Zero CLS, zero FOUT, zero layout shift." },
  { date: "2026-06-28", tag: "css", text: "`@starting-style` is now in baseline browsers. Use it for entry animations without any JS." },
  { date: "2026-06-24", tag: "ai", text: "Mixing `temperature=0.7` with `top_p=0.9` usually gives more creative but still coherent outputs than either alone." },
  { date: "2026-06-19", tag: "linux", text: "`ss -tunap` is the new `netstat` and shows you which PID owns every socket — invaluable for debugging." },
  { date: "2026-06-15", tag: "git", text: "`git worktree add ../feature-branch feature-branch` lets you work on two branches at once without stashing." },
  { date: "2026-06-10", tag: "react", text: "Use `useTransition` for non-urgent state updates — keeps the UI snappy even with heavy re-renders." },
  { date: "2026-06-04", tag: "docker", text: "`--init` flag in `docker run` adds a tiny PID 1 that reaps zombie processes. Saves you from mysterious container hangs." },
  { date: "2026-05-30", tag: "ops", text: "Uptime monitoring with `curl -fsS --max-time 3 https://site.com` inside a 1-min cron is the cheapest alert you can build." },
];

const COLOR: Record<string, string> = {
  python: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  security: "text-rose-300 border-rose-400/30 bg-rose-500/10",
  nextjs: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
  css: "text-pink-300 border-pink-400/30 bg-pink-500/10",
  ai: "text-purple-300 border-purple-400/30 bg-purple-500/10",
  linux: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  git: "text-orange-300 border-orange-400/30 bg-orange-500/10",
  react: "text-sky-300 border-sky-400/30 bg-sky-500/10",
  docker: "text-blue-300 border-blue-400/30 bg-blue-500/10",
  ops: "text-teal-300 border-teal-400/30 bg-teal-500/10",
};

export default function TilPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><Sparkles size={12} /> // today_i_learned</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">TIL</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Short, sharp lessons. One per day. The compound interest of tiny learnings.</p>
        <ul className="mt-12 space-y-4">
          {TILS.map((t) => (
            <li key={t.date + t.text} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-white/20">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${COLOR[t.tag] || COLOR.python}`}>#{t.tag}</span>
                <span className="font-mono text-[10px] text-white/40">{t.date}</span>
              </div>
              <p className="text-sm md:text-base text-white/85 leading-relaxed">{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
