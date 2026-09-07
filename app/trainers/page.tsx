import type { Metadata } from "next";

import { dictionary, defaultLocale } from "@/lib/dictionary";

import { TrainersClient } from "./trainers-client";

export const metadata: Metadata = {
  title: dictionary[defaultLocale].trainers.meta.title,
  description: dictionary[defaultLocale].trainers.meta.description,
};

export default function TrainersPage() {
  return <TrainersClient />;
}
