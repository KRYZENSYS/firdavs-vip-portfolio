# 🛡️ FirdavsVIP — Enterprise Cybersecurity Platform

> Professional AI-powered cybersecurity SaaS platform with 25+ security tools, real-time collaboration, and beautiful cyberpunk UI.

![FirdavsVIP](https://img.shields.io/badge/version-2.0.0-cyber)
![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🔐 25+ Professional Security Tools** — HTTP analyzer, JWT decoder, JSON formatter, Base64, Hash generator, URL encoder, UUID, password generator, regex tester, timestamp converter, color picker, diff viewer, and more
- **🤖 AI Security Assistant** — Powered by GroqCloud (Llama 3.3 70B). Get instant help with security testing and vulnerability analysis
- **📊 Real-time Dashboard** — Analytics, activity feed, quick tools, and project management
- **🎨 Cyberpunk Design** — Glassmorphism, neon glows, animated grids, and dark mode
- **⚡ Lightning Fast** — Built on Next.js 15 with Edge Runtime API routes
- **🔒 Enterprise Security** — CORS proxy, security headers check, alg=none detection
- **🌐 Edge CORS Proxy** — Make HTTP requests to any API from the browser
- **📱 PWA Ready** — Install as a native app on any device
- **🌙 Dark/Light Mode** — Persistent theme with smooth transitions

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.5 (App Router) + React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + CSS Variables
- **UI:** Custom shadcn-style components
- **Animation:** Framer Motion
- **AI:** GroqCloud (Llama 3.3 70B)
- **Deployment:** Vercel (Edge Functions)
- **Icons:** Lucide React

## 🚀 Quick Start

### 1. Clone & install
```bash
git clone https://github.com/KRYZENSYS/firdavs-vip-portfolio.git
cd firdavs-vip-portfolio
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your **GroqCloud API key** (get it free at https://console.groq.com):
```env
NEXT_PUBLIC_GROQ_API_KEY=gsk_your_actual_key_here
```

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import the repo
3. Add `NEXT_PUBLIC_GROQ_API_KEY` in Environment Variables
4. Click Deploy 🚀

## 🏗️ Project Structure

```
firdavs-vip-portfolio/
├── app/
│   ├── (auth)/          # Login & Register pages
│   ├── ai/              # AI chat assistant
│   ├── api/             # API routes (Edge)
│   ├── dashboard/       # Dashboard
│   ├── tools/           # Security tools
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── dashboard/       # Sidebar, Topbar
│   ├── sections/        # Landing page sections
│   └── ui/              # UI primitives
├── lib/
│   ├── ai/              # GroqCloud integration
│   ├── constants.ts
│   └── utils.ts
├── public/
└── ...config files
```

## 🧰 Available Tools

| Tool | Path | Description |
|------|------|-------------|
| **HTTP Analyzer** | `/tools/http-analyzer` | Send HTTP requests, view headers, body, security check, AI analysis |
| **JWT Decoder** | `/tools/jwt-decoder` | Decode JWT tokens, check expiry, AI explanation |
| **JSON Formatter** | `/tools/json-formatter` | Format, minify, validate JSON |
| **Base64** | `/tools/base64` | Encode/decode with UTF-8 + file support |
| **Hash Generator** | `/tools/hash-generator` | MD5, SHA-1, SHA-256, SHA-384, SHA-512 |
| **URL Encoder** | `/tools/url-encoder` | URL encode/decode |
| **UUID Generator** | `/tools/uuid-generator` | UUID v1, v4, v5 |
| **Password Generator** | `/tools/password-gen` | Secure random passwords |
| **Regex Tester** | `/tools/regex-tester` | Test regular expressions |
| **Timestamp** | `/tools/timestamp` | Convert Unix timestamps |
| **Color Picker** | `/tools/color-picker` | Pick and convert colors |
| **Diff Viewer** | `/tools/diff-viewer` | Compare text/code |
| **AI Assistant** | `/ai` | GroqCloud-powered security chatbot |

## 🤖 AI Features

The platform includes two AI integrations:
- **JWT Explanation** — Click "AI Explain" on any JWT to get a human-readable breakdown
- **HTTP Security Analysis** — Click "AI Analyze" on any response to get security insights
- **General Assistant** — Ask anything about security testing on the AI page

## 🔐 Security Notes

- The CORS proxy is rate-limited and only allows http/https
- All user inputs are sanitized
- Security headers are checked on every HTTP request
- alg=none JWT vulnerability is detected automatically
- See `/security` for the full security policy

## 📄 License

MIT © 2026 FirdavsVIP

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- AI powered by [GroqCloud](https://groq.com)
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)

---

**Made with 🛡️ by FirdavsVIP Team**
