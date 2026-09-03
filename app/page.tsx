"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Music2,
  Navigation,
  Quote,
  Star,
  Timer,
  Users,
  Utensils,
  X,
} from "lucide-react";

import {
  business,
  formatMinutes,
  fullAddress,
  google,
  heatLabels,
  marqueeWords,
  menu,
  menuCategories,
  navLinks,
  openingHours,
  queue,
  reviews,
  TIMEZONE,
  type HeatLevel,
  type MenuCategoryId,
  type MenuItem,
} from "@/lib/gepuklah";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turmeric-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

interface KualaLumpurNow {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  /** Minutes since midnight. */
  minutes: number;
}

/**
 * The shop's clock, not the visitor's. Someone checking from London should
 * still be told whether the Damansara Jaya counter is open right now.
 */
function getKualaLumpurNow(reference = new Date()): KualaLumpurNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(reference);

  const lookup = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const day = WEEKDAY_INDEX[lookup("weekday")] ?? reference.getDay();
  const hour = Number(lookup("hour")) % 24;
  const minute = Number(lookup("minute"));

  return { day, minutes: hour * 60 + minute };
}

type StatusState = "open" | "closing" | "closed";

interface Status {
  state: StatusState;
  /** Short label for the pill, e.g. "Open now". */
  label: string;
  /** The detail line, e.g. "until 8:30 PM". */
  detail: string;
}

/** Minutes before closing at which we switch the badge to "Last orders". */
const CLOSING_SOON_WINDOW = 60;

function getStatus(now: KualaLumpurNow): Status {
  const today = openingHours.find((entry) => entry.day === now.day);

  if (today && today.open !== null && today.close !== null) {
    if (now.minutes >= today.open && now.minutes < today.close) {
      const closesIn = today.close - now.minutes;
      return closesIn <= CLOSING_SOON_WINDOW
        ? {
            state: "closing",
            label: "Last orders",
            detail: `closing ${formatMinutes(today.close)}`,
          }
        : {
            state: "open",
            label: "Open now",
            detail: `until ${formatMinutes(today.close)}`,
          };
    }

    if (now.minutes < today.open) {
      return {
        state: "closed",
        label: "Closed",
        detail: `opens ${formatMinutes(today.open)} today`,
      };
    }
  }

  // Walk forward to whichever day opens next.
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = (now.day + offset) % 7;
    const entry = openingHours.find((candidate) => candidate.day === day);
    if (entry && entry.open !== null) {
      const when = offset === 1 ? "tomorrow" : entry.short;
      return {
        state: "closed",
        label: "Closed",
        detail: `opens ${when} ${formatMinutes(entry.open)}`,
      };
    }
  }

  return { state: "closed", label: "Closed", detail: "check back soon" };
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Server render and first client paint must match, so anything that depends on
 * "now" stays neutral until this flips true.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Highlights the nav link for whichever section is currently in view. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* -------------------------------------------------------------------------- */
/*  Presentational primitives                                                 */
/* -------------------------------------------------------------------------- */

