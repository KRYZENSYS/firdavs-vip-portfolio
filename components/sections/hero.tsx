"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Bot, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Aurora orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-blue/20 blur-3xl animate-pulse" />
      <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-cyber-purple/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyber-blue"
            style={{
              left: `${(i * 5.3) % 100}%`,
              top: `${(i * 7.7) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-5xl text-center">
          <Badge variant="cyber" className="mb-6 px-4 py-1.5">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Powered by GroqCloud AI — Lightning Fast
          </Badge>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block text-white">Firdavs</span>
            <span className="block gradient-text neon-glow">VIP</span>
          </h1>

          <p className="mt-2 font-mono text-sm text-cyber-blue/70 sm:text-base">[ firdavs.vip ]</p>

          <p className="mt-8 text-balance text-lg text-muted-foreground sm:text-xl lg:text-2xl">
            Professional <span className="text-cyber-blue">Web Security Testing Platform</span> with
            <br className="hidden sm:block" />
            <span className="text-cyber-purple">AI-powered tools</span>, real-time collaboration, and enterprise-grade security.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="xl" variant="gradient" className="btn-glow group">
              <Link href="/dashboard">
                Start Testing
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="glass" className="group">
              <Link href="/dashboard">
                <Play className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            {[
              { icon: Shield, label: "Enterprise Security" },
              { icon: Zap, label: "Lightning Fast" },
              { icon: Bot, label: "AI-Powered" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4 text-cyber-blue" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <div className="animated-border p-1">
            <div className="rounded-[calc(var(--radius)-1.5px)] bg-gradient-to-br from-card/80 to-background/80 p-2 backdrop-blur-xl">
              <div className="cyber-grid-sm rounded-lg border border-cyber-border/50 bg-black/40 p-6">
                <div className="flex items-center gap-2 border-b border-cyber-border/50 pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center font-mono text-xs text-muted-foreground">
                    firdavsvip://security-dashboard
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Requests", value: "12.4K", color: "text-cyber-blue" },
                    { label: "Vulnerabilities", value: "0", color: "text-emerald-400" },
                    { label: "Uptime", value: "99.9%", color: "text-cyber-purple" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-lg border border-cyber-border/50 bg-white/[0.02] p-4">
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className={`mt-1 font-mono text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-32 rounded-lg border border-cyber-border/50 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 p-3">
                  <div className="font-mono text-xs text-cyber-blue">$ firdavsvip scan --target https://example.com</div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    <span className="text-emerald-400">[OK]</span> Initializing security scan...<br />
                    <span className="text-emerald-400">[OK]</span> Loading 25+ security modules...<br />
                    <span className="text-cyber-blue">[INFO]</span> AI assistant ready (GroqCloud)<br />
                    <span className="text-cyber-purple">[SCAN]</span> All systems operational ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="h-6 w-6 rotate-90 text-cyber-blue/50" />
      </div>
    </section>
  );
}
