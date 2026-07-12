"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cyber-darker px-4">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative z-10 max-w-lg text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30">
          <AlertTriangle className="h-10 w-10 text-white" />
        </div>
        <h1 className="mb-2 font-display text-3xl font-bold text-white">Something went wrong</h1>
        <p className="mb-2 text-muted-foreground">
          An unexpected error occurred. Don&apos;t worry, your data is safe.
        </p>
        {error.digest && (
          <p className="mb-6 font-mono text-xs text-muted-foreground/60">Error ID: {error.digest}</p>
        )}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} variant="gradient" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/"><Home className="mr-2 h-4 w-4" />Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
