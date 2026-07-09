# 🌌 FIRDAVS VIP — Ultra Premium Cyberpunk Portfolio

A futuristic, cinematic personal portfolio with a dark hacker / cyberpunk aesthetic. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Three.js**, and **GSAP**.

> "Born in the shadows, living without limits, dark future vision."

## ✨ Features

- **Loading screen** with animated progress bar
- **Glassmorphism navbar** with sticky blur
- **Hero** with profile glow frame, gradient text, typing animation
- **Animated grid + matrix rain** backgrounds
- **About, Skills (neon progress bars), Projects (6 premium cards), Stats (animated counters), Contact (glass cards)**
- **Three.js scene** + particle system
- **Mouse glow** + cursor trail
- **Smooth scroll** via Lenis
- **Scroll-reveal** animations (Framer Motion + IntersectionObserver)
- **Fully responsive** (mobile / tablet / desktop)
- **SEO optimized** with metadata + OpenGraph
- **Production-ready clean code** (TypeScript, no any)

## 🧱 Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion, GSAP |
| 3D | Three.js + @react-three/fiber + drei |
| Scroll | Lenis |
| Icons | Lucide React |
| Particles | tsparticles |

## 🚀 Run locally

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

## 🏗 Build

```bash
pnpm build
pnpm start
```

## 📦 Deploy

One-click deploy to **Vercel**:

```bash
vercel
```

## 🗂 Structure

```
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Stats.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── backgrounds/
│   │   ├── MatrixRain.tsx
│   │   ├── GridBackground.tsx
│   │   ├── ParticleField.tsx
│   │   └── ThreeScene.tsx
│   ├── effects/
│   │   ├── CursorGlow.tsx
│   │   ├── MouseTrail.tsx
│   │   └── SmoothScroll.tsx
│   └── ui/
│       ├── NeonButton.tsx
│       ├── GlassCard.tsx
│       └── SectionTitle.tsx
├── lib/
│   ├── data.ts
│   └── utils.ts
├── public/
│   ├── avatar.svg
│   └── og.png
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## License

MIT © FIRDAVS VIP
