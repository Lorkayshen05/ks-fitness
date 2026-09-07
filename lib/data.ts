/**
 * Structural site data: everything that is NOT prose.
 *
 * Times, capacities, ids and slugs live here; the localized names, bios and
 * captions that pair with them live in `lib/dictionary.ts`, keyed by the same
 * id. Adding a language therefore never means touching this file.
 */

export type ClassType = "strength" | "hiit" | "yoga" | "spin" | "boxing";
export type Level = "beginner" | "intermediate" | "advanced";
export type TrainerId = "mei" | "darius" | "priya" | "tomas" | "aisha" | "kenji";

/** 0 = Monday … 6 = Sunday, matching the timetable's column order. */
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_INDEXES: DayIndex[] = [0, 1, 2, 3, 4, 5, 6];

export const CLASS_TYPES: ClassType[] = ["strength", "hiit", "yoga", "spin", "boxing"];
export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

/** Tailwind classes per discipline, so colour stays consistent across pages. */
export const CLASS_TYPE_STYLES: Record<
  ClassType,
  { dot: string; chip: string; border: string; glow: string }
> = {
  strength: {
    dot: "bg-purple-400",
    chip: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    border: "border-purple-500/40",
    glow: "from-purple-600 to-fuchsia-600",
  },
  hiit: {
    dot: "bg-pink-400",
    chip: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    border: "border-pink-500/40",
    glow: "from-pink-600 to-rose-600",
  },
  yoga: {
    dot: "bg-emerald-400",
    chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/40",
    glow: "from-emerald-600 to-teal-600",
  },
  spin: {
    dot: "bg-sky-400",
    chip: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    border: "border-sky-500/40",
    glow: "from-sky-600 to-cyan-600",
  },
  boxing: {
    dot: "bg-amber-400",
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    border: "border-amber-500/40",
    glow: "from-amber-600 to-orange-600",
  },
};

export type ClassSession = {
  id: string;
  day: DayIndex;
  /** 24-hour "HH:MM". */
  start: string;
  durationMin: number;
  type: ClassType;
  level: Level;
  trainer: TrainerId;
  capacity: number;
  /** Seats already taken before this visitor books. */
  taken: number;
};

