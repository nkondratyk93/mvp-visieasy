import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "visieasy — From complaint to product. Automatically.",
  description:
    "visieasy — an autonomous AI agent that finds user complaints online and turns them into deployed web apps. See the products it built.",
  metadataBase: new URL("https://visieasy.com"),
  openGraph: {
    title: "visieasy — From complaint to product. Automatically.",
    description:
      "An autonomous AI agent that finds user complaints online and turns them into deployed web apps.",
    url: "https://visieasy.com",
    siteName: "visieasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "visieasy — From complaint to product. Automatically.",
    description:
      "An autonomous AI agent that finds user complaints online and turns them into deployed web apps.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "visieasy",
  url: "https://visieasy.com",
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
