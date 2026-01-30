import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

// Optimize font loading with display swap for better performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Enhanced metadata following Next.js 16 and SEO best practices
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: {
    default: "SPK Wisata Alam Ciwidey",
    template: "%s | SPK Wisata Ciwidey",
  },
  description:
    "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS (Technique for Order Preference by Similarity to Ideal Solution). Temukan destinasi wisata terbaik berdasarkan aksesibilitas, daya tarik, fasilitas, dan kualitas layanan.",
  keywords: [
    "SPK",
    "TOPSIS",
    "Wisata Ciwidey",
    "Wisata Alam",
    "Tourism",
    "Decision Support System",
    "Destinasi Wisata",
    "Bandung Selatan",
    "Ciwidey",
    "Rekomendasi Wisata",
  ],
  authors: [{ name: "nirwanadoteth", url: "https://github.com/nirwanadoteth" }],
  creator: "nirwanadoteth",
  publisher: "SPK Wisata Ciwidey",
  applicationName: "SPK Wisata Ciwidey",
  category: "Travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "SPK Wisata Ciwidey",
    title: "SPK Wisata Alam Ciwidey - Sistem Rekomendasi Destinasi Wisata",
    description:
      "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS. Temukan destinasi wisata terbaik untuk liburan Anda.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SPK Wisata Ciwidey - Sistem Rekomendasi Wisata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPK Wisata Alam Ciwidey - Sistem Rekomendasi Destinasi Wisata",
    description:
      "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS",
    images: ["/og-image.png"],
    creator: "@nirwanadoteth",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
