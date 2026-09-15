/**
 * Structural content config. Ordering and identity live here; the words live in
 * `data/dictionaries/*`. Every id below is a key the dictionaries must supply,
 * so a missing translation is a typecheck failure rather than a blank section.
 */

export const navIds = [
  "about",
  "help",
  "organizations",
  "impact",
  "stories",
  "faq",
  "contact",
] as const;
export type NavId = (typeof navIds)[number];

/** `/` for home, `/about` … derived from the id. */
export const navHref: Record<NavId, string> = {
  about: "/about",
  help: "/help",
  organizations: "/organizations",
  impact: "/impact",
  stories: "/stories",
  faq: "/faq",
  contact: "/contact",
};

export const legalIds = ["privacy", "terms"] as const;
export type LegalId = (typeof legalIds)[number];

export const missionPointIds = ["accurate", "verified", "consent"] as const;
export type MissionPointId = (typeof missionPointIds)[number];

export const helpWayIds = [
  "donate",
  "volunteer",
  "educate",
  "employ",
  "goods",
  "advocate",
] as const;
export type HelpWayId = (typeof helpWayIds)[number];

/** Where each "way to help" sends the reader. Internal routes only. */
export const helpWayHref: Record<HelpWayId, string> = {
  donate: "/organizations",
  volunteer: "/contact",
  educate: "/stories",
  employ: "/contact",
  goods: "/organizations",
  advocate: "/about",
};

export const faqIds = [
  "who-runs",
  "where-money-goes",
  "how-verified",
  "why-no-payments",
  "legal-status",
  "volunteer-requirements",
  "data-handling",
  "report-problem",
] as const;
export type FaqId = (typeof faqIds)[number];

/** The FAQ ids surfaced on the homepage, in order. */
export const homeFaqIds: readonly FaqId[] = [
  "where-money-goes",
  "how-verified",
  "why-no-payments",
];

export const aboutSectionIds = [
  "context",
  "status",
  "platform",
  "language",
  "limits",
] as const;
export type AboutSectionId = (typeof aboutSectionIds)[number];

export const privacySectionIds = [
  "collect",
  "use",
  "retain",
  "share",
  "rights",
  "cookies",
] as const;
export type PrivacySectionId = (typeof privacySectionIds)[number];

export const termsSectionIds = [
  "purpose",
  "no-payments",
  "accuracy",
  "conduct",
  "liability",
  "changes",
] as const;
export type TermsSectionId = (typeof termsSectionIds)[number];

/** Last substantive review of the legal pages. Rendered, not guessed. */
export const legalUpdatedAt = "2026-09-15";
