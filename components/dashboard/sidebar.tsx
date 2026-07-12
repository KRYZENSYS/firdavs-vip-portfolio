"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Globe, Key, Braces, Binary, Hash, Link2, Lock,
  Fingerprint, Clock, Palette, GitCompare, Shield, Bot, FileText,
  Settings, Users, BarChart3, Zap, History, Folder, Bell, ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NAVIGATION = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Activity", href: "/dashboard/activity", icon: History },
    ],
  },
  {
    section: "Security Tools",
    items: [
      { label: "HTTP Analyzer", href: "/tools/http-analyzer", icon: Globe, popular: true },
      { label: "API Tester", href: "/tools/api-tester", icon: Zap },
      { label: "JWT Decoder", href: "/tools/jwt-decoder", icon: Key, popular: true },
      { label: "Hash Generator", href: "/tools/hash-generator", icon: Hash, popular: true },
      { label: "Password Gen", href: "/tools/password-gen", icon: Lock, popular: true },
    ],
  },
  {
    section: "Developer Tools",
    items: [
      { label: "JSON Formatter", href: "/tools/json-formatter", icon: Braces, popular: true },
      { label: "Base64", href: "/tools/base64", icon: Binary },
      { label: "URL Encoder", href: "/tools/url-encoder", icon: Link2 },
      { label: "UUID Generator", href: "/tools/uuid-generator", icon: Fingerprint },
      { label: "Timestamp", href: "/tools/timestamp", icon: Clock },
      { label: "Color Picker", href: "/tools/color-picker", icon: Palette },
      { label: "Diff Viewer", href: "/tools/diff-viewer", icon: GitCompare },
    ],
  },
  {
    section: "Workspace",
    items: [
      { label: "Projects", href: "/dashboard/projects", icon: Folder },
      { label: "Team", href: "/dashboard/team", icon: Users },
      { label: "Reports", href: "/dashboard/reports", icon: FileText },
      { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: "3" },
    ],
  },
  {
    section: "AI & Settings",
    items: [
      { label: "AI Assistant", href: "/ai", icon: Bot, badge: "NEW" },
      { label: "Security", href: "/dashboard/security", icon: Shield },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "sticky top-0 hidden h-screen border-r border-cyber-border/30 bg-card/30 backdrop-blur-xl transition-all duration-300 lg:block",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-cyber-border/30 px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-display text-sm font-bold leading-none">
                  <span className="text-white">Firdavs</span>
                  <span className="gradient-text">VIP</span>
                </div>
                <div className="font-mono text-[9px] text-muted-foreground">v2.0.0</div>
              </div>
            </Link>
          )}
          <button onClick={onToggle} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5">
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {NAVIGATION.map((section, i) => (
            <div key={i} className="mb-6">
              {!collapsed && (
                <h3 className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {section.section}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                          isActive
                            ? "bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/10 text-white"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                          collapsed && "justify-center"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-nav"
                            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyber-blue to-cyber-purple"
                          />
                        )}
                        <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-cyber-blue")} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.popular && <span className="h-1.5 w-1.5 rounded-full bg-cyber-blue" />}
                            {item.badge && (
                              <Badge variant={item.badge === "NEW" ? "purple" : "cyber"} className="h-4 px-1 text-[9px]">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-cyber-border/30 p-3">
            <div className="rounded-lg bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 p-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-cyber-blue" />
                <span className="text-xs font-semibold">AI Credits</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple" />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">7,500 / 10,000 used</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
