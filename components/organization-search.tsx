import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import type { Dictionary } from "@/lib/i18n";

/**
 * Filtering runs on the server through the URL: a plain GET form, no client
 * JavaScript, shareable and back-button correct. The submit button is the only
 * control needed, so the whole feature is one form element.
 */
export function OrganizationSearch({
  dict,
  query,
  verifiedOnly,
}: {
  dict: Dictionary;
  query: string;
  verifiedOnly: boolean;
}) {
  return (
    <form
      method="get"
      action="/organizations"
      role="search"
      className="flex flex-col gap-4 rounded-2xl border border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <label htmlFor="q" className="sr-only">
          {dict.organizations.searchLabel}
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        />
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          maxLength={80}
          placeholder={dict.organizations.searchPlaceholder}
          className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-base text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 px-1 text-sm font-medium text-ink-700">
        <input
          type="checkbox"
          name="verified"
          value="1"
          defaultChecked={verifiedOnly}
          className="h-4 w-4 rounded border-ink-300 text-brand-700 focus:ring-2 focus:ring-brand-500"
        />
        {dict.organizations.filterVerified}
      </label>

      <div className="flex gap-2">
        <Button type="submit" size="sm">
          {dict.organizations.apply}
        </Button>
        {(query || verifiedOnly) && (
          <Link
            href="/organizations"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {dict.organizations.reset}
          </Link>
        )}
      </div>
    </form>
  );
}
