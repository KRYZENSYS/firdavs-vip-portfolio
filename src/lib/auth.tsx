"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { id: string; name: string; email: string; avatar?: string; provider: "google" | "github" | "telegram" | "guest" };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signIn: (provider: User["provider"]) => Promise<void>;
  signOut: () => void;
  upgrade: () => void;
  isPro: boolean;
};
const Ctx = createContext<AuthCtx | null>(null);
const KEY = "fvip-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem(KEY) || "null");
      const p = JSON.parse(localStorage.getItem("fvip-pro") || "false");
      if (u) setUser(u);
      setIsPro(!!p);
    } catch {}
    setLoading(false);
  }, []);

  const signIn = async (provider: User["provider"]) => {
    setLoading(true);
    const names: Record<User["provider"], string> = { google: "Firdavs G.", github: "Firdavs GH", telegram: "Firdavs TG", guest: "Guest User" };
    const u: User = {
      id: crypto.randomUUID(),
      name: names[provider],
      email: provider === "guest" ? "guest@firdavsvip.uz" : `${provider}.user@gmail.com`,
      avatar: `https://api.dicebear.com/9.x/cyberpunk/svg?seed=${provider}-${Date.now()}`,
      provider,
    };
    setUser(u);
    try { localStorage.setItem(KEY, JSON.stringify(u)); } catch {}
    setLoading(false);
  };

  const signOut = () => { setUser(null); setIsPro(false); try { localStorage.removeItem(KEY); localStorage.removeItem("fvip-pro"); } catch {} };
  const upgrade = () => { setIsPro(true); try { localStorage.setItem("fvip-pro", "true"); } catch {} };

  return <Ctx.Provider value={{ user, loading, signIn, signOut, upgrade, isPro }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}
