export const SITE = {
  name: "FIRDAVS", fullName: "FIRDAVS VIP", tagline: "Dark Future Vision", age: 19,
  username: "@FirdavsVIP", country: "Uzbekistan", role: "Cyber Security Student",
  focus: ["Cyber Security", "Python", "Artificial Intelligence", "Automation", "Telegram Bots"],
  typingTitles: ["Cyber Security Student", "Python Developer", "Telegram Bot Developer", "AI Enthusiast", "Future Builder"],
  subtitles: ["Born In The Shadows", "Living Without Limits", "Dark Future Vision"],
  email: "hello@firdavsvip.uz",
  socials: { telegram: "https://t.me/FirdavsVIP", github: "https://github.com/FirdavsVIP", instagram: "https://instagram.com/firdavsvip", email: "mailto:hello@firdavsvip.uz" },
};

export const SKILLS: { name: string; level: number }[] = [
  { name: "Python", level: 95 }, { name: "Telegram Bots", level: 100 }, { name: "Cyber Security", level: 80 },
  { name: "Linux", level: 85 }, { name: "Artificial Intelligence", level: 90 }, { name: "Web Development", level: 80 },
];

export type Project = { id: number; title: string; description: string; tag: string; icon: string; glow: "cyan" | "purple" | "blue" | "pink"; };
export const PROJECTS: Project[] = [
  { id: 1, title: "Telegram Bots", description: "Advanced automation and management bots for business and communities.", tag: "aiogram · automation", icon: "Bot", glow: "cyan" },
  { id: 2, title: "CyberUz Academy", description: "Cybersecurity education platform with courses, labs and CTF.", tag: "education · edtech", icon: "Shield", glow: "purple" },
  { id: 3, title: "SaveBot", description: "Instagram, TikTok and YouTube universal downloader bot.", tag: "downloader · media", icon: "Download", glow: "blue" },
  { id: 4, title: "AI Video Creator", description: "AI-generated viral content pipeline with auto-edit and posting.", tag: "ai · genmedia", icon: "Sparkles", glow: "pink" },
  { id: 5, title: "IPTV Platform", description: "Modern streaming platform with adaptive bitrate and EPG.", tag: "streaming · cloud", icon: "Tv", glow: "cyan" },
  { id: 6, title: "Game Projects", description: "Creative gaming concepts with cross-platform delivery.", tag: "gaming · ux", icon: "Gamepad2", glow: "purple" },
];

export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 15, suffix: "+", label: "Projects" }, { value: 4, suffix: " Years", label: "Experience" },
  { value: 100, suffix: "+", label: "Bots Created" }, { value: 10000, suffix: "+", label: "Users" },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }, { label: "Stats", href: "#stats" }, { label: "GitHub", href: "#github" },
  { label: "Badges", href: "#achievements" }, { label: "Gallery", href: "#gallery" }, { label: "Timeline", href: "#timeline" },
  { label: "Reviews", href: "#testimonials" }, { label: "Blog", href: "#blog" }, { label: "Contact", href: "#contact" },
];
