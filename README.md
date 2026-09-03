# Gepuklah by Mingchuun — Landing Page

Marketing site for the Ayam Gepuk shop on Jalan SS 22/11, Damansara Jaya.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Lucide icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Structure

| Path                     | Purpose                                                                     |
| ------------------------ | --------------------------------------------------------------------------- |
| `app/page.tsx`           | The landing page: nav, hero, marquee, menu, reviews, visit, footer.          |
| `lib/gepuklah.ts`        | Every user-facing string and all page data.                                  |
| `app/layout.tsx`         | Root layout, fonts, metadata.                                                |
| `app/globals.css`        | Tailwind layers, warm charcoal base, reduced-motion rules.                   |
| `tailwind.config.ts`     | The palette (`charcoal` / `chilli` / `turmeric` / `cream` / `pandan`) and animations. |
| `app/ks-fitness/`        | The unrelated KS Fitness page this repo started as, kept on its own route.   |
| `lib/dictionary.ts`      | Copy for `/ks-fitness` only.                                                 |

## Editing content

All copy lives in `lib/gepuklah.ts` — menu items, reviews, opening hours,
queue windows, address and Maps links. The page component reads exclusively
from it, so changing the shop's story never means touching JSX.

### Placeholders to replace before launch

`lib/gepuklah.ts` flags these in comments. They are realistic stand-ins written
for the mockup, **not** verified business data:

- `menu[].price` — indicative prices. The menu already carries a "prices are
  indicative" note; keep it or replace the numbers with the real board.
- `reviews` — sample testimonials. Swap in real, permissioned Google reviews.
- `queue.windows` / `queue.tips` — typical rush windows, not measured waits.
- `google.reviewCount` — left `null`, which renders "Rated by diners on Google
  Maps". Set a number and the copy switches to "From N Google reviews".
- `business.social` — placeholder profile URLs.

The 3.7/5 Google rating, the address, and the 8:30 PM closing time are the
values the business supplied.

## The live status badge

`StatusBadge` reads the shop's clock, not the visitor's: `getKualaLumpurNow`
formats `new Date()` through `Intl.DateTimeFormat` with
`timeZone: "Asia/Kuala_Lumpur"`, so someone checking from London still sees
whether the Damansara Jaya counter is open. It has three states — open, last
orders (inside the final hour), and closed with the next opening time — and
re-derives itself every 60 seconds so a tab left open over the dinner rush
stays honest.

Hours live in `openingHours` as minutes from midnight. To add a closed day,
set that entry's `open` and `close` to `null`; the badge walks forward to the
next day that opens and the hours table prints "Closed".

## Avoiding hydration mismatches

Anything that depends on "now" — the status badge, the "Today" row in the hours
table — renders a neutral placeholder on the server and on the first client
paint, then fills in from an effect after mount. Keep that pattern for any new
time-dependent copy, or React will complain that the trees differ.

## Scroll reveals

`<Reveal>` starts at `opacity-0` and un-hides on an IntersectionObserver. Since
that never runs without JavaScript, `app/layout.tsx` ships a `<noscript>` style
that forces `.reveal` visible. If you add a new hiding animation, give it the
same escape hatch. Everything also collapses to near-zero duration under
`prefers-reduced-motion`, including the review slider's autoplay, which stops
entirely.

## Deploying to Vercel

Import the repo and accept the defaults (`next build`, no environment variables).
Both routes are fully static and prerender at build time; the landing page ships
about 103 kB of first-load JS.

## A note on the Next.js version

The project pins `next@14.2.35`, the newest release on the 14.x line. `npm audit`
still reports advisories against all of 14.x; they are only fixed in Next 16,
which is a breaking upgrade. Most of the reported issues affect self-hosted
server features these static pages do not use, but plan the move to 16 if you
add server actions, rewrites or the image optimizer.
