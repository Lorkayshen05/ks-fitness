import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";

import { business, fullAddress } from "@/lib/gepuklah";

/**
 * Gepuklah is a separate brand living in the same app, so its fonts and palette
 * are scoped to this subtree rather than added to the root layout. The wrapper
 * covers the root's slate background with the restaurant's warm charcoal.
 */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
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

export default function GepuklahLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`gepuk-root min-h-dvh bg-charcoal-950 font-jakarta text-cream-100 ${anton.variable} ${jakarta.variable}`}
    >
      {/* Scroll reveals start hidden and are un-hidden by an IntersectionObserver.
          Without JS that observer never runs, so show everything up front. */}
      <noscript>
        <style>{".reveal{opacity:1!important;animation:none!important}"}</style>
      </noscript>
      {children}
    </div>
  );
}
