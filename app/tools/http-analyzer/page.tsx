"use client";

import { useState } from "react";
import { Globe, Send, Loader2, AlertTriangle, Clock, Shield, Activity, Bot, Sparkles, Copy, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";
import { analyzeHttp } from "@/lib/ai/groq";

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"];

const SECURITY_HEADERS = [
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
];

export default function HTTPAnalyzerPage() {
  const [url, setUrl] = useState("https://api.github.com");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Array<{ key: string; value: string }>>([{ key: "User-Agent", value: "FirdavsVIP/2.0" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    setLoading(true);
    setError("");
    setResponse(null);
    try {
      // Note: In real app, this would go through your own proxy to avoid CORS
      // For demo purposes, we show a CORS-limited response
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, method, headers: Object.fromEntries(headers.filter((h) => h.key).map((h) => [h.key, h.value])), body: body || undefined }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        toast.error("Request failed");
      } else {
        setResponse(data);
        toast.success(`${data.status} ${data.statusText} — ${data.time}ms`);
      }
    } catch (e: any) {
      setError(e.message || "Network error. CORS may be blocking the request.");
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAI = async () => {
    if (!response) return;
    setAiLoading(true);
    setAiAnalysis("");
    try {
      const result = await analyzeHttp(url, method, response);
      setAiAnalysis(result);
    } catch (e: any) {
      toast.error(e.message || "AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeader = (i: number) => setHeaders(headers.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: "key" | "value", val: string) => {
    const next = [...headers];
    next[i][field] = val;
    setHeaders(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-blue/10 text-cyber-blue">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">HTTP Analyzer</h1>
          <p className="text-sm text-muted-foreground">Inspect HTTP requests and responses with AI insights</p>
        </div>
      </div>

      {/* Request builder */}
      <Card className="p-5">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="h-10 rounded-lg border border-cyber-border/50 bg-white/5 px-3 font-mono text-sm focus:border-cyber-blue/50 focus:outline-none">
              {METHODS.map((m) => (<option key={m} value={m} className="bg-card">{m}</option>))}
            </select>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="flex-1" />
            <Button onClick={send} disabled={loading} variant="gradient">
              {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending</>) : (<><Send className="mr-2 h-4 w-4" />Send</>)}
            </Button>
          </div>

          {/* Headers */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Headers</label>
              <Button size="sm" variant="ghost" onClick={addHeader}><Plus className="mr-1 h-3 w-3" />Add</Button>
            </div>
            <div className="space-y-2">
              {headers.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={h.key} onChange={(e) => updateHeader(i, "key", e.target.value)} placeholder="Header name" className="flex-1 font-mono text-xs" />
                  <Input value={h.value} onChange={(e) => updateHeader(i, "value", e.target.value)} placeholder="Value" className="flex-1 font-mono text-xs" />
                  <Button size="icon" variant="ghost" onClick={() => removeHeader(i)}><X className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          {["POST", "PUT", "PATCH"].includes(method) && (
            <div>
              <label className="mb-2 block text-sm font-medium">Body (JSON)</label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' rows={5} className="text-xs" />
            </div>
          )}
        </div>
      </Card>

      {error && (
        <Card className="border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-start gap-2 text-amber-400">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-medium">Request blocked</p>
              <p className="mt-1 text-xs">{error}</p>
              <p className="mt-2 text-xs text-muted-foreground">Tip: Direct browser fetches are blocked by CORS. In production, requests are proxied through our backend. Try a CORS-enabled endpoint like https://api.github.com or use a public API.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Response */}
      {response && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={response.status >= 200 && response.status < 300 ? "success" : response.status >= 400 ? "destructive" : "warning"}>
              {response.status} {response.statusText}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {response.time}ms
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              {response.size} bytes
            </div>
            <div className="ml-auto">
              <Button onClick={handleAI} disabled={aiLoading} size="sm" variant="gradient">
                {aiLoading ? (<><Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse" />Analyzing</>) : (<><Bot className="mr-1.5 h-3.5 w-3.5" />AI Analyze</>)}
              </Button>
            </div>
          </div>

          {/* Security check */}
          {Object.keys(response.headers || {}).length > 0 && (
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyber-blue" />
                <h3 className="font-semibold text-sm">Security Headers</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SECURITY_HEADERS.map((h) => {
                  const present = response.headers && Object.keys(response.headers).some((k) => k.toLowerCase() === h);
                  return (
                    <div key={h} className="flex items-center gap-2 rounded-lg border border-cyber-border/30 bg-white/5 p-2 text-xs">
                      <div className={`h-2 w-2 rounded-full ${present ? "bg-emerald-400" : "bg-red-400"}`} />
                      <span className={present ? "text-emerald-400" : "text-red-400"}>{present ? "Present" : "Missing"}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Response tabs */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Response Headers</h3>
                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(JSON.stringify(response.headers, null, 2), "Headers")}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <pre className="max-h-96 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs custom-scrollbar">
                {Object.entries(response.headers || {}).map(([k, v]) => (
                  <div key={k} className="flex gap-2"><span className="text-cyber-blue">{k}:</span><span className="text-muted-foreground break-all">{String(v)}</span></div>
                ))}
              </pre>
            </Card>
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Response Body</h3>
                <Button size="icon" variant="ghost" onClick={() => copyToClipboard(response.body || "", "Body")}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <pre className="max-h-96 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs custom-scrollbar">
                {typeof response.body === "string" ? response.body : JSON.stringify(response.body, null, 2)}
              </pre>
            </Card>
          </div>

          {(aiAnalysis || aiLoading) && (
            <Card className="border-cyber-blue/30 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5 text-cyber-blue" />
                <h3 className="font-semibold">AI Security Analysis</h3>
              </div>
              {aiLoading && !aiAnalysis && (
                <div className="space-y-2"><div className="h-3 w-full skeleton rounded" /><div className="h-3 w-5/6 skeleton rounded" /><div className="h-3 w-4/6 skeleton rounded" /></div>
              )}
              {aiAnalysis && <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{aiAnalysis}</pre>}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
