"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, X, Disc3 } from "lucide-react";

type Track = { name: string; url: string };
const TRACKS: Track[] = [
  { name: "Cyber Noir Loop", url: "https://cdn.pixabay.com/audio/2022/03/15/audio_4abcf9c25a.mp3" },
  { name: "Neon Synthwave", url: "https://cdn.pixabay.com/audio/2022/10/25/audio_946bc89b04.mp3" },
];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(TRACKS[idx].url);
    audioRef.current.loop = true;
    audioRef.current.volume = vol;
    audioRef.current.muted = muted;
    return () => { audioRef.current?.pause(); audioRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = vol; }, [vol]);
  useEffect(() => { if (audioRef.current) audioRef.current.muted = muted; }, [muted]);

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { try { await audioRef.current.play(); setPlaying(true); } catch { setPlaying(false); } }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[110]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
            className="mb-3 w-72 rounded-2xl border border-primary/30 bg-bg/95 p-4 backdrop-blur-xl shadow-neon-cyan">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Disc3 className={`h-4 w-4 text-primary ${playing ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary">// audio.stream</div>
                  <div className="text-sm font-semibold text-white">{TRACKS[idx].name}</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="close" className="text-white/40 hover:text-white"><X size={14} /></button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input type="range" min={0} max={1} step={0.01} value={vol} onChange={(e) => setVol(parseFloat(e.target.value))} className="flex-1 accent-primary" />
              <button onClick={() => setMuted((m) => !m)} className="rounded-lg border border-white/10 p-1.5 text-white/70 hover:text-white">
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between gap-1.5">
              {TRACKS.map((t, i) => (
                <button key={t.name} onClick={() => setIdx(i)} className={`flex-1 truncate rounded-lg border px-2 py-1 text-[10px] uppercase tracking-widest ${i === idx ? "border-primary/50 bg-primary/10 text-primary" : "border-white/10 text-white/60 hover:text-white"}`}>{t.name}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-bg/80 text-primary shadow-neon-cyan backdrop-blur-xl hover:bg-primary/10 transition">
        <Music className={`h-4 w-4 ${playing ? "animate-pulse" : ""}`} />
      </button>
      <button onClick={toggle} aria-label="play/pause" className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-bg/90 text-[10px] text-white hover:text-primary">
        {playing ? "II" : "▶"}
      </button>
    </div>
  );
}
