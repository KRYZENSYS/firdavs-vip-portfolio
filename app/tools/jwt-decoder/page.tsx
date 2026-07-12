"use client";

import { useState, useMemo } from "react";
import { Key, Copy, Check, AlertTriangle, Bot, Sparkles, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { copyToClipboard, timeAgo } from "@/lib/utils";
import { explainJWT } from "@/lib/ai/groq";

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + (4 - (str.length % 4)) % 4, "=");
  try {
    return decodeURIComponent(escape(atob(padded)));
  } catch {
    try {
      return atob(padded);
    } catch {
      return "Invalid Base64";
    }
  }
}

export default function JWTDecoderPage() {
  const [token, setToken] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT format. JWT must have 3 parts separated by dots." };
    try {
      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));
      const signature = parts[2];
      const now = Math.floor(Date.now() / 1000);
      const expired = payload.exp ? payload.exp < now : false;
      const notYetValid = payload.nbf ? payload.nbf > now : false;
      const algNone = header.alg === "none";
      return { header, payload, signature, expired, notYetValid, algNone, valid: true };
    } catch (e: any) {
      return { error: e.message || "Failed to decode JWT" };
    }
  }, [token]);

  const handleCopy = async (text: string, label: string) => {
    await copyToClipboard(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleAI = async () => {
    if (!token) return;
    setAiLoading(true);
    setAiExplanation("");
    try {
      const result = await explainJWT(token);
      setAiExplanation(result);
    } catch (e: any) {
      toast.error(e.message || "AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-purple/10 text-cyber-purple">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">JWT Decoder</h1>
              <p className="text-sm text-muted-foreground">Decode, verify, and analyze JWT tokens with AI</p>
            </div>
          </div>
        </div>
        <Button onClick={handleAI} disabled={!token || aiLoading} variant="gradient">
          {aiLoading ? (<><Sparkles className="mr-2 h-4 w-4 animate-pulse" />Analyzing...</>) : (<><Bot className="mr-2 h-4 w-4" />AI Explain</>)}
        </Button>
      </div>

      {/* Input */}
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">Paste your JWT token</label>
          {token && (
            <Button variant="ghost" size="sm" onClick={() => setToken("")}>Clear</Button>
          )}
        </div>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          rows={4}
          className="text-xs"
        />
      </Card>

      {/* Warnings */}
      {decoded && !decoded.error && (
        <div className="space-y-2">
          {decoded.expired && (
            <Card className="border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Token has expired</span>
              </div>
            </Card>
          )}
          {decoded.algNone && (
            <Card className="border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Security risk: alg=none detected — token can be forged</span>
              </div>
            </Card>
          )}
          {decoded.notYetValid && (
            <Card className="border-amber-500/30 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Token not yet valid (nbf check)</span>
              </div>
            </Card>
          )}
        </div>
      )}

      {decoded?.error ? (
        <Card className="border-red-500/30 bg-red-500/5 p-5">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">{decoded.error}</span>
          </div>
        </Card>
      ) : decoded ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <JwtSection title="Header" data={decoded.header} onCopy={handleCopy} />
          <JwtSection title="Payload" data={decoded.payload} onCopy={handleCopy} />
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Signature</h3>
              <Button size="icon" variant="ghost" onClick={() => handleCopy(decoded.signature, "Signature")}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-2">
              <Badge variant={decoded.algNone ? "destructive" : "cyber"}>alg: {decoded.header.alg}</Badge>
              <p className="font-mono text-xs break-all text-muted-foreground">
                {showSecret ? decoded.signature : "•".repeat(Math.min(decoded.signature.length, 64))}
              </p>
              <Button size="sm" variant="ghost" onClick={() => setShowSecret(!showSecret)}>
                {showSecret ? <><EyeOff className="mr-1.5 h-3 w-3" />Hide</> : <><Eye className="mr-1.5 h-3 w-3" />Reveal</>}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}

      {/* AI Explanation */}
      {(aiExplanation || aiLoading) && (
        <Card className="border-cyber-blue/30 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Bot className="h-5 w-5 text-cyber-blue" />
            <h3 className="font-semibold">AI Analysis</h3>
            {aiLoading && <span className="ml-auto text-xs text-muted-foreground">Powered by GroqCloud</span>}
          </div>
          {aiLoading && !aiExplanation && (
            <div className="space-y-2">
              <div className="h-3 w-full skeleton rounded" />
              <div className="h-3 w-5/6 skeleton rounded" />
              <div className="h-3 w-4/6 skeleton rounded" />
            </div>
          )}
          {aiExplanation && (
            <div className="prose prose-invert prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{aiExplanation}</pre>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

function JwtSection({ title, data, onCopy }: { title: string; data: any; onCopy: (t: string, l: string) => void }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Button size="icon" variant="ghost" onClick={() => onCopy(JSON.stringify(data, null, 2), title)}>
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
      <pre className="max-h-96 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs custom-scrollbar">
        {JSON.stringify(data, null, 2)}
      </pre>
      {title === "Payload" && (
        <div className="mt-3 space-y-1">
          {data.exp && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Expires:</span><span>{new Date(data.exp * 1000).toLocaleString()}</span></div>}
          {data.iat && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Issued:</span><span>{new Date(data.iat * 1000).toLocaleString()}</span></div>}
          {data.nbf && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Not before:</span><span>{new Date(data.nbf * 1000).toLocaleString()}</span></div>}
        </div>
      )}
    </Card>
  );
}
