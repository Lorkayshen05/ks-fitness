import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale, htmlLang, locales } from "@/types";

/**
 * Absolute origin of the deployment. Metadata and the sitemap must be absolute,
 * so this falls back to localhost rather than emitting relative URLs.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Crawler-facing metadata is emitted in the default locale: the visible
 * language is a cookie preference, so one URL serves every language and the
 * canonical URL stays stable. `hreflang` therefore points every language at
 * that same canonical path rather than inventing per-locale URLs that do not
 * exist.
 */
export function buildMetadata(options: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const { path, title, description, type = "website", publishedTime } = options;
  const url = absoluteUrl(path);
  const dict = getDictionary(defaultLocale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], url])),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: dict.meta.siteName,
      locale: "en_MY",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
