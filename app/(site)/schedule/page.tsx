import type { Metadata } from "next";

import { dictionary, defaultLocale } from "@/lib/dictionary";

import { ScheduleClient } from "./schedule-client";

export const metadata: Metadata = {
  title: dictionary[defaultLocale].schedule.meta.title,
  description: dictionary[defaultLocale].schedule.meta.description,
};

export default function SchedulePage() {
  return <ScheduleClient />;
}
