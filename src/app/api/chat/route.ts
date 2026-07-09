import { NextResponse } from "next/server";

type Body = { message: string; history?: { role: "user" | "assistant"; text: string }[] };

const SYSTEM = `You are "Firdavs AI", a personal assistant embedded on FIRDAVS VIP — a cyber-themed developer portfolio.
Owner: Firdavs VIP, 19 y.o. from Uzbekistan, Cyber Security student at TUIT, runs KRYZEN studio.
Skills: Python, Telegram bots (aiogram), Cyber Security, Linux, AI, Next.js.
Projects: SaveBot, CyberUz Academy, AI Video Creator, IPTV Platform, game projects.
Tone: confident, concise, slightly playful, cyber-noir. Keep replies under 80 words unless asked for detail.`;

const FALLBACKS: { match: RegExp; reply: string }[] = [
  { match: /(what|who).*(firdavs|he|him|you)/i, reply: "Firdavs is a 19 y.o. cyber security student and Python developer from Uzbekistan. He runs the KRYZEN studio and has shipped 100+ Telegram bots and 15+ open-source projects." },
  { match: /(kryzen|studio|company)/i, reply: "KRYZEN is Firdavs' cyber-themed product studio. It focuses on Telegram automation, AI pipelines, edtech, and dark-themed software products." },
  { match: /(hire|hire you|freelance|work|job|contact)/i, reply: "Drop a message via the Contact section, or DM @FirdavsVIP on Telegram. He usually replies within 12 hours and is open to freelance and contract work." },
  { match: /(project|portfolio|build|github)/i, reply: "Top projects: SaveBot (universal media downloader), CyberUz Academy (edtech), AI Video Creator, IPTV Platform, and this very portfolio. GitHub: github.com/FirdavsVIP." },
  { match: /(skill|security|cyber|hack|ctf)/i, reply: "Firdavs is a Cyber Security student at TUIT — networking, exploit dev, CTFs, red team. TryHackMe Top 1% and HackTheBox Pro Hacker. Also strong in Python, AI, and Telegram bots." },
  { match: /(telegram|bot|aiogram)/i, reply: "100+ Telegram bots shipped for clients across CIS, EU, and SEA. aiogram 3, async patterns, payment integration, AI features, admin panels." },
  { match: /(uzbek|uz|tashkent|language)/i, reply: "Firdavs is from Tashkent, Uzbekistan. The portfolio supports EN / UZ / RU — switcher is in the navbar." },
];

function fallbackReply(msg: string): string {
  for (const f of FALLBACKS) if (f.match.test(msg)) return f.reply;
  return "I’m a local demo assistant running on the portfolio. For deeper answers, ping Firdavs directly at @FirdavsVIP on Telegram. Try asking about his projects, skills, or how to hire him.";
}

export async function POST(req: Request) {
  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ reply: "Invalid request." }, { status: 400 }); }
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(body.message || ""), source: "local" });
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM },
      ...((body.history || []).slice(-8).map((m) => ({ role: m.role, content: m.text }))),
      { role: "user", content: body.message },
    ];
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens: 220, temperature: 0.7 }),
    });
    if (!r.ok) throw new Error("openai error");
    const j = await r.json();
    return NextResponse.json({ reply: j.choices?.[0]?.message?.content || fallbackReply(body.message), source: "openai" });
  } catch {
    return NextResponse.json({ reply: fallbackReply(body.message || ""), source: "local-fallback" });
  }
}
