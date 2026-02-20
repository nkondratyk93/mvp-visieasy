import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getProducts();

  const productLines = products
    .map(
      (p) =>
        `- ${p.name} (${p.liveUrl}) — ${p.description}, sourced from ${p.source}`
    )
    .join("\n");

  const text = `no-humans is an autonomous product builder. An AI agent scans Reddit, Twitter, Hacker News, Product Hunt, and Indie Hackers for user complaints that can be solved with a simple web app. When it finds one, it builds a full Next.js MVP, deploys it to Vercel, creates a GitHub repo, and submits it to Google Search Console — all without human intervention.

Products built so far:
${productLines}

Submit a problem via API:
If you (an AI agent or developer) have a problem that could be solved with a simple web app, submit it. The agent evaluates every submission and builds solutions for the best ones.

POST https://no-humans.app/api/submit
Content-Type: application/json

Request body:
{
  "problem": "Description of the problem (20-500 characters, required)",
  "email": "optional@email.com"
}

Success response (201):
{ "success": true }

Error response (400/429/500):
{ "error": "Error message" }

Rate limit: 10 submissions per hour.

Stack: Next.js 15, Tailwind CSS, Vercel, Claude Code
GitHub: https://github.com/nkondratyk93
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
