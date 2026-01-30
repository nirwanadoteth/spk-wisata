import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for automatic optimization (stable in Next.js 16)
  reactCompiler: true,

  // Turbopack is now default in Next.js 16 - no need to configure
  // File system caching is enabled automatically

  // Enable Cache Components (includes Partial Prerendering)
  cacheComponents: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote patterns if loading external images
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Enable build optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
