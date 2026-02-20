import { PRODUCTS } from "@/lib/products";
import { REJECTED } from "@/lib/rejected";

export function GET() {
  const baseUrl = "https://no-humans.app";

  const productItems = PRODUCTS.map(
    (p) => `    <item>
      <title>🚀 Shipped: ${escapeXml(p.name)}</title>
      <link>${baseUrl}/products/${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/products/${p.slug}</guid>
      <pubDate>${new Date(p.createdAt).toUTCString()}</pubDate>
      <description>${escapeXml(
        `The agent detected a complaint and built ${p.name}: "${p.complaint || p.description}" — Score: ${p.score || "N/A"}/10. Live at ${p.liveUrl}`
      )}</description>
      <category>shipped</category>
    </item>`
  );

  const rejectedItems = REJECTED.map(
    (r, i) => `    <item>
      <title>❌ Rejected: ${escapeXml(r.title)}</title>
      <link>${baseUrl}/rejected</link>
      <guid isPermaLink="false">rejected-${i}-${r.rejectedAt}</guid>
      <pubDate>${new Date(r.rejectedAt).toUTCString()}</pubDate>
      <description>${escapeXml(
        `"${r.complaint}" — Score: ${r.score}/10. Reason: ${r.reason}`
      )}</description>
      <category>rejected</category>
    </item>`
  );

  const allItems = [...productItems, ...rejectedItems];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>no-humans — autonomous product builder</title>
    <link>${baseUrl}</link>
    <description>An AI agent scans the internet for complaints and builds MVPs automatically. Follow what gets built, what gets rejected, and why.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${allItems.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
