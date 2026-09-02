"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Users } from "lucide-react";

import { Portrait } from "@/components/portrait";
import { SectionHeading } from "@/components/section-heading";
import {
  CLASS_TYPES,
  CLASS_TYPE_STYLES,
  SCHEDULE,
  TRAINERS,
  type ClassType,
} from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";

export function TrainersClient() {
  const { dict } = useLocale();
  const [filter, setFilter] = useState<ClassType | "all">("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? TRAINERS
        : TRAINERS.filter((t) => t.specialties.includes(filter)),
    [filter],
  );

  const classCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const session of SCHEDULE) {
      counts.set(session.trainer, (counts.get(session.trainer) ?? 0) + 1);
    }
    return counts;
  }, []);

  return (
    <section className="px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.trainers.eyebrow}
          title={dict.trainers.title}
          subtitle={dict.trainers.subtitle}
          icon={Award}
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              filter === "all"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "border border-white/10 bg-white/5 text-slate-300 hover:text-white",
            )}
          >
            {dict.trainers.filterAll}
          </button>
          {CLASS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                filter === type
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:text-white",
              )}
            >
              {dict.classTypes[type]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((trainer) => {
            const person = dict.trainers.people[trainer.id];
            return (
              <Link
                key={trainer.id}
                href={`/trainers/${trainer.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:border-purple-500/40 hover:bg-white/[0.06]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Portrait
                    initials={trainer.initials}
                    gradient={trainer.gradient}
                    src={trainer.photo}
                    alt={person.name}
                    textClass="text-5xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-lg font-bold text-white">{person.name}</p>
                    <p className="text-sm text-purple-300">{person.title}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((s) => (
                      <span
                        key={s}
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                          CLASS_TYPE_STYLES[s].chip,
                        )}
                      >
                        {dict.classTypes[s]}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
                    {person.bio}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" aria-hidden />
                      {classCounts.get(trainer.id) ?? 0} {dict.trainers.teaches}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-purple-300 transition-transform group-hover:translate-x-0.5">
                      {dict.trainers.viewProfile}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
