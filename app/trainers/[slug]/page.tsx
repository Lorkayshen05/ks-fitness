import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TRAINERS, getTrainerBySlug } from "@/lib/data";
import { dictionary, defaultLocale } from "@/lib/dictionary";

import { TrainerDetailClient } from "./trainer-detail-client";

type Params = { params: { slug: string } };

/** Every coach is prerendered at build time — no runtime lookup. */
export function generateStaticParams() {
  return TRAINERS.map((trainer) => ({ slug: trainer.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const trainer = getTrainerBySlug(params.slug);
  if (!trainer) return {};

  const person = dictionary[defaultLocale].trainers.people[trainer.id];
  return {
    title: `${person.name} — ${person.title} | KS Fitness`,
    description: person.bio,
  };
}

export default function TrainerPage({ params }: Params) {
  const trainer = getTrainerBySlug(params.slug);
  if (!trainer) notFound();

  return <TrainerDetailClient trainerId={trainer.id} />;
}
