"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { damping: 26, stiffness: 240, mass: 0.5 });
  const sy = useSpring(y, { damping: 26, stiffness: 240, mass: 0.5 });
  const [variant, setVariant] = useState<"default" | "link" | "text">("default");
  const [pressed, setPressed] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); if (hidden) setHidden(false); };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setHidden(true);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, a, [role='button']")) setVariant("link");
      else if (t.closest("input, textarea, [contenteditable]")) setVariant("text");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y, hidden]);

  const scale = pressed ? 0.7 : variant === "link" ? 1.5 : variant === "text" ? 1.2 : 1;
  const size = variant === "link" ? 36 : variant === "text" ? 24 : 18;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, [role="button"], input, textarea { cursor: none !important; }
        }
      `}</style>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[180] hidden md:flex items-center justify-center"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}>
        <motion.div animate={{ width: size, height: size, opacity: hidden ? 0 : 1, scale }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="relative flex items-center justify-center rounded-full">
          <span className="absolute inset-0 rounded-full border border-primary/70 shadow-neon-cyan" />
          <span className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
          {variant === "text" && <span className="absolute inset-0 rounded-full border-l border-r border-primary/40" />}
        </motion.div>
      </motion.div>
    </>
  );
}
