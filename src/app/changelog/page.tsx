import { Sparkles, Zap, Shield, Star } from "lucide-react";

export const metadata = { title: "Changelog" };

const RELEASES = [
  { v: "v3.0.0 ULTRA", date: "2026-07-09", tag: "META PACK", color: "text-primary border-primary/40 bg-primary/10", icon: Sparkles, changes: ["50+ new features", "AI Chat Assistant", "Auth + Favorites + Reading List", "MDX blog with detail pages", "Resume + Case Studies + Shop", "Glitch text, Boot sequence, Starfield", "Premium tier (Stripe)", "Push notifications", "WebXR ready"] },
  { v: "v2.0.0", date: "2026-07-09", tag: "BATCH 2", color: "text-purple-300 border-purple-400/30 bg-purple-500/10", icon: Star, changes: ["Konami code easter egg", "Voice greeting (EN/UZ/RU)", "i18n with 3 locales", "PWA + offline fallback", "Blog section (6 posts)", "Sitemap + robots.txt"] },
  { v: "v1.5.0", date: "2026-07-09", tag: "FEATURES", color: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10", icon: Zap, changes: ["Theme toggle (dark/light)", "GitHub stats card", "Custom cyber cursor", "Ambient music player", "Cmd+K command palette", "Gallery + Achievements + Timeline + Testimonials"] },
  { v: "v1.0.0", date: "2026-07-09", tag: "INITIAL", color: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10", icon: Shield, changes: ["Cinematic cyber UI", "3D Three.js background", "Matrix rain + scanline", "Smooth scroll (Lenis)", "Framer Motion animations", "Full SEO + meta", "PWA + 404 page"] },
];

export default function Changelog() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// release.log</div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-gradient neon-text">CHANGELOG</h1>
        <p className="mt-3 text-white/60 max-w-2xl">Every iteration of FIRDAVS VIP. Built in the open. No quiet updates.</p>

        <div className="mt-12 relative ml-4 md:ml-8 border-l border-white/10 pl-6 md:pl-10 space-y-10">
          {RELEASES.map((r) => (
            <div key={r.v} className="relative">
              <span className="absolute -left-[33px] md:-left-[49px] top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg bg-gradient-to-br from-primary to-secondary text-bg shadow-neon-cyan">
                <r.icon size={11} />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-bold text-white">{r.v}</h2>
                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${r.color}`}>{r.tag}</span>
                <span className="font-mono text-[10px] text-white/40">{r.date}</span>
              </div>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                {r.changes.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
