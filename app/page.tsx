"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  CalendarDays,
  Calculator as CalculatorIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Crown,
  Dumbbell,
  Flame,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Target,
  TrendingDown,
  User,
  X,
  Zap,
} from "lucide-react";

import {
  defaultLocale,
  getDictionary,
  isLocale,
  localeLabels,
  type Dictionary,
  type Locale,
} from "@/lib/dictionary";

/* -------------------------------------------------------------------------- */
/*  Shared helpers                                                            */
/* -------------------------------------------------------------------------- */

const LOCALE_STORAGE_KEY = "ks-fitness:locale";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Section heading used by every block below the hero. */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: typeof Flame;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar({
  dict,
  locale,
  onToggleLocale,
}: {
  dict: Dictionary;
  locale: Locale;
  onToggleLocale: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#calculator", label: dict.nav.links.calculator },
    { href: "#pricing", label: dict.nav.links.pricing },
    { href: "#free-pass", label: dict.nav.links.pass },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
            <Dumbbell className="h-5 w-5 text-white" aria-hidden />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            {dict.nav.brand}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLocale}
            aria-label={dict.nav.toggleAria}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white"
          >
            <Languages className="h-4 w-4" aria-hidden />
            <span>{localeLabels[locale]}</span>
          </button>

          <a
            href="#free-pass"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {dict.nav.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={dict.nav.menuAria}
            aria-expanded={menuOpen}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#free-pass"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              {dict.nav.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-purple-600/25 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-[-8rem] top-40 h-[26rem] w-[26rem] rounded-full bg-pink-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgb(2_6_23)_100%)]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {dict.hero.badge}
        </span>

        <h1 className="mt-6 animate-fade-up text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {dict.hero.titleLead}
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            {dict.hero.titleAccent}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-slate-400 sm:text-lg">
          {dict.hero.subtitle}
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#free-pass"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-600/30 transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {dict.hero.primaryCta}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <a
            href="#calculator"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-slate-100 backdrop-blur transition-colors hover:border-purple-400/40 hover:bg-white/10 sm:w-auto"
          >
            <CalculatorIcon className="h-5 w-5" aria-hidden />
            {dict.hero.secondaryCta}
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {dict.hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</dd>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Goal calculator                                                           */
/* -------------------------------------------------------------------------- */

type Intensity = "light" | "moderate" | "intense";

/** Metabolic equivalents (MET) for each training intensity. */
const MET_BY_INTENSITY: Record<Intensity, number> = {
  light: 4.5,
  moderate: 7.5,
  intense: 10.5,
};

/** Energy released by burning one kilogram of body fat, in kcal. */
const KCAL_PER_KG = 7700;

const WEEKS_PER_MONTH = 52 / 12;

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    onChange(Number.isFinite(next) ? next : min);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onBlur={() => onChange(clamp(value, min, max))}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30"
      />
    </div>
  );
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
        <span className="text-sm font-bold text-purple-300">
          {value} {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={1}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-pink-500"
      />
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  unit,
  accent,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  unit: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Icon className={cn("h-4 w-4", accent)} aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">
        {value}
        <span className="ml-1.5 text-sm font-medium text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

function GoalCalculator({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const uid = useId();
  const [weight, setWeight] = useState(78);
  const [target, setTarget] = useState(72);
  const [age, setAge] = useState(30);
  const [sessions, setSessions] = useState(4);
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState<Intensity>("moderate");

  // The projected arrival date depends on "today", which differs between the
  // server render and the browser. Render it only after mount so the first
  // client paint matches the server HTML exactly.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const results = useMemo(() => {
    const safeWeight = clamp(weight, 30, 250);
    const safeTarget = clamp(target, 30, 250);
    const safeSessions = clamp(sessions, 1, 14);
    const safeDuration = clamp(duration, 15, 180);
    // Age nudges the burn rate slightly: metabolic rate declines with age.
    const ageFactor = 1 - clamp(age, 14, 90) * 0.002;

    const kcalPerMinute = (MET_BY_INTENSITY[intensity] * 3.5 * safeWeight) / 200;
    const perSession = kcalPerMinute * safeDuration * ageFactor;
    const weekly = perSession * safeSessions;
    const monthly = weekly * WEEKS_PER_MONTH;

    const deltaKg = safeWeight - safeTarget;
    const weeklyChangeKg = weekly / KCAL_PER_KG;
    const weeksToTarget =
      deltaKg > 0 && weeklyChangeKg > 0 ? Math.ceil(deltaKg / weeklyChangeKg) : 0;

    return {
      perSession: Math.round(perSession),
      monthly: Math.round(monthly),
      weeklyChangeKg,
      weeksToTarget,
      isAtGoal: Math.abs(deltaKg) < 0.5,
      isGaining: deltaKg <= -0.5,
      isAggressive: weeklyChangeKg > 1,
    };
  }, [weight, target, age, sessions, duration, intensity]);

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US"),
    [locale],
  );

  const arrivalDate = useMemo(() => {
    if (!mounted || results.weeksToTarget <= 0) return null;
    const date = new Date();
    date.setDate(date.getDate() + results.weeksToTarget * 7);
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [mounted, results.weeksToTarget, locale]);

  const notice = results.isAtGoal
    ? dict.calculator.atGoal
    : results.isGaining
      ? dict.calculator.gaining
      : results.isAggressive
        ? dict.calculator.aggressive
        : null;

  return (
    <section id="calculator" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.calculator.eyebrow}
          title={dict.calculator.title}
          subtitle={dict.calculator.subtitle}
          icon={CalculatorIcon}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Inputs */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8 lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2">
              <NumberField
                id={`${uid}-weight`}
                label={dict.calculator.fields.weight}
                value={weight}
                min={30}
                max={250}
                onChange={setWeight}
              />
              <NumberField
                id={`${uid}-target`}
                label={dict.calculator.fields.target}
                value={target}
                min={30}
                max={250}
                onChange={setTarget}
              />
              <NumberField
                id={`${uid}-age`}
                label={dict.calculator.fields.age}
                value={age}
                min={14}
                max={90}
                onChange={setAge}
              />

              <div>
                <label
                  htmlFor={`${uid}-intensity`}
                  className="block text-sm font-medium text-slate-300"
                >
                  {dict.calculator.fields.intensity}
                </label>
                <div className="relative mt-2">
                  <select
                    id={`${uid}-intensity`}
                    value={intensity}
                    onChange={(event) => setIntensity(event.target.value as Intensity)}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 pr-10 text-base font-semibold text-white outline-none transition-colors focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/30"
                  >
                    {(Object.keys(MET_BY_INTENSITY) as Intensity[]).map((key) => (
                      <option key={key} value={key} className="bg-slate-900">
                        {dict.calculator.intensities[key]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <SliderField
                id={`${uid}-sessions`}
                label={dict.calculator.fields.sessions}
                value={sessions}
                min={1}
                max={14}
                suffix={dict.calculator.results.sessionsUnit}
                onChange={setSessions}
              />
              <SliderField
                id={`${uid}-duration`}
                label={dict.calculator.fields.duration}
                value={duration}
                min={15}
                max={180}
                suffix={dict.calculator.results.minutesUnit}
                onChange={setDuration}
              />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 via-slate-900/40 to-pink-600/10 p-6 backdrop-blur sm:p-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                icon={Flame}
                label={dict.calculator.results.perSession}
                value={numberFormatter.format(results.perSession)}
                unit={dict.calculator.results.kcal}
                accent="text-orange-400"
              />
              <ResultCard
                icon={Zap}
                label={dict.calculator.results.monthly}
                value={numberFormatter.format(results.monthly)}
                unit={dict.calculator.results.kcal}
                accent="text-pink-400"
              />
              <ResultCard
                icon={Target}
                label={dict.calculator.results.weeks}
                value={results.weeksToTarget > 0 ? String(results.weeksToTarget) : "—"}
                unit={results.weeksToTarget > 0 ? dict.calculator.results.weeks_unit : ""}
                accent="text-purple-400"
              />
              <ResultCard
                icon={TrendingDown}
                label={dict.calculator.results.weeklyLoss}
                value={results.weeklyChangeKg.toFixed(2)}
                unit={dict.calculator.results.perWeek}
                accent="text-emerald-400"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4 text-sm">
              <CalendarDays className="h-4 w-4 shrink-0 text-purple-400" aria-hidden />
              <span className="text-slate-400">{dict.calculator.results.date}</span>
              <span className="ml-auto font-semibold text-white" suppressHydrationWarning>
                {arrivalDate ?? "—"}
              </span>
            </div>

            {notice ? (
              <p className="mt-4 rounded-2xl border border-pink-500/25 bg-pink-500/10 px-5 py-4 text-sm leading-relaxed text-pink-200">
                {notice}
              </p>
            ) : null}

            <a
              href="#free-pass"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-transform hover:scale-[1.02]"
            >
              {dict.calculator.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              {dict.calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing                                                                   */
/* -------------------------------------------------------------------------- */

type BillingCycle = "monthly" | "annual";

type PlanKey = "trial" | "allAccess" | "vip";

/** Prices in USD. Annual plans bill 12 months up front at a 20% discount. */
const PLAN_PRICING: Record<PlanKey, { monthly: number; icon: typeof Dumbbell; featured: boolean }> =
  {
    trial: { monthly: 0, icon: Sparkles, featured: false },
    allAccess: { monthly: 69, icon: Dumbbell, featured: true },
    vip: { monthly: 299, icon: Crown, featured: false },
  };

const ANNUAL_DISCOUNT = 0.2;
const PLAN_ORDER: PlanKey[] = ["trial", "allAccess", "vip"];

function Pricing({ dict }: { dict: Dictionary }) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.pricing.eyebrow}
          title={dict.pricing.title}
          subtitle={dict.pricing.subtitle}
          icon={Zap}
        />

        {/* Billing toggle */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label={dict.pricing.eyebrow}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur"
          >
            {(["monthly", "annual"] as BillingCycle[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCycle(option)}
                aria-pressed={cycle === option}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all",
                  cycle === option
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/25"
                    : "text-slate-400 hover:text-white",
                )}
              >
                {option === "monthly" ? dict.pricing.monthly : dict.pricing.annual}
                {option === "annual" ? (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      cycle === "annual"
                        ? "bg-white/20 text-white"
                        : "bg-emerald-500/15 text-emerald-300",
                    )}
                  >
                    {dict.pricing.annualBadge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLAN_ORDER.map((key) => {
            const plan = dict.pricing.plans[key];
            const pricing = PLAN_PRICING[key];
            const Icon = pricing.icon;
            const isFree = pricing.monthly === 0;
            const displayPrice =
              cycle === "annual"
                ? Math.round(pricing.monthly * (1 - ANNUAL_DISCOUNT))
                : pricing.monthly;

            return (
              <div
                key={key}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7 backdrop-blur transition-transform duration-300 sm:p-8",
                  pricing.featured
                    ? "border-purple-500/40 bg-gradient-to-b from-purple-600/15 to-slate-900/40 shadow-2xl shadow-purple-900/30 lg:-translate-y-3"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20",
                )}
              >
                {pricing.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    {dict.pricing.popular}
                  </span>
                ) : null}

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      pricing.featured
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                        : "bg-white/10 text-purple-300",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  {isFree ? (
                    <span className="text-4xl font-extrabold text-white">
                      {dict.pricing.free}
                    </span>
                  ) : (
                    <>
                      {cycle === "annual" ? (
                        <span className="text-2xl font-bold text-slate-600 line-through">
                          ${pricing.monthly}
                        </span>
                      ) : null}
                      <span className="text-4xl font-extrabold text-white sm:text-5xl">
                        ${displayPrice}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        {cycle === "annual"
                          ? dict.pricing.perMonthAnnual
                          : dict.pricing.perMonth}
                      </span>
                    </>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          pricing.featured ? "text-pink-400" : "text-purple-400",
                        )}
                        aria-hidden
                      />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#free-pass"
                  className={cn(
                    "mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]",
                    pricing.featured
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lead magnet form                                                          */
/* -------------------------------------------------------------------------- */

type ClassKey = "strength" | "hiit" | "yoga" | "spin" | "boxing";

const CLASS_KEYS: ClassKey[] = ["strength", "hiit", "yoga", "spin", "boxing"];

type LeadForm = { name: string; email: string; classType: ClassKey | "" };

type LeadErrors = Partial<Record<keyof LeadForm, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY_LEAD: LeadForm = { name: "", email: "", classType: "" };

function LeadMagnet({ dict }: { dict: Dictionary }) {
  const uid = useId();
  const [form, setForm] = useState<LeadForm>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const update = useCallback(<K extends keyof LeadForm>(key: K, value: LeadForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: LeadErrors = {};
    if (!form.name.trim()) nextErrors.name = dict.lead.errors.name;
    if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = dict.lead.errors.email;
    if (!form.classType) nextErrors.classType = dict.lead.errors.classType;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // Swap this for a POST to your CRM / email provider route handler.
    timeoutRef.current = setTimeout(() => setStatus("success"), 900);
  };

  const reset = () => {
    setForm(EMPTY_LEAD);
    setErrors({});
    setStatus("idle");
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-xl border bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-slate-600 focus:ring-2",
      hasError
        ? "border-red-500/60 focus:border-red-400 focus:ring-red-500/25"
        : "border-white/10 focus:border-purple-400/60 focus:ring-purple-500/30",
    );

  return (
    <section id="free-pass" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-600/15 via-slate-900/60 to-pink-600/15 p-7 backdrop-blur sm:p-12">
          <SectionHeading
            eyebrow={dict.lead.eyebrow}
            title={dict.lead.title}
            subtitle={dict.lead.subtitle}
            icon={Sparkles}
          />

          {status === "success" ? (
            <div
              role="status"
              className="mt-10 flex flex-col items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-10 text-center"
            >
              <CheckCircle2 className="h-12 w-12 text-emerald-400" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold text-white">{dict.lead.successTitle}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                {dict.lead.successBody}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {dict.lead.resetCta}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
              <div>
                <label
                  htmlFor={`${uid}-name`}
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <User className="h-4 w-4 text-purple-400" aria-hidden />
                  {dict.lead.fields.name}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder={dict.lead.placeholders.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name ? (
                  <p id={`${uid}-name-error`} className="mt-2 text-sm text-red-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={`${uid}-email`}
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <Mail className="h-4 w-4 text-pink-400" aria-hidden />
                  {dict.lead.fields.email}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder={dict.lead.placeholders.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email ? (
                  <p id={`${uid}-email-error`} className="mt-2 text-sm text-red-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={`${uid}-class`}
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <Dumbbell className="h-4 w-4 text-purple-400" aria-hidden />
                  {dict.lead.fields.classType}
                </label>
                <div className="relative">
                  <select
                    id={`${uid}-class`}
                    name="classType"
                    value={form.classType}
                    onChange={(event) => update("classType", event.target.value as ClassKey | "")}
                    aria-invalid={Boolean(errors.classType)}
                    aria-describedby={errors.classType ? `${uid}-class-error` : undefined}
                    className={cn(inputClass(Boolean(errors.classType)), "appearance-none pr-10")}
                  >
                    <option value="" disabled className="bg-slate-900">
                      {dict.lead.placeholders.classType}
                    </option>
                    {CLASS_KEYS.map((key) => (
                      <option key={key} value={key} className="bg-slate-900">
                        {dict.lead.classes[key]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    aria-hidden
                  />
                </div>
                {errors.classType ? (
                  <p id={`${uid}-class-error`} className="mt-2 text-sm text-red-400">
                    {errors.classType}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-600/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    {dict.lead.submitting}
                  </>
                ) : (
                  <>
                    {dict.lead.submit}
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">{dict.lead.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Dumbbell className="h-5 w-5 text-white" aria-hidden />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              {dict.nav.brand}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{dict.footer.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-400" aria-hidden />
            {dict.footer.address}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-pink-400" aria-hidden />
            {dict.footer.hours}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-slate-600">
        © 2024 {dict.nav.brand}. {dict.footer.rights}
      </p>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Page() {
  // Always render `defaultLocale` on the server AND on the first client paint,
  // then adopt any stored preference in an effect — this is what keeps the
  // language switcher free of hydration mismatches.
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
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

  const dict = useMemo(() => getDictionary(locale), [locale]);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar dict={dict} locale={locale} onToggleLocale={toggleLocale} />
      <Hero dict={dict} />
      <GoalCalculator dict={dict} locale={locale} />
      <Pricing dict={dict} />
      <LeadMagnet dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
