"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import type { Product, ProductSource } from "@/lib/products";

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

const SOURCE_BADGES: Record<
  ProductSource,
  { label: string; bg: string; text: string }
> = {
  reddit: {
    label: "reddit",
    bg: "#FF4500" + "22",
    text: "#FF6B35",
  },
  twitter: {
    label: "twitter / x",
    bg: "#1DA1F2" + "22",
    text: "#60B4F8",
  },
  github: {
    label: "github",
    bg: "#6E40C9" + "22",
    text: "#9F74E0",
  },
  appstore: {
    label: "app store",
    bg: "#0071E3" + "22",
    text: "#4DA3FF",
  },
  producthunt: {
    label: "product hunt",
    bg: "#DA552F" + "22",
    text: "#E8744F",
  },
  indiehackers: {
    label: "indie hackers",
    bg: "#1F6FEB" + "22",
    text: "#5B9BF5",
  },
  hackernews: {
    label: "hacker news",
    bg: "#FF6600" + "22",
    text: "#FF8533",
  },
  manual: {
    label: "manual",
    bg: "#71717A" + "22",
    text: "#A1A1AA",
  },
};

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const badge = SOURCE_BADGES[product.source];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block relative rounded border transition-all duration-300 overflow-hidden cursor-pointer"
      style={{
        borderColor: hovered ? product.accentColor + "66" : "#27272A",
        background: "#18181B",
        boxShadow: hovered
          ? `0 0 0 1px ${product.accentColor}33, 0 8px 32px ${product.accentColor}15`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${product.accentColor}88, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="p-6 flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: product.accentColor + "15",
                border: `1px solid ${product.accentColor}33`,
              }}
            >
              {product.icon}
            </div>
            <div>
              <h3
                className="font-mono font-bold text-lg tracking-tight transition-colors duration-200"
                style={{ color: hovered ? product.accentColor : "#FAFAFA" }}
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest"
                  style={{ background: badge.bg, color: badge.text }}
                >
                  via {badge.label}
                </div>
                {product.createdAt && (
                  <span className="text-[10px] font-mono text-[#52525B]">
                    {timeAgo(product.createdAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#A1A1AA] leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
          <span
            onClick={(e) => { e.preventDefault(); window.open(product.liveUrl, "_blank"); }}
            className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-150 hover:opacity-80 cursor-pointer"
            style={{ color: product.accentColor }}
          >
            <ExternalLink size={12} />
            live app
          </span>
          <span
            onClick={(e) => { e.preventDefault(); window.open(product.githubUrl, "_blank"); }}
            className="flex items-center gap-1.5 text-xs font-mono text-[#71717A] hover:text-[#A1A1AA] transition-colors duration-150 cursor-pointer"
          >
            <Github size={12} />
            github
          </span>
        </div>
      </div>
    </Link>
  );
}
