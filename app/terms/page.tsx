import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — visieasy",
  description: "Terms of service for visieasy.com",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="space-y-8 text-[#A1A1AA] text-sm leading-relaxed">
          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              1. Use of the Site
            </h2>
            <p>
              visieasy.com is a portfolio and informational website. You may browse the
              site freely. The products showcased here are independent applications
              deployed as subdomains of visieasy.com. Each product may have its own
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              2. Intellectual Property
            </h2>
            <p>
              The code powering this site and the showcased MVPs is open source,
              available on GitHub under the MIT License unless otherwise specified in
              the respective repository. The visieasy name and branding are property
              of the creator.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              3. Disclaimer
            </h2>
            <p>
              All products showcased on visieasy.com are MVPs (Minimum Viable
              Products) built autonomously by an AI agent. They are provided as-is,
              without warranty of any kind. Use them at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, visieasy and its creator shall
              not be liable for any indirect, incidental, or consequential damages
              arising from your use of this site or the products it showcases.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              5. Changes
            </h2>
            <p>
              These terms may be updated at any time. Continued use of the site
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-mono font-semibold text-[#FAFAFA] text-base mb-3">
              6. Contact
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
