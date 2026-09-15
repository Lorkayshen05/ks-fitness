import { BookOpen, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { StoryCard } from "@/components/story-card";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { listStories } from "@/lib/queries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/stories",
  ...getDictionary("en").meta.pages.stories,
});

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const { locale, dict } = getTranslation();
  const stories = await listStories();

  return (
    <>
      <Section
        headingLevel="h1"
        title={dict.stories.title}
        body={dict.stories.intro}
        tone="muted"
      />

      <Container className="py-12 sm:py-16">
        <div className="mb-10 flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <div>
            <h2 className="text-sm font-semibold text-brand-900">
              {dict.stories.editorialTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-700">
              {dict.stories.editorialBody}
            </p>
          </div>
        </div>

        {stories.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} dict={dict} locale={locale} />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-12 text-center">
            <BookOpen aria-hidden className="mx-auto h-8 w-8 text-ink-400" />
            <h2 className="mt-4 text-lg font-semibold text-ink-900">
              {dict.stories.emptyTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
              {dict.stories.emptyBody}
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
