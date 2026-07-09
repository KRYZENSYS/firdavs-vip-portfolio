"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Telescope, X } from "lucide-react";

type Apod = { title: string; url: string; explanation: string; date: string; media_type: string };

export default function Starfield() {
  const [data, setData] = useState<Apod | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => setData({
        title: "Andromeda Galaxy (M31)",
        url: "https://apod.nasa.gov/apod/image/2401/M31_LRGB_2024_1024.jpg",
        explanation: "The nearest large spiral galaxy to our Milky Way, located 2.5 million light-years away.",
        date: "2024-01-15",
        media_type: "image",
      }));
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-24 right-40 z-[105] hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-sky-300/40 bg-bg/80 text-sky-200 backdrop-blur-xl hover:scale-110 transition" title="NASA Starfield">
        <Telescope size={16} />
      </button>
      <AnimatePresence>
        {open && data && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[240] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-[min(720px,95vw)] max-h-[90vh] overflow-y-auto rounded-2xl border border-sky-300/30 bg-bg/95 shadow-neon-cyan">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <div className="flex items-center gap-2"><Telescope size={14} className="text-sky-300" /><span className="font-mono text-xs uppercase tracking-widest text-sky-300">// nasa.apod</span></div>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X size={16} /></button>
              </div>
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {data.media_type === "image" ? (
                  <img src={data.url} alt={data.title} className="h-full w-full object-cover" />
                ) : (
                  <iframe src={data.url} className="h-full w-full" allowFullScreen />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{data.title}</h3>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-sky-300">{data.date}</div>
                <p className="mt-3 text-sm text-white/75 leading-relaxed line-clamp-6">{data.explanation}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