/** One representative week. Ids are stable so bookings can be stored by id. */
export const SCHEDULE: ClassSession[] = [
  { id: "mon-0630-hiit", day: 0, start: "06:30", durationMin: 45, type: "hiit", level: "intermediate", trainer: "darius", capacity: 24, taken: 19 },
  { id: "mon-0900-yoga", day: 0, start: "09:00", durationMin: 60, type: "yoga", level: "beginner", trainer: "priya", capacity: 20, taken: 11 },
  { id: "mon-1215-strength", day: 0, start: "12:15", durationMin: 60, type: "strength", level: "intermediate", trainer: "mei", capacity: 16, taken: 16 },
  { id: "mon-1800-boxing", day: 0, start: "18:00", durationMin: 60, type: "boxing", level: "beginner", trainer: "aisha", capacity: 18, taken: 9 },
  { id: "mon-1930-spin", day: 0, start: "19:30", durationMin: 45, type: "spin", level: "intermediate", trainer: "kenji", capacity: 28, taken: 22 },

  { id: "tue-0700-strength", day: 1, start: "07:00", durationMin: 75, type: "strength", level: "advanced", trainer: "mei", capacity: 12, taken: 8 },
  { id: "tue-1000-spin", day: 1, start: "10:00", durationMin: 45, type: "spin", level: "beginner", trainer: "kenji", capacity: 28, taken: 14 },
  { id: "tue-1730-hiit", day: 1, start: "17:30", durationMin: 45, type: "hiit", level: "advanced", trainer: "darius", capacity: 24, taken: 23 },
  { id: "tue-1900-yoga", day: 1, start: "19:00", durationMin: 75, type: "yoga", level: "intermediate", trainer: "priya", capacity: 20, taken: 6 },

  { id: "wed-0630-spin", day: 2, start: "06:30", durationMin: 45, type: "spin", level: "intermediate", trainer: "kenji", capacity: 28, taken: 25 },
  { id: "wed-0930-strength", day: 2, start: "09:30", durationMin: 60, type: "strength", level: "beginner", trainer: "tomas", capacity: 16, taken: 7 },
  { id: "wed-1215-hiit", day: 2, start: "12:15", durationMin: 30, type: "hiit", level: "beginner", trainer: "darius", capacity: 24, taken: 12 },
  { id: "wed-1800-boxing", day: 2, start: "18:00", durationMin: 60, type: "boxing", level: "intermediate", trainer: "aisha", capacity: 18, taken: 17 },
  { id: "wed-1930-strength", day: 2, start: "19:30", durationMin: 75, type: "strength", level: "advanced", trainer: "mei", capacity: 12, taken: 10 },

  { id: "thu-0700-yoga", day: 3, start: "07:00", durationMin: 60, type: "yoga", level: "beginner", trainer: "priya", capacity: 20, taken: 13 },
  { id: "thu-1215-strength", day: 3, start: "12:15", durationMin: 60, type: "strength", level: "intermediate", trainer: "tomas", capacity: 16, taken: 15 },
  { id: "thu-1730-spin", day: 3, start: "17:30", durationMin: 45, type: "spin", level: "advanced", trainer: "kenji", capacity: 28, taken: 20 },
  { id: "thu-1900-hiit", day: 3, start: "19:00", durationMin: 45, type: "hiit", level: "intermediate", trainer: "darius", capacity: 24, taken: 18 },

  { id: "fri-0630-hiit", day: 4, start: "06:30", durationMin: 45, type: "hiit", level: "advanced", trainer: "darius", capacity: 24, taken: 21 },
  { id: "fri-0930-boxing", day: 4, start: "09:30", durationMin: 60, type: "boxing", level: "beginner", trainer: "aisha", capacity: 18, taken: 5 },
  { id: "fri-1215-yoga", day: 4, start: "12:15", durationMin: 45, type: "yoga", level: "beginner", trainer: "priya", capacity: 20, taken: 9 },
  { id: "fri-1800-strength", day: 4, start: "18:00", durationMin: 75, type: "strength", level: "intermediate", trainer: "mei", capacity: 16, taken: 14 },

  { id: "sat-0800-strength", day: 5, start: "08:00", durationMin: 90, type: "strength", level: "advanced", trainer: "mei", capacity: 12, taken: 12 },
  { id: "sat-1000-spin", day: 5, start: "10:00", durationMin: 60, type: "spin", level: "intermediate", trainer: "kenji", capacity: 28, taken: 16 },
  { id: "sat-1130-boxing", day: 5, start: "11:30", durationMin: 60, type: "boxing", level: "advanced", trainer: "aisha", capacity: 18, taken: 11 },
  { id: "sat-1500-hiit", day: 5, start: "15:00", durationMin: 45, type: "hiit", level: "beginner", trainer: "tomas", capacity: 24, taken: 8 },

  { id: "sun-0900-yoga", day: 6, start: "09:00", durationMin: 90, type: "yoga", level: "beginner", trainer: "priya", capacity: 20, taken: 15 },
  { id: "sun-1100-strength", day: 6, start: "11:00", durationMin: 60, type: "strength", level: "beginner", trainer: "tomas", capacity: 16, taken: 6 },
  { id: "sun-1700-spin", day: 6, start: "17:00", durationMin: 45, type: "spin", level: "beginner", trainer: "kenji", capacity: 28, taken: 10 },
];

export type Trainer = {
  id: TrainerId;
  slug: string;
  initials: string;
  /** Gradient used by the portrait placeholder until a real photo is supplied. */
  gradient: string;
  specialties: ClassType[];
  yearsExperience: number;
  clientsCoached: number;
  /** Optional real portrait; drop a file in /public and point here. */
  photo?: string;
};

