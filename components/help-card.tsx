import {
  ArrowRight,
  BookOpen,
  Briefcase,
  HandCoins,
  Megaphone,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/card";
import { helpWayHref, type HelpWayId } from "@/data/content";
import type { Dictionary } from "@/lib/i18n";

const icons: Record<HelpWayId, typeof HandCoins> = {
  donate: HandCoins,
  volunteer: Users,
  educate: BookOpen,
  employ: Briefcase,
  goods: Package,
  advocate: Megaphone,
};

export function HelpCard({ id, dict }: { id: HelpWayId; dict: Dictionary }) {
  const way = dict.help.ways[id];
  const Icon = icons[id];

  return (
    <Card as="li" interactive>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon aria-hidden className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink-900">{way.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{way.body}</p>
      <Link
        href={helpWayHref[id]}
        className="mt-6 inline-flex items-center gap-1 self-start rounded-full text-sm font-semibold text-brand-700 transition hover:gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {way.action}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </Card>
  );
}
