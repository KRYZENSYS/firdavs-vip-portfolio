import Link from "next/link";

export const metadata = { title: "Offline — FIRDAVS VIP" };

export default function Offline() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg text-white">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-x text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">// connection_lost</div>
        <h1 className="font-display text-6xl md:text-8xl font-black text-gradient neon-text">OFFLINE</h1>
        <p className="mt-4 text-white/70 max-w-md mx-auto">The network vanished into the shadows. The cached version is on the way — or try reconnecting.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-primary/40 bg-primary/5 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition">
          Reconnect
        </Link>
      </div>
    </main>
  );
}
