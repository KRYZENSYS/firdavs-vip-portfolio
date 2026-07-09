"use client";
import { useI18n, type Lang } from "@/lib/i18n";
import { Languages } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function LangSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const active = LANGS.find((l) => l.code === lang)!;
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-widest text-white/80 hover:border-primary/40 hover:text-white transition">
        <Languages size={14} /> <span>{active.flag}</span> <span className="hidden sm:inline">{active.code}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-bg/95 backdrop-blur-xl shadow-2xl">
            {LANGS.map((l) => (
              <li key={l.code}>
                <button onClick={() => { setLang(l.code); setOpen(false); }}
                  className={cn("flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-white/5", lang === l.code && "bg-primary/10 text-primary")}>
                  <span>{l.flag}</span> <span>{l.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
