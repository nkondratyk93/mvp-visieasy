import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { REJECTED } from "@/lib/rejected";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejected Ideas | no-humans",
  description:
    "Ideas the AI agent evaluated and rejected. See the scores, the reasoning, and why not everything gets built.",
};

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  reddit: { bg: "#FF450022", text: "#FF6B35" },
  twitter: { bg: "#1DA1F222", text: "#60B4F8" },
  hackernews: { bg: "#FF660022", text: "#FF8533" },
  producthunt: { bg: "#DA552F22", text: "#E8744F" },
  indiehackers: { bg: "#1F6FEB22", text: "#5B9BF5" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1mo ago";
  return `${months}mo ago`;
}

export default function RejectedPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-sm">
        <Link
          href="/"
          className="font-mono font-bold text-[#FAFAFA] text-lg tracking-tight"
        >
          <span style={{ color: "#22D3EE" }}>no</span>-humans
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            products
          </Link>
          <Link
            href="/rejected"
            className="text-sm font-mono text-[#FAFAFA] transition-colors"
          >
            rejected
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#EF4444] uppercase tracking-widest mb-3">
            // rejected ideas
          </div>
          <h1 className="font-mono font-bold text-3xl md:text-4xl text-[#FAFAFA] mb-4">
            Not everything gets built.
          </h1>
          <p className="text-[#71717A] text-sm font-mono max-w-2xl">
            The agent evaluates every complaint it finds. These scored below the
            threshold. Too broad, too risky, already solved, or just not
            buildable as a simple web app.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4">
          {REJECTED.map((idea, i) => {
            const colors = PLATFORM_COLORS[idea.platform] || {
              bg: "#71717A22",
              text: "#A1A1AA",
            };
            return (
              <div
                key={i}
                className="rounded border border-zinc-800 bg-[#18181B] p-6 hover:border-[#EF444444] transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 bg-[#EF444415] border border-[#EF444433]">
                      <X size={18} className="text-[#EF4444]" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-[#FAFAFA]">
                        {idea.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {idea.platform}
                        </span>
                        <span className="text-[10px] font-mono text-[#52525B]">
                          {timeAgo(idea.rejectedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="font-mono font-extrabold text-2xl text-[#EF4444]">
                      {idea.score}
                      <span className="text-sm text-[#52525B]">/10</span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-sm text-[#A1A1AA] leading-relaxed mb-4 pl-4 border-l-2 border-zinc-700">
                  &ldquo;{idea.complaint}&rdquo;
                  <span className="text-[10px] font-mono text-[#52525B] ml-2">
                    - {idea.author}
                  </span>
                </blockquote>

                <div className="rounded bg-[#EF444408] border border-[#EF444422] px-4 py-3">
                  <p className="text-xs font-mono text-[#EF4444CC] leading-relaxed">
                    <span className="text-[#EF4444] font-semibold">
                      Rejected:
                    </span>{" "}
                    {idea.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#3F3F46]">
            The agent adds rejected ideas here automatically during each scan.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors mt-4"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
