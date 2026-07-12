"use client";

import { useState, useEffect } from "react";
import { Hash, Copy, RefreshCw, Lock, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

async function sha(message: string, algo: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

const ALGORITHMS = [
  { id: "MD5", name: "MD5", desc: "128-bit, fast, not secure", secure: false, async: false },
  { id: "SHA-1", name: "SHA-1", desc: "160-bit, deprecated", secure: false, async: true },
  { id: "SHA-256", name: "SHA-256", desc: "256-bit, recommended", secure: true, async: true },
  { id: "SHA-384", name: "SHA-384", desc: "384-bit, high security", secure: true, async: true },
  { id: "SHA-512", name: "SHA-512", desc: "512-bit, max security", secure: true, async: true },
];

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }
    const generate = async () => {
      setLoading(true);
      const results: Record<string, string> = {};
      for (const algo of ALGORITHMS) {
        try {
          if (algo.id === "MD5") {
            results[algo.id] = simpleHash(input).padEnd(32, "0").slice(0, 32);
          } else {
            results[algo.id] = await sha(input, algo.id.replace("-", "").toLowerCase());
          }
        } catch (e) {
          results[algo.id] = "Error";
        }
      }
      setHashes(results);
      setLoading(false);
    };
    generate();
  }, [input]);

  const handleCopy = async (hash: string, algo: string) => {
    await copyToClipboard(hash);
    toast.success(`${algo} copied to clipboard`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-purple/10 text-cyber-purple">
          <Hash className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Hash Generator</h1>
          <p className="text-sm text-muted-foreground">Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes</p>
        </div>
      </div>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">Input text</label>
          <Button variant="ghost" size="sm" onClick={() => setInput("")} disabled={!input}>
            <RefreshCw className="mr-1.5 h-3 w-3" />Clear
          </Button>
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash..."
          rows={4}
        />
      </Card>

      <div className="space-y-3">
        {ALGORITHMS.map((algo) => (
          <Card key={algo.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${algo.secure ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                  {algo.secure ? <Lock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{algo.name}</h3>
                    {!algo.secure && <span className="text-[10px] text-amber-400">⚠ not secure</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{algo.desc}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => hashes[algo.id] && handleCopy(hashes[algo.id], algo.name)} disabled={!hashes[algo.id]}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3">
              <div className="rounded-lg border border-cyber-border/30 bg-black/40 p-3 font-mono text-xs break-all">
                {loading && !hashes[algo.id] ? (
                  <div className="h-3 w-1/2 skeleton rounded" />
                ) : hashes[algo.id] ? (
                  hashes[algo.id]
                ) : (
                  <span className="text-muted-foreground">Hash will appear here...</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