export const TRAINERS: Trainer[] = [
  { id: "mei", slug: "mei-lin-cheng", initials: "MC", gradient: "from-purple-500 to-fuchsia-600", specialties: ["strength"], yearsExperience: 12, clientsCoached: 410 },
  { id: "darius", slug: "darius-okafor", initials: "DO", gradient: "from-pink-500 to-rose-600", specialties: ["hiit", "strength"], yearsExperience: 9, clientsCoached: 380 },
  { id: "priya", slug: "priya-raman", initials: "PR", gradient: "from-emerald-500 to-teal-600", specialties: ["yoga"], yearsExperience: 14, clientsCoached: 520 },
  { id: "tomas", slug: "tomas-vidal", initials: "TV", gradient: "from-violet-500 to-indigo-600", specialties: ["strength", "hiit"], yearsExperience: 6, clientsCoached: 190 },
  { id: "aisha", slug: "aisha-bello", initials: "AB", gradient: "from-amber-500 to-orange-600", specialties: ["boxing"], yearsExperience: 11, clientsCoached: 350 },
  { id: "kenji", slug: "kenji-moriyama", initials: "KM", gradient: "from-sky-500 to-cyan-600", specialties: ["spin"], yearsExperience: 8, clientsCoached: 610 },
];

export function getTrainer(id: TrainerId) {
  const trainer = TRAINERS.find((t) => t.id === id);
  if (!trainer) throw new Error(`Unknown trainer: ${id}`);
  return trainer;
}

export function getTrainerBySlug(slug: string) {
  return TRAINERS.find((t) => t.slug === slug);
}

export type GalleryCategory = "facility" | "classes" | "events" | "community";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "facility",
  "classes",
  "events",
  "community",
];

/**
 * Ids are a closed union so a caption missing from `lib/dictionary.ts` — or a
 * caption for an item that no longer exists — fails typecheck rather than
 * rendering `undefined`.
 */
export type GalleryId =
  | "floor-main"
  | "rack-row"
  | "platform"
  | "recovery"
  | "hiit-floor"
  | "spin-studio"
  | "yoga-room"
  | "boxing-ring"
  | "open-day"
  | "powerlift-meet"
  | "charity-row"
  | "morning-crew"
  | "pb-board"
  | "post-class";

export type GalleryItem = {
  id: GalleryId;
  category: GalleryCategory;
  /** Drives the masonry footprint. */
  span: "tall" | "wide" | "square";
  gradient: string;
  /** Optional real image; drop a file in /public and point here. */
  src?: string;
};

export const GALLERY: GalleryItem[] = [
  { id: "floor-main", category: "facility", span: "wide", gradient: "from-purple-600/40 via-slate-800 to-slate-900" },
  { id: "rack-row", category: "facility", span: "tall", gradient: "from-fuchsia-600/30 via-slate-800 to-slate-900" },
  { id: "platform", category: "facility", span: "square", gradient: "from-violet-600/30 via-slate-800 to-slate-900" },
  { id: "recovery", category: "facility", span: "square", gradient: "from-teal-600/30 via-slate-800 to-slate-900" },
  { id: "hiit-floor", category: "classes", span: "square", gradient: "from-pink-600/40 via-slate-800 to-slate-900" },
  { id: "spin-studio", category: "classes", span: "wide", gradient: "from-sky-600/40 via-slate-800 to-slate-900" },
  { id: "yoga-room", category: "classes", span: "square", gradient: "from-emerald-600/35 via-slate-800 to-slate-900" },
  { id: "boxing-ring", category: "classes", span: "tall", gradient: "from-amber-600/35 via-slate-800 to-slate-900" },
  { id: "open-day", category: "events", span: "square", gradient: "from-rose-600/35 via-slate-800 to-slate-900" },
  { id: "powerlift-meet", category: "events", span: "wide", gradient: "from-indigo-600/35 via-slate-800 to-slate-900" },
  { id: "charity-row", category: "events", span: "square", gradient: "from-cyan-600/35 via-slate-800 to-slate-900" },
  { id: "morning-crew", category: "community", span: "tall", gradient: "from-purple-600/35 via-slate-800 to-slate-900" },
  { id: "pb-board", category: "community", span: "square", gradient: "from-pink-600/30 via-slate-800 to-slate-900" },
  { id: "post-class", category: "community", span: "square", gradient: "from-emerald-600/30 via-slate-800 to-slate-900" },
];
