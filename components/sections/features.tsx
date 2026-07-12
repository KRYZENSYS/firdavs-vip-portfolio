"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Layers, Users, Globe, Code2, BarChart3, Lock } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap = { Shield, Zap, Layers, Users, Globe, Code2, BarChart3, Lock };

const colorMap = {
  blue: { text: "text-cyber-blue", glow: "shadow-cyber-blue/20", border: "border-cyber-blue/30" },
  purple: { text: "text-cyber-purple", glow: "shadow-cyber-purple/20", border: "border-cyber-purple/30" },
  cyan: { text: "text-cyan-400", glow: "shadow-cyan-400/20", border: "border-cyan-400/30" },
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="purple" className="mb-4">Features</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Everything you need for
            <br />
            <span className="gradient-text">professional security testing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built by security professionals, for security professionals. Every feature designed to make your workflow faster and more efficient.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`group relative h-full overflow-hidden p-6 transition-all duration-300 hover:${colors.border} hover:shadow-2xl hover:${colors.glow}`}>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 ${colors.text} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${colors.text.replace("text", "from")}/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
