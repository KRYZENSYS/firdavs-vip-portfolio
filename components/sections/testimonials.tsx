"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { randomColor } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <Badge variant="purple" className="mb-4">Testimonials</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Loved by <span className="gradient-text">security pros</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full p-6">
                <Quote className="h-8 w-8 text-cyber-blue/30" />
                <p className="mt-3 text-sm leading-relaxed">{t.content}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-cyber-border/30 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm" style={{ backgroundColor: `${randomColor(t.name)}20`, color: randomColor(t.name) }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
