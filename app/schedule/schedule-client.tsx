"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Users,
  X,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import {
  CLASS_TYPES,
  CLASS_TYPE_STYLES,
  DAY_INDEXES,
  LEVELS,
  SCHEDULE,
  TRAINERS,
  getTrainer,
  type ClassSession,
  type ClassType,
  type DayIndex,
  type Level,
  type TrainerId,
} from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { addMinutes, cn } from "@/lib/utils";

const BOOKINGS_STORAGE_KEY = "ks-fitness:bookings";

type Filters = {
  type: ClassType | "all";
  level: Level | "all";
  trainer: TrainerId | "all";
};

const NO_FILTERS: Filters = { type: "all", level: "all", trainer: "all" };

function readStoredBookings(): string[] {
  try {
    const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop ids that no longer exist in the timetable.
    const valid = new Set(SCHEDULE.map((s) => s.id));
    return parsed.filter((id): id is string => typeof id === "string" && valid.has(id));
  } catch {
    return [];
  }
}

/** Today as a Monday-first index, matching DayIndex. */
function todayIndex(): DayIndex {
  return ((new Date().getDay() + 6) % 7) as DayIndex;
}

export function ScheduleClient() {
  const { dict, mounted } = useLocale();
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [bookings, setBookings] = useState<string[]>([]);
  const [activeDay, setActiveDay] = useState<DayIndex>(0);
  const [selected, setSelected] = useState<ClassSession | null>(null);

  // Bookings and "today" are both client-only facts: the server has no access
  // to storage and no shared clock, so both are adopted after mount.
  useEffect(() => {
    setBookings(readStoredBookings());
    setActiveDay(todayIndex());
  }, []);

  const persist = useCallback((next: string[]) => {
    setBookings(next);
    try {
      window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures; the in-memory booking still shows.
    }
  }, []);

  const book = useCallback(
    (id: string) => persist(bookings.includes(id) ? bookings : [...bookings, id]),
    [bookings, persist],
  );
  const cancel = useCallback(
    (id: string) => persist(bookings.filter((b) => b !== id)),
    [bookings, persist],
  );

  const visible = useMemo(
    () =>
      SCHEDULE.filter(
        (s) =>
          (filters.type === "all" || s.type === filters.type) &&
          (filters.level === "all" || s.level === filters.level) &&
          (filters.trainer === "all" || s.trainer === filters.trainer),
      ),
    [filters],
  );

  const byDay = useMemo(() => {
    const map = new Map<DayIndex, ClassSession[]>();
    for (const day of DAY_INDEXES) map.set(day, []);
    for (const session of visible) map.get(session.day)!.push(session);
    for (const day of DAY_INDEXES) {
      map.get(day)!.sort((a, b) => a.start.localeCompare(b.start));
    }
    return map;
  }, [visible]);

  const hasFilters =
    filters.type !== "all" || filters.level !== "all" || filters.trainer !== "all";

  const bookedSessions = useMemo(
    () =>
      bookings
        .map((id) => SCHEDULE.find((s) => s.id === id))
        .filter((s): s is ClassSession => Boolean(s))
        .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)),
    [bookings],
  );

  return (
    <section className="px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.schedule.eyebrow}
          title={dict.schedule.title}
          subtitle={dict.schedule.subtitle}
          icon={CalendarDays}
        />

        <Filters
          filters={filters}
          setFilters={setFilters}
          hasFilters={hasFilters}
          shown={visible.length}
          total={SCHEDULE.length}
        />

        {bookedSessions.length > 0 ? (
          <BookingSummary sessions={bookedSessions} onCancel={cancel} />
        ) : null}

        {visible.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-lg font-bold text-white">{dict.schedule.noResults.title}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              {dict.schedule.noResults.body}
            </p>
            <button
              type="button"
              onClick={() => setFilters(NO_FILTERS)}
              className="mt-6 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {dict.schedule.filters.clear}
            </button>
          </div>
        ) : (
          <>
            {/* Desktop: the full week side by side. */}
            <div className="mt-10 hidden grid-cols-7 gap-3 xl:grid">
              {DAY_INDEXES.map((day) => (
                <div key={day} className="flex flex-col gap-3">
                  <div
                    className={cn(
                      "rounded-xl border px-3 py-2 text-center",
                      mounted && day === todayIndex()
                        ? "border-purple-500/40 bg-purple-500/10"
                        : "border-white/10 bg-white/[0.03]",
                    )}
                  >
                    <p className="text-sm font-bold text-white">{dict.schedule.dayNames[day]}</p>
                  </div>
                  {byDay.get(day)!.map((session) => (
                    <ClassCard
                      key={session.id}
                      session={session}
                      booked={bookings.includes(session.id)}
                      onBook={() => setSelected(session)}
                      onCancel={() => cancel(session.id)}
                      compact
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Below xl: pick a day, then read it as a list. */}
            <div className="mt-10 xl:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {DAY_INDEXES.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setActiveDay(day)}
                    aria-pressed={activeDay === day}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      activeDay === day
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "border border-white/10 bg-white/5 text-slate-300 hover:text-white",
                    )}
                  >
                    {dict.schedule.dayNames[day]}
                    <span className="ml-1.5 text-xs opacity-70">
                      {byDay.get(day)!.length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {byDay.get(activeDay)!.length === 0 ? (
                  <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-slate-400">
                    {dict.schedule.noResults.title}
                  </p>
                ) : (
                  byDay
                    .get(activeDay)!
                    .map((session) => (
                      <ClassCard
                        key={session.id}
                        session={session}
                        booked={bookings.includes(session.id)}
                        onBook={() => setSelected(session)}
                        onCancel={() => cancel(session.id)}
                      />
                    ))
                )}
              </div>
            </div>
          </>
        )}

        <Legend />

        <p className="mt-6 text-center text-xs text-slate-600">{dict.schedule.note}</p>
      </div>

      {selected ? (
        <BookingDialog
          session={selected}
          onClose={() => setSelected(null)}
          onConfirm={() => book(selected.id)}
        />
      ) : null}
    </section>
  );
}

function Filters({
  filters,
  setFilters,
  hasFilters,
  shown,
  total,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  hasFilters: boolean;
  shown: number;
  total: number;
}) {
  const { dict } = useLocale();
  const uid = useId();

  const selectClass =
    "w-full appearance-none rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 pr-10 text-sm font-semibold text-white outline-none transition-colors focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30";

  return (
    <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`${uid}-type`} className="mb-2 block text-sm font-medium text-slate-300">
            {dict.schedule.filters.type}
          </label>
          <div className="relative">
            <select
              id={`${uid}-type`}
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value as ClassType | "all" })
              }
              className={selectClass}
            >
              <option value="all" className="bg-slate-900">
                {dict.schedule.filters.all}
              </option>
              {CLASS_TYPES.map((t) => (
                <option key={t} value={t} className="bg-slate-900">
                  {dict.classTypes[t]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-level`} className="mb-2 block text-sm font-medium text-slate-300">
            {dict.schedule.filters.level}
          </label>
          <div className="relative">
            <select
              id={`${uid}-level`}
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value as Level | "all" })}
              className={selectClass}
            >
              <option value="all" className="bg-slate-900">
                {dict.schedule.filters.all}
              </option>
              {LEVELS.map((l) => (
                <option key={l} value={l} className="bg-slate-900">
                  {dict.levels[l]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-coach`} className="mb-2 block text-sm font-medium text-slate-300">
            {dict.schedule.filters.trainer}
          </label>
          <div className="relative">
            <select
              id={`${uid}-coach`}
              value={filters.trainer}
              onChange={(e) =>
                setFilters({ ...filters, trainer: e.target.value as TrainerId | "all" })
              }
              className={selectClass}
            >
              <option value="all" className="bg-slate-900">
                {dict.schedule.filters.all}
              </option>
              {TRAINERS.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900">
                  {dict.trainers.people[t.id].name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          {dict.schedule.filters.showing
            .replace("{shown}", String(shown))
            .replace("{total}", String(total))}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => setFilters(NO_FILTERS)}
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          >
            {dict.schedule.filters.clear}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ClassCard({
  session,
  booked,
  onBook,
  onCancel,
  compact = false,
}: {
  session: ClassSession;
  booked: boolean;
  onBook: () => void;
  onCancel: () => void;
  compact?: boolean;
}) {
  const { dict } = useLocale();
  const style = CLASS_TYPE_STYLES[session.type];
  const trainer = getTrainer(session.trainer);
  const taken = session.taken + (booked ? 1 : 0);
  const spotsLeft = Math.max(0, session.capacity - taken);
  const isFull = spotsLeft === 0 && !booked;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/[0.03] p-4 transition-colors",
        booked ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/10",
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", style.dot)} aria-hidden />
        <p className="text-sm font-bold text-white">{session.start}</p>
        <span className="text-xs text-slate-500">
          – {addMinutes(session.start, session.durationMin)}
        </span>
      </div>

      <p className={cn("mt-2 font-semibold text-white", compact ? "text-sm" : "text-base")}>
        {dict.classTypes[session.type]}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            style.chip,
          )}
        >
          {dict.levels[session.level]}
        </span>
        <span className="text-xs text-slate-500">
          {session.durationMin} {dict.schedule.minutes}
        </span>
      </div>

      <Link
        href={`/trainers/${trainer.slug}`}
        className="mt-2 block text-xs text-slate-400 transition-colors hover:text-purple-300"
      >
        {dict.schedule.withCoach} {dict.trainers.people[session.trainer].name}
      </Link>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <Users className="h-3.5 w-3.5 text-slate-500" aria-hidden />
        <span className={cn(isFull ? "text-red-400" : "text-slate-400")}>
          {isFull
            ? dict.schedule.full
            : spotsLeft === 1
              ? dict.schedule.oneSpotLeft
              : dict.schedule.spotsLeft.replace("{n}", String(spotsLeft))}
        </span>
      </div>

      {booked ? (
        <div className="mt-3 space-y-1.5">
          <p className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-300">
            <Check className="h-3.5 w-3.5" aria-hidden />
            {dict.schedule.booked}
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-full px-3 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:text-red-400"
          >
            {dict.schedule.cancel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onBook}
          disabled={isFull}
          className={cn(
            "mt-3 w-full rounded-full px-3 py-2 text-xs font-bold transition-transform",
            isFull
              ? "cursor-not-allowed border border-white/10 bg-white/5 text-slate-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-[1.03]",
          )}
        >
          {isFull ? dict.schedule.waitlist : dict.schedule.book}
        </button>
      )}
    </div>
  );
}

function BookingSummary({
  sessions,
  onCancel,
}: {
  sessions: ClassSession[];
  onCancel: (id: string) => void;
}) {
  const { dict } = useLocale();

  return (
    <div className="mt-6 rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        {dict.schedule.yourBookings}
      </h2>
      <ul className="mt-4 space-y-2">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-slate-900/40 px-4 py-2.5 text-sm"
          >
            <span className="font-semibold text-white">{dict.schedule.dayNames[s.day]}</span>
            <span className="text-slate-400">{s.start}</span>
            <span className="text-slate-300">{dict.classTypes[s.type]}</span>
            <button
              type="button"
              onClick={() => onCancel(s.id)}
              className="ml-auto text-xs font-medium text-slate-500 transition-colors hover:text-red-400"
            >
              {dict.schedule.cancel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Legend() {
  const { dict } = useLocale();
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      <span className="text-xs uppercase tracking-wider text-slate-600">
        {dict.schedule.legend}
      </span>
      {CLASS_TYPES.map((t) => (
        <span key={t} className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className={cn("h-2 w-2 rounded-full", CLASS_TYPE_STYLES[t].dot)} aria-hidden />
          {dict.classTypes[t]}
        </span>
      ))}
    </div>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function BookingDialog({
  session,
  onClose,
  onConfirm,
}: {
  session: ClassSession;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { dict } = useLocale();
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Stop the page behind the dialog from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onClose]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = dict.schedule.booking.errors.name;
    if (!EMAIL_PATTERN.test(email.trim())) next.email = dict.schedule.booking.errors.email;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    // Swap for a POST to your booking system.
    timeoutRef.current = setTimeout(() => {
      onConfirm();
      setStatus("success");
    }, 700);
  };

  const trainerName = dict.trainers.people[session.trainer].name;
  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-xl border bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-slate-600 focus:ring-2",
      hasError
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/25"
        : "border-white/10 focus:border-purple-400/60 focus:ring-purple-500/30",
    );

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:items-center">
      <button
        type="button"
        aria-label={dict.schedule.booking.close}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="relative w-full max-w-md rounded-3xl border border-purple-500/25 bg-slate-900 p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.schedule.booking.close}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        {status === "success" ? (
          <div role="status" className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" aria-hidden />
            <h2 className="mt-4 text-xl font-bold text-white">
              {dict.schedule.booking.successTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{dict.schedule.booking.successBody}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white"
            >
              {dict.schedule.booking.done}
            </button>
          </div>
        ) : (
          <>
            <h2 id={`${uid}-title`} className="pr-8 text-xl font-bold text-white">
              {dict.schedule.booking.title}
            </h2>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
              <p className="font-semibold text-white">{dict.classTypes[session.type]}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-400">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {dict.schedule.dayNames[session.day]} · {session.start}–
                {addMinutes(session.start, session.durationMin)}
              </p>
              <p className="mt-1 text-slate-400">
                {dict.schedule.withCoach} {trainerName} · {dict.levels[session.level]}
              </p>
            </div>

            <form onSubmit={submit} noValidate className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor={`${uid}-name`}
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  {dict.schedule.booking.nameLabel}
                </label>
                <input
                  ref={firstFieldRef}
                  id={`${uid}-name`}
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.schedule.booking.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name ? <p className="mt-2 text-sm text-red-400">{errors.name}</p> : null}
              </div>

              <div>
                <label
                  htmlFor={`${uid}-email`}
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  {dict.schedule.booking.emailLabel}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.schedule.booking.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email ? <p className="mt-2 text-sm text-red-400">{errors.email}</p> : null}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {dict.schedule.booking.confirming}
                  </>
                ) : (
                  dict.schedule.booking.confirm
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
