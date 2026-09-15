# Sokongan Rohingya

An independent, **non-transactional** information platform about supporting
Rohingya refugees in Malaysia. It explains the situation from cited sources,
lists organisations whose registration and official donation channels have been
checked, and passes contact and volunteer enquiries to the people who run it.

It deliberately does **not** process payments. Every donation link opens the
listed organisation's own official donation page, where that organisation is
solely responsible for processing, receipting and allocating the gift.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma and SQLite.

## Getting started

```bash
npm install                # postinstall runs `prisma generate`
cp .env.example .env       # then edit if you need different values
npm run db:migrate         # creates prisma/dev.db and applies the migration
npm run db:seed            # loads the verified organisations, figures, articles
npm run dev                # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`, `npm test`, `npm run db:reset`.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | local, any host with a disk | SQLite connection string. Relative paths resolve against `prisma/`. |
| `NEXT_PUBLIC_SITE_URL` | **required in production** | Absolute public origin, no trailing slash. Canonical URLs, hreflang, `sitemap.xml`, `robots.txt` and Open Graph tags are generated from it. A production build **fails** without it rather than silently shipping `localhost` canonicals. |
| `TURSO_DATABASE_URL` | serverless production only | `libsql://…` URL of a hosted Turso database. When set, the same Prisma client runs on the libSQL driver instead of the local file. |
| `TURSO_AUTH_TOKEN` | serverless production only | Token for that database. |

No secret is ever committed: `.env` is git-ignored and `.env.example` carries
placeholders only. `NEXT_PUBLIC_SITE_URL` is the only variable exposed to the
browser, and it is a public origin by definition.

## Routes

| Route                    | Page                                                                |
| ------------------------ | ------------------------------------------------------------------- |
| `/`                      | Hero → mission → ways to help → organisations → figures → context → FAQ → CTA. |
| `/about`                 | Why the platform exists, the situation, and what it is not.          |
| `/help`                  | Six routes to helping, financial and otherwise.                      |
| `/organizations`         | Directory with server-side search and a verified-only filter.        |
| `/organizations/[slug]`  | One organisation: description, official links, donation interstitial. |
| `/impact`                | Published figures, each with its source and check date.              |
| `/stories`               | Sourced explainers, plus the editorial note on personal accounts.    |
| `/stories/[slug]`        | One article.                                                         |
| `/faq`                   | Full FAQ, with `FAQPage` structured data.                            |
| `/contact`               | Contact and volunteer form (`?type=volunteer` preselects).           |
| `/privacy`, `/terms`     | Legal pages.                                                         |
| `/sitemap.xml`, `/robots.txt` | Generated from the route config and the database.               |

Unknown paths and unknown slugs both return a real **404** status, not a soft one.

## Structure

| Path                    | Purpose                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `app/`                  | Routes. Server components throughout; `page.tsx` reads, renders, done. |
| `components/`           | The shared UI kit. Four of them are client components (see below).    |
| `actions/`              | Server actions: `submissions.ts` (one action, both enquiry types) and `locale.ts`. |
| `lib/`                  | `db`, `queries`, `i18n`, `validation`, `sanitize`, `rate-limit`, `seo`, `utils`. |
| `data/content.ts`       | Structural config: section ids and their order.                       |
| `data/dictionaries/`    | Every user-facing string, in `en`, `zh` and `ms`.                     |
| `types/`                | Shared types, locales and the form-state contract.                    |
| `prisma/`               | Schema, migration and seed.                                           |

## How language works

Locale lives in a first-party cookie and is resolved **on the server**, so every
page renders its final text in one pass. There is no locale provider, no
dictionary in the client bundle and no hydration mismatch to guard against.

The switcher is a plain `<form>` posting to the `setLocale` server action, so it
works with JavaScript disabled.

`data/dictionaries/en.ts` defines the shape (`Dictionary`); `zh` and `ms` are
typed as `Dictionary`, so adding an English key without translating it fails
`npm run typecheck`. Collections that must be complete — FAQ entries, ways to
help, mission points — are keyed `Record`s over ids declared in
`data/content.ts`, so a missing item is a type error rather than a gap on the page.

Because language is a cookie rather than a URL segment, every language shares one
canonical URL and crawlers receive the English copy.

## Client components, and why

Everything is a server component except four, each of which exists because the
browser genuinely needs to do something:

