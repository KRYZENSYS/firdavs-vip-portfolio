import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import { POSTS } from "@/data/blog";
import ReactionBar from "@/components/ui/ReactionBar";
import SaveToListButton from "@/components/ui/SaveToListButton";
import FavoriteButton from "@/components/ui/FavoriteButton";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const FULL: Record<string, string] = {
  "v3-0-release-notes": "v3.0 is the most ambitious release of FIRDAVS VIP to date. We added an AI chat assistant that runs on OpenAI gpt-4o-mini with a local fallback so the experience never breaks. We built a full Premium tier with Stripe-ready checkout, a 15-min Booking page with calendar, and a Shop with six digital products. There is a Courses page, MDX-ready Blog with detail pages, Favorites, Reading List, Push Notifications, and 20+ other features. Every feature is built in the open on GitHub. The dark future is here.",
  "how-i-built-100-telegram-bots": "It started with a 30-line aiogram bot for my university group chat. Then I added a database, then a payment flow, then a media pipeline. By month six I had shipped 30 bots. By year one, 100. The trick is to treat every bot as a product: write a tight spec, set a delivery date, document it, version it, and never let perfect be the enemy of shipped. The biggest lesson: 80% of users only need 20% of features. Build the 20% perfectly.",
  "ai-content-pipeline-deep-dive": "My current pipeline is GPT for script, ElevenLabs for voice, Runway for B-roll, FFmpeg for assembly, and Telegram for distribution. The whole loop takes 12 minutes per clip. Costs around $0.30 per video at current token prices. The key insight: the script is 90% of the work. If your script is good, the rest is just formatting.",
  "ctf-writeup-sqli-2026": "The challenge was a classic login form with a WAF in front. After 20 minutes of failed attempts, I realized the WAF was looking for spaces and comments. The bypass was a single tab character between SELECT and FROM. Boom. The lesson: always test your assumptions about what the WAF actually blocks. Sometimes it's the obvious things.",
  "deploying-on-vercel-edge": "Vercel Edge runtime is criminally underrated. Cold starts under 5ms, runs at 280+ PoPs worldwide, and you can write Edge functions in plain TypeScript. For a personal portfolio it is overkill, but for an API-heavy product it can cut latency in half. The migration from Node took me 4 hours for 200 routes.",
  "the-roadmap-to-kryzen": "KRYZEN started as a Telegram channel for my CTF notes. Then a small blog. Then a single bot. Today it is a studio with six team members and 15+ products. The roadmap: launching a public AI security scanner, a SaaS bot platform, and an edtech course bundle. The goal is to keep the same hacker spirit while building a real business around it.",
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const content = FULL[slug] || post.excerpt;

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <Link href="/#blog" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition">
          <ArrowLeft size={12} /> back to blog
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">#{post.tag}</span>
          <span className="font-mono text-[10px] text-white/40 flex items-center gap-1"><Calendar size={11} /> {new Date(post.date).toLocaleDateString("en-GB")}</span>
          <span className="font-mono text-[10px] text-white/40 flex items-center gap-1"><Clock size={11} /> {post.read}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-black text-white leading-tight">{post.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
          <User size={13} className="text-primary" /> Firdavs · KRYZEN
        </div>
        <div className="mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-white/10">
          <div className={`h-full w-full bg-gradient-to-br ${post.cover}`}>
            <div className="h-full w-full grid-bg opacity-50" />
          </div>
        </div>
        <article className="prose prose-invert max-w-none mt-10 text-base leading-relaxed text-white/85">
          {content.split("\n\n").map((p, i) => <p key={i} className="mb-5">{p}</p>)}
        </article>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <ReactionBar id={post.slug} />
          <div className="flex items-center gap-2">
            <SaveToListButton id={post.slug} title={post.title} />
            <FavoriteButton id={post.slug} label="Favorite" />
          </div>
        </div>
      </div>
    </main>
  );
}
