"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = {
  items: { id: string; title: string; at: string }[];
  add: (id: string, title: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
};
const C = createContext<Ctx | null>(null);
const KEY = "fvip-reading-list";

export function ReadingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<{ id: string; title: string; at: string }[]>([]);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
  }, []);
  const persist = (next: typeof items) => { setItems(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} };
  const add = (id: string, title: string) => { if (!items.find((x) => x.id === id)) persist([{ id, title, at: new Date().toISOString() }, ...items]); };
  const remove = (id: string) => persist(items.filter((x) => x.id !== id));
  const has = (id: string) => !!items.find((x) => x.id === id);
  return <C.Provider value={{ items, add, remove, has, count: items.length }}>{children}</C.Provider>;
}

export function useReadingList() {
  const c = useContext(C);
  if (!c) throw new Error("useReadingList must be inside ReadingListProvider");
  return c;
}
