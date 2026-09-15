import { HeartHandshake } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { navHref, navIds } from "@/data/content";
import { getTranslation } from "@/lib/i18n";

export function Header() {
  const { locale, dict } = getTranslation();
  const links = navIds.map((id) => ({ href: navHref[id], label: dict.nav.links[id] }));

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg font-semibold tracking-tight text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <HeartHandshake aria-hidden className="h-6 w-6 text-brand-700" />
          <span>{dict.meta.siteName}</span>
        </Link>

        <nav aria-label={dict.nav.home} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden lg:block">
            <LanguageSwitcher locale={locale} dict={dict} />
          </div>
          <Button
            href="/organizations"
            size="sm"
            className="hidden whitespace-nowrap sm:inline-flex lg:hidden xl:inline-flex"
          >
            {dict.nav.cta}
          </Button>
          <MobileNav
            links={links}
            openLabel={dict.common.menu}
            closeLabel={dict.common.close}
          >
            <LanguageSwitcher locale={locale} dict={dict} />
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
