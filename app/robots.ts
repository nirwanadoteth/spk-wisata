import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration
 * Controls search engine crawling behavior
 * Following Next.js 16 best practices
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
