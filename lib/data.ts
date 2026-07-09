export type Skill = { name: string; level: number };
export type Project = { id: number; title: string; description: string; tag: string; icon: string; glow: "cyan" | "purple" | "blue" | "pink"; link?: string };
export type Social = { name: string; handle: string; href: string; icon: string };
export type Stat = { value: number; suffix: string; label: string };

export const PROFILE = {
  name: "FIRDAVS",
  age: 19,
  username: "@FirdavsVIP",
  country: "Uzbekistan",
  role: "Cyber Security Student",
  focus: ["Cyber Security", "Python", "Artificial Intelligence", "Automation", "Telegram Bots"],
  tagline: "Dark Future Vision",
  typingTitles: ["Cyber Security Student", "Python Developer", "Telegram Bot Developer", "AI Enthusiast", "Future Builder"],
  subtitles: ["Born In The Shadows", "Living Without Limits", "Dark Future Vision"],
};

export const SKILLS: Skill[] = [
  { name: "Python", level: 95 },
  { name: "Telegram Bots", level: 100 },
  { name: "Cyber Security", level: 80 },
  { name: "Linux", level: 85 },
  { name: "Artificial Intelligence", level: 90 },
  { name: "Web Development", level: 80 },
];

export const PROJECTS: Project[] = [
  { id: 1, title: "Telegram Bots", description: "Advanced automation and management bots for business and communities.", tag: "aiogram · automation", icon: "Bot", glow: "cyan" },
  { id: 2, title: "CyberUz Academy", description: "Cybersecurity education platform with courses, labs and CTF.", tag: "education · edtech", icon: "Shield", glow: "purple" },
  { id: 3, title: "SaveBot", description: "Instagram, TikTok and YouTube universal downloader bot.", tag: "downloader · media", icon: "Download", glow: "blue" },
  { id: 4, title: "AI Video Creator", description: "AI-generated viral content pipeline with auto-edit and posting.", tag: "ai · genmedia", icon: "Sparkles", glow: "pink" },
  { id: 5, title: "IPTV Platform", description: "Modern streaming platform with adaptive bitrate and EPG.", tag: "streaming · cloud", icon: "Tv", glow: "cyan" },
  { id: 6, title: "Game Projects", description: "Creative gaming concepts with cross-platform delivery.", tag: "gaming · ux", icon: "Gamepad2", glow: "purple" },
];

export const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Projects" },
  { value: 4, suffix: " Years", label: "Experience" },
  { value: 100, suffix: "+", label: "Bots Created" },
  { value: 10000, suffix: "+", label: "Users" },
];

export const SOCIALS: Social[] = [
  { name: "Telegram", handle: "@FirdavsVIP", href: "https://t.me/FirdavsVIP", icon: "Send" },
  { name: "GitHub", handle: "github.com/FirdavsVIP", href: "https://github.com/FirdavsVIP", icon: "Github" },
  { name: "Instagram", handle: "@firdavsvip", href: "https://instagram.com/firdavsvip", icon: "Instagram" },
  { name: "Email", handle: "hello@firdavsvip.com", href: "mailto:hello@firdavsvip.com", icon: "Mail" },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];
