import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {eyebrow}
      </span>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
    </div>
  );
}

/** Same block, rendered as an <h2> for sections nested inside a page. */
export function SubSectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
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
