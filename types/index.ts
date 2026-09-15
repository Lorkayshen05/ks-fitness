/** Shared types. Everything user-facing is derived from these. */

export const locales = ["en", "zh", "ms"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Native language names, shown in the switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  ms: "Bahasa Melayu",
};

/** Short code for the compact switcher and the `lang` attribute. */
export const localeCodes: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ms: "BM",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
  ms: "ms-MY",
};

export const submissionTypes = ["general", "volunteer"] as const;
export type SubmissionType = (typeof submissionTypes)[number];

export function isSubmissionType(value: unknown): value is SubmissionType {
  return (
    typeof value === "string" && (submissionTypes as readonly string[]).includes(value)
  );
}

/** Field-keyed errors returned by the shared validator and the server action. */
export type FieldErrors = Partial<Record<"name" | "email" | "message" | "type", string>>;

/** The single shape every form action resolves to. */
export type FormState = {
  status: "idle" | "success" | "error";
  /** Dictionary key under `dict.form.feedback`, resolved on the client. */
  messageKey?: string;
  /** Dictionary keys under `dict.form.errors`, keyed by field. */
  errors?: FieldErrors;
};

export const idleFormState: FormState = { status: "idle" };

/** Plain, serialisable views of the Prisma models used by the UI. */
export type OrganizationView = {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  donationUrl: string;
  verified: boolean;
};

export type StoryView = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

export type ImpactMetricView = {
  id: string;
  label: string;
  value: string;
  source: string;
  updatedAt: string;
};
