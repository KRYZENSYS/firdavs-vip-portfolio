"use client";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useReadingList } from "@/lib/reading-list";
import { cn } from "@/lib/utils";

export default function SaveToListButton({ id, title, className }: { id: string; title: string; className?: string }) {
  const { has, add, remove } = useReadingList();
  const active = has(id);
  return (
    <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} onClick={() => (active ? remove(id) : add(id, title))}
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition", active ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-300" : "border-white/10 bg-white/5 text-white/70 hover:border-cyan-300/40 hover:text-cyan-300", className)}>
      {active ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
      {active ? "Saved" : "Save"}
    </motion.button>
  );
}
