import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Prose } from "@/components/prose";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { getStory } from "@/lib/queries";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { htmlLang } from "@/types";

export const dynamic = "force-dynamic";

/** The standfirst is the first non-heading paragraph, capped for metadata. */
function summarise(content: string) {
  const first = content.split("\n\n").find((block) => !block.startsWith("#")) ?? "";
  return first.slice(0, 200);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const story = await getStory(params.slug);
  if (!story) {
    return buildMetadata({
      path: `/stories/${params.slug}`,
      ...getDictionary("en").meta.pages.stories,
    });
  }

  return buildMetadata({
    path: `/stories/${story.slug}`,
    title: story.title,
    description: summarise(story.content),
    type: "article",
    publishedTime: story.createdAt,
  });
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  const { locale, dict } = getTranslation();
  const story = await getStory(params.slug);

  if (!story) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: summarise(story.content),
          datePublished: story.createdAt,
          inLanguage: "en",
          mainEntityOfPage: absoluteUrl(`/stories/${story.slug}`),
          publisher: { "@type": "Organization", name: dict.meta.siteName },
        }}
      />

      <div className="border-b border-ink-200 bg-ink-50">
        <Container width="narrow" className="py-12 sm:py-16">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-ink-600 transition hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            {dict.stories.backToList}
          </Link>

          <p className="mt-6 text-sm text-ink-500">
            {dict.common.published}{" "}
            <time dateTime={story.createdAt}>
              {formatDate(story.createdAt, htmlLang[locale])}
            </time>
          </p>

          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            {story.title}
          </h1>
        </Container>
      </div>

      <Container width="narrow" className="py-12 sm:py-16">
        {/* Local assets only — see the note on `Story.imageUrl` in the schema. */}
        {story.imageUrl?.startsWith("/") && (
          <Image
            src={story.imageUrl}
            alt=""
            width={1200}
            height={630}
            className="mb-10 w-full rounded-2xl border border-ink-200 object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        )}

        <article>
          <Prose content={story.content} />
        </article>
      </Container>
    </>
  );
}
