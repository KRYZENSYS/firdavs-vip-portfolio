"use client";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, Github, MapPin, Sparkles, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import Button from "@/components/ui/Button";
import { SITE } from "@/data";

const CHANNELS = [
  { icon: MessageCircle, label: "Telegram", value: "@FirdavsVIP", href: SITE.socials.telegram, tint: "from-cyan-500/30 to-blue-500/10", border: "hover:border-cyan-400/50" },
  { icon: Github, label: "GitHub", value: "FirdavsVIP", href: SITE.socials.github, tint: "from-purple-500/30 to-pink-500/10", border: "hover:border-purple-400/50" },
  { icon: Mail, label: "Email", value: SITE.email, href: SITE.socials.email, tint: "from-pink-500/30 to-rose-500/10", border: "hover:border-pink-400/50" },
  { icon: MapPin, label: "Location", value: SITE.country, href: "#", tint: "from-emerald-500/30 to-cyan-500/10", border: "hover:border-emerald-400/50" },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// contact.terminal" title="LET'S TALK" subtitle="Got an idea, project, or just want to say hi? My inbox is open." icon={<Sparkles size={12} />} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4">
            {CHANNELS.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${c.border}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.tint} ring-1 ring-white/10 group-hover:scale-110 transition`}>
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{c.label}</div>
                  <div className="text-base font-semibold text-white truncate">{c.value}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition" />
              </a>
            ))}
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-xl"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! Your message has been transmitted to the dark laboratory. ⚡"); (e.target as HTMLFormElement).reset(); }}>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">// send_message.sh</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
            </div>
            <div className="mt-4">
              <Field label="Subject" name="subject" placeholder="Project, idea, collab..." required />
            </div>
            <div className="mt-4">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Message</label>
              <textarea name="message" required rows={6} placeholder="Tell me everything..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition resize-none" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-white/40">By sending, you accept transmission to the darknet.</p>
              <Button type="submit" icon={<Send size={16} />}>Transmit</Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition" />
    </div>
  );
}
