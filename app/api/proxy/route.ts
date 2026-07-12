import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { url, method = "GET", headers = {}, body } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    let target: URL;
    try { target = new URL(url); } catch { return NextResponse.json({ error: "Invalid URL" }, { status: 400 }); }
    if (!["http:", "https:"].includes(target.protocol)) {
      return NextResponse.json({ error: "Only http/https allowed" }, { status: 400 });
    }
    const start = Date.now();
    const safeHeaders: Record<string, string> = { "User-Agent": "FirdavsVIP/2.0" };
    for (const [k, v] of Object.entries(headers || {})) {
      if (!k) continue;
      const lk = k.toLowerCase();
      if (["host", "content-length", "connection"].includes(lk)) continue;
      safeHeaders[k] = String(v);
    }
    const fetchInit: RequestInit = { method, headers: safeHeaders, redirect: "follow" };
    if (body && !["GET", "HEAD"].includes(method)) fetchInit.body = typeof body === "string" ? body : JSON.stringify(body);
    const res = await fetch(target.toString(), fetchInit);
    const time = Date.now() - start;
    const resHeaders: Record<string, string> = {};
    res.headers.forEach((v, k) => { resHeaders[k] = v; });
    const contentType = res.headers.get("content-type") || "";
    let resBody: any;
    const text = await res.text();
    if (contentType.includes("application/json")) {
      try { resBody = JSON.parse(text); } catch { resBody = text; }
    } else { resBody = text; }
    return NextResponse.json({
      status: res.status, statusText: res.statusText, headers: resHeaders, body: resBody, time, size: new Blob([text]).size, url: target.toString(),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Proxy error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "FirdavsVIP HTTP Proxy", version: "1.0.0" });
}
