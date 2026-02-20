import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import type { Metadata } from "next";

const SOURCE_LABELS: Record<string, string> = {
  reddit: "Reddit",
  twitter: "Twitter / X",
  github: "GitHub",
  appstore: "App Store",
  producthunt: "Product Hunt",
  indiehackers: "Indie Hackers",
  hackernews: "Hacker News",
  manual: "Manual",
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} - Origin Story | no-humans`,
    description: `How an AI agent turned a complaint into ${product.name}. ${product.description}`,
  };
}

export default async function ProductStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const sourceLabel = SOURCE_LABELS[product.source] || product.source;

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-sm">
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
        >
          <ArrowLeft size={14} />
          all products
        </Link>
        <div className="font-mono font-bold text-[#FAFAFA] text-lg tracking-tight">
          <span style={{ color: "#22D3EE" }}>no</span>-humans
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Product header */}
        <div className="flex items-center gap-4 mb-12">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl flex-shrink-0"
            style={{
              background: product.accentColor + "15",
              border: `1px solid ${product.accentColor}33`,
            }}
          >
            {product.icon}
          </div>
          <div>
            <h1
              className="font-mono font-bold text-3xl md:text-4xl tracking-tight"
              style={{ color: product.accentColor }}
            >
              {product.name}
            </h1>
            <p className="text-sm text-[#71717A] font-mono mt-1">
              {product.description}
            </p>
          </div>
        </div>

        {/* The Complaint */}
        {product.complaint && (
          <section className="mb-12">
            <div className="text-xs font-mono text-[#EF4444] uppercase tracking-widest mb-4">
              // the complaint
            </div>
            <blockquote
              className="border-l-4 pl-6 py-4 rounded-r border-zinc-800 bg-[#18181B]"
              style={{ borderLeftColor: product.accentColor + "88" }}
            >
              <p className="font-mono text-[#FAFAFA] text-base leading-relaxed mb-4">
                &ldquo;{product.complaint}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="text-xs font-mono text-[#71717A]">
                  {product.complaintAuthor && (
                    <span className="text-[#A1A1AA]">
                      {product.complaintAuthor}
                    </span>
                  )}
                  {" on "}
                  {product.complaintUrl ? (
                    <a
                      href={product.complaintUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: product.accentColor }}
                    >
                      {sourceLabel}
                    </a>
                  ) : (
                    sourceLabel
                  )}
                </div>
              </footer>
            </blockquote>
          </section>
        )}

        {/* The Score */}
        {product.score != null && (
          <section className="mb-12">
            <div className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest mb-4">
              // agent&apos;s score
            </div>
            <div className="rounded border border-zinc-800 bg-[#18181B] p-6">
              <div className="flex items-center gap-6">
                <div
                  className="font-mono font-extrabold text-5xl"
                  style={{ color: product.accentColor }}
                >
                  {product.score}
                  <span className="text-xl text-[#52525B]">/10</span>
                </div>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-[#27272A] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${product.score * 10}%`,
                        background: `linear-gradient(90deg, ${product.accentColor}88, ${product.accentColor})`,
                      }}
                    />
                  </div>
                  <p className="text-xs font-mono text-[#52525B] mt-2">
                    feasibility score - threshold is 6/10 to trigger a build
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Result */}
        <section className="mb-12">
          <div className="text-xs font-mono text-[#A3E635] uppercase tracking-widest mb-4">
            // the result
          </div>
          <div className="rounded border border-zinc-800 bg-[#18181B] p-6">
            <p className="text-sm text-[#A1A1AA] mb-6">
              The agent detected the complaint, scored it, wrote a spec,
              designed the UI, generated the code, and deployed it. Zero human
              intervention.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: product.accentColor,
                  color: "#09090B",
                }}
              >
                <ExternalLink size={14} />
                Visit {product.name}
              </a>
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono font-semibold text-sm border border-zinc-700 text-[#A1A1AA] hover:border-zinc-500 hover:text-[#FAFAFA] transition-all duration-200"
              >
                <Github size={14} />
                View Source
              </a>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="pt-8 border-t border-zinc-800">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
}
