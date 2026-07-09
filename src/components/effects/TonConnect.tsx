"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, Check, Copy, ExternalLink } from "lucide-react";

export default function TonConnect() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fakeAddress = "UQBx4FIRDAVSx4FIRDAVSx4FIRDAVSx4FIRDAVSx4FI";

  const connect = () => {
    const addr = fakeAddress.slice(0, 6) + "..." + fakeAddress.slice(-4);
    setAddress(addr);
    setConnected(true);
    setOpen(false);
  };

  const copy = () => {
    try { navigator.clipboard.writeText(fakeAddress); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={`fixed bottom-6 right-72 z-[105] hidden md:flex h-11 items-center gap-2 rounded-full border px-3 text-xs backdrop-blur-xl transition ${connected ? "border-sky-300/50 bg-sky-300/10 text-sky-200" : "border-white/10 bg-bg/80 text-white/70 hover:border-sky-300/40"}`} title="TON Wallet">
        <Wallet size={13} />
        {connected ? address : "Connect TON"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[240] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="w-[min(420px,92vw)] rounded-2xl border border-sky-300/30 bg-bg/95 p-6 shadow-neon-cyan">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-sky-300">// ton.wallet</div>
                  <h3 className="mt-1 text-xl font-bold text-white">Connect TON Wallet</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X size={16} /></button>
              </div>
              <p className="text-sm text-white/60 mb-4">Connect your TON wallet to receive NFT profile pic and shop discounts.</p>
              <div className="space-y-2">
                {["Tonkeeper", "OpenMask", "MyTonWallet"].map((w) => (
                  <button key={w} onClick={connect} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white hover:border-sky-300/50 transition">
                    <span>{w}</span>
                    <ExternalLink size={14} className="text-sky-300" />
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-sky-300/20 bg-sky-300/5 p-3 text-[10px] text-sky-200">
                <p className="font-semibold uppercase tracking-widest">// testnet only</p>
                <p className="mt-1 text-white/60">Demo connection. Real wallet integration requires a TON Connect manifest at <code className="text-sky-300">/tonconnect-manifest.json</code>.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {connected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-20 right-72 z-[90] hidden md:flex items-center gap-2 rounded-full border border-sky-300/30 bg-bg/90 px-3 py-1.5 text-[10px] text-sky-200 backdrop-blur-xl">
          <Check size={11} /> {address}
          <button onClick={copy} className="ml-1 text-white/50 hover:text-white">{copied ? <Check size={10} /> : <Copy size={10} />}</button>
        </motion.div>
      )}
    </>
  );
}
