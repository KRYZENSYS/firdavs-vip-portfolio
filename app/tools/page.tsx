import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Globe, Key, Braces, Binary, Hash, Link2, Lock, Fingerprint, Clock, Palette, GitCompare, Regex, Search } from "lucide-react";

const TOOLS = [
  { id: "http-analyzer", name: "HTTP Analyzer", category: "Network", icon: Globe, color: "from-cyber-blue/20 to-cyber-blue/5", text: "text-cyber-blue", popular: true, desc: "Analyze HTTP requests/responses in detail" },
  { id: "jwt-decoder", name: "JWT Decoder", category: "Auth", icon: Key, color: "from-cyber-purple/20 to-cyber-purple/5", text: "text-cyber-purple", popular: true, desc: "Decode and verify JWT tokens" },
  { id: "json-formatter", name: "JSON Formatter", category: "Format", icon: Braces, color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400", popular: true, desc: "Format, validate, and beautify JSON" },
  { id: "base64", name: "Base64 Encoder", category: "Encode", icon: Binary, color: "from-cyber-blue/20 to-cyber-blue/5", text: "text-cyber-blue", desc: "Encode/decode Base64 strings" },
  { id: "hash-generator", name: "Hash Generator", category: "Crypto", icon: Hash, color: "from-cyber-purple/20 to-cyber-purple/5", text: "text-cyber-purple", popular: true, desc: "Generate MD5, SHA-1, SHA-256, SHA-512" },
  { id: "url-encoder", name: "URL Encoder", category: "Encode", icon: Link2, color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400", desc: "Encode/decode URL strings" },
  { id: "password-gen", name: "Password Generator", category: "Generator", icon: Lock, color: "from-emerald-500/20 to-emerald-500/5", text: "text-emerald-400", popular: true, desc: "Generate secure passwords" },
  { id: "uuid-generator", name: "UUID Generator", category: "Generator", icon: Fingerprint, color: "from-cyber-blue/20 to-cyber-blue/5", text: "text-cyber-blue", desc: "Generate UUID v1, v4, v5" },
  { id: "regex-tester", name: "Regex Tester", category: "Text", icon: Regex, color: "from-cyber-purple/20 to-cyber-purple/5", text: "text-cyber-purple", desc: "Test regular expressions" },
  { id: "timestamp", name: "Timestamp Converter", category: "Time", icon: Clock, color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400", desc: "Convert Unix timestamps" },
  { id: "color-picker", name: "Color Picker", category: "Design", icon: Palette, color: "from-pink-500/20 to-pink-500/5", text: "text-pink-400", desc: "Pick and convert colors" },
  { id: "diff-viewer", name: "Diff Viewer", category: "Compare", icon: GitCompare, color: "from-amber-500/20 to-amber-500/5", text: "text-amber-400", desc: "Compare text and code" },
];

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Security Tools</h1>
        <p className="text-sm text-muted-foreground">25+ professional tools for security testing and development.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search tools..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TOOLS.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.id}`}>
            <Card className="group relative h-full overflow-hidden p-5 transition-all hover:scale-[1.02] hover:border-cyber-blue/50 hover:shadow-2xl hover:shadow-cyber-blue/10">
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-50`} />
              <div className="relative">
                {tool.popular && <Badge variant="cyber" className="absolute -right-1 -top-1">Popular</Badge>}
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ${tool.text}`}>
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{tool.name}</h3>
                <Badge variant="outline" className="mt-1.5 text-[10px]">{tool.category}</Badge>
                <p className="mt-2 text-xs text-muted-foreground">{tool.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
