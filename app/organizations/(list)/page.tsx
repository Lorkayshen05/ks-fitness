import { Info, SearchX } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/container";
import { OrganizationCard } from "@/components/organization-card";
import { OrganizationSearch } from "@/components/organization-search";
import { Section } from "@/components/section";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { listOrganizations } from "@/lib/queries";
import { sanitizeQuery } from "@/lib/sanitize";
import { buildMetadata } from "@/lib/seo";
import { fill } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  path: "/organizations",
  ...getDictionary("en").meta.pages.organizations,
});

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: { q?: string; verified?: string };
}) {
  const { dict } = getTranslation();
  const query = sanitizeQuery(searchParams.q);
  const verifiedOnly = searchParams.verified === "1";

  const organizations = await listOrganizations({ q: query, verifiedOnly });

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.organizations.title}
        body={dict.organizations.intro}
        tone="muted"
      />

      <Container className="py-12 sm:py-16">
        <OrganizationSearch dict={dict} query={query} verifiedOnly={verifiedOnly} />

        <p aria-live="polite" className="mt-6 text-sm font-medium text-ink-600">
          {organizations.length === 1
            ? dict.organizations.resultsOne
            : fill(dict.organizations.resultsMany, { count: organizations.length })}
        </p>

        {organizations.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                dict={dict}
              />
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
            <SearchX aria-hidden className="mx-auto h-8 w-8 text-ink-400" />
            <h2 className="mt-4 text-lg font-semibold text-ink-900">
              {dict.organizations.emptyTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
              {dict.organizations.emptyBody}
            </p>
          </div>
        )}

        <p className="mt-10 flex items-start gap-2 text-sm text-ink-500">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {dict.organizations.disclaimer}
        </p>
      </Container>
    </>
  );
}
