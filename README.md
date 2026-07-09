# FIRDAVS VIP — Dark Future Vision

> Ultra-premium cyberpunk portfolio of **Firdavs** — Cyber Security student, Python & Telegram Bot developer, AI enthusiast from **Uzbekistan**.

![cyberpunk](https://img.shields.io/badge/cyber-000?style=flat-square)
![next](https://img.shields.io/badge/Next.js-15-000?style=flat-square&logo=next.js)
![ts](https://img.shields.io/badge/TypeScript-5-000?style=flat-square&logo=typescript)
![pwa](https://img.shields.io/badge/PWA-ready-000?style=flat-square)

## ✨ Features

- 🎨 Cinematic dark UI — neon cyan / purple / blue, animated gradient blobs, glassmorphism
- 🌌 3D background — wireframe icosahedron + 3 rings + 700 particles (Three.js)
- 🌧️ Matrix rain + scanline + cursor glow + mouse trail + grid overlay
- 🎬 Smooth scroll (Lenis) + Framer Motion animations everywhere
- 🌍 **i18n** — English / O'zbek / Русский (auto-detect + manual switcher)
- 🗣️ **Voice greeting** — Web Speech API welcome line on first visit
- 🔐 **Konami code easter egg** — unlock the dark layer (`↑↑↓↓←→←→BA`)
- 📰 **Blog** section with 6 cyber-themed posts
- 📱 **PWA** — installable, offline fallback, custom manifest
- 📊 Count-up stats, animated progress bars, skill matrix
- ✉️ Contact form with channel cards (Telegram, GitHub, Email, Location)
- ⚡ SEO — full metadata, OpenGraph, Twitter, sitemap, robots.txt
- ♿ A11y — reduced motion, aria-hidden decorations, focus rings

## 🛠️ Stack

- **Next.js 15** App Router + TypeScript 5
- **Tailwind CSS 3** (custom theme + dark cyber palette)
- **Framer Motion 11** — animation primitives
- **Three.js + @react-three/fiber** — WebGL background
- **Lenis** — smooth scroll
- **Lucide React** — icons
- **Web Speech API** — voice greeting
- **Service Worker** — PWA offline

## 🚀 Run

```bash
git clone https://github.com/KRYZENSYS/firdavs-vip-portfolio
cd firdavs-vip-portfolio
pnpm install   # or npm install
pnpm dev
# open http://localhost:3000
```

## 📁 Structure

```
src/
├─ app/
│  ├─ layout.tsx         # I18nProvider + SW + Konami + Voice
│  ├─ page.tsx           # all sections wired
│  ├─ offline/page.tsx   # PWA offline fallback
│  ├─ sitemap.ts         # SEO sitemap
│  └─ globals.css        # cyber theme + utilities
├─ components/
│  ├─ effects/           # SmoothScroll, CursorGlow, ThreeScene,
│  │                     # MatrixRain, ParticleField, Scanline,
│  │                     # MouseTrail, GridBackground, KonamiCode,
│  │                     # VoiceGreeting, ServiceWorkerInit
│  ├─ layout/            # LoadingScreen, Navbar, Footer, LangSwitcher
│  ├─ sections/          # Hero, About, Skills, Projects, Stats, Blog, Contact
│  └─ ui/                # Button, GlassCard, ProgressBar, CountUp, SectionTitle
├─ lib/
│  ├─ utils.ts
│  ├─ motion.ts
│  └─ i18n.tsx           # 3-locale dictionary + provider
└─ data/
   ├─ index.ts           # SITE, NAV, SKILLS, PROJECTS, STATS
   └─ blog.ts            # POSTS
```

## 🌐 Deployment

Click **Deploy** to Vercel:
[vercel.com/new](https://vercel.com/new) → import `KRYZENSYS/firdavs-vip-portfolio`.

Custom domain (`firdavsvip.uz`) → Vercel Dashboard → Settings → Domains.

## 👤 Author

**Firdavs** — [@FirdavsVIP](https://t.me/FirdavsVIP) · Uzbekistan · 19 y.o · Cyber Security student.

> _Born in the shadows. Living without limits. Dark future vision._
