import { POSTS } from "@/data/blog";

export async function GET() {
  const base = "https://firdavsvip.uz";
  const items = POSTS.map((p) => `
    <item>
      <title>${p.title}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${p.excerpt}</description>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>FIRDAVS VIP — Blog</title>
    <link>${base}</link>
    <description>Cyber Security · Python · AI · Telegram Bots</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