/** Fades content up the first time it scrolls into view. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // `reveal` is the hook the <noscript> override in the layout targets, so
      // the page still reads without JavaScript.
      className={cn("reveal", className, shown ? "animate-fade-up" : "opacity-0")}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function StarRow({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  // Clip a filled row over an empty row so 3.7 renders as 3.7, not 4.
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <span className={cn("relative inline-flex align-middle", className)}>
      <span className="flex gap-0.5 text-charcoal-500">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star key={index} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-turmeric-400"
        style={{ width: `${percent}%` }}
        aria-hidden
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            size={size}
            fill="currentColor"
            strokeWidth={0}
            className="shrink-0"
          />
        ))}
      </span>
    </span>
  );
}

function HeatMeter({ level, className }: { level: HeatLevel; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      title={heatLabels[level]}
    >
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((step) => (
          <Flame
            key={step}
            size={14}
            className={step <= level ? "text-chilli-400" : "text-charcoal-600"}
            fill={step <= level ? "currentColor" : "none"}
            strokeWidth={step <= level ? 0 : 2}
          />
        ))}
      </span>
      <span className="sr-only">Heat level: </span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-cream-300">
        {heatLabels[level]}
      </span>
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-chilli-600/50 bg-chilli-800/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-turmeric-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] text-cream-50 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lede ? <p className="mt-4 text-base leading-relaxed text-cream-200">{lede}</p> : null}
    </div>
  );
}

/** Flat illustration mark: a chop in the mortar under sambal. */
function GepukMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label="">
      <defs>
        <radialGradient id="gp-glow" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#E23A20" />
          <stop offset="100%" stopColor="#741507" />
        </radialGradient>
        <linearGradient id="gp-chop" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FFD84D" />
          <stop offset="100%" stopColor="#F0A500" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="118" r="104" fill="url(#gp-glow)" />
      <circle
        cx="120"
        cy="118"
        r="104"
        fill="none"
        stroke="#FFC61A"
        strokeWidth="3"
        strokeDasharray="10 9"
        opacity="0.55"
      />

      {/* Mortar */}
      <path
        d="M46 128h148c0 40-33 66-74 66S46 168 46 128Z"
        fill="#2D211D"
        stroke="#0F0B09"
        strokeWidth="4"
      />
      <ellipse cx="120" cy="128" rx="74" ry="20" fill="#3D2D26" />

      {/* Smashed chop, crisp edges up */}
      <path
        d="M64 126c2-16 14-26 26-24 4-11 18-16 27-9 8-9 24-7 29 4 13-5 26 5 26 18 0 4-1 8-3 11H64Z"
        fill="url(#gp-chop)"
        stroke="#9E1E0C"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Sambal, pounded through it */}
      <path
        d="M78 112c8-5 14 2 21-1s10-7 17-4 9 9 17 7 12-8 19-5"
        fill="none"
        stroke="#C42B14"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Cashews */}
      <path
        d="M92 141c-7 0-12 5-12 10s5 8 11 6c-4-3-4-11 1-16Z"
        fill="#F7EAD3"
      />
      <path
        d="M146 148c-7 0-12 5-12 10s5 8 11 6c-4-3-4-11 1-16Z"
        fill="#F7EAD3"
      />

      {/* Chilli */}
      <path
        d="M166 70c9-6 19-4 22 2 3 5-2 11-8 13"
        fill="none"
        stroke="#9BCB3B"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M176 86c10 16 7 40-8 54-9 8-20 10-25 4-6-7-2-22 8-36 8-11 18-21 25-22Z"
        fill="#E23A20"
        stroke="#741507"
        strokeWidth="3"
      />
    </svg>
  );
}

