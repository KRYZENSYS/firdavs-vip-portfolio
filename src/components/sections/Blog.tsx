"use client";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import SectionTitle from "@/components/sections/SectionTitle";
import { POSTS } from "@/data/blog";
import { useI18n } from "@/lib/i18n";

const TAG_TINT: Record<string, string> = {
  release: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
  security: "text-purple-300 border-purple-400/30 bg-purple-500/10",
  ai: "text-sky-300 border-sky-400/30 bg-sky-500/10",
  ctf: "text-pink-300 border-pink-400/30 bg-pink-500/10",
  devops: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  project: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
};

export default function Blog() {
  const { t } = useI18n();
  return (
    <section id="blog" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// dev_notes.log" title={t("blogTitle")} subtitle={t("blogSub")} icon={<BookOpen size={12} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <motion.article key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
              <div className={`pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${p.cover} blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${TAG_TINT[p.tag] || TAG_TINT.release}`}>#{p.tag}</span>
                  <span className="font-mono text-[10px] text-white/40">{new Date(p.date).toLocaleDateString("en-GB")}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(p.date).getFullYear()}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {p.read}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    {t("readMore")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
