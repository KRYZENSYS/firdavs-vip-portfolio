import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cyber-darker px-4">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-blue/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyber-purple/10 blur-3xl" />
      <div className="relative z-10 max-w-lg text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-lg shadow-cyber-blue/30">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="mb-2 font-display text-7xl font-bold">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="mb-3 font-display text-2xl font-semibold text-white">Page not found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved. Even the best security tools can&apos;t find everything.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="lg">
            <Link href="/"><Home className="mr-2 h-4 w-4" />Back home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tools"><Search className="mr-2 h-4 w-4" />Browse tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
