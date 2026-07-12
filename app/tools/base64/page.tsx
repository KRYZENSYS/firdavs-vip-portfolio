"use client";

import { useState } from "react";
import { Binary, Copy, ArrowRight, FileText, Image as ImageIcon, Lock, Unlock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { copyToClipboard, formatBytes } from "@/lib/utils";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const process = () => {
    setError("");
    setFilePreview(null);
    if (!input.trim()) {
      toast.error("Please enter content");
      return;
    }
    try {
      if (mode === "encode") {
        // Use TextEncoder for proper UTF-8 handling
        const bytes = new TextEncoder().encode(input);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const result = btoa(binary);
        setOutput(result);
        toast.success("Encoded to Base64");
      } else {
        // Decode with UTF-8 handling
        const binary = atob(input.replace(/\s/g, ""));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const result = new TextDecoder().decode(bytes);
        setOutput(result);
        toast.success("Decoded from Base64");
      }
    } catch (e: any) {
      setError(e.message || "Operation failed");
      toast.error(mode === "encode" ? "Encoding failed" : "Invalid Base64 string");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setInput(base64);
      setMode("decode");
      if (file.type.startsWith("image/")) {
        setFilePreview(dataUrl);
      } else {
        setFilePreview(null);
      }
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-blue/10 text-cyber-blue">
          <Binary className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Base64 Encoder / Decoder</h1>
          <p className="text-sm text-muted-foreground">Encode and decode Base64 strings with full UTF-8 support</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setMode("encode")} variant={mode === "encode" ? "gradient" : "outline"}>
          <Lock className="mr-2 h-4 w-4" />Encode
        </Button>
        <Button onClick={() => setMode("decode")} variant={mode === "decode" ? "gradient" : "outline"}>
          <Unlock className="mr-2 h-4 w-4" />Decode
        </Button>
        <Button onClick={swap} variant="ghost" disabled={!output}>
          <ArrowRight className="mr-2 h-4 w-4" />Swap
        </Button>
        <div className="flex-1" />
        <label className="cursor-pointer">
          <input type="file" onChange={handleFile} className="hidden" />
          <span className="inline-flex h-10 items-center rounded-lg border border-cyber-border/50 bg-white/5 px-4 text-sm transition-colors hover:bg-white/10">
            <FileText className="mr-2 h-4 w-4" />Load file
          </span>
        </label>
        <Button onClick={() => copyToClipboard(output)} variant="outline" disabled={!output}>
          <Copy className="mr-2 h-4 w-4" />Copy
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">{mode === "encode" ? "Text" : "Base64"}</h2>
            <span className="text-xs text-muted-foreground">{formatBytes(new Blob([input]).size)}</span>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Type or paste text to encode..." : "Paste Base64 string to decode..."}
            rows={15}
            className="text-xs"
          />
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">{mode === "encode" ? "Base64" : "Text"}</h2>
            {output && <span className="text-xs text-muted-foreground">{formatBytes(new Blob([output]).size)}</span>}
          </div>
          <pre className="min-h-[300px] overflow-auto rounded-lg bg-black/40 p-4 font-mono text-xs break-all custom-scrollbar">
            {output || <span className="text-muted-foreground">Output will appear here...</span>}
          </pre>
          {error && <div className="mt-3 text-xs text-red-400 font-mono">{error}</div>}
          {filePreview && (
            <div className="mt-3">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <ImageIcon className="h-3 w-3" />Image preview
              </div>
              <img src={filePreview} alt="preview" className="max-h-48 rounded-lg border border-cyber-border/30" />
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={process} size="lg" variant="gradient">
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
      </div>
    </div>
  );
}
