"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.style.cursor = "none";

    let id = 0;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const nid = ++id;
      setTrail((t) => [...t.slice(-12), { x: e.clientX, y: e.clientY, id: nid }]);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {trail.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0.7, scale: 1 }} animate={{ opacity: 0, scale: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none fixed left-0 top-0 z-[299] h-2 w-2 rounded-full"
          style={{ left: p.x - 4, top: p.y - 4, background: `hsl(${i * 30}, 100%, 60%)`, boxShadow: `0 0 6px hsl(${i * 30}, 100%, 60%)` }} />
      ))}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[300] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary mix-blend-difference"
        animate={{ left: pos.x, top: pos.y }} transition={{ type: "spring", damping: 30, stiffness: 600, mass: 0.3 }} />
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[300] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        animate={{ left: pos.x, top: pos.y }} transition={{ type: "spring", damping: 50, stiffness: 1000 }} />
    </>
  );
}
