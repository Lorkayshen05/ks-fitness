import type { Metadata } from "next";

import { Container } from "@/components/container";
import { FAQ } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { faqIds } from "@/data/content";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { defaultLocale } from "@/types";

export const metadata: Metadata = buildMetadata({
  path: "/faq",
  ...getDictionary("en").meta.pages.faq,
});

export default function FaqPage() {
  const { dict } = getTranslation();
  // Structured data is emitted in the crawler-facing default locale.
  const crawlerDict = getDictionary(defaultLocale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqIds.map((id) => ({
            "@type": "Question",
            name: crawlerDict.faq.items[id].q,
            acceptedAnswer: {
              "@type": "Answer",
              text: crawlerDict.faq.items[id].a,
            },
          })),
        }}
      />
      <Section
        headingLevel="h1"
        title={dict.faq.title}
        body={dict.faq.intro}
        tone="muted"
      />
      <Container width="narrow" className="py-16 sm:py-20">
        <FAQ ids={faqIds} dict={dict} />
      </Container>
    </>
  );
}
