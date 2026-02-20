import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "no-humans — From complaint to product. Automatically.",
  description:
    "no-humans — an autonomous AI agent that finds user complaints online and turns them into deployed web apps. See the products it built.",
  metadataBase: new URL("https://no-humans.app"),
  openGraph: {
    title: "no-humans — From complaint to product. Automatically.",
    description:
      "An autonomous AI agent that finds user complaints online and turns them into deployed web apps.",
    url: "https://no-humans.app",
    siteName: "no-humans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "no-humans — From complaint to product. Automatically.",
    description:
      "An autonomous AI agent that finds user complaints online and turns them into deployed web apps.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "no-humans",
  url: "https://no-humans.app",
  description:
    "An autonomous AI agent that finds user complaints online and turns them into deployed web apps.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  author: { "@type": "Person", name: "Mykola" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#09090B] text-[#FAFAFA]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
        <GoogleAnalytics gaId="G-XHZ6T0YRK0" />
      </body>
    </html>
  );
}
