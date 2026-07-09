export type Post = { slug: string; title: string; excerpt: string; date: string; tag: string; read: string; cover: string };

export const POSTS: Post[] = [
  { slug: "firdavs-vip-launch", title: "FIRDAVS VIP v1.0 — Dark Future Vision launched", excerpt: "A complete rebuild: Next.js 15, Three.js, GSAP, Framer Motion, i18n, PWA, voice greeting and a hidden Konami code layer.", date: "2026-07-09", tag: "release", read: "4 min", cover: "from-cyan-500/30 to-blue-500/10" },
  { slug: "secure-telegram-bots", title: "How I secure my Telegram bots in production", excerpt: "Aiogram 3, RBAC, rate limiting, content scanning, secret rotation, audit logs. A field-tested checklist.", date: "2026-06-22", tag: "security", read: "6 min", cover: "from-purple-500/30 to-pink-500/10" },
  { slug: "ai-content-pipeline", title: "Building an AI content pipeline that runs itself", excerpt: "From idea to published video — 100% automated. Python workers, FastAPI, FFmpeg, OpenAI, ElevenLabs.", date: "2026-06-10", tag: "ai", read: "8 min", cover: "from-sky-500/30 to-emerald-500/10" },
  { slug: "cyber-notes-001", title: "Cyber notes #001: my first CTF writeup", excerpt: "Recon → foothold → privesc. The exact steps, the tools, the mistakes. Pure hacker mindset.", date: "2026-05-28", tag: "ctf", read: "5 min", cover: "from-pink-500/30 to-rose-500/10" },
  { slug: "fastapi-on-replit", title: "FastAPI on Replit: the free-tier survival guide", excerpt: "Sleep, polling, SQLite, single-process tricks. How I keep my bots alive 24/7 without paying for hosts.", date: "2026-05-12", tag: "devops", read: "7 min", cover: "from-emerald-500/30 to-cyan-500/10" },
  { slug: "kryzen-bookfinder", title: "KRYZEN BookFinder — design notes", excerpt: "Why I built a free library with cyberpunk UI, failover APIs, voice search and zero tracking.", date: "2026-04-30", tag: "project", read: "5 min", cover: "from-cyan-500/30 to-purple-500/10" },
];
