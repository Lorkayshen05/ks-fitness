import type { Metadata } from "next";

import { Container } from "@/components/container";
import { SectionList } from "@/components/section-list";
import { Section } from "@/components/section";
import { aboutSectionIds } from "@/data/content";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  ...getDictionary("en").meta.pages.about,
});

export default function AboutPage() {
  const { dict } = getTranslation();

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.about.title}
        body={dict.about.intro}
        tone="muted"
      />
      <Container width="narrow" className="py-16 sm:py-20">
        <SectionList items={aboutSectionIds.map((id) => dict.about.sections[id])} />
      </Container>
    </>
  );
}
