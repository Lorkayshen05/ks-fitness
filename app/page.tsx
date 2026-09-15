import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { FAQ } from "@/components/faq";
import { HelpCard } from "@/components/help-card";
import { JsonLd } from "@/components/json-ld";
import { MetricCard } from "@/components/metric-card";
import { OrganizationCard } from "@/components/organization-card";
import { Section } from "@/components/section";
import { StoryCard } from "@/components/story-card";
import { helpWayIds, homeFaqIds, missionPointIds } from "@/data/content";
import { getDictionary, getTranslation } from "@/lib/i18n";
import { listImpactMetrics, listOrganizations, listStories } from "@/lib/queries";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title: getDictionary("en").meta.title,
  description: getDictionary("en").meta.description,
  absoluteTitle: true,
});

/** The homepage reflects live database content, so it renders per request. */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { locale, dict } = getTranslation();

  const [organizations, metrics, stories] = await Promise.all([
    listOrganizations({ verifiedOnly: true }),
    listImpactMetrics(),
    listStories(3),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: dict.meta.siteName,
          url: absoluteUrl("/"),
          description: dict.meta.description,
          inLanguage: ["en", "zh-Hans", "ms-MY"],
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_15%_-10%,rgba(79,164,159,0.35),transparent)]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              {dict.home.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-200">
              {dict.home.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/organizations" variant="inverse">
                {dict.home.hero.primary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button
                href="/about"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                {dict.home.hero.secondary}
              </Button>
            </div>
            <p className="mt-8 flex max-w-xl items-start gap-2 text-sm text-ink-300">
              <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              {dict.home.hero.note}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <Section
        id="mission"
        eyebrow={dict.home.mission.eyebrow}
        title={dict.home.mission.title}
        body={dict.home.mission.body}
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {missionPointIds.map((id) => {
            const point = dict.home.mission.points[id];
            return (
              <li
                key={id}
                className="rounded-2xl border-l-2 border-brand-300 bg-ink-50 p-6"
              >
                <h3 className="text-base font-semibold text-ink-900">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{point.body}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* How to help */}
      <Section
        id="help"
        tone="muted"
        eyebrow={dict.home.help.eyebrow}
        title={dict.home.help.title}
        body={dict.home.help.body}
        actions={
          <Button href="/help" variant="secondary" size="sm">
            {dict.common.viewAll}
          </Button>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpWayIds.slice(0, 3).map((id) => (
            <HelpCard key={id} id={id} dict={dict} />
          ))}
        </ul>
      </Section>

      {/* Verified organisations */}
      <Section
        id="organizations"
        eyebrow={dict.home.organizations.eyebrow}
        title={dict.home.organizations.title}
        body={dict.home.organizations.body}
        actions={
          <Button href="/organizations" variant="secondary" size="sm">
            {dict.common.viewAll}
          </Button>
        }
      >
        {organizations.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {organizations.slice(0, 3).map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                dict={dict}
              />
            ))}
          </ul>
        ) : (
          <p className="text-ink-500">{dict.common.empty}</p>
        )}
      </Section>

      {/* Impact */}
      <Section
        id="impact"
        tone="muted"
        eyebrow={dict.home.impact.eyebrow}
        title={dict.home.impact.title}
        body={dict.home.impact.body}
        actions={
          <Button href="/impact" variant="secondary" size="sm">
            {dict.common.viewAll}
          </Button>
        }
      >
        {metrics.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.slice(0, 3).map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                dict={dict}
                locale={locale}
                showSource={false}
              />
            ))}
          </ul>
        ) : (
          <p className="text-ink-500">{dict.impact.emptyBody}</p>
        )}
      </Section>

      {/* Stories */}
      <Section
        id="stories"
        eyebrow={dict.home.stories.eyebrow}
        title={dict.home.stories.title}
        body={dict.home.stories.body}
        actions={
          <Button href="/stories" variant="secondary" size="sm">
            {dict.common.viewAll}
          </Button>
        }
      >
        {stories.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} dict={dict} locale={locale} />
            ))}
          </ul>
        ) : (
          <p className="text-ink-500">{dict.stories.emptyBody}</p>
        )}
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        tone="muted"
        eyebrow={dict.home.faq.eyebrow}
        title={dict.home.faq.title}
        body={dict.home.faq.body}
        actions={
          <Button href="/faq" variant="secondary" size="sm">
            {dict.common.viewAll}
          </Button>
        }
      >
        <FAQ ids={homeFaqIds} dict={dict} />
      </Section>

      {/* Final CTA */}
      <section className="bg-brand-800 py-16 text-white sm:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.home.cta.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                {dict.home.cta.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/organizations" variant="inverse">
                {dict.home.cta.primary}
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {dict.home.cta.secondary}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