/** The rotating "smashed to order" seal behind the hero art. */
function SealBadge({ className }: { className?: string }) {
  const text = "· SMASHED TO ORDER · SAMBAL GAJUS · DAMANSARA JAYA ";

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <path
          id="gp-seal-path"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
        />
      </defs>
      <text
        className="font-display"
        fill="#FFC61A"
        fontSize="15"
        letterSpacing="1.5"
      >
        <textPath href="#gp-seal-path" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Live status badge                                                         */
/* -------------------------------------------------------------------------- */

const STATUS_TONE: Record<StatusState, { dot: string; text: string; shell: string }> = {
  open: {
    dot: "bg-pandan-400",
    text: "text-pandan-400",
    shell: "border-pandan-400/40 bg-pandan-400/10",
  },
  closing: {
    dot: "bg-turmeric-400",
    text: "text-turmeric-300",
    shell: "border-turmeric-400/40 bg-turmeric-400/10",
  },
  closed: {
    dot: "bg-chilli-400",
    text: "text-chilli-400",
    shell: "border-chilli-500/40 bg-chilli-800/25",
  },
};

/**
 * Re-derives the status every minute so a page left open over the dinner rush
 * still tells the truth.
 */
function useLiveStatus() {
  const mounted = useMounted();
  const [now, setNow] = useState<KualaLumpurNow | null>(null);

  useEffect(() => {
    const tick = () => setNow(getKualaLumpurNow());
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(
    () => (mounted && now ? getStatus(now) : null),
    [mounted, now],
  );
}

function StatusBadge({
  size = "md",
  showLocation = true,
  className,
}: {
  size?: "sm" | "md";
  showLocation?: boolean;
  className?: string;
}) {
  const status = useLiveStatus();
  const tone = STATUS_TONE[status?.state ?? "open"];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border backdrop-blur",
        status ? tone.shell : "border-charcoal-600 bg-charcoal-800/60",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
        className,
      )}
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {status?.state !== "closed" ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-70",
              status ? tone.dot : "bg-charcoal-500",
              status ? "animate-live-ping" : "",
            )}
          />
        ) : null}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            status ? tone.dot : "bg-charcoal-500",
          )}
        />
      </span>

      {status ? (
        <span className="font-semibold tracking-tight text-cream-100">
          <span className={tone.text}>{status.label}</span>
          <span className="text-cream-200"> · {status.detail}</span>
          {showLocation ? (
            <span className="hidden text-cream-300 sm:inline">
              {" "}
              · {business.address.line2}
            </span>
          ) : null}
        </span>
      ) : (
        // Neutral placeholder: identical on the server and the first paint.
        <span className="font-semibold tracking-tight text-cream-300">
          Checking today’s hours…
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Queue info dialog                                                         */
/* -------------------------------------------------------------------------- */

const QUEUE_LEVEL: Record<
  (typeof queue.windows)[number]["level"],
  { label: string; bar: string; chip: string }
> = {
  calm: {
    label: "Quiet",
    bar: "w-1/4 bg-pandan-400",
    chip: "border-pandan-400/40 text-pandan-400",
  },
  busy: {
    label: "Busy",
    bar: "w-2/3 bg-turmeric-400",
    chip: "border-turmeric-400/40 text-turmeric-300",
  },
  packed: {
    label: "Packed",
    bar: "w-full bg-chilli-500",
    chip: "border-chilli-500/50 text-chilli-400",
  },
};

function QueueDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Keep Tab inside the dialog while it is open.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close queue info"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-charcoal-950/80 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="queue-title"
        className="relative max-h-[88vh] w-full max-w-2xl animate-pop-in overflow-y-auto rounded-t-3xl border border-charcoal-600 bg-charcoal-900 shadow-lift sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-charcoal-700 bg-charcoal-900/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-turmeric-300">
              Queue info
            </p>
            <h2
              id="queue-title"
              className="mt-1 font-display text-2xl uppercase leading-none text-cream-50 sm:text-3xl"
            >
              {queue.headline}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={cn(
              "rounded-full border border-charcoal-600 p-2 text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
              focusRing,
            )}
          >
            <X size={18} />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <p className="text-sm leading-relaxed text-cream-200">{queue.summary}</p>

          <StatusBadge size="sm" />

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300">
              Typical week
            </h3>
            <ul className="mt-3 space-y-3">
              {queue.windows.map((window) => {
                const tone = QUEUE_LEVEL[window.level];
                return (
                  <li
                    key={window.label}
                    className="rounded-2xl border border-charcoal-700 bg-charcoal-800/60 p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-display text-lg uppercase leading-none text-cream-50">
                        {window.label}
                      </p>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          tone.chip,
                        )}
                      >
                        {tone.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-cream-100">
                      {window.time}
                      <span className="text-cream-300"> · {window.wait}</span>
                    </p>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-charcoal-700">
                      <div className={cn("h-full rounded-full", tone.bar)} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-cream-300">
                      {window.note}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300">
              Before you come
            </h3>
            <ul className="mt-3 space-y-2">
              {queue.tips.map((tip) => (
                <li key={tip} className="flex gap-3 text-sm leading-relaxed text-cream-200">
                  <Flame size={16} className="mt-0.5 shrink-0 text-chilli-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-charcoal-700 pt-5 sm:flex-row">
            <a
              href={business.maps.directions}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-turmeric-400 px-5 py-3 text-sm font-bold uppercase tracking-wide text-charcoal-950 transition hover:bg-turmeric-300",
                focusRing,
              )}
            >
              <Navigation size={16} />
              Get directions
            </a>
            <a
              href="#menu"
              onClick={onClose}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-charcoal-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-cream-100 transition hover:border-turmeric-400 hover:text-turmeric-300",
                focusRing,
              )}
            >
              <Utensils size={16} />
              See the menu
            </a>
          </div>

          <p className="text-[11px] leading-relaxed text-cream-300/70">
            Wait times are typical ranges, not a live counter — they move with the
            weather, the crowd and how much chicken is left.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-chilli-600 text-turmeric-300 shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)]">
        <Flame size={18} fill="currentColor" strokeWidth={0} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl uppercase tracking-tight text-cream-50">
          {business.name}
        </span>
        {!compact ? (
          <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-turmeric-400 min-[380px]:block">
            {business.byline}
          </span>
        ) : null}
      </span>
    </span>
  );
}

