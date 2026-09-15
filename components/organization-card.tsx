import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/card";
import { DonateButton, type DonateCopy } from "@/components/donate-button";
import { VerifiedBadge } from "@/components/verified-badge";
import type { Dictionary } from "@/lib/i18n";
import { hostnameOf } from "@/lib/utils";
import { VERIFICATION_CHECKED_AT } from "@/lib/verification";
import type { OrganizationView } from "@/types";

export function OrganizationCard({
  organization,
  dict,
}: {
  organization: OrganizationView;
  dict: Dictionary;
}) {
  const donateCopy: DonateCopy = { ...dict.donate, close: dict.common.close };

  return (
    <Card as="li" interactive>
      <div className="flex flex-wrap items-center gap-3">
        <VerifiedBadge
          verified={organization.verified}
          dict={dict}
          checkedAt={organization.verified ? VERIFICATION_CHECKED_AT : undefined}
        />
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
          <Globe aria-hidden className="h-3.5 w-3.5" />
          {hostnameOf(organization.website)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-ink-900">
        <Link
          href={`/organizations/${organization.slug}`}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {organization.name}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-ink-600">
        {organization.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <DonateButton
          name={organization.name}
          donationUrl={organization.donationUrl}
          verified={organization.verified}
          copy={donateCopy}
        />
        <Link
          href={`/organizations/${organization.slug}`}
          className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {dict.organizations.details}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
