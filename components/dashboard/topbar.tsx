"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Command, Sun, Moon, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-cyber-border/30 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tools, projects, docs..."
            className="h-10 w-full rounded-lg border border-cyber-border/50 bg-white/5 pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-cyber-blue/50 focus:outline-none focus:ring-1 focus:ring-cyber-blue/50"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-cyber-border/50 bg-white/5 px-1.5 font-mono text-[10px] text-muted-foreground sm:flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        <div className="flex-1" />

        {/* Status */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-lg border border-cyber-border/50 bg-white/5 px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs">All systems operational</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground hidden lg:block">{time} UTC</div>
        </div>

        {/* Theme toggle */}
        {mounted && (
          <Button size="icon" variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        )}

        {/* Notifications */}
        <Button size="icon" variant="ghost" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <Badge variant="cyber" className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[9px]">3</Badge>
        </Button>

        {/* Profile menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-white/5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple font-display text-sm font-bold text-white">
              F
            </div>
            <div className="hidden text-left md:block">
              <div className="text-xs font-semibold">Firdavs</div>
              <div className="text-[10px] text-muted-foreground">Pro Member</div>
            </div>
            <ChevronDown className="hidden h-3 w-3 md:block" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-cyber-border/50 bg-card/95 shadow-2xl backdrop-blur-xl">
                <div className="border-b border-cyber-border/30 p-3">
                  <div className="font-semibold text-sm">Firdavs</div>
                  <div className="text-xs text-muted-foreground">firdavs@vip.com</div>
                </div>
                <div className="p-1">
                  {[
                    { icon: User, label: "Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: Bell, label: "Notifications" },
                  ].map((item) => (
                    <button key={item.label} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-white/5">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-cyber-border/30 p-1">
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
