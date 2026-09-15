import { prisma } from "@/lib/db";
import { sanitizeQuery } from "@/lib/sanitize";
import type { ImpactMetricView, OrganizationView, StoryView } from "@/types";

/**
 * Every read the UI performs, in one place, returning plain serialisable views.
 * Pages never touch the Prisma client directly, so the shape the UI depends on
 * is decoupled from the schema and Date objects never leak into client props.
 */

export type OrganizationFilter = { q?: string; verifiedOnly?: boolean };

export async function listOrganizations(
  filter: OrganizationFilter = {},
): Promise<OrganizationView[]> {
  const q = sanitizeQuery(filter.q);

  const rows = await prisma.organization.findMany({
    where: {
      ...(filter.verifiedOnly ? { verified: true } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { description: { contains: q } },
            ],
          }
        : {}),
    },
    // Verified first, then alphabetical — the directory's default reading order.
    orderBy: [{ verified: "desc" }, { name: "asc" }],
  });

  return rows.map(toOrganizationView);
}

export async function getOrganization(slug: string): Promise<OrganizationView | null> {
  const row = await prisma.organization.findUnique({ where: { slug } });
  return row ? toOrganizationView(row) : null;
}

export async function listOrganizationSlugs(): Promise<string[]> {
  const rows = await prisma.organization.findMany({ select: { slug: true } });
  return rows.map((row) => row.slug);
}

export async function listStories(limit?: number): Promise<StoryView[]> {
  const rows = await prisma.story.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
  return rows.map(toStoryView);
}

export async function getStory(slug: string): Promise<StoryView | null> {
  const row = await prisma.story.findUnique({ where: { slug } });
  return row && row.published ? toStoryView(row) : null;
}

export async function listStorySlugs(): Promise<string[]> {
  const rows = await prisma.story.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((row) => row.slug);
}

export async function listImpactMetrics(): Promise<ImpactMetricView[]> {
  // Seed order, which puts the headline population figures first — the seed
  // upserts every row in sequence, so `updatedAt` preserves that order and the
  // home page's three-metric slice is the meaningful one.
  const rows = await prisma.impactMetric.findMany({ orderBy: { updatedAt: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    label: row.label,
    value: row.value,
    source: row.source,
    updatedAt: row.updatedAt.toISOString(),
  }));
}

type OrganizationRow = Awaited<ReturnType<typeof prisma.organization.findFirstOrThrow>>;
type StoryRow = Awaited<ReturnType<typeof prisma.story.findFirstOrThrow>>;

function toOrganizationView(row: OrganizationRow): OrganizationView {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    website: row.website,
    donationUrl: row.donationUrl,
    verified: row.verified,
  };
}

function toStoryView(row: StoryRow): StoryView {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    imageUrl: row.imageUrl,
    createdAt: row.createdAt.toISOString(),
  };
}
