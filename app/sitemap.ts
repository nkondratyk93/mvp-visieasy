import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://no-humans.app";

  const productPages = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rejected`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...productPages,
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
