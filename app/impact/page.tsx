import { FileWarning, Info } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/container";
import { MetricCard } from "@/components/metric-card";
import { Section } from "@/components/section";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { listImpactMetrics } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/impact",
  ...getDictionary("en").meta.pages.impact,
});

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
  const { locale, dict } = getTranslation();
  const metrics = await listImpactMetrics();

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.impact.title}
        body={dict.impact.intro}
        tone="muted"
      />

      <Container className="py-12 sm:py-16">
        {metrics.length > 0 ? (
          <>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} dict={dict} locale={locale} />
              ))}
            </ul>
            <p className="mt-8 flex items-start gap-2 text-sm text-ink-500">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              {dict.impact.sourceNote}
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
            <FileWarning aria-hidden className="mx-auto h-8 w-8 text-ink-400" />
            <h2 className="mt-4 text-lg font-semibold text-ink-900">
              {dict.impact.emptyTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
              {dict.impact.emptyBody}
            </p>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-sand-300 bg-sand-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-sand-700">
            {dict.impact.caveatTitle}
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-sand-700">
            {dict.impact.caveatBody}
          </p>
        </div>
      </Container>
    </>
  );
}
