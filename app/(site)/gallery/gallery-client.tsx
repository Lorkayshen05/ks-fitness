"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";

// Masonry needs fixed row heights: aspect-ratio and row-span fight each other,
// so the grid sets an explicit auto-row height and tiles only claim spans.
const SPAN_CLASSES: Record<GalleryItem["span"], string> = {
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

export function GalleryClient() {
  const { dict } = useLocale();
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (category === "all" ? GALLERY : GALLERY.filter((i) => i.category === category)),
    [category],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  // Changing the filter invalidates the open index, so close the lightbox.
  useEffect(() => setOpenIndex(null), [category]);

  const active = openIndex === null ? null : visible[openIndex];

  return (
    <section className="px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.gallery.eyebrow}
          title={dict.gallery.title}
          subtitle={dict.gallery.subtitle}
          icon={Images}
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(["all", ...GALLERY_CATEGORIES] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              aria-pressed={category === key}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                category === key
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:text-white",
              )}
            >
              {dict.gallery.categories[key]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 [grid-auto-rows:132px] sm:gap-4 sm:grid-cols-3 sm:[grid-auto-rows:168px] lg:grid-cols-4 lg:[grid-auto-rows:190px]">
          {visible.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`${dict.gallery.openAria}: ${dict.gallery.captions[item.id]}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all hover:border-purple-500/40",
                SPAN_CLASSES[item.span],
              )}
            >
              <Tile item={item} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-2">
                <p className="text-sm font-medium leading-snug text-white">
                  {dict.gallery.captions[item.id]}
                </p>
                <Maximize2
                  className="h-4 w-4 shrink-0 text-white/60 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">{dict.gallery.placeholderNote}</p>
      </div>

      {active ? (
        <div className="fixed inset-0 z-[70] flex flex-col bg-slate-950/[0.98] p-4 backdrop-blur-md sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              {dict.gallery.counter
                .replace("{current}", String((openIndex ?? 0) + 1))
                .replace("{total}", String(visible.length))}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label={dict.gallery.close}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>

          <div className="flex flex-1 items-center gap-3 py-4 sm:gap-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={dict.gallery.previous}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10 sm:p-3"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <figure className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-1 flex-col">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10">
                <Tile item={active} />
              </div>
              <figcaption className="mt-4 text-center text-sm text-slate-300">
                {dict.gallery.captions[active.id]}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={dict.gallery.next}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10 sm:p-3"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * Renders the real photo when the item has a `src`, otherwise a branded
 * gradient panel so the layout and interactions are final before shoot day.
 */
function Tile({ item }: { item: GalleryItem }) {
  const { dict } = useLocale();

  if (item.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- gallery images may be remote; next/image would need per-host config.
      <img
        src={item.src}
        alt={dict.gallery.captions[item.id]}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className={cn("h-full w-full bg-gradient-to-br", item.gradient)}>
      <div className="flex h-full w-full items-center justify-center">
        <Images className="h-10 w-10 text-white/15" aria-hidden />
      </div>
    </div>
  );
}
