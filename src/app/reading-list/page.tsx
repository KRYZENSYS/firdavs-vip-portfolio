"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { useReadingList } from "@/lib/reading-list";
import SectionTitle from "@/components/sections/SectionTitle";

export default function ReadingListPage() {
  const { items, remove } = useReadingList();
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2"><BookOpen size={12} /> // reading_list.queue</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">READING LIST</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Posts and articles you saved for later. Synced locally across this device.</p>

        <div className="mt-10">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <Bookmark className="mx-auto h-10 w-10 text-white/30" />
              <p className="mt-4 text-white/60">No saved items yet.</p>
              <p className="text-sm text-white/40">Hit the "Save" button on any blog post to add it here.</p>
              <Link href="/#blog" className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-xs text-primary hover:bg-primary/10">Browse blog <ArrowRight size={12} /></Link>
            </div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence>
                {items.map((it) => (
                  <motion.li key={it.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl hover:border-primary/30 transition">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                      <Bookmark size={14} className="fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{it.title}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">saved {new Date(it.at).toLocaleString()}</div>
                    </div>
                    <Link href={`/blog/${it.id}`} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 hover:border-primary/40 hover:text-primary">Open</Link>
                    <button onClick={() => remove(it.id)} className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:border-rose-400/40 hover:text-rose-300"><Trash2 size={12} /></button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
