import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { dictionary, defaultLocale } from "@/lib/dictionary";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * The root layout is deliberately thin: it owns <html>, <body> and the shared
 * stylesheet, and nothing else. Each site in this app brings its own chrome —
 * `(site)` renders the KS Fitness navbar and footer, `gepuklah` renders the
 * restaurant page standalone — so neither leaks into the other.
 *
 * Metadata is emitted at build time, so it uses the default locale. The visible
 * page swaps language on the client; crawlers get the English copy.
 */
export const metadata: Metadata = {
  title: {
    default: dictionary[defaultLocale].meta.title,
    template: "%s",
  },
  description: dictionary[defaultLocale].meta.description,
  openGraph: {
    title: dictionary[defaultLocale].meta.title,
    description: dictionary[defaultLocale].meta.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-slate-950 font-sans text-slate-100">{children}</body>
    </html>
  );
}
