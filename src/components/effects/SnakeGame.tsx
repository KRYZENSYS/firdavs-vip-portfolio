"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, RotateCcw, Trophy } from "lucide-react";

const GRID = 18;
const CELL = 22;
type P = { x: number; y: number };
type State = { snake: P[]; dir: P; food: P; score: number; dead: boolean };

const init = (): State => ({
  snake: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }],
  dir: { x: 1, y: 0 },
  food: { x: 12, y: 8 },
  score: 0,
  dead: false,
});

export default function SnakeGame() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<State>(init());
  const ref = useRef<HTMLDivElement>(null);

  const step = useCallback(() => {
    setS((p) => {
      if (p.dead) return p;
      const head = { x: p.snake[0].x + p.dir.x, y: p.snake[0].y + p.dir.y };
      if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID || p.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        return { ...p, dead: true };
      }
      const ate = head.x === p.food.x && head.y === p.food.y;
      const snake = ate ? [head, ...p.snake] : [head, ...p.snake.slice(0, -1)];
      const food = ate ? { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) } : p.food;
      return { ...p, snake, food, score: ate ? p.score + 10 : p.score };
    });
  }, []);

  useEffect(() => {
    if (!open || s.dead) return;
    const t = setInterval(step, 130);
    return () => clearInterval(t);
  }, [open, s.dead, step]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, P> = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } };
      const d = map[e.key];
      if (!d) return;
      setS((p) => {
        if (p.dead) return p;
        if (d.x === -p.dir.x && d.y === -p.dir.y) return p;
        return { ...p, dir: d };
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reset = () => setS(init());
  const best = typeof window !== "undefined" ? Number(localStorage.getItem("fvip-snake-best") || 0) : 0;
  useEffect(() => { if (s.score > best) try { localStorage.setItem("fvip-snake-best", String(s.score)); } catch {} }, [s.score, best]);

  return (
    <>
      <button onClick={() => setOpen((v) => !v)} className="fixed bottom-24 right-6 z-[105] hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/40 bg-bg/80 text-emerald-300 shadow-neon-cyan backdrop-blur-xl hover:scale-110 transition" title="Snake game">
        <Gamepad2 size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={ref} className="fixed inset-0 z-[230] flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="rounded-2xl border border-emerald-300/30 bg-bg/95 p-5 shadow-neon-cyan">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                  <Gamepad2 size={12} /> // snake.cyber
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-white/80"><Trophy size={11} className="text-amber-300" /> best: {Math.max(best, s.score)}</span>
                  <button onClick={reset} className="rounded-md border border-white/10 p-1 text-white/60 hover:border-emerald-300/40 hover:text-emerald-300"><RotateCcw size={11} /></button>
                  <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X size={14} /></button>
                </div>
              </div>
              <div className="font-mono text-xs text-white/60 mb-2">score: <span className="text-emerald-300">{s.score}</span> · arrows to move</div>
              <div className="relative overflow-hidden rounded-lg border border-emerald-300/20 bg-black" style={{ width: GRID * CELL, height: GRID * CELL }}>
                {s.snake.map((seg, i) => (
                  <div key={i} className="absolute" style={{ left: seg.x * CELL, top: seg.y * CELL, width: CELL, height: CELL, background: i === 0 ? "#34d399" : "#10b981", boxShadow: i === 0 ? "0 0 8px #34d399" : "none", border: "1px solid #050505" }} />
                ))}
                <div className="absolute rounded-full" style={{ left: s.food.x * CELL + 3, top: s.food.y * CELL + 3, width: CELL - 6, height: CELL - 6, background: "#f43f5e", boxShadow: "0 0 12px #f43f5e" }} />
                {s.dead && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm">
                    <div className="font-display text-3xl font-black text-rose-400">GAME OVER</div>
                    <div className="mt-1 text-sm text-white/70">score: {s.score}</div>
                    <button onClick={reset} className="mt-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30"><RotateCcw size={11} /> Restart</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
