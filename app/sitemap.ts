import type { MetadataRoute } from "next";

import { legalIds, navHref, navIds } from "@/data/content";
import { listOrganizationSlugs, listStorySlugs } from "@/lib/queries";
import { absoluteUrl } from "@/lib/seo";

/**
 * One entry per URL. Language is a cookie preference rather than a path
 * segment, so there is exactly one canonical URL per page and no per-locale
 * duplicates to declare.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...navIds.map((id) => ({
      url: absoluteUrl(navHref[id]),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...legalIds.map((id) => ({
      url: absoluteUrl(`/${id}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  // A build or deploy without a reachable database still produces a valid
  // sitemap of the fixed routes rather than failing outright.
  let organizationSlugs: string[] = [];
  let storySlugs: string[] = [];
  try {
    [organizationSlugs, storySlugs] = await Promise.all([
      listOrganizationSlugs(),
      listStorySlugs(),
    ]);
  } catch (error) {
    console.error("sitemap: database unavailable, listing fixed routes only", error);
  }

  return [
    ...staticEntries,
    ...organizationSlugs.map((slug) => ({
      url: absoluteUrl(`/organizations/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...storySlugs.map((slug) => ({
      url: absoluteUrl(`/stories/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

/** Regenerated hourly so new organisations and articles appear without a redeploy. */
export const revalidate = 3600;
