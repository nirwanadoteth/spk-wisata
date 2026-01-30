import type { MetadataRoute } from "next";

/**
 * Sitemap configuration for SEO
 * Automatically generates sitemap.xml for search engines
 * Following Next.js 16 best practices
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