| Component            | Why it is a client component                                    |
| -------------------- | ---------------------------------------------------------------- |
| `form.tsx`           | `useFormState` / `useFormStatus` for pending, success and per-field error states. |
| `modal.tsx`          | Opening and closing a native `<dialog>`.                         |
| `donate-button.tsx`  | Owns the modal's open state.                                     |
| `mobile-nav.tsx`     | Must close the panel when a link changes the route; the header lives in the layout and is never remounted. |

Everything else — the language switcher, the FAQ accordion (`<details>`), the
organisation search (a GET form) — is server-rendered with no JavaScript at all.
Copy is passed into client components as plain props, so no dictionary is ever
shipped to the browser.

## Content rules

These are enforced by the code and the seed data, not just by intention:

- **Every figure carries its source.** `ImpactMetric.source` is required, and
  `MetricCard` renders it. A figure that cannot be attributed is not published.
- **Verified means one specific thing.** On the date shown, the organisation's
  registration details and the donation URL listed here were checked against a
  primary source. It is not an audit, an endorsement or a continuing guarantee —
  `/stories/how-organisations-are-verified` says exactly that, and the date is
  rendered next to every badge.
- **No invented people.** The platform publishes contextual explainers, not
  personal testimony, and publishes no individual's account without documented
  informed consent. The `/stories` page states this in place of the testimonials
  a site like this would normally carry.
- **No per-person donation claims.** Organisations pool and allocate funds; the
  platform never claims a sum reaches a named individual.

## Safety and correctness notes

- **Validation and sanitisation** live in `lib/validation.ts` and
  `lib/sanitize.ts` and run on the server. Input is sanitised first, then
  validated, so a message made entirely of markup fails as empty rather than
  passing on its raw length. Errors are returned as dictionary keys, so the
  validator knows nothing about languages.
- **Anti-spam**: a hidden honeypot field plus an in-process sliding-window
  limiter (5 submissions per minute per client). Counters are in memory, so a
  multi-instance deployment limits per instance — swap the map in
  `lib/rate-limit.ts` for a shared store before scaling out.
- **Server errors** are logged in full and returned to the browser as a generic
  message key.
- **`app/organizations/(list)` and `app/stories/(list)`** are route groups, so
  they add nothing to the URL. They exist to scope `loading.tsx`: a skeleton
  placed directly in the parent segment would also wrap `[slug]`, and streaming
  it commits a 200 status before the detail page can call `notFound()` — turning
  a genuine 404 into a soft one.
- **Response headers** set in `next.config.mjs`: `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS, with
  `x-powered-by` removed. The site loads no third-party scripts and embeds no
  remote images, so none of these costs anything.

## Deployment

### Why the database needs a decision first

The schema is SQLite, which is ideal locally and on any host with a persistent
disk — but Vercel's filesystem is ephemeral and read-only, so a `file:` database
would be wiped on every deploy and every cold start. `lib/db.ts` therefore
supports two backends behind one client:

| Host | Set | Backend |
| --- | --- | --- |
| Local, Fly.io, Render, Railway, a VPS, Docker | `DATABASE_URL` | Prisma's own SQLite engine against a file on disk. |
| Vercel, or any serverless platform | `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` | The libSQL driver adapter against a hosted Turso database. |

Same schema, same migrations, same queries — nothing else in the app changes.

### Vercel (recommended)

No `vercel.json` is needed: Next.js is zero-config on Vercel, and `postinstall`
already runs `prisma generate` during the install step.

```bash
# 1. Create the database (once), then apply this repo's migrations to it.
turso db create sokongan-rohingya
npm run db:sql | turso db shell sokongan-rohingya

# 2. Seed it — the same seed script, pointed at Turso.
TURSO_DATABASE_URL="libsql://<db>-<org>.turso.io" \
TURSO_AUTH_TOKEN="<token>" \
  npm run db:seed

# 3. Import the repo in Vercel and set the project environment variables:
#      NEXT_PUBLIC_SITE_URL = https://<your-domain>
#      TURSO_DATABASE_URL   = libsql://<db>-<org>.turso.io
#      TURSO_AUTH_TOKEN     = <token>
#    Then deploy. Vercel terminates TLS and issues the certificate itself.
```

### A host with a persistent disk

```bash
npm ci
npx prisma migrate deploy     # applies migrations to DATABASE_URL
npm run db:seed               # first deploy only, or when seed content changes
NEXT_PUBLIC_SITE_URL=https://<your-domain> npm run build
npm start
```

### Verifying a build locally before shipping

```bash
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000 npm run build
npm start
```

`npm run lint`, `npm run typecheck`, `npm test` and `npm run build` all run in CI
against a freshly migrated and seeded database.
