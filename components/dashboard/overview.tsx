"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowUp, ArrowDown, MoreHorizontal, Globe, Shield, Cpu, Database } from "lucide-react";

const timeRanges = ["24h", "7d", "30d", "90d"] as const;
type TimeRange = (typeof timeRanges)[number];

const requestsData: Record<TimeRange, number[]> = {
  "24h": [12, 18, 15, 22, 28, 24, 32, 38, 34, 42, 48, 52],
  "7d": [45, 52, 48, 61, 58, 72, 68],
  "30d": [120, 145, 138, 162, 158, 178, 195, 210, 198, 225, 248, 265],
  "90d": [480, 520, 495, 580, 612, 658, 702, 745, 720, 798, 845, 890],
};

const recentEvents = [
  { type: "auth", icon: Shield, title: "New login from Tashkent", desc: "Chrome on macOS", time: "2m ago", color: "text-cyber-blue" },
  { type: "api", icon: Globe, title: "API rate limit updated", desc: "Tier: Pro", time: "15m ago", color: "text-emerald-400" },
  { type: "system", icon: Cpu, title: "Background job completed", desc: "AI training batch #482", time: "1h ago", color: "text-cyber-purple" },
  { type: "db", icon: Database, title: "Database backup", desc: "23.4 GB · success", time: "3h ago", color: "text-amber-400" },
];

export function Overview() {
  const [range, setRange] = useState<TimeRange>("7d");
  const data = requestsData[range];
  const max = Math.max(...data);
  const total = data.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / data.length);
  const trend = data[data.length - 1] > data[0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="p-5 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-white">API Requests</h3>
            <p className="text-xs text-muted-foreground">Across all tools and endpoints</p>
          </div>
          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5">
            {timeRanges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${range === r ? "bg-cyber-blue/20 text-cyber-blue" : "text-muted-foreground hover:text-white"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-display text-xl font-bold text-white">{total.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg / period</p>
            <p className="font-display text-xl font-bold text-white">{avg}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Trend</p>
            <p className={`flex items-center gap-1 font-display text-xl font-bold ${trend ? "text-emerald-400" : "text-red-400"}`}>
              {trend ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {trend ? "+" : "-"}{Math.abs(Math.round(((data[data.length - 1] - data[0]) / data[0]) * 100))}%
            </p>
          </div>
        </div>
        <div className="flex h-40 items-end gap-1.5">
          {data.map((v, i) => (
            <div key={i} className="group relative flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t bg-gradient-to-t from-cyber-blue/40 to-cyber-blue transition-all group-hover:from-cyber-blue/60 group-hover:to-cyber-cyan"
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="absolute -top-6 hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white group-hover:block">
                {v}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-white">Recent Activity</h3>
          <button className="rounded p-1 text-muted-foreground hover:bg-white/5 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentEvents.map((event, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
              <div className={`rounded-lg bg-white/5 p-2 ${event.color}`}>
                <event.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{event.title}</p>
                <p className="truncate text-xs text-muted-foreground">{event.desc}</p>
              </div>
              <span className="whitespace-nowrap text-[10px] font-mono text-muted-foreground">{event.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <Badge variant="outline">
            <Activity className="mr-1 h-3 w-3" />
            Live
          </Badge>
          <button className="text-xs text-cyber-blue hover:underline">View all</button>
        </div>
      </Card>
    </div>
  );
}
