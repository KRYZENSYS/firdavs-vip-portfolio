"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_ITEMS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "border-b border-cyber-border/30 bg-background/80 backdrop-blur-xl" : "")}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-lg shadow-cyber-blue/20 transition-transform group-hover:scale-110">
            <Shield className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple opacity-50 blur-md transition-opacity group-hover:opacity-100" />
          </div>
          <div>
            <div className="font-display text-lg font-bold leading-none">
              <span className="text-white">Firdavs</span>
              <span className="gradient-text">VIP</span>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">enterprise.security</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button size="icon" variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          <Link href="https://github.com/KRYZENSYS/firdavs-vip-portfolio" target="_blank" className="hidden sm:block">
            <Button size="icon" variant="ghost" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register" className="hidden sm:block">
            <Button variant="gradient" size="sm">Get Started</Button>
          </Link>
          <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-cyber-border/30 bg-background/95 backdrop-blur-xl md:hidden overflow-hidden">
            <div className="container mx-auto space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1"><Button variant="outline" className="w-full" size="sm">Sign In</Button></Link>
                <Link href="/register" className="flex-1"><Button variant="gradient" className="w-full" size="sm">Get Started</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
