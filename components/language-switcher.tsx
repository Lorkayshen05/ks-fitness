import { Languages } from "lucide-react";

import { setLocale } from "@/actions/locale";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { localeCodes, localeNames, locales, type Locale } from "@/types";

/**
 * A plain form posting to a server action, so switching language needs no
 * client JavaScript and no dictionary in the browser bundle. The current
 * language is a `aria-current` submit button rather than a select, which keeps
 * all three options reachable in one tab stop each.
 */
export function LanguageSwitcher({
  locale,
  dict,
  tone = "light",
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <form
      action={setLocale}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-0.5",
        tone === "dark" ? "bg-white/10" : "bg-ink-100",
        className,
      )}
    >
      <span className="sr-only" id="language-switcher-label">
        {dict.lang.label}
      </span>
      <Languages
        aria-hidden
        className={cn("ml-2 mr-1 h-4 w-4", tone === "dark" ? "text-ink-300" : "text-ink-500")}
      />
      {locales.map((option) => {
        const active = option === locale;
        return (
          <button
            key={option}
            type="submit"
            name="locale"
            value={option}
            aria-current={active ? "true" : undefined}
            aria-label={`${dict.lang.switchTo}: ${localeNames[option]}`}
            className={cn(
              "whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              active
                ? tone === "dark"
                  ? "bg-white text-ink-900"
                  : "bg-white text-ink-900 shadow-sm"
                : tone === "dark"
                  ? "text-ink-300 hover:text-white"
                  : "text-ink-600 hover:text-ink-900",
            )}
          >
            {localeCodes[option]}
          </button>
        );
      })}
    </form>
  );
}
