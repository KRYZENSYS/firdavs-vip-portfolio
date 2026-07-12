import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, Zap, Shield, TrendingUp, ArrowUpRight, Clock, Eye, Bot, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Total Requests", value: "12,453", change: "+12.5%", icon: Zap, color: "text-cyber-blue" },
  { label: "Active Projects", value: "8", change: "+2", icon: Globe, color: "text-cyber-purple" },
  { label: "Team Members", value: "5", change: "+1", icon: Users, color: "text-cyan-400" },
  { label: "AI Credits Used", value: "7.5K", change: "75%", icon: Bot, color: "text-emerald-400" },
];

const RECENT_ACTIVITY = [
  { type: "scan", title: "HTTP scan on api.example.com", time: "2m ago", status: "success" },
  { type: "jwt", title: "JWT decoded for /api/auth/login", time: "5m ago", status: "success" },
  { type: "alert", title: "Critical vulnerability detected", time: "12m ago", status: "warning" },
  { type: "report", title: "Security report generated", time: "1h ago", status: "success" },
  { type: "scan", title: "Port scan completed on 192.168.1.1", time: "2h ago", status: "success" },
];

const QUICK_TOOLS = [
  { id: "http-analyzer", name: "HTTP Analyzer", icon: Globe, color: "from-cyber-blue/20 to-cyber-blue/5", text: "text-cyber-blue" },
  { id: "jwt-decoder", name: "JWT Decoder", icon: Eye, color: "from-cyber-purple/20 to-cyber-purple/5", text: "text-cyber-purple" },
  { id: "json-formatter", name: "JSON Formatter", icon: BarChart3, color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400" },
  { id: "hash-generator", name: "Hash Generator", icon: Shield, color: "from-emerald-500/20 to-emerald-500/5", text: "text-emerald-400" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome back, Firdavs</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening with your security workspace today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm"><Link href="/ai"><Bot className="mr-2 h-4 w-4" />AI Assistant</Link></Button>
          <Button asChild variant="gradient" size="sm"><Link href="/tools/http-analyzer"><Zap className="mr-2 h-4 w-4" />New Scan</Link></Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-display text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" asChild><Link href="/dashboard/activity">View all<ArrowUpRight className="ml-1 h-3 w-3" /></Link></Button>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-cyber-border/30 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.status === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{a.time}</p>
                </div>
                <Badge variant={a.status === "success" ? "success" : "warning"}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Tools */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Quick Tools</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_TOOLS.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <div className={`rounded-lg border border-cyber-border/30 bg-gradient-to-br ${tool.color} p-4 transition-all hover:scale-105 hover:border-cyber-blue/50`}>
                  <tool.icon className={`h-5 w-5 ${tool.text}`} />
                  <p className="mt-2 text-sm font-medium">{tool.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-cyber-blue/30 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyber-blue" />
              <h3 className="font-semibold text-sm">AI Assistant</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Get instant help with security testing, code review, and analysis.</p>
            <Button asChild size="sm" variant="cyber" className="mt-3 w-full">
              <Link href="/ai">Open AI Chat</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
