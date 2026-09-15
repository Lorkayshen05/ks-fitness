import { BadgeCheck, CircleDashed } from "lucide-react";

import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The badge states exactly what was checked and when, because "verified" on its
 * own is the kind of claim that quietly inflates. The date is the tooltip and
 * the detail page repeats it in full.
 */
export function VerifiedBadge({
  verified,
  dict,
  checkedAt,
  className,
}: {
  verified: boolean;
  dict: Dictionary;
  checkedAt?: string;
  className?: string;
}) {
  const Icon = verified ? BadgeCheck : CircleDashed;
  const label = verified ? dict.common.verified : dict.common.unverified;
  const title = verified ? dict.common.verifiedTitle : dict.common.unverifiedTitle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        verified
          ? "bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-200"
          : "bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200",
        className,
      )}
      title={checkedAt ? `${title} — ${checkedAt}` : title}
    >
      <Icon aria-hidden className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
