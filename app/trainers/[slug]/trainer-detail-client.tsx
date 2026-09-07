"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, Clock, Quote, Users } from "lucide-react";

import { Portrait } from "@/components/portrait";
import {
  CLASS_TYPE_STYLES,
  SCHEDULE,
  getTrainer,
  type TrainerId,
} from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { addMinutes, cn } from "@/lib/utils";

export function TrainerDetailClient({ trainerId }: { trainerId: TrainerId }) {
  const { dict } = useLocale();
  const trainer = getTrainer(trainerId);
  const person = dict.trainers.people[trainerId];

  const sessions = SCHEDULE.filter((s) => s.trainer === trainerId).sort(
    (a, b) => a.day - b.day || a.start.localeCompare(b.start),
  );

  return (
    <section className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/trainers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {dict.trainers.backToAll}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <div className="aspect-[4/5]">
                <Portrait
                  initials={trainer.initials}
                  gradient={trainer.gradient}
                  src={trainer.photo}
                  alt={person.name}
                  textClass="text-7xl"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <p className="text-2xl font-bold text-white">{trainer.yearsExperience}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {dict.trainers.years}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <p className="text-2xl font-bold text-white">{trainer.clientsCoached}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {dict.trainers.clients}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {person.name}
            </h1>
            <p className="mt-2 text-lg font-semibold text-purple-300">{person.title}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {trainer.specialties.map((s) => (
                <span
                  key={s}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    CLASS_TYPE_STYLES[s].chip,
                  )}
                >
                  {dict.classTypes[s]}
                </span>
              ))}
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-300">{person.bio}</p>

            <blockquote className="mt-6 flex gap-3 rounded-2xl border border-purple-500/25 bg-purple-500/[0.07] px-5 py-4">
              <Quote className="h-5 w-5 shrink-0 text-purple-400" aria-hidden />
              <p className="text-base italic leading-relaxed text-purple-100">
                {person.quote}
              </p>
            </blockquote>

            <h2 className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
              <BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden />
              {dict.trainers.certifications}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {person.certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Users className="h-5 w-5 text-purple-400" aria-hidden />
            {dict.trainers.teaches}
          </h2>

          {sessions.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-slate-400">
              {dict.trainers.noClasses}
            </p>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sessions.map((s) => (
                <Link
                  key={s.id}
                  href="/schedule"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-purple-500/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        CLASS_TYPE_STYLES[s.type].dot,
                      )}
                      aria-hidden
                    />
                    <p className="text-sm font-bold text-white">
                      {dict.schedule.dayNames[s.day]}
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-200">
                    {dict.classTypes[s.type]}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {s.start}–{addMinutes(s.start, s.durationMin)} · {dict.levels[s.level]}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/schedule"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-transform hover:scale-[1.02]"
            >
              {dict.trainers.bookWith}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/schedule"
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {dict.trainers.seeSchedule}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
