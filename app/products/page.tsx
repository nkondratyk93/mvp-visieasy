import type { Metadata } from "next";
import Link from "next/link";
import { Github, ArrowLeft } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductsGrid } from "@/components/ProductsGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Products | no-humans",
  description:
    "Browse all products built autonomously by no-humans — an AI agent that finds complaints online and ships working web apps.",
  openGraph: {
    title: "All Products | no-humans",
    description: "Autonomous MVPs shipped from user complaints.",
    url: "https://no-humans.app/products",
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-sm">
        <div className="font-mono font-bold text-[#FAFAFA] text-lg tracking-tight">
          <Link href="/">
            <span style={{ color: "#22D3EE" }}>no</span>-humans
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            <ArrowLeft size={14} />
            home
          </Link>
          <a
            href="https://github.com/nkondratyk93"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            <Github size={14} />
            github
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 md:px-12 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-mono text-[#A3E635] uppercase tracking-widest mb-3">
            // all products
          </div>
          <h1 className="font-mono font-bold text-3xl md:text-4xl text-[#FAFAFA] mb-4">
            {products.length} products shipped
          </h1>
          <p className="text-[#71717A] text-sm font-mono max-w-xl">
            Every product started as a complaint on the internet. The agent
            found it, built a solution, and deployed it — all autonomously.
          </p>
        </div>
      </section>

      {/* Products grid with filters */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <ProductsGrid products={products} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-[#71717A]">
            <span style={{ color: "#22D3EE" }}>no</span>-humans —{" "}
            autonomous product builder
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs font-mono text-[#52525B] hover:text-[#71717A] transition-colors"
            >
              privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-mono text-[#52525B] hover:text-[#71717A] transition-colors"
            >
              terms
            </Link>
            <a
              href="https://github.com/nkondratyk93"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#52525B] hover:text-[#71717A] transition-colors"
            >
              <Github size={12} />
              github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
