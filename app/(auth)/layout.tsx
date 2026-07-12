import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-blue/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyber-purple/20 blur-3xl" />

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-lg shadow-cyber-blue/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-2xl font-bold"><span className="text-white">Firdavs</span><span className="gradient-text">VIP</span></div>
            <div className="font-mono text-xs text-muted-foreground">enterprise.security</div>
          </div>
        </Link>
        <div className="w-full max-w-md">{children}</div>
        <p className="mt-8 text-center text-xs text-muted-foreground">© 2026 FirdavsVIP. Built for security professionals.</p>
      </div>
    </div>
  );
}
