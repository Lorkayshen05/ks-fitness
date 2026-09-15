"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The only navigation state that needs JavaScript. It is a client component
 * because the panel must close when a link inside it changes the route — the
 * header lives in the layout, so it is never remounted by navigation.
 *
 * `children` is rendered by the server (the language switcher and its form
 * action), so nothing extra is pulled into the client bundle.
 */
export function MobileNav({
  links,
  openLabel,
  closeLabel,
  children,
}: {
  links: { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-ink-200 bg-white px-5 pb-6 pt-2 shadow-lg sm:px-8"
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-lg px-2 py-3 text-base font-medium text-ink-800 transition hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-ink-200 pt-4">{children}</div>
      </div>
    </div>
  );
}
