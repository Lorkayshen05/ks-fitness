# KS Fitness

Bilingual (EN / 简体中文) multi-page marketing site for the KS Fitness gym brand.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Routes

| Route               | Page                                                             |
| ------------------- | ---------------------------------------------------------------- |
| `/`                 | Landing page: hero, goal calculator, pricing, 7-day-pass form.    |
| `/schedule`         | Weekly timetable, filters, and class booking.                     |
| `/trainers`         | Coach directory, filterable by discipline.                        |
| `/trainers/[slug]`  | Individual coach profile (one static page per coach).             |
| `/gallery`          | Filterable gallery with a keyboard-navigable lightbox.            |
| `/gepuklah`         | Gepuklah by Mingchuun — a separate restaurant brand (see below).  |

Every route is prerendered at build time.

## Structure

| Path                     | Purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `app/<route>/page.tsx`   | Server component: exports per-page `metadata`, renders the client component. |
| `app/<route>/*-client.tsx` | The interactive UI for that route (`'use client'`).         |
| `app/layout.tsx`         | Thin root layout: `<html>`, `<body>`, Inter, `globals.css`. No chrome. |
| `app/(site)/layout.tsx`  | KS Fitness chrome: `LocaleProvider`, navbar + footer. Wraps every fitness route. |
| `app/(site)/`            | The KS Fitness routes. The `(site)` group does not appear in URLs. |
| `app/gepuklah/`          | The Gepuklah page and its own layout, fonts and favicon.       |
| `components/`            | Chrome shared across routes (navbar, footer, headings, portrait). |
| `lib/dictionary.ts`      | Every user-facing string, in both locales.                     |
| `lib/data.ts`            | Structural data — timetable, coaches, gallery items.           |
| `lib/locale-context.tsx` | Locale state, shared across routes.                            |

### Copy vs. data

`lib/data.ts` holds everything that is *not* prose — times, capacities, ids,
slugs — and `lib/dictionary.ts` holds the localized names, bios and captions
that pair with it, keyed by the same id. Adding a language never means touching
`data.ts`. Gallery ids are a closed union, so a caption missing from the
dictionary fails typecheck rather than rendering `undefined`.

## Editing copy

All text lives in `lib/dictionary.ts`. The `en` tree defines the shape
(`Dictionary`), and `zh` mirrors it — add a key to `en` first, then to `zh`.
Nothing else needs to change; the page reads exclusively from the dictionary.

## How the language switcher avoids hydration mismatches

Locale lives in `LocaleProvider` (`lib/locale-context.tsx`), above the routes,
so it survives client-side navigation. The server and the first client paint
both render `defaultLocale` (`en`); a stored preference is read from
`localStorage` in an effect *after* mount, so the initial client tree always
matches the server HTML.

The provider exposes a `mounted` flag for anything else that differs between
server and client. Three things depend on it:

- the calculator's projected arrival date (depends on "today"),
- the schedule's "today" column highlight,
- stored class bookings.

Each renders its neutral state until mounted, then fills in.

## Page metadata and language

Per-route `metadata` is exported from each server `page.tsx` and emitted at
build time, so it is always in the default locale (English) — crawlers get
English, while the visible page switches on the client. Making metadata truly
bilingual would need locale-prefixed routes (`/en/...`, `/zh/...`), which is a
larger change than this site currently needs.

## Wiring up the forms

Two forms are stubbed and need a backend before launch:

- **`LeadMagnet`** (`app/home-client.tsx`) — the 7-day-pass form.
- **`BookingDialog`** (`app/schedule/schedule-client.tsx`) — class booking.
  Bookings are also only stored in the visitor's own browser
  (`localStorage`), so nothing reaches the gym and seat counts are
  per-visitor. Point the confirm handler at your booking system to go live.

Both validate on submit and fake the network call with a `setTimeout`.
Replace that line with a `fetch` to a route handler or your CRM/ESP endpoint:

