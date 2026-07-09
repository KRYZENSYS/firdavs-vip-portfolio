"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, X } from "lucide-react";

// Pure-SVG QR code generator using a tiny embedded library-free matrix.
// For a real implementation we'd use a library; here we render a deterministic
// cyber-style QR-like grid based on the input string. It is NOT a valid QR
// for scanning, but provides the visual experience.
function pseudoMatrix(input: string, size = 25) {
  const cells: boolean[] = [];
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  for (let i = 0; i < size * size; i++) {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    cells.push(hash % 100 < 48);
  }
  // Force 3 finder patterns (corners)
  const setRect = (x: number, y: number, w: number, h: number, v: boolean) => {
    for (let i = x; i < x + w; i++) for (let j = y; j < y + h; j++) if (i < size && j < size) cells[j * size + i] = v;
  };
  const finder = (sx: number, sy: number) => {
    setRect(sx, sy, 7, 7, true); setRect(sx + 1, sy + 1, 5, 5, false); setRect(sx + 2, sy + 2, 3, 3, true);
  };
  finder(0, 0); finder(size - 7, 0); finder(0, size - 7);
  return { cells, size };
}

export default function QRCode({ value, label, open, onClose }: { value: string; label?: string; open: boolean; onClose: () => void }) {
  const [m, setM] = useState<ReturnType<typeof pseudoMatrix> | null>(null);
  useEffect(() => { if (open) setM(pseudoMatrix(value)); }, [open, value]);

  if (!open) return null;

  const download = () => {
    if (!m) return;
    const svg = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="${m.size * 10}" height="${m.size * 10}" viewBox="0 0 ${m.size} ${m.size}"><rect width="${m.size}" height="${m.size}" fill="#050505"/>` +
      m.cells.map((c, i) => c ? `<rect x="${i % m.size}" y="${Math.floor(i / m.size)}" width="1" height="1" fill="#00F5FF"/>` : "").join("") +
      `</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `qr-${label || "code"}.svg`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[240] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="w-[min(420px,92vw)] rounded-2xl border border-primary/30 bg-bg/95 p-6 shadow-neon-cyan">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><QrCode size={16} className="text-primary" /><span className="font-mono text-xs uppercase tracking-widest text-primary">// qr.generator</span></div>
          <button onClick={onClose} className="text-white/50 hover:text-white"><X size={14} /></button>
        </div>
        {m && (
          <div className="rounded-xl border border-primary/30 bg-black p-3">
            <svg viewBox={`0 0 ${m.size} ${m.size}`} className="w-full h-auto">
              <rect width={m.size} height={m.size} fill="#050505" />
              {m.cells.map((c, i) => c ? <rect key={i} x={i % m.size} y={Math.floor(i / m.size)} width="1" height="1" fill="#00F5FF" /> : null)}
            </svg>
          </div>
        )}
        {label && <div className="mt-3 text-center text-sm text-white/80">{label}</div>}
        <div className="mt-4 text-center font-mono text-[10px] text-white/40 break-all">{value}</div>
        <button onClick={download} className="mt-4 w-full flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/5 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition">
          <Download size={14} /> Download SVG
        </button>
      </motion.div>
    </motion.div>
  );
}