function Nav({ onOpenQueue }: { onOpenQueue: () => void }) {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.id), []);
  const active = useActiveSection(sectionIds);

  // A resize past the mobile breakpoint should not leave the panel stranded.
  useEffect(() => {
    if (!mobileOpen) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const close = () => query.matches && setMobileOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-charcoal-700 bg-charcoal-950/95 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#top"
          className={cn("rounded-xl transition hover:opacity-90", focusRing)}
        >
          <Wordmark />
          <span className="sr-only">
            {business.name} {business.byline} — back to top
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition",
                active === link.id
                  ? "bg-charcoal-800 text-turmeric-300"
                  : "text-cream-200 hover:bg-charcoal-800/70 hover:text-cream-50",
                focusRing,
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <StatusBadge
            size="sm"
            showLocation={false}
            className="hidden xl:inline-flex"
          />

          <button
            type="button"
            onClick={onOpenQueue}
            className={cn(
              "group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-turmeric-400 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-charcoal-950 shadow-[0_6px_0_-1px_#C98400] transition hover:-translate-y-0.5 hover:bg-turmeric-300 active:translate-y-0 active:shadow-[0_2px_0_-1px_#C98400] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm",
              focusRing,
            )}
          >
            <Timer size={16} />
            Queue Info
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
            className={cn(
              "shrink-0 rounded-full border border-charcoal-600 p-2.5 text-cream-100 transition hover:border-turmeric-400 lg:hidden",
              focusRing,
            )}
          >
            {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="animate-pop-in border-t border-charcoal-800 bg-charcoal-950/97 px-5 pb-6 pt-4 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 font-display text-2xl uppercase text-cream-100 transition hover:bg-charcoal-800 hover:text-turmeric-300",
                  focusRing,
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border-t border-charcoal-800 pt-4">
            <StatusBadge size="sm" />
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

const HERO_SPECS = [
  {
    title: "Boneless chicken chop",
    body: "Whole thigh, marinated overnight, fried to order and smashed flat in the mortar.",
  },
  {
    title: "Cashew (gajus) sambal",
    body: "Toasted cashews pounded into cili padi, garlic and belacan. Nutty, thick, properly hot.",
  },
];

function Hero({ onOpenQueue }: { onOpenQueue: () => void }) {
  return (
    <section
      id="top"
      className="bg-grain relative overflow-hidden bg-charcoal-950 pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-40"
    >
      {/* Warm bloom behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] animate-flame-pulse rounded-full bg-chilli-600/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-turmeric-500/15 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-turmeric-400/40 bg-turmeric-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-turmeric-300">
              <MapPin size={12} />
              {business.kicker}
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 font-display text-[3.4rem] uppercase leading-[0.85] text-cream-50 sm:text-7xl lg:text-[5.6rem]">
              Smashed
              <span className="block text-chilli-500">to order,</span>
              <span className="relative inline-block pb-3 text-turmeric-400">
                sambal gajus
                {/* Hand-drawn underline under the phrase that sells the shop. */}
                <svg
                  aria-hidden
                  viewBox="0 0 420 18"
                  className="absolute bottom-0 left-0 h-2.5 w-full text-chilli-500 sm:h-3"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 12c70-8 150-10 232-7 60 2 120 5 180 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="block">on top.</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-200">
              {business.intro}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-7">
              <StatusBadge />
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full bg-chilli-600 px-7 py-4 font-display text-lg uppercase tracking-wide text-cream-50 shadow-[0_7px_0_-1px_#741507] transition hover:-translate-y-0.5 hover:bg-chilli-500 active:translate-y-0 active:shadow-[0_2px_0_-1px_#741507]",
                  focusRing,
                )}
              >
                <Utensils size={20} />
                See the menu
              </a>
              <button
                type="button"
                onClick={onOpenQueue}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border-2 border-charcoal-600 px-7 py-4 font-display text-lg uppercase tracking-wide text-cream-100 transition hover:border-turmeric-400 hover:text-turmeric-300",
                  focusRing,
                )}
              >
                <Timer size={20} />
                Queue info
              </button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-10 grid gap-4 border-t border-charcoal-700 pt-8 sm:grid-cols-2">
              {HERO_SPECS.map((spec) => (
                <div key={spec.title}>
                  <dt className="font-display text-base uppercase tracking-wide text-turmeric-300">
                    {spec.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-cream-300">
                    {spec.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Art column */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          {/* The square is inset so the two stat chips overlap the padding ring
              rather than the seal lettering behind the mark. */}
          <div className="relative aspect-square px-12 py-10 sm:px-16 sm:py-14">
            <div className="relative h-full w-full">
              <SealBadge className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] opacity-70" />
              <GepukMark className="absolute inset-[14%] h-[72%] w-[72%] drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]" />
            </div>
          </div>

          <div className="pointer-events-none absolute left-0 top-2 -rotate-6 rounded-2xl border border-charcoal-600 bg-charcoal-900/90 px-3 py-2.5 shadow-lift backdrop-blur sm:px-4 sm:py-3">
            <p className="font-display text-2xl leading-none text-turmeric-400 sm:text-3xl">
              {google.rating.toFixed(1)}
            </p>
            <StarRow value={google.rating} size={11} className="mt-1" />
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cream-300 sm:text-[10px]">
              on Google
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-1 right-0 rotate-3 rounded-2xl border border-chilli-600/60 bg-chilli-800/85 px-3 py-2.5 shadow-lift backdrop-blur sm:px-4 sm:py-3">
            <p className="font-display text-lg leading-none text-cream-50 sm:text-xl">
              Sold out by 8:30
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-turmeric-300 sm:text-[10px]">
              Most nights. Come early.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Loud ticker band that separates the hero from the menu. */
function Marquee() {
  const strip = [...marqueeWords, ...marqueeWords];

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y-2 border-charcoal-950 bg-chilli-600 py-3"
    >
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {strip.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8">
            <span className="font-display text-xl uppercase tracking-wide text-cream-50 sm:text-2xl">
              {word}
            </span>
            <Flame
              size={16}
              className="shrink-0 text-turmeric-300"
              fill="currentColor"
              strokeWidth={0}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Menu                                                                      */
/* -------------------------------------------------------------------------- */

type MenuFilter = MenuCategoryId | "favourites";

const MENU_FILTERS: Array<{ id: MenuFilter; label: string; blurb: string }> = [
  { id: "favourites", label: "Favourites", blurb: "What regulars order." },
  ...menuCategories.map((category) => ({
    id: category.id as MenuFilter,
    label: category.label,
    blurb: category.blurb,
  })),
];

function formatPrice(value: number) {
  return `RM ${value.toFixed(2)}`;
}

function MenuCard({
  item,
  expanded,
  onToggle,
}: {
  item: MenuItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `menu-detail-${item.id}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-charcoal-900 transition duration-300",
        expanded
          ? "border-turmeric-400/70 shadow-lift"
          : "border-charcoal-700 hover:-translate-y-1 hover:border-chilli-500/60 hover:shadow-lift",
      )}
    >
      {item.badge ? (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-turmeric-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-charcoal-950">
          {item.badge}
        </span>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        {item.malayName ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-chilli-400">
            {item.malayName}
          </p>
        ) : null}

        <h3 className="mt-1 pr-20 font-display text-2xl uppercase leading-none text-cream-50">
          {item.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-200">{item.blurb}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-charcoal-700 pt-4">
          <HeatMeter level={item.heat} />
          <span className="font-display text-xl leading-none text-turmeric-400">
            {formatPrice(item.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className={cn(
            "mt-4 inline-flex items-center justify-between gap-2 rounded-full border border-charcoal-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
            focusRing,
          )}
        >
          {expanded ? "Hide details" : "What’s in it"}
          <ChevronRight
            size={14}
            className={cn("transition-transform", expanded && "rotate-90")}
          />
        </button>

        {expanded ? (
          <div id={panelId} className="animate-pop-in pt-4">
            <p className="text-sm leading-relaxed text-cream-200">{item.detail}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {item.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full border border-charcoal-600 bg-charcoal-800 px-2.5 py-1 text-[11px] font-semibold text-cream-300"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function MenuSection() {
  const [filter, setFilter] = useState<MenuFilter>("favourites");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const items = useMemo(
    () =>
      filter === "favourites"
        ? menu.filter((item) => item.favourite)
        : menu.filter((item) => item.category === filter),
    [filter],
  );

  const activeFilter = MENU_FILTERS.find((entry) => entry.id === filter);

  return (
    <section id="menu" className="relative bg-charcoal-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The board"
            title={
              <>
                Everything gets
                <span className="text-chilli-500"> smashed </span>
                in front of you
              </>
            }
            lede="Pick a section, tap a dish to see what goes into it. Heat levels are set at the counter — say the word and the kitchen will take it up or down."
          />
        </Reveal>

        <Reveal delay={80}>
          <div
            role="group"
            aria-label="Filter the menu"
            className="mt-10 flex flex-wrap gap-2"
          >
            {MENU_FILTERS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                aria-pressed={filter === entry.id}
                onClick={() => {
                  setFilter(entry.id);
                  setExpandedId(null);
                }}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition",
                  filter === entry.id
                    ? "border-turmeric-400 bg-turmeric-400 text-charcoal-950"
                    : "border-charcoal-600 text-cream-200 hover:border-chilli-500 hover:text-cream-50",
                  focusRing,
                )}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </Reveal>

        {activeFilter ? (
          <p
            className="mt-4 text-sm font-semibold uppercase tracking-wide text-cream-300"
            aria-live="polite"
          >
            {activeFilter.blurb}{" "}
            <span className="text-cream-300/60">
              {items.length} {items.length === 1 ? "dish" : "dishes"}
            </span>
          </p>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index * 60, 240)}>
              <MenuCard
                item={item}
                expanded={expandedId === item.id}
                onToggle={() =>
                  setExpandedId((current) => (current === item.id ? null : item.id))
                }
              />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-cream-300/70">
          Prices are indicative and may change — please confirm at the counter.
          Sambal gajus and bayam goreng are made in limited daily batches.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reviews                                                                   */
/* -------------------------------------------------------------------------- */

const AUTOPLAY_MS = 7000;

function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + reviews.length) % reviews.length);
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const previous = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, next, paused, reducedMotion]);

  const active = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-charcoal-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-chilli-700/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Word of mouth"
            title={
              <>
                What the queue
                <span className="text-turmeric-400"> says</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Google rating stats */}
          <Reveal>
            <div className="rounded-3xl border border-charcoal-700 bg-charcoal-900 p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300">
                Google rating
              </p>

              <div className="mt-3 flex items-end gap-3">
                <span className="font-display text-6xl leading-none text-turmeric-400">
                  {google.rating.toFixed(1)}
                </span>
                <span className="pb-2 font-display text-2xl leading-none text-cream-300">
                  / {google.outOf}
                </span>
              </div>

              <StarRow value={google.rating} size={22} className="mt-3" />

              <p className="mt-3 text-sm leading-relaxed text-cream-200">
                {google.reviewCount === null
                  ? "Rated by diners on Google Maps."
                  : `From ${google.reviewCount.toLocaleString("en-MY")} Google reviews.`}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: Utensils, label: "Ordered most", value: "Ayam Gepuk" },
                  { icon: Flame, label: "Talked about", value: "Sambal Gajus" },
                  { icon: Clock, label: "Peak wait", value: "20–30 min" },
                  { icon: Users, label: "Best time", value: "After 2 PM" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-charcoal-700 bg-charcoal-800/60 p-3"
                  >
                    <stat.icon size={16} className="text-chilli-400" />
                    <dt className="mt-2 text-[10px] font-bold uppercase tracking-wider text-cream-300">
                      {stat.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-cream-50">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={google.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "mt-6 inline-flex items-center gap-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-turmeric-300 transition hover:text-turmeric-200",
                  focusRing,
                )}
              >
                Read the reviews on Google
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          {/* Slider */}
          <Reveal delay={80}>
            <div
              role="group"
              aria-roledescription="carousel"
              aria-label="Customer reviews"
              className="flex h-full flex-col rounded-3xl border border-charcoal-700 bg-charcoal-900 p-7"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  next();
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  previous();
                }
              }}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const start = touchStartX.current;
                const end = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (start === null || end === undefined) return;
                const delta = end - start;
                if (Math.abs(delta) < 48) return;
                if (delta < 0) next();
                else previous();
              }}
            >
              <Quote size={36} className="text-chilli-600" fill="currentColor" strokeWidth={0} />

              <div
                key={active.id}
                className="mt-4 flex flex-1 animate-pop-in flex-col"
                aria-live="polite"
                aria-atomic="true"
              >
                <StarRow value={active.rating} size={18} />
                <p className="mt-4 flex-1 text-lg leading-relaxed text-cream-100">
                  “{active.quote}”
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal-700 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-chilli-600 font-display text-lg text-cream-50">
                      {active.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-cream-50">
                        {active.name}
                      </span>
                      <span className="block text-xs text-cream-300">{active.meta}</span>
                    </span>
                  </div>
                  <span className="rounded-full border border-turmeric-400/40 bg-turmeric-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-turmeric-300">
                    {active.dish}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex gap-2" role="tablist" aria-label="Choose a review">
                  {reviews.map((review, dotIndex) => (
                    <button
                      key={review.id}
                      type="button"
                      role="tab"
                      aria-selected={dotIndex === index}
                      aria-label={`Review ${dotIndex + 1} of ${reviews.length}`}
                      onClick={() => go(dotIndex)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        dotIndex === index
                          ? "w-8 bg-turmeric-400"
                          : "w-2 bg-charcoal-600 hover:bg-charcoal-500",
                        focusRing,
                      )}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    className={cn(
                      "rounded-full border border-charcoal-600 p-2.5 text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
                      focusRing,
                    )}
                  >
                    <ChevronLeft size={18} />
                    <span className="sr-only">Previous review</span>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className={cn(
                      "rounded-full border border-charcoal-600 p-2.5 text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
                      focusRing,
                    )}
                  >
                    <ChevronRight size={18} />
                    <span className="sr-only">Next review</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Visit                                                                     */
/* -------------------------------------------------------------------------- */

function HoursTable() {
  const mounted = useMounted();
  const today = mounted ? getKualaLumpurNow().day : null;

  return (
    <ul className="divide-y divide-charcoal-700">
      {openingHours.map((entry) => {
        const isToday = entry.day === today;
        return (
          <li
            key={entry.day}
            className={cn(
              "flex items-center justify-between gap-4 px-4 py-2.5 text-sm",
              isToday && "bg-turmeric-400/10",
            )}
          >
            <span
              className={cn(
                "font-semibold",
                isToday ? "text-turmeric-300" : "text-cream-200",
              )}
            >
              {entry.label}
              {isToday ? (
                <span className="ml-2 rounded-full bg-turmeric-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-charcoal-950">
                  Today
                </span>
              ) : null}
            </span>
            <span
              className={cn(
                "tabular-nums",
                isToday ? "font-bold text-cream-50" : "text-cream-300",
              )}
            >
              {entry.open === null || entry.close === null
                ? "Closed"
                : `${formatMinutes(entry.open)} – ${formatMinutes(entry.close)}`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Stylised street card standing in for an embedded map — links straight out. */
function MapCard() {
  return (
    <a
      href={business.maps.place}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-charcoal-700 bg-charcoal-800 transition hover:border-turmeric-400",
        focusRing,
      )}
    >
      <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden>
        <rect width="400" height="260" fill="#211816" />
        {/* Street grid */}
        <g stroke="#3D2D26" strokeWidth="10">
          <path d="M-10 70h420M-10 190h420M90 -10v280M280 -10v280" />
        </g>
        <g stroke="#523D33" strokeWidth="2">
          <path d="M-10 130h420M185 -10v280M340 -10v280" />
        </g>
        {/* The block the shop sits on */}
        <rect x="90" y="70" width="190" height="120" fill="#2D211D" />
        <text
          x="100"
          y="92"
          className="font-display"
          fill="#C9AF8B"
          fontSize="11"
          letterSpacing="1"
        >
          JALAN SS 22/11
        </text>
        <text
          x="100"
          y="180"
          className="font-display"
          fill="#C9AF8B"
          fontSize="11"
          letterSpacing="1"
        >
          DAMANSARA JAYA
        </text>
        {/* Pin */}
        <g transform="translate(185 130)">
          <circle r="30" fill="#E23A20" opacity="0.18" />
          <circle r="18" fill="#E23A20" opacity="0.3" />
          <path
            d="M0-22c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16Z"
            fill="#C42B14"
            stroke="#FFC61A"
            strokeWidth="2.5"
          />
          <circle cy="-6" r="5.5" fill="#FFC61A" />
        </g>
      </svg>

      <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-charcoal-600 bg-charcoal-950/85 px-4 py-3 backdrop-blur">
        <span className="text-sm font-bold uppercase tracking-wide text-cream-50">
          Open in Google Maps
        </span>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-turmeric-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}

const GETTING_HERE = [
  {
    title: "Parking",
    body: "Street bays along Jalan SS 22/11 fill by noon. The lots one street over are a two-minute walk and usually open.",
  },
  {
    title: "Dine in or take away",
    body: "Counter service, limited seating. Take away is packed sambal-separate so the chicken stays crisp.",
  },
  {
    title: "Large orders",
    body: "Groups of six and up are fastest before 11:30 AM or after 2:00 PM, outside the two rushes.",
  },
];

function VisitSection({ onOpenQueue }: { onOpenQueue: () => void }) {
  return (
    <section id="visit" className="relative bg-charcoal-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Come find us"
            title={
              <>
                Jalan SS 22/11,
                <span className="block text-chilli-500">Damansara Jaya</span>
              </>
            }
            lede="One shop, one counter, open daily until 8:30 PM. Walk in, order at the front, wait for your name."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          <Reveal className="flex">
            <div className="flex w-full flex-col gap-6 rounded-3xl border border-charcoal-700 bg-charcoal-950 p-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300">
                  Address
                </p>
                <address className="mt-2 not-italic">
                  <span className="block font-display text-2xl uppercase leading-tight text-cream-50">
                    {business.address.line1}
                  </span>
                  <span className="mt-1 block text-base text-cream-200">
                    {business.address.line2}
                    <br />
                    {business.address.postcode}
                    <br />
                    {business.address.state}
                  </span>
                </address>
              </div>

              <StatusBadge />

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={business.maps.directions}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-turmeric-400 px-5 py-3.5 font-display text-base uppercase tracking-wide text-charcoal-950 shadow-[0_6px_0_-1px_#C98400] transition hover:-translate-y-0.5 hover:bg-turmeric-300 active:translate-y-0 active:shadow-[0_2px_0_-1px_#C98400]",
                    focusRing,
                  )}
                >
                  <Navigation size={18} />
                  Directions
                </a>
                <button
                  type="button"
                  onClick={onOpenQueue}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-charcoal-600 px-5 py-3.5 font-display text-base uppercase tracking-wide text-cream-100 transition hover:border-turmeric-400 hover:text-turmeric-300",
                    focusRing,
                  )}
                >
                  <Timer size={18} />
                  Queue info
                </button>
              </div>

              <div className="rounded-2xl border border-charcoal-700 bg-charcoal-900">
                <p className="border-b border-charcoal-700 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300">
                  Opening hours
                  <span className="ml-2 font-semibold normal-case tracking-normal text-cream-300/60">
                    Malaysia time
                  </span>
                </p>
                <HoursTable />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex">
            <div className="flex w-full flex-col gap-6">
              <MapCard />

              <dl className="grid gap-4 rounded-3xl border border-charcoal-700 bg-charcoal-950 p-7">
                {GETTING_HERE.map((entry) => (
                  <div key={entry.title}>
                    <dt className="font-display text-base uppercase tracking-wide text-turmeric-300">
                      {entry.title}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-cream-300">
                      {entry.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-charcoal-700 bg-charcoal-950">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark />
            <p className="mt-4 max-w-sm font-display text-2xl uppercase leading-none text-cream-50">
              {business.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-300">
              Ayam gepuk, smashed to order in Damansara Jaya. Come hungry, come
              early.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "rounded-full border border-charcoal-600 p-2.5 text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
                  focusRing,
                )}
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={business.social.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "rounded-full border border-charcoal-600 p-2.5 text-cream-200 transition hover:border-turmeric-400 hover:text-turmeric-300",
                  focusRing,
                )}
              >
                <Music2 size={18} />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-turmeric-300">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={cn(
                      "rounded text-sm font-semibold text-cream-200 transition hover:text-turmeric-300",
                      focusRing,
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={google.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "inline-flex items-center gap-1 rounded text-sm font-semibold text-cream-200 transition hover:text-turmeric-300",
                    focusRing,
                  )}
                >
                  Google listing
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-turmeric-300">
              Find us
            </p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-cream-200">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              {business.address.postcode}
              <br />
              {business.address.state}
            </address>
            <a
              href={business.maps.directions}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "mt-4 inline-flex items-center gap-1.5 rounded text-sm font-bold uppercase tracking-wide text-turmeric-300 transition hover:text-turmeric-200",
                focusRing,
              )}
            >
              <Navigation size={14} />
              Get directions
            </a>
            <div className="mt-4">
              <StatusBadge size="sm" showLocation={false} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-charcoal-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream-300/70">
            © {new Date().getFullYear()} {business.name} {business.byline}. All
            rights reserved.
          </p>
          <p className="text-xs text-cream-300/70">{fullAddress}</p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function GepuklahLandingPage() {
  const [queueOpen, setQueueOpen] = useState(false);
  const openQueue = useCallback(() => setQueueOpen(true), []);
  const closeQueue = useCallback(() => setQueueOpen(false), []);

  return (
    <>
      <a
        href="#menu"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-turmeric-400 focus:px-5 focus:py-3 focus:font-bold focus:uppercase focus:text-charcoal-950",
          focusRing,
        )}
      >
        Skip to the menu
      </a>

      <Nav onOpenQueue={openQueue} />

      <main>
        <Hero onOpenQueue={openQueue} />
        <Marquee />
        <MenuSection />
        <ReviewsSection />
        <VisitSection onOpenQueue={openQueue} />
      </main>

      <Footer />

      <QueueDialog open={queueOpen} onClose={closeQueue} />
    </>
  );
}
