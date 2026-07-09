import { Heart } from "lucide-react";
import { SITE } from "@/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 mt-12">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-primary animate-pulse" />
          <span>by <span className="text-gradient font-semibold">Firdavs</span></span>
        </div>
        <div className="font-display text-xs uppercase tracking-[0.5em] text-white/40">{SITE.tagline}</div>
        <div className="text-xs text-white/40">© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</div>
      </div>
    </footer>
  );
}
