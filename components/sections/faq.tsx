"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <Badge variant="cyber" className="mb-4">FAQ</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "overflow-hidden rounded-xl border border-cyber-border/50 bg-card/30 backdrop-blur-sm transition-all",
                open === i && "border-cyber-blue/50 shadow-lg shadow-cyber-blue/10"
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="font-semibold">{item.q}</span>
                <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-cyber-border transition-all", open === i && "border-cyber-blue bg-cyber-blue/10 text-cyber-blue")}>
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-cyber-border/30 px-5 pb-5 pt-4 text-sm text-muted-foreground">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
