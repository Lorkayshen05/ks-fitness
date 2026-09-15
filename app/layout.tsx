import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDictionary, getLocale } from "@/lib/i18n";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { htmlLang } from "@/types";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Metadata is emitted in the default locale: language is a cookie preference
 * rather than a URL segment, so every language shares one canonical URL and
 * crawlers get the English copy. Per-page titles and descriptions come from
 * `buildMetadata`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: getDictionary("en").meta.title,
    template: `%s — ${getDictionary("en").meta.siteName}`,
  },
  description: getDictionary("en").meta.description,
  applicationName: getDictionary("en").meta.siteName,
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1b5754",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink-800">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
