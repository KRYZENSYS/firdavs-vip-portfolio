import Link from "next/link";

export const metadata = { title: "404 — FIRDAVS VIP" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg text-white">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(0,245,255,0.18) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.4 }} />
      <div className="container-x text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3 animate-pulse">// error.route_not_found</div>
        <h1 className="font-display text-7xl md:text-9xl font-black text-gradient neon-text">404</h1>
        <p className="mt-4 text-white/70 max-w-md mx-auto">The path you took doesn't exist in this universe. Maybe the shadows swallowed it.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-bold text-bg hover:shadow-neon-cyan transition">Return to base</Link>
          <Link href="#contact" className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white hover:border-primary/50 hover:text-primary transition">Report bug</Link>
        </div>
        <div className="mt-10 font-mono text-[10px] uppercase tracking-widest text-white/30">trace_id: fvip_404_{Math.random().toString(36).slice(2, 8)}</div>
      </div>
    </main>
  );
}
