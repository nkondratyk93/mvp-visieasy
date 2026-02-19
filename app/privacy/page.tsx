import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — visieasy",
  description: "Privacy policy for visieasy.com",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <nav className="border-b border-zinc-800 px-6 md:px-12 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-[#FAFAFA] text-lg tracking-tight"
        >
          <span style={{ color: "#22D3EE" }}>vis</span>ieasy
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-xs font-mono text-[#22D3EE] uppercase tracking-widest mb-4">
          // legal
        </div>
        <h1 className="font-mono font-bold text-3xl text-[#FAFAFA] mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-[#A1A1AA] text-sm leading-relaxed">
          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              1. Information We Collect
            </h2>
            <p>
              visieasy.com is a static portfolio website. We do not collect, store,
              or process any personal information directly. We use Google Analytics
              (GA4) to understand aggregate traffic patterns. This may collect
              anonymized usage data such as page views, session duration, and general
              geographic region.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              2. Cookies
            </h2>
            <p>
              Google Analytics sets cookies to track sessions. These are third-party
              cookies governed by Google&apos;s privacy policy. You can opt out via
              your browser settings or the Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              3. Third-Party Services
            </h2>
            <p>
              We link to external services including GitHub, Reddit, Twitter, Product
              Hunt, and Indie Hackers. Their privacy policies govern any data you
              share with them. We do not share your data with these services.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              4. Data Retention
            </h2>
            <p>
              Since we collect no personal data, there is nothing to retain or delete.
              Google Analytics data retention is set to the minimum period allowed by
              Google.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              5. Contact
            </h2>
            <p>
              Questions? Open an issue on{" "}
              <a
                href="https://github.com/nkondratyk93"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22D3EE] hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-[#52525B] font-mono pt-4 border-t border-zinc-800">
            Last updated: February 2026
          </p>
        </div>
      </main>
    </div>
  );
}
