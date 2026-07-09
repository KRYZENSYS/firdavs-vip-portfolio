"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type FavoritesCtx = {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};
const Ctx = createContext<FavoritesCtx | null>(null);

const KEY = "fvip-favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
  }, []);
  const persist = (next: string[]) => { setItems(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} };
  const toggle = (id: string) => persist(items.includes(id) ? items.filter((x) => x !== id) : [...items, id]);
  const has = (id: string) => items.includes(id);
  return <Ctx.Provider value={{ items, toggle, has, count: items.length }}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useFavorites must be inside FavoritesProvider");
  return c;
}
