import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { dictionary, defaultLocale } from "@/lib/dictionary";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: dictionary[defaultLocale].meta.title,
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
