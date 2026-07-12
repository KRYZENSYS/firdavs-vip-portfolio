import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Overview } from "@/components/dashboard/overview";
import { Activity, BarChart3, Shield, Zap, ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Requests", value: "12,847", change: "+12.5%", icon: Activity, color: "text-cyber-blue" },
  { label: "Security Score", value: "98", suffix: "/100", change: "+3", icon: Shield, color: "text-emerald-400" },
  { label: "API Latency", value: "42", suffix: "ms", change: "-8ms", icon: Zap, color: "text-amber-400" },
  { label: "AI Queries", value: "847", change: "+24%", icon: Sparkles, color: "text-cyber-purple" },
];

const quickTools = [
  { name: "HTTP Analyzer", href: "/tools/http-analyzer", desc: "Send & inspect HTTP requests", icon: Terminal, color: "from-cyber-blue to-cyber-cyan" },
  { name: "JWT Decoder", href: "/tools/jwt-decoder", desc: "Decode & verify JWT tokens", icon: Shield, color: "from-cyber-purple to-cyber-pink" },
  { name: "JSON Formatter", href: "/tools/json-formatter", desc: "Format & validate JSON", icon: BarChart3, color: "from-emerald-500 to-cyan-500" },
  { name: "Hash Generator", href: "/tools/hash-generator", desc: "Generate secure hashes", icon: Activity, color: "from-amber-500 to-orange-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Firdavs. Here&apos;s what&apos;s happening today.</p>
        </div>
        <Badge variant="gradient"><span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />All systems operational</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-white">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal text-muted-foreground"> {stat.suffix}</span>}
                </p>
                <p className="mt-1 text-xs text-emerald-400">{stat.change} from last week</p>
              </div>
              <div className={`rounded-lg bg-white/5 p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-white">Quick Tools</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="group relative h-full overflow-hidden p-4 transition-all hover:border-cyber-blue/50">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} shadow-lg`}>
                  <tool.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-base font-semibold text-white">{tool.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{tool.desc}</p>
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Overview />
    </div>
  );
}
