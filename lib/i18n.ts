import { cookies } from "next/headers";

import { en, type Dictionary } from "@/data/dictionaries/en";
import { ms } from "@/data/dictionaries/ms";
import { zh } from "@/data/dictionaries/zh";
import { defaultLocale, isLocale, type Locale } from "@/types";

export const LOCALE_COOKIE = "locale";
/** One year, in seconds. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const dictionaries: Record<Locale, Dictionary> = { en, zh, ms };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Locale lives in a first-party cookie and is resolved on the server, so every
 * page renders its final text in one pass — no locale provider, no client
 * bundle for copy, and no hydration mismatch to guard against.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

/** The pair every server component needs. */
export function getTranslation(): { locale: Locale; dict: Dictionary } {
  const locale = getLocale();
  return { locale, dict: getDictionary(locale) };
}

export type { Dictionary };
