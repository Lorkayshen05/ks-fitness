import type { Metadata } from "next";

import { Container } from "@/components/container";
import { SectionList } from "@/components/section-list";
import { Section } from "@/components/section";
import { legalUpdatedAt, termsSectionIds } from "@/data/content";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { htmlLang } from "@/types";

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  ...getDictionary("en").meta.pages.terms,
});

export default function TermsPage() {
  const { locale, dict } = getTranslation();

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.legal.terms.title}
        body={dict.legal.terms.intro}
        tone="muted"
      />
      <Container width="narrow" className="py-16 sm:py-20">
        <p className="mb-12 text-sm text-ink-500">
          {dict.legal.updated}{" "}
          <time dateTime={legalUpdatedAt}>
            {formatDate(legalUpdatedAt, htmlLang[locale])}
          </time>
        </p>
        <SectionList items={termsSectionIds.map((id) => dict.legal.terms.sections[id])} />
      </Container>
    </>
  );
}
