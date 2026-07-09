"use client";
import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.18 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const fontSize = 16;
    let cols = Math.floor(w / fontSize);
    let drops = Array(cols).fill(0).map(() => Math.random() * h);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const onResize = () => {
      w = c.width = window.innerWidth; h = c.height = window.innerHeight;
      cols = Math.floor(w / fontSize); drops = Array(cols).fill(0).map(() => Math.random() * h);
    };
    window.addEventListener("resize", onResize);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize; const y = drops[i] * fontSize;
        ctx.fillStyle = y < h * 0.15 ? "rgba(123,46,255,0.9)" : "rgba(0,245,255,0.85)";
        ctx.fillText(text, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-20" style={{ opacity }} />;
}
