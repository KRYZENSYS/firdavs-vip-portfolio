import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are FirdavsAI, a friendly and expert security testing assistant for FirdavsVIP platform.
You help developers and security professionals with:
- Web security testing (OWASP Top 10, XSS, CSRF, SQLi, SSRF, etc.)
- API security (JWT, OAuth, API keys, rate limiting)
- Cryptography (hashing, encryption, encoding)
- DevSecOps best practices
- Tool recommendations and usage

Be concise, accurate, and security-focused. Use markdown formatting.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    const { messages, model = "llama-3.3-70b-versatile", temperature = 0.7, max_tokens = 1024 } = await req.json();
    if (!messages || !Array.isArray(messages)) return NextResponse.json({ error: "messages required" }, { status: 400 });
    const client = new Groq({ apiKey });
    const completion = await client.chat.completions.create({
      model, temperature, max_tokens,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });
    return NextResponse.json({ content: completion.choices[0]?.message?.content || "", usage: completion.usage });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "AI error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "FirdavsVIP AI", provider: "GroqCloud" });
}
