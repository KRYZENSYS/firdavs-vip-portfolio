"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type XpCtx = { xp: number; level: number; next: number; add: (n: number) => void; badges: string[]; addBadge: (b: string) => void; };
const Ctx = createContext<XpCtx | null>(null);
const KEY_XP = "fvip-xp";
const KEY_BADGES = "fvip-badges";

const BADGES = [
  { id: "first-visit", label: "First Contact", xp: 10, desc: "Visited the site" },
  { id: "konami-master", label: "Konami Master", xp: 50, desc: "Triggered Konami code" },
  { id: "scroll-hero", label: "Scroll Hero", xp: 30, desc: "Reached the bottom of the page" },
  { id: "ai-curious", label: "AI Curious", xp: 20, desc: "Chatted with the AI" },
  { id: "bookworm", label: "Bookworm", xp: 25, desc: "Saved 3 articles" },
  { id: "hacker", label: "Hacker", xp: 40, desc: "Opened Hacker Typer" },
  { id: "gamer", label: "Gamer", xp: 35, desc: "Played Snake" },
  { id: "fan", label: "True Fan", xp: 50, desc: "Visited 5 times" },
];

export function XpProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    try { setXp(Number(localStorage.getItem(KEY_XP) || "0")); setBadges(JSON.parse(localStorage.getItem(KEY_BADGES) || "[]")); } catch {}
  }, []);

  const add = (n: number) => { const v = xp + n; setXp(v); try { localStorage.setItem(KEY_XP, String(v)); } catch {} };
  const addBadge = (b: string) => { if (badges.includes(b)) return; const nb = [...badges, b]; setBadges(nb); try { localStorage.setItem(KEY_BADGES, JSON.stringify(nb)); } catch {}; const bd = BADGES.find((x) => x.id === b); if (bd) add(bd.xp); };

  const level = Math.floor(xp / 100) + 1;
  const next = level * 100;
  return <Ctx.Provider value={{ xp, level, next, add, badges, addBadge }}>{children}</Ctx.Provider>;
}

export function useXp() { const c = useContext(Ctx); if (!c) throw new Error("useXp must be inside XpProvider"); return c; }
export const XP_BADGES = BADGES;
