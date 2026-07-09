# FIRD​AVS VIP — Ultra Premium Cyber Portfolio

> Dark Future Vision · Born in the shadows · Living without limits

A cinematic, futuristic, ultra-premium personal portfolio in **Cyberpunk / Hacker** style — Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Three.js, GSAP, Lenis.

## ✨ Highlights

- Loading screen with progress
- Glassmorphism navbar
- Three.js / Matrix rain backgrounds
- Cursor glow + mouse trail
- RGB animated borders
- Smooth scroll (Lenis)
- Reveal-on-scroll animations (Framer Motion + Intersection Observer)
- Animated counters, neon progress bars
- Premium project cards with hover lift
- Fully responsive (mobile, tablet, desktop)
- SEO-ready metadata + JSON-LD
- Type-safe end-to-end

## 🧱 Stack

- **Next.js 15** (App Router)
- **TypeScript** strict
- **Tailwind CSS** 3 (custom theme)
- **Framer Motion** 11
- **Three.js** + **@react-three/fiber** + **drei**
- **GSAP** 3
- **Lenis** smooth scroll
- **Lucide React** icons
- **react-intersection-observer**

## 🚀 Run

```bash
pnpm install
pnpm dev
# build
pnpm build && pnpm start
```

## 🎨 Color tokens

| Token | Value |
|---|---|
| bg | `#050505` |
| primary | `#00F5FF` (cyan) |
| secondary | `#7B2EFF` (purple) |
| accent | `#4DA6FF` (blue) |
| text | `#FFFFFF` |
| muted | `#9CA3AF` |

## 📦 Project structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    effects/        # MatrixRain, ParticlesBg, CursorGlow, MouseTrail, GridBg, Scanline
    layout/         # Navbar, Footer, Loading
    sections/       # Hero, About, Skills, Projects, Stats, Contact
    ui/             # Button, Card, Badge, ProgressBar
  data/             # content (projects, skills)
  lib/              # motion presets, utils
  hooks/            # useLenis, useMouse, useScrollProgress
public/             # images, fonts
```

## License

MIT © FIRDAVS VIP
