import type { Metadata } from "next";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale, htmlLang, locales } from "@/types";

/**
 * Absolute origin of the deployment.
 *
 * Canonical URLs, hreflang, the sitemap and Open Graph tags are all built from
 * this, so a production build that silently fell back to localhost would ship
 * an SEO bug that is invisible until a crawler finds it. Production therefore
 * refuses to build without it; development keeps the convenient default.
 */
function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  // Vercel supplies these itself, so a deployment there needs no manual
  // configuration. The production domain is preferred over the per-deployment
  // URL so a preview build still emits canonical URLs that point somewhere
  // stable.
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, "")}`;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required in production: canonical URLs, the " +
        "sitemap and Open Graph tags are generated from it. Set it to the " +
        "public origin (no trailing slash) before building. (On Vercel it is " +
        "inferred from VERCEL_PROJECT_PRODUCTION_URL.)",
    );
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

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
  /** Skips the layout's "%s — Sokongan Rohingya" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const {
    path,
    title,
    description,
    type = "website",
    publishedTime,
    absoluteTitle = false,
  } = options;
  const url = absoluteUrl(path);
  const dict = getDictionary(defaultLocale);

  return {
    title: absoluteTitle ? { absolute: title } : title,
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
