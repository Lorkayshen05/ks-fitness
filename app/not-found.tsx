import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { navHref, navIds } from "@/data/content";
import { getTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { dict } = getTranslation();

  return (
    <Container width="narrow" className="py-24 text-center sm:py-32">
      <Compass aria-hidden className="mx-auto h-10 w-10 text-brand-600" />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink-900">
        {dict.notFound.title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-600">
        {dict.notFound.body}
      </p>

      <div className="mt-8 flex justify-center">
        <Button href="/">{dict.notFound.cta}</Button>
      </div>

      <nav aria-label={dict.footer.exploreHeading} className="mt-12">
        <ul className="flex flex-wrap justify-center gap-2">
          {navIds.map((id) => (
            <li key={id}>
              <Link
                href={navHref[id]}
                className="inline-flex rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {dict.nav.links[id]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
