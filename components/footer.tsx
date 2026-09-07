"use client";

import Link from "next/link";
import { Clock, Dumbbell, MapPin } from "lucide-react";

import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { dict } = useLocale();

  const links = [
    { href: "/schedule", label: dict.nav.links.schedule },
    { href: "/trainers", label: dict.nav.links.trainers },
    { href: "/gallery", label: dict.nav.links.gallery },
    { href: "/#pricing", label: dict.nav.links.pricing },
  ];

  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Dumbbell className="h-5 w-5 text-white" aria-hidden />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              {dict.nav.brand}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{dict.footer.tagline}</p>
        </div>

        <nav className="flex flex-col gap-2.5 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-400" aria-hidden />
            {dict.footer.address}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-pink-400" aria-hidden />
            {dict.footer.hours}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-slate-600">
        © 2024 {dict.nav.brand}. {dict.footer.rights}
      </p>
    </footer>
  );
}
