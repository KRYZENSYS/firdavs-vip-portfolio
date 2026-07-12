"use client";

import { Search, Bell, Command, Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-cyber-dark/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tools, docs, settings..."
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-16 text-sm text-white placeholder-muted-foreground transition-colors focus:border-cyber-blue/50 focus:outline-none focus:ring-1 focus:ring-cyber-blue/30"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="gradient" className="hidden md:inline-flex">
          <Sparkles className="mr-1 h-3 w-3" />AI Pro
        </Badge>
        <button className="relative rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:border-cyber-blue/30 hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyber-blue" />
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white transition-colors hover:border-cyber-blue/30">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple">
            <User className="h-3 w-3 text-white" />
          </div>
          <span className="hidden font-mono text-xs sm:inline">firdavsvip</span>
        </button>
      </div>
    </header>
  );
}
