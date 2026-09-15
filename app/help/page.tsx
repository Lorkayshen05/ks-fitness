import type { Metadata } from "next";

import { HelpCard } from "@/components/help-card";
import { Section } from "@/components/section";
import { helpWayIds } from "@/data/content";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/help",
  ...getDictionary("en").meta.pages.help,
});

export default function HelpPage() {
  const { dict } = getTranslation();

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.help.title}
        body={dict.help.intro}
        tone="muted"
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpWayIds.map((id) => (
            <HelpCard key={id} id={id} dict={dict} />
          ))}
        </ul>
      </Section>
    </>
  );
}
