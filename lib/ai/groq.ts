/**
 * GroqCloud AI Integration for FirdavsVIP
 * Docs: https://console.groq.com/docs
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
}

export const MODELS = {
  "llama-3.3-70b": "llama-3.3-70b-versatile",
  "llama-3.1-8b": "llama-3.1-8b-instant",
  "mixtral-8x7b": "mixtral-8x7b-32768",
  "gemma-2-9b": "gemma2-9b-it",
} as const;

export async function groqChat(
  messages: AIMessage[],
  options: AICompletionOptions = {}
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set. Add it to .env.local");
  }
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || DEFAULT_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1024,
      top_p: options.topP ?? 1,
      stream: false,
    }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function* groqStream(
  messages: AIMessage[],
  options: AICompletionOptions = {}
): AsyncGenerator<string, void, unknown> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set");
  }
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || DEFAULT_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1024,
      top_p: options.topP ?? 1,
      stream: true,
    }),
  });
  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));
    for (const line of lines) {
      const data = line.slice(6);
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {}
    }
  }
}

// Specialized AI functions for FirdavsVIP
export async function explainRequest(request: string): Promise<string> {
  return groqChat([
    {
      role: "system",
      content:
        "You are a senior cybersecurity expert. Analyze HTTP requests and explain them clearly, identifying potential security issues, headers, parameters, and methodology. Be concise and professional.",
    },
    { role: "user", content: `Analyze this HTTP request:\n\n${request}` },
  ]);
}

export async function explainResponse(response: string): Promise<string> {
  return groqChat([
    {
      role: "system",
      content:
        "You are a senior cybersecurity expert. Analyze HTTP responses and explain them clearly, identifying status codes, headers, body content, and potential security issues.",
    },
    { role: "user", content: `Analyze this HTTP response:\n\n${response}` },
  ]);
}

export async function explainJWT(token: string): Promise<string> {
  return groqChat([
    {
      role: "system",
      content:
        "You are a JWT security expert. Analyze JWT tokens, decode them, identify claims, check for security issues (alg=none, weak secrets, expired tokens), and explain them clearly.",
    },
    { role: "user", content: `Analyze this JWT token:\n\n${token}` },
  ]);
}

export async function aiAssistant(question: string, context?: string): Promise<string> {
  const systemPrompt = `You are FirdavsAI, the AI assistant for FirdavsVIP - a professional cybersecurity platform. You help users with:
- Security testing methodologies
- HTTP/API/WebSocket testing
- JWT, OAuth, authentication
- Cryptography and encoding
- Penetration testing techniques
- Tool usage guidance
- Best practices

Be concise, professional, and security-focused. Use code examples when helpful.`;
  const userMessage = context
    ? `Context: ${context}\n\nQuestion: ${question}`
    : question;
  return groqChat([
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage },
  ]);
}

export async function generateReport(findings: any[]): Promise<string> {
  return groqChat([
    {
      role: "system",
      content:
        "You are a senior security consultant. Generate a professional executive summary for a security report. Be concise, highlight key findings, and provide actionable recommendations.",
    },
    {
      role: "user",
      content: `Generate an executive summary for these findings:\n\n${JSON.stringify(findings, null, 2)}`,
    },
  ]);
}
