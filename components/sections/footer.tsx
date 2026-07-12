"use client";

import Link from "next/link";
import { Github, Twitter, MessageCircle, Send, Shield } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Tools", href: "#tools" },
      { label: "Pricing", href: "#pricing" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "AI Assistant", href: "/ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "API Reference", href: "/api-docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-cyber-border/30 bg-gradient-to-b from-background to-card/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Firdavs</span>
                <span className="gradient-text">VIP</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: Github, href: SITE_CONFIG.links.github, label: "GitHub" },
                { icon: Twitter, href: SITE_CONFIG.links.twitter, label: "Twitter" },
                { icon: MessageCircle, href: SITE_CONFIG.links.discord, label: "Discord" },
                { icon: Send, href: SITE_CONFIG.links.telegram, label: "Telegram" },
              ].map((s, i) => (
                <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyber-border/50 bg-white/5 transition-all hover:border-cyber-blue/50 hover:bg-cyber-blue/10">
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section, i) => (
            <div key={i}>
              <h3 className="font-semibold text-sm">{section.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-cyber-blue">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cyber-border/30 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-emerald-400">●</span> All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
