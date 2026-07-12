"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <Badge variant="purple" className="mb-4">Pricing</Badge>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <Badge variant="cyber" className="px-3 py-1">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`relative h-full p-8 ${tier.popular ? "border-cyber-blue/50 shadow-2xl shadow-cyber-blue/20" : ""}`}>
                {tier.popular && <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5" />}
                <div className="relative">
                  <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Button asChild size="lg" variant={tier.popular ? "gradient" : "outline"} className="mt-6 w-full group">
                    <Link href="/register">
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyber-blue/10">
                          <Check className="h-3 w-3 text-cyber-blue" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
