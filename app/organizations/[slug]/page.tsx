import { ArrowLeft, ExternalLink, Globe, HandCoins, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { DonateButton, type DonateCopy } from "@/components/donate-button";
import { JsonLd } from "@/components/json-ld";
import { VerifiedBadge } from "@/components/verified-badge";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { getOrganization } from "@/lib/queries";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, hostnameOf } from "@/lib/utils";
import { VERIFICATION_CHECKED_AT } from "@/lib/verification";
import { htmlLang } from "@/types";

/**
 * Language is a cookie preference and the record comes from the database, so
 * this page is rendered per request rather than prerendered.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const organization = await getOrganization(params.slug);
  if (!organization) {
    return buildMetadata({
      path: `/organizations/${params.slug}`,
      ...getDictionary("en").meta.pages.organizations,
    });
  }

  return buildMetadata({
    path: `/organizations/${organization.slug}`,
    title: organization.name,
    description: organization.description.slice(0, 200),
  });
}

export default async function OrganizationPage({
  params,
}: {
  params: { slug: string };
}) {
  const { locale, dict } = getTranslation();
  const organization = await getOrganization(params.slug);

  if (!organization) notFound();

  const donateCopy: DonateCopy = { ...dict.donate, close: dict.common.close };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NGO",
          name: organization.name,
          description: organization.description,
          url: organization.website,
          sameAs: [organization.website],
          areaServed: "Malaysia",
          mainEntityOfPage: absoluteUrl(`/organizations/${organization.slug}`),
        }}
      />

      <div className="border-b border-ink-200 bg-ink-50">
        <Container className="py-12 sm:py-16">
          <Link
            href="/organizations"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-ink-600 transition hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            {dict.organization.backToList}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <VerifiedBadge
              verified={organization.verified}
              dict={dict}
              checkedAt={organization.verified ? VERIFICATION_CHECKED_AT : undefined}
            />
            {organization.verified && (
              <span className="text-xs text-ink-500">
                {dict.organization.verifiedOn}{" "}
                <time dateTime={VERIFICATION_CHECKED_AT}>
                  {formatDate(VERIFICATION_CHECKED_AT, htmlLang[locale])}
                </time>
              </span>
            )}
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            {organization.name}
          </h1>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">
              {dict.organization.aboutHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              {organization.description}
            </p>

            <p className="mt-8 flex items-start gap-2 rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm leading-relaxed text-ink-600">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
              {dict.organization.notice}
            </p>
          </div>

          <aside className="rounded-2xl border border-ink-200 bg-white p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
              {dict.organization.linksHeading}
            </h2>

            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="flex items-center gap-1.5 font-semibold text-ink-900">
                  <Globe aria-hidden className="h-4 w-4 text-brand-700" />
                  {dict.organization.website}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 break-all text-brand-700 underline underline-offset-2 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {hostnameOf(organization.website)}
                    <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                    <span className="sr-only">{dict.common.externalLink}</span>
                  </a>
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-1.5 font-semibold text-ink-900">
                  <HandCoins aria-hidden className="h-4 w-4 text-brand-700" />
                  {dict.organization.donation}
                </dt>
                <dd className="mt-1.5 break-all text-ink-600">
                  {hostnameOf(organization.donationUrl)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <DonateButton
                name={organization.name}
                donationUrl={organization.donationUrl}
                verified={organization.verified}
                copy={donateCopy}
                size="md"
                className="w-full"
              />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
