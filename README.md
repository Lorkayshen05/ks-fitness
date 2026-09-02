# KS Fitness — Landing Page

Bilingual (EN / 简体中文) marketing site for the KS Fitness gym brand.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Structure

| Path                | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `app/page.tsx`      | The whole landing page: navbar, hero, calculator, pricing, lead form, footer. |
| `app/layout.tsx`    | Root layout, fonts, metadata.                                   |
| `app/globals.css`   | Tailwind layers + base dark theme.                              |
| `lib/dictionary.ts` | Every user-facing string, in both locales.                      |

## Editing copy

All text lives in `lib/dictionary.ts`. The `en` tree defines the shape
(`Dictionary`), and `zh` mirrors it — add a key to `en` first, then to `zh`.
Nothing else needs to change; the page reads exclusively from the dictionary.

## How the language switcher avoids hydration mismatches

The server and the first client paint both render `defaultLocale` (`en`).
A stored preference is read from `localStorage` in an effect *after* mount, so
the initial client tree always matches the server HTML. The same rule applies
to the calculator's projected arrival date, which depends on "today": it stays
blank (`—`) until mounted, then fills in.

## Wiring up the lead form

`LeadMagnet` in `app/page.tsx` validates on submit and currently fakes the
network call with a `setTimeout`. Replace that line with a `fetch` to a route
handler or your CRM/ESP endpoint:

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
