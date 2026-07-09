"use client";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; life: number };
export default function MouseTrail() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<P[]>([]);
  const last = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const onResize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    onResize();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last.current.t > 16) {
        points.current.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (points.current.length > 60) points.current.shift();
        last.current = { x: e.clientX, y: e.clientY, t: now };
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i]; p.life -= 0.02;
        if (p.life <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1 - p.life) * 6 + 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${Math.max(0, p.life * 0.6)})`;
        ctx.fill();
      }
      points.current = points.current.filter((p) => p.life > 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[55] hidden md:block" />;
}
