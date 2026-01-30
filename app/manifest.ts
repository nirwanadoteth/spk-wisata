import type { MetadataRoute } from "next";

/**
 * Web App Manifest
 * Provides metadata for Progressive Web App (PWA) installation
 * Following Next.js 16 and PWA best practices
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SPK Wisata Alam Ciwidey",
    short_name: "CiwideyPK",
    description:
      "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["travel", "lifestyle"],
    lang: "id",
    dir: "ltr",
  };
}
