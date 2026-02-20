"use client";

import { useState, useMemo } from "react";
import type { Product, ProductSource } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const SOURCE_LABELS: Record<ProductSource, string> = {
  reddit: "Reddit",
  twitter: "Twitter",
  github: "GitHub",
  appstore: "App Store",
  producthunt: "Product Hunt",
  indiehackers: "Indie Hackers",
  hackernews: "Hacker News",
};

export function ProductsGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductSource | "all">("all");

  const availableSources = useMemo(() => {
    const sources = new Set(products.map((p) => p.source));
    return Array.from(sources) as ProductSource[];
  }, [products]);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((p) => p.source === filter),
    [products, filter]
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1.5 rounded text-xs font-mono uppercase tracking-widest transition-all duration-150"
          style={{
            background: filter === "all" ? "#22D3EE22" : "transparent",
            color: filter === "all" ? "#22D3EE" : "#71717A",
            border: `1px solid ${filter === "all" ? "#22D3EE44" : "#27272A"}`,
          }}
        >
          All ({products.length})
        </button>
        {availableSources.map((source) => {
          const count = products.filter((p) => p.source === source).length;
          const active = filter === source;
          return (
            <button
              key={source}
              onClick={() => setFilter(source)}
              className="px-3 py-1.5 rounded text-xs font-mono uppercase tracking-widest transition-all duration-150"
              style={{
                background: active ? "#22D3EE22" : "transparent",
                color: active ? "#22D3EE" : "#71717A",
                border: `1px solid ${active ? "#22D3EE44" : "#27272A"}`,
              }}
            >
              {SOURCE_LABELS[source]} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm font-mono text-[#52525B] py-12">
          No products found for this filter.
        </p>
      )}
    </div>
  );
}
