import { Card } from "@/components/card";
import type { Dictionary } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { htmlLang, type ImpactMetricView, type Locale } from "@/types";

/**
 * A figure is never shown without the source that produced it, so the source
 * line is part of the card rather than a footnote somewhere else.
 */
export function MetricCard({
  metric,
  dict,
  locale,
  showSource = true,
}: {
  metric: ImpactMetricView;
  dict: Dictionary;
  locale: Locale;
  showSource?: boolean;
}) {
  return (
    <Card as="li">
      <p className="text-3xl font-semibold tracking-tight text-brand-800 sm:text-4xl">
        {metric.value}
      </p>
      <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-ink-800">
        {metric.label}
      </p>
      {showSource && (
        <p className="mt-5 border-t border-ink-200 pt-4 text-xs leading-relaxed text-ink-500">
          <span className="font-semibold text-ink-600">{dict.common.source}: </span>
          {metric.source}
        </p>
      )}
      <p className="mt-2 text-xs text-ink-400">
        {dict.common.lastUpdated}{" "}
        <time dateTime={metric.updatedAt}>
          {formatDate(metric.updatedAt, htmlLang[locale])}
        </time>
      </p>
    </Card>
  );
}
