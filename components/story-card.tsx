import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/card";
import type { Dictionary } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { htmlLang, type Locale } from "@/types";
import type { StoryView } from "@/types";

/** First paragraph of the body, used as the card's standfirst. */
function excerpt(content: string) {
  const first = content.split("\n\n").find((block) => !block.startsWith("#")) ?? "";
  return first.length > 220 ? `${first.slice(0, 217).trimEnd()}…` : first;
}

export function StoryCard({
  story,
  dict,
  locale,
}: {
  story: StoryView;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <Card as="li" interactive>
      <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
        <time dateTime={story.createdAt}>
          {formatDate(story.createdAt, htmlLang[locale])}
        </time>
      </p>

      <h3 className="mt-3 text-lg font-semibold text-ink-900">
        <Link
          href={`/stories/${story.slug}`}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {story.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{excerpt(story.content)}</p>

      <Link
        href={`/stories/${story.slug}`}
        className="mt-6 inline-flex items-center gap-1 self-start rounded-full text-sm font-semibold text-brand-700 transition hover:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        tabIndex={-1}
        aria-hidden
      >
        {dict.common.readMore}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </Card>
  );
}
