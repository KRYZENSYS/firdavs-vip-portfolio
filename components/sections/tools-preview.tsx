"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Key, Braces, Binary, Hash, Link2, Regex, Fingerprint, Lock, Clock, Palette, GitCompare, ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = { Globe, Key, Braces, Binary, Hash, Link: Link2, Regex, Fingerprint, Lock, Clock, Palette, GitCompare };
const colorMap: Record<string, string> = {
  blue: "from-cyber-blue/20 to-cyber-blue/5 text-cyber-blue border-cyber-blue/30",
  purple: "from-cyber-purple/20 to-cyber-purple/5 text-cyber-purple border-cyber-purple/30",
  cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30",
};

export function ToolsPreview() {
  return (
    <section id="tools" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="cyber" className="mb-4">Tools</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            25+ <span className="gradient-text">professional tools</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From HTTP analysis to JWT decoding, all the security and developer tools you need in one beautiful platform.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TOOLS.map((tool, i) => {
            const Icon = iconMap[tool.icon] || Globe;
            const colors = colorMap[tool.color] || colorMap.blue;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/tools/${tool.id}`}>
                  <Card className={`group relative overflow-hidden bg-gradient-to-br ${colors} p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                    {tool.popular && (
                      <Badge variant="cyber" className="absolute right-2 top-2 text-[10px]">Popular</Badge>
                    )}
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{tool.category}</p>
                    <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/dashboard">
              Explore All Tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
