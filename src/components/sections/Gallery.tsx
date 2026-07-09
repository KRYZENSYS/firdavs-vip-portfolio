"use client";
import { motion } from "framer-motion";
import { ImageIcon, Maximize2 } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";

const TILES: { title: string; tag: string; cover: string; pattern: string }[] = [
  { title: "FIRDAVS VIP Hero", tag: "ui", cover: "from-cyan-500/40 to-blue-500/20", pattern: "grid" },
  { title: "CyberUz Academy", tag: "ui", cover: "from-purple-500/40 to-pink-500/20", pattern: "lines" },
  { title: "SaveBot Dashboard", tag: "code", cover: "from-sky-500/40 to-emerald-500/20", pattern: "grid" },
  { title: "KRYZEN BookFinder", tag: "ui", cover: "from-pink-500/40 to-rose-500/20", pattern: "dots" },
  { title: "Blockverse V3", tag: "code", cover: "from-cyan-500/40 to-purple-500/20", pattern: "lines" },
  { title: "AI Video Pipeline", tag: "ai", cover: "from-emerald-500/40 to-cyan-500/20", pattern: "dots" },
];

const Pattern = ({ p }: { p: string }) => {
  if (p === "grid") return <div className="absolute inset-0 grid-bg opacity-40" />;
  if (p === "dots") return <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(0,245,255,0.25) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />;
  return <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(123,46,255,0.18) 10px, rgba(123,46,255,0.18) 11px)" }} />;
};

export default function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// visual.snapshots" title="GALLERY" subtitle="Snapshots from the dark laboratory" icon={<ImageIcon size={12} />} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TILES.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20">
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.cover}`} />
              <Pattern p={t.pattern} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-5xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition">{t.title.charAt(0)}</div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary">#{t.tag}</div>
                  <div className="text-sm font-bold text-white">{t.title}</div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 group-hover:border-primary/60 group-hover:text-primary transition">
                  <Maximize2 size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
