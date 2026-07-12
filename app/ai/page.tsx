"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { aiAssistant } from "@/lib/ai/groq";
import { cn, formatNumber } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SUGGESTIONS = [
  "Explain HTTP request smuggling and how to test for it",
  "How do I securely store JWT tokens in the browser?",
  "What is the difference between symmetric and asymmetric encryption?",
  "Show me how to test for SQL injection",
  "Explain CORS and how to bypass it for testing",
  "How do I analyze a suspicious authorization header?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm **FirdavsAI**, your security testing assistant powered by GroqCloud. I can help you with security testing, vulnerability analysis, encoding/decoding, and best practices. What would you like to know?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const message = (text || input).trim();
    if (!message || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: message, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const reply = await aiAssistant(message);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, timestamp: Date.now() }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ **Error**: ${e.message}\n\nMake sure NEXT_PUBLIC_GROQ_API_KEY is set in your environment.`, timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setMessages([{ role: "assistant", content: "Chat cleared. How can I help?", timestamp: Date.now() }]);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">FirdavsAI</h1>
              <p className="text-sm text-muted-foreground">Your AI security assistant</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="cyber"><Sparkles className="mr-1 h-3 w-3" />Powered by GroqCloud</Badge>
          <Button onClick={clear} variant="ghost" size="sm"><Trash2 className="mr-1.5 h-3 w-3" />Clear</Button>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden p-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={cn("max-w-[80%] rounded-2xl px-4 py-3", m.role === "user" ? "bg-gradient-to-br from-cyber-blue to-cyber-purple text-white" : "bg-white/5 border border-cyber-border/30")}>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{m.content}</pre>
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl border border-cyber-border/30 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {messages.length <= 1 && (
          <div className="border-t border-cyber-border/30 p-4">
            <p className="mb-2 text-xs text-muted-foreground">Try asking:</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)} className="rounded-lg border border-cyber-border/30 bg-white/5 p-2 text-left text-xs transition-all hover:border-cyber-blue/50 hover:bg-cyber-blue/5">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-cyber-border/30 p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask anything about security testing..."
              rows={2}
              className="min-h-[60px] resize-none"
            />
            <Button onClick={() => send()} disabled={!input.trim() || loading} size="icon" variant="gradient" className="h-[60px] w-[60px]">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Press Enter to send, Shift+Enter for new line. AI can make mistakes — always verify.</p>
        </div>
      </Card>
    </div>
  );
}
