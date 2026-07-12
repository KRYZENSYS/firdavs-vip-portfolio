"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, LayoutDashboard, Wrench, Sparkles, FolderKanban, Users, CreditCard, Settings, LogOut, BookOpen, Activity, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "AI Chat", href: "/ai", icon: Sparkles, badge: "NEW" },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Activity", href: "/dashboard/activity", icon: Activity },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Documentation", href: "/docs", icon: BookOpen },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed left-4 top-4 z-50 rounded-lg border border-white/10 bg-cyber-darker/90 p-2 text-white backdrop-blur lg:hidden">
        {open ? <X className="h-5 w-5" /> : <LayoutDashboard className="h-5 w-5" />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/5 bg-cyber-dark/95 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-white/5 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold gradient-text">FirdavsVIP</span>
        </div>

        <nav className="space-y-1 overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 8rem)" }}>
          <p className="mb-2 px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Workspace</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive ? "bg-cyber-blue/10 text-cyber-blue" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </span>
                {item.badge && (
                  <span className="rounded bg-cyber-blue/20 px-1.5 py-0.5 text-[9px] font-mono text-cyber-blue">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 p-4">
          <div className="mb-3 rounded-lg border border-cyber-blue/20 bg-cyber-blue/5 p-3">
            <p className="font-display text-xs font-semibold text-white">Pro Plan Active</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Unlimited tools · 24/7 support</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple" />
            </div>
          </div>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white">
            <LogOut className="h-4 w-4" />Log out
          </button>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" />}
    </>
  );
}
