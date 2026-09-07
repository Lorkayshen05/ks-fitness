"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  defaultLocale,
  getDictionary,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/lib/dictionary";

const LOCALE_STORAGE_KEY = "ks-fitness:locale";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  toggleLocale: () => void;
  /** False until the client has mounted — gate anything time- or storage-derived on it. */
  mounted: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // The server and the first client paint both render `defaultLocale`; a stored
  // preference is adopted in an effect after mount. That ordering is what keeps
  // every page free of hydration mismatches.
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) setLocale(stored);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — ignore.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => {
      const next: Locale = current === "en" ? "zh" : "en";
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures; the in-memory switch still works.
      }
      return next;
    });
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dict: getDictionary(locale), toggleLocale, mounted }),
    [locale, toggleLocale, mounted],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return context;
}
