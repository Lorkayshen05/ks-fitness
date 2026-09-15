import { HeartHandshake, Info } from "lucide-react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Container } from "@/components/container";
import { legalIds, navHref, navIds } from "@/data/content";
import { getTranslation } from "@/lib/i18n";

const legalHref: Record<(typeof legalIds)[number], string> = {
  privacy: "/privacy",
  terms: "/terms",
};

export function Footer() {
  const { locale, dict } = getTranslation();

  return (
    <footer className="border-t border-ink-200 bg-ink-900 text-ink-300">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="flex items-center gap-2 text-base font-semibold text-white">
              <HeartHandshake aria-hidden className="h-5 w-5 text-brand-300" />
              {dict.meta.siteName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{dict.footer.blurb}</p>
            <div className="mt-6">
              <LanguageSwitcher locale={locale} dict={dict} tone="dark" />
            </div>
          </div>

          <nav aria-label={dict.footer.exploreHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {dict.footer.exploreHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navIds.map((id) => (
                <li key={id}>
                  <Link
                    href={navHref[id]}
                    className="rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {dict.nav.links[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legalHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {dict.footer.legalHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalIds.map((id) => (
                <li key={id}>
                  <Link
                    href={legalHref[id]}
                    className="rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {dict.nav.legal[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
          <div>
            <h2 className="text-sm font-semibold text-white">
              {dict.footer.disclaimerHeading}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed">{dict.footer.disclaimer}</p>
          </div>
        </div>

        <p className="mt-8 text-xs text-ink-400">{dict.footer.rights}</p>
      </Container>
    </footer>
  );
}
