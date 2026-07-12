"use client";

import { useState } from "react";
import { Braces, Copy, Check, Download, Trash2, AlertTriangle, Minimize2, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { copyToClipboard, downloadFile, formatBytes } from "@/lib/utils";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = (action: "format" | "minify" | "validate") => {
    setError("");
    if (!input.trim()) {
      toast.error("Please paste JSON content");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      if (action === "validate") {
        toast.success("Valid JSON ✓");
        return;
      }
      const result = action === "format" ? JSON.stringify(parsed, null, indent) : JSON.stringify(parsed);
      setOutput(result);
      toast.success(action === "format" ? "JSON formatted" : "JSON minified");
    } catch (e: any) {
      setError(e.message);
      toast.error("Invalid JSON");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await copyToClipboard(output);
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    if (!output) return;
    downloadFile("formatted.json", output, "application/json");
    toast.success("Downloaded");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
          <Braces className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">JSON Formatter</h1>
          <p className="text-sm text-muted-foreground">Format, validate, minify, and beautify JSON</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => format("format")} variant="gradient"><Maximize2 className="mr-2 h-4 w-4" />Format</Button>
        <Button onClick={() => format("minify")} variant="cyber"><Minimize2 className="mr-2 h-4 w-4" />Minify</Button>
        <Button onClick={() => format("validate")} variant="outline"><Check className="mr-2 h-4 w-4" />Validate</Button>
        <div className="flex items-center gap-2 rounded-lg border border-cyber-border/50 bg-white/5 px-3">
          <span className="text-xs text-muted-foreground">Indent:</span>
          {[2, 4].map((n) => (
            <button key={n} onClick={() => setIndent(n)} className={`px-2 py-1 text-xs rounded ${indent === n ? "bg-cyber-blue/20 text-cyber-blue" : "text-muted-foreground hover:text-foreground"}`}>
              {n}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <Button onClick={handleCopy} variant="outline" disabled={!output}><Copy className="mr-2 h-4 w-4" />Copy</Button>
        <Button onClick={handleDownload} variant="outline" disabled={!output}><Download className="mr-2 h-4 w-4" />Download</Button>
        <Button onClick={() => { setInput(""); setOutput(""); setError(""); }} variant="ghost"><Trash2 className="mr-2 h-4 w-4" />Clear</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Input</h2>
            <span className="text-xs text-muted-foreground">{formatBytes(new Blob([input]).size)}</span>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"FirdavsVIP","version":"2.0","features":["JWT","JSON","Base64"]}'
            rows={20}
            className="text-xs"
          />
          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="font-mono">{error}</span>
            </div>
          )}
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Output</h2>
            {output && <span className="text-xs text-muted-foreground">{formatBytes(new Blob([output]).size)}</span>}
          </div>
          <pre className="min-h-[400px] overflow-auto rounded-lg bg-black/40 p-4 font-mono text-xs custom-scrollbar">
            {output || <span className="text-muted-foreground">Formatted output will appear here...</span>}
          </pre>
        </Card>
      </div>
    </div>
  );
}
