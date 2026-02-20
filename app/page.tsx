import Link from "next/link";
import { Github, Linkedin, ArrowRight, Scan, Cpu, Rocket } from "lucide-react";
import { PipelineAnimation } from "@/components/PipelineAnimation";
import { StatsBar } from "@/components/StatsCounter";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { TerminalHeadline } from "@/components/TerminalHeadline";
import { SubmitForm } from "@/components/SubmitForm";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Scan",
    icon: Scan,
    color: "#22D3EE",
    description:
      "The agent monitors Reddit, Twitter, HN, Product Hunt, and Indie Hackers for real user complaints. Keyword detection + AI semantic classification finds buildable problems.",
  },
  {
    step: "02",
    title: "Build",
    icon: Cpu,
    color: "#A78BFA",
    description:
      "When a complaint scores high enough (engagement + feasibility + clarity), the agent writes a spec, designs the UI, generates code with Claude, and deploys to Vercel. Full stack, zero manual steps.",
  },
  {
    step: "03",
    title: "Ship",
    icon: Rocket,
    color: "#A3E635",
    description:
      "Every MVP gets its own subdomain, GitHub repo, Google Search Console indexing, and a ready-to-post reply for the original complaint thread.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#09090B]/95 backdrop-blur-sm">
        <div className="font-mono font-bold text-[#FAFAFA] text-lg tracking-tight">
          <span style={{ color: "#22D3EE" }}>no</span>-humans
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-mono text-[#71717A] hover:text-[#FAFAFA] transition-colors"
          >
            products
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

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Copy */}
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-zinc-900 w-fit">
                <span
                  className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse"
                  style={{ boxShadow: "0 0 6px #A3E635" }}
                />
                <span className="text-xs font-mono text-[#71717A] uppercase tracking-widest">
                  From complaint to product. Automatically.
                </span>
              </div>

              <TerminalHeadline />

              <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-lg">
                An AI agent scans Reddit, Twitter, and Hacker News for user
                complaints. When it finds a problem that can be solved with a
                simple web app - it builds one, deploys it and ships it.{" "}
                <span className="text-[#FAFAFA] font-medium">
                  All automatically.
                </span>
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: "#22D3EE",
                    color: "#09090B",
                  }}
                >
                  See the Products ↓
                </a>
                <a
                  href="#submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-semibold text-sm border border-zinc-700 text-[#A1A1AA] hover:border-zinc-500 hover:text-[#FAFAFA] transition-all duration-200"
                >
                  Submit a Problem
                </a>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-800">
                {[
                  { val: String(PRODUCTS.length), label: "MVPs shipped" },
                  { val: "5", label: "platforms scanned" },
                  { val: "0", label: "lines written by human" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="font-mono font-bold text-2xl text-[#22D3EE]">
                      {s.val}
                    </span>
                    <span className="text-xs font-mono text-[#71717A] uppercase tracking-widest">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pipeline animation */}
            <div className="rounded border border-zinc-800 bg-[#0F0F12] p-6 md:p-8">
              <div className="text-xs font-mono text-[#3F3F46] uppercase tracking-widest mb-6">
                // live pipeline
              </div>
              <PipelineAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 md:px-12 py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="text-xs font-mono text-[#22D3EE] uppercase tracking-widest mb-3">
              // how it works
            </div>
            <h2 className="font-mono font-bold text-3xl md:text-4xl text-[#FAFAFA]">
              The autonomous pipeline
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-zinc-800 rounded overflow-hidden">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-8 border-zinc-800 group hover:bg-zinc-900/50 transition-colors duration-200"
                  style={{
                    borderRight:
                      i < HOW_IT_WORKS.length - 1
                        ? "1px solid #27272A"
                        : "none",
                  }}
                >
                  {/* Step number */}
                  <div
                    className="text-6xl font-mono font-extrabold mb-6 leading-none select-none"
                    style={{ color: step.color + "18" }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                    style={{
                      background: step.color + "15",
                      border: `1px solid ${step.color}33`,
                    }}
                  >
                    <Icon size={20} style={{ color: step.color }} />
                  </div>

                  <h3
                    className="font-mono font-bold text-xl mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow connector */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center z-10 rounded-full border border-zinc-700 bg-[#09090B]"
                    >
                      <ArrowRight size={14} className="text-[#52525B]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-6 md:px-12 py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="text-xs font-mono text-[#A3E635] uppercase tracking-widest mb-3">
              // products built
            </div>
            <h2 className="font-mono font-bold text-3xl md:text-4xl text-[#FAFAFA] mb-4">
              Shipped. Deployed. Real.
            </h2>
            <p className="text-[#71717A] text-sm font-mono">
              Each one started as a complaint on the internet. Each one is now a
              live product.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {PRODUCTS.length > 6 && (
            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-mono transition-colors duration-150 hover:opacity-80"
                style={{ color: "#A3E635" }}
              >
                View all {PRODUCTS.length} products
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <StatsBar productCount={PRODUCTS.length} />
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-12 py-20 border-b border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <blockquote
            className="border-l-4 pl-8 py-2"
            style={{ borderColor: "#22D3EE" }}
          >
            <p className="font-mono text-lg md:text-xl text-[#FAFAFA] leading-relaxed mb-6">
              &ldquo;I asked the agent to find problems and build solutions. Two
              days later, it had 4 deployed products with custom domains, GitHub
              repos, and Google indexing. I didn&rsquo;t write a single line of
              code.&rdquo;
            </p>
            <footer className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm"
                style={{ background: "#22D3EE" + "20", color: "#22D3EE" }}
              >
                M
              </div>
              <div>
                <div className="font-mono font-semibold text-[#FAFAFA] text-sm">
                  Mykola
                </div>
                <div className="font-mono text-xs text-[#71717A]">
                  Creator, no-humans.app
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Submit Problem */}
      <section id="submit" className="px-6 md:px-12 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono text-[#22D3EE] uppercase tracking-widest mb-6">
            // submit a problem
          </div>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-[#FAFAFA] mb-4">
            Got a problem? We&apos;ll build the fix.
          </h2>
          <p className="text-[#71717A] text-sm mb-8">
            Describe what frustrates you. The agent evaluates every submission
            and builds solutions for the best ones.
          </p>
          <SubmitForm />
          <div className="mt-8">
            <a
              href="https://github.com/nkondratyk93"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#52525B] hover:text-[#71717A] transition-colors"
            >
              <Github size={14} />
              Follow on GitHub
            </a>
          </div>
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
            <a
              href="https://www.linkedin.com/in/nikolay-kondratyk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#52525B] hover:text-[#71717A] transition-colors"
            >
              <Linkedin size={12} />
              contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
