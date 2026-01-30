import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPK Wisata Alam Ciwidey",
  description:
    "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS",
  keywords: [
    "SPK",
    "TOPSIS",
    "Wisata",
    "Tourism",
    "Decision Support System",
    "Destinasi Wisata",
  ],
  authors: [{ name: "nirwanadoteth" }],
  creator: "nirwanadoteth",
  openGraph: {
    title: "SPK Wisata Alam Ciwidey",
    description:
      "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPK Wisata Alam Ciwidey",
    description:
      "Sistem rekomendasi destinasi wisata alam kawasan Ciwidey menggunakan metode TOPSIS",
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