```ts
setStatus("submitting");
await fetch("/api/leads", { method: "POST", body: JSON.stringify(form) });
setStatus("success");
```

## Calculator model

Burn is estimated from metabolic equivalents:
`kcal/min = MET × 3.5 × bodyweightKg / 200`, scaled by a small age factor, then
multiplied by session length and weekly frequency. Time to target divides the
remaining kilograms by the weekly deficit at 7,700 kcal per kilogram. These are
marketing estimates, not medical advice — the disclaimer under the results says so.

## Adding real photography

Coach portraits and gallery tiles render branded placeholders (initials or a
gradient panel) until real images exist, so the layout is final before shoot
day. To swap in photographs, drop files in `public/` and set the optional
`photo` (trainers) or `src` (gallery) field on the record in `lib/data.ts` —
no component changes needed.

Both render through a plain `<img>` rather than `next/image`, so remote URLs
work without per-host `remotePatterns` config. If you move to local files only,
switching to `next/image` would buy you automatic resizing.

## The Gepuklah page (`/gepuklah`)

A second, unrelated brand lives in this app: a landing page for Gepuklah by
Mingchuun, an Ayam Gepuk shop on Jalan SS 22/11, Damansara Jaya.

It is deliberately isolated from KS Fitness. The root layout carries no chrome,
so `app/(site)/layout.tsx` owns the fitness navbar and footer while
`app/gepuklah/layout.tsx` owns the restaurant's fonts (Anton + Plus Jakarta
Sans), its warm charcoal palette and its favicon. Neither site can restyle the
other. In `tailwind.config.ts` the `brand` tokens belong to KS Fitness and the
`charcoal` / `chilli` / `turmeric` / `cream` / `pandan` tokens to Gepuklah;
`fade-up` is the one animation both use.

All Gepuklah copy and data lives in `lib/gepuklah.ts` — menu, reviews, opening
hours, queue windows, address and Maps links.

### Placeholders to replace before launch

Flagged in comments in `lib/gepuklah.ts`. These are realistic stand-ins written
for the mockup, **not** verified business data:

- `menu[].price` — indicative prices. The page carries a matching disclaimer.
- `reviews` — sample testimonials. Swap in real, permissioned Google reviews.
- `queue.windows` / `queue.tips` — typical rush windows, not measured waits.
- `google.reviewCount` — left `null`, which renders "Rated by diners on Google
  Maps". Set a number and the copy switches to "From N Google reviews".
- `business.social` — placeholder profile URLs.

The 3.7/5 Google rating, the address and the 8:30 PM closing time are the
values the business supplied.

### The live status badge

`StatusBadge` reads the shop's clock, not the visitor's: `getKualaLumpurNow`
formats `new Date()` through `Intl.DateTimeFormat` with
`timeZone: "Asia/Kuala_Lumpur"`, so someone checking from London still sees
whether the Damansara Jaya counter is open. Three states — open, last orders
(inside the final hour), and closed with the next opening time — re-derived
every 60 seconds.

Hours live in `openingHours` as minutes from midnight. To add a closed day, set
that entry's `open` and `close` to `null`; the badge walks forward to the next
day that opens and the hours table prints "Closed".

Time-dependent copy renders a neutral placeholder on the server and on the
first client paint, then fills in after mount — the same rule the language
switcher follows below. Scroll reveals start at `opacity-0` and un-hide on an
IntersectionObserver, so `app/gepuklah/layout.tsx` ships a `<noscript>` style
that forces `.reveal` visible.

## Deploying to Vercel

Import the repo on Vercel and accept the defaults (`next build`, no environment
variables required). The page is fully static — it prerenders at build time and
ships ~100 kB of first-load JS.

## A note on the Next.js version

The project pins `next@14.2.35`, the newest release on the 14.x line. `npm audit`
still reports advisories against all of 14.x; they are only fixed in Next 16,
which is a breaking upgrade. Most of the reported issues affect self-hosted
server features this static page does not use, but plan the move to 16 if you
add server actions, rewrites or the image optimizer.
