import { Loader2, Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-darker">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyber-blue/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple shadow-lg shadow-cyber-blue/30">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-cyber-blue" />
          <span className="font-mono text-sm">Loading FirdavsVIP...</span>
        </div>
      </div>
    </div>
  );
}
