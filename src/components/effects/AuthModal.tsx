"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, Crown, X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AuthModal() {
  const { user, signIn, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {user ? (
        <button onClick={signOut} className="fixed bottom-6 right-40 z-[105] hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-bg/80 backdrop-blur-xl overflow-hidden hover:border-rose-300/50" title={`Sign out · ${user.name}`}>
          {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : <LogOut size={14} className="text-rose-300" />}
        </button>
      ) : (
        <button onClick={() => setOpen(true)} className="fixed bottom-6 right-40 z-[105] hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/80 px-3 py-2 text-xs text-white/80 backdrop-blur-xl hover:border-primary/50 hover:text-primary transition">
          <LogIn size={13} /> Sign in
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-[min(420px,92vw)] rounded-2xl border border-primary/30 bg-bg/95 p-6 shadow-neon-cyan">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-primary">// auth.portal</div>
                  <h3 className="mt-1 text-xl font-bold text-white">Sign in to FIRDAVS VIP</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X size={16} /></button>
              </div>
              <p className="text-sm text-white/60 mb-5">Save favorites, track reading list, and unlock Pro features.</p>
              <div className="space-y-2">
                {[
                  { id: "google", label: "Continue with Google", color: "from-rose-500/20 to-amber-500/20 hover:border-rose-300/40" },
                  { id: "github", label: "Continue with GitHub", color: "from-zinc-500/20 to-slate-500/20 hover:border-white/30" },
                  { id: "telegram", label: "Continue with Telegram", color: "from-sky-500/20 to-cyan-500/20 hover:border-sky-300/40" },
                  { id: "guest", label: "Continue as Guest", color: "from-purple-500/20 to-pink-500/20 hover:border-purple-300/40" },
                ].map((p) => (
                  <button key={p.id} disabled={loading} onClick={() => signIn(p.id as any).then(() => setOpen(false))}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r ${p.color} px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-50`}>
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Crown size={14} className="text-primary" />}
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-center text-[10px] text-white/40">By signing in you agree to our terms. We do not share your data.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
