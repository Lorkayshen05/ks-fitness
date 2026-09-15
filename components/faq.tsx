import { Plus } from "lucide-react";

import type { FaqId } from "@/data/content";
import type { Dictionary } from "@/lib/i18n";

/**
 * A `<details>` accordion: open/close, keyboard operation and the correct
 * semantics come from the browser, so the component ships no JavaScript at all
 * and works before hydration.
 */
export function FAQ({ ids, dict }: { ids: readonly FaqId[]; dict: Dictionary }) {
  return (
    <dl className="divide-y divide-ink-200 border-y border-ink-200">
      {ids.map((id) => {
        const item = dict.faq.items[id];
        return (
          <div key={id}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-details-marker]:hidden">
                <dt className="text-base font-semibold text-ink-900">{item.q}</dt>
                <Plus
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <dd className="pb-6 pr-9 text-base leading-relaxed text-ink-600">{item.a}</dd>
            </details>
          </div>
        );
      })}
    </dl>
  );
}
