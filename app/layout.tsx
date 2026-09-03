import type { Metadata, Viewport } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";

import { business, fullAddress } from "@/lib/gepuklah";

import "./globals.css";

/** Poster-weight display face for headlines. */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const title = `${business.name} ${business.byline} — Ayam Gepuk in Damansara Jaya`;
const description =
  "Boneless chicken chop smashed to order under house cashew (gajus) sambal. Open daily until 8:30 PM on Jalan SS 22/11, Damansara Jaya.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ayam gepuk",
    "sambal gajus",
    "Damansara Jaya",
    "Petaling Jaya",
    "nasi lemak",
    "halal street food",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_MY",
    siteName: `${business.name} ${business.byline}`,
  },
  other: {
    "geo.placename": fullAddress,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0B09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-MY" className={`${anton.variable} ${jakarta.variable}`}>
      <body className="bg-charcoal-950 font-sans text-cream-100">
        {/* Scroll reveals start hidden and are un-hidden by an IntersectionObserver.
            Without JS that observer never runs, so show everything up front. */}
        <noscript>
          <style>{".reveal{opacity:1!important;animation:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
