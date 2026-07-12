export const SITE_CONFIG = {
  name: "FirdavsVIP",
  tagline: "Professional Web Security Testing Platform",
  description: "Enterprise-grade AI-powered cybersecurity SaaS platform with 25+ security tools, AI assistant, real-time collaboration, and beautiful cyberpunk UI.",
  url: "https://firdavsvip.vercel.app",
  ogImage: "/og.png",
  author: "FirdavsVIP Team",
  keywords: [
    "cybersecurity", "security testing", "penetration testing",
    "API testing", "JWT decoder", "hash generator", "FirdavsVIP",
    "cyber security", "enterprise security", "AI security",
  ],
  links: {
    github: "https://github.com/KRYZENSYS/firdavs-vip-portfolio",
    twitter: "https://twitter.com/firdavsvip",
    discord: "https://discord.gg/firdavsvip",
    telegram: "https://t.me/firdavsvip",
  },
};

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Tools", href: "#tools" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export const STATS = [
  { label: "Security Tools", value: 25, suffix: "+" },
  { label: "Active Users", value: 50, suffix: "K+" },
  { label: "Requests Tested", value: 10, suffix: "M+" },
  { label: "Uptime", value: 99.9, suffix: "%" },
];

export const FEATURES = [
  {
    icon: "Shield",
    title: "Enterprise Security",
    description: "Bank-grade encryption and security testing tools used by Fortune 500 companies.",
    color: "blue",
  },
  {
    icon: "Zap",
    title: "AI-Powered Analysis",
    description: "GroqCloud-powered AI assistant explains requests, responses, and provides insights in real-time.",
    color: "purple",
  },
  {
    icon: "Layers",
    title: "25+ Professional Tools",
    description: "HTTP analyzer, JWT decoder, hash generator, JSON formatter, and many more dev tools.",
    color: "cyan",
  },
  {
    icon: "Users",
    title: "Team Collaboration",
    description: "Real-time workspaces, role-based access control, and team collaboration features.",
    color: "blue",
  },
  {
    icon: "Globe",
    title: "Cloud Sync",
    description: "Sync your projects, settings, and reports across all devices with end-to-end encryption.",
    color: "purple",
  },
  {
    icon: "Code2",
    title: "API & WebSocket Testing",
    description: "Test REST, GraphQL, gRPC, and WebSocket APIs with full request/response inspection.",
    color: "cyan",
  },
  {
    icon: "BarChart3",
    title: "Advanced Analytics",
    description: "Beautiful charts, activity heatmaps, response time graphs, and custom dashboards.",
    color: "blue",
  },
  {
    icon: "Lock",
    title: "2FA & Passkeys",
    description: "Two-factor authentication, passkeys, OAuth, and device management for maximum security.",
    color: "purple",
  },
];

export const TOOLS = [
  { id: "http-analyzer", name: "HTTP Analyzer", category: "Network", icon: "Globe", color: "blue", popular: true },
  { id: "jwt-decoder", name: "JWT Decoder", category: "Auth", icon: "Key", color: "purple", popular: true },
  { id: "json-formatter", name: "JSON Formatter", category: "Format", icon: "Braces", color: "cyan", popular: true },
  { id: "base64", name: "Base64 Encoder", category: "Encode", icon: "Binary", color: "blue" },
  { id: "hash-generator", name: "Hash Generator", category: "Crypto", icon: "Hash", color: "purple", popular: true },
  { id: "url-encoder", name: "URL Encoder", category: "Encode", icon: "Link", color: "cyan" },
  { id: "regex-tester", name: "Regex Tester", category: "Text", icon: "Regex", color: "blue" },
  { id: "uuid-generator", name: "UUID Generator", category: "Generator", icon: "Fingerprint", color: "purple" },
  { id: "password-gen", name: "Password Generator", category: "Generator", icon: "Lock", color: "cyan", popular: true },
  { id: "timestamp", name: "Timestamp Converter", category: "Time", icon: "Clock", color: "blue" },
  { id: "color-picker", name: "Color Picker", category: "Design", icon: "Palette", color: "purple" },
  { id: "diff-viewer", name: "Diff Viewer", category: "Compare", icon: "GitCompare", color: "cyan" },
];

export const PRICING_TIERS = [
  {
    name: "Free",
    price: 0,
    description: "For individuals getting started",
    features: [
      "5 security tools",
      "100 requests/month",
      "Community support",
      "Basic analytics",
      "1 project",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For professionals and small teams",
    features: [
      "All 25+ tools",
      "Unlimited requests",
      "AI assistant (GroqCloud)",
      "Priority support",
      "10 projects",
      "Real-time collaboration",
      "Advanced reports",
      "Custom themes",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited projects",
      "Team workspaces",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "On-premise option",
      "Audit logs",
      "RBAC",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "Security Engineer @ Meta",
    avatar: "AC",
    content: "FirdavsVIP replaced 4 separate tools in my workflow. The AI assistant alone saved me 10+ hours per week.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Full-stack Developer @ Vercel",
    avatar: "SJ",
    content: "The most beautiful security platform I've ever used. The cyberpunk design is incredible and the tools are blazing fast.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "CTO @ CyberSec Inc",
    avatar: "MW",
    content: "Enterprise-grade security testing with consumer-grade UX. The team collaboration features are game-changing.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Bug Bounty Hunter",
    avatar: "ED",
    content: "I use FirdavsVIP daily for my bounty work. The HTTP analyzer and JWT decoder are my most-used tools. Highly recommend!",
    rating: 5,
  },
];

export const FAQ = [
  {
    q: "What is FirdavsVIP?",
    a: "FirdavsVIP is an enterprise-grade AI-powered cybersecurity SaaS platform offering 25+ professional security tools, real-time collaboration, and beautiful cyberpunk UI.",
  },
  {
    q: "Is FirdavsVIP free to use?",
    a: "Yes! We offer a generous free tier with 5 tools and 100 requests per month. Our Pro and Enterprise tiers unlock all features.",
  },
  {
    q: "How does the AI assistant work?",
    a: "Our AI assistant is powered by GroqCloud's lightning-fast LLMs. It can explain HTTP requests/responses, summarize traffic, generate reports, and provide security insights.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use bank-grade encryption (AES-256), support 2FA and passkeys, and never store your requests. All processing happens client-side when possible.",
  },
  {
    q: "Can I use FirdavsVIP for my team?",
    a: "Yes! Our Pro and Enterprise plans include team workspaces, real-time collaboration, role-based access control, and audit logs.",
  },
  {
    q: "Do you have an API?",
    a: "Yes, we have a comprehensive REST API. Enterprise customers can also deploy on-premise.",
  },
  {
    q: "What languages are supported?",
    a: "FirdavsVIP supports 10+ languages including English, Spanish, French, German, Russian, Chinese, Japanese, Korean, Arabic, and Uzbek.",
  },
  {
    q: "Can I self-host FirdavsVIP?",
    a: "Enterprise customers can deploy FirdavsVIP on-premise or in their private cloud. Contact sales for details.",
  },
];
