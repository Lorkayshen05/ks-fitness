import { Clock, LifeBuoy } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/container";
import { Form, type FormCopy } from "@/components/form";
import { Section } from "@/components/section";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { isSubmissionType, type SubmissionType } from "@/types";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  ...getDictionary("en").meta.pages.contact,
});

/**
 * One form serves both enquiry types. `?type=volunteer` — which is where the
 * volunteer calls to action across the site point — preselects that mode; the
 * reader can still switch it.
 */
export default function ContactPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const { dict } = getTranslation();
  const defaultType: SubmissionType = isSubmissionType(searchParams.type)
    ? searchParams.type
    : "general";

  const copy: FormCopy = {
    ...dict.form,
    privacyLinkLabel: dict.nav.legal.privacy,
  };

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.contact.title}
        body={dict.contact.intro}
        tone="muted"
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Form copy={copy} defaultType={defaultType} />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <Clock aria-hidden className="h-4 w-4 text-brand-700" />
                {dict.contact.responseTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {dict.contact.responseBody}
              </p>
            </div>
            <div className="rounded-2xl border border-sand-300 bg-sand-100 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-sand-700">
                <LifeBuoy aria-hidden className="h-4 w-4" />
                {dict.contact.urgentTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-700">
                {dict.contact.urgentBody}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
