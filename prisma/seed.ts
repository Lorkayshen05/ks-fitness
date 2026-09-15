/**
 * Seed data.
 *
 * Every organisation, figure and source below was taken from a primary or
 * clearly attributed public source, and nothing was invented to fill a gap:
 * no donation amounts, no beneficiary counts, no testimonials, no personal
 * stories. Figures carry the source they came from so a reader can check them.
 *
 * Re-running is safe — every record is upserted on its natural key.
 */

import { createPrismaClient } from "../lib/db";

// The same client factory the app uses, so seeding a hosted Turso database is
// the identical command with different environment variables.
const prisma = createPrismaClient();

/** Websites and donation URLs as published by each organisation. */
const organizations = [
  {
    slug: "unhcr-malaysia",
    name: "UNHCR Malaysia",
    description:
      "The UN Refugee Agency's country office in Kuala Lumpur. UNHCR registers and documents refugees and asylum-seekers in Malaysia — the largest group being Rohingya from Myanmar — and works on protection, resettlement referrals, and access to health and education through partners. Malaysia has no domestic refugee law, so UNHCR documentation has historically been the only recognition available. Donations to UNHCR support its global and country operations; they are not earmarked to individuals.",
    website: "https://www.unhcr.org/my/",
    donationUrl: "https://donate.unhcr.org/my/en-my/general",
    verified: true,
  },
  {
    slug: "insan",
    name: "INSAN — Development and Human Relief Society",
    description:
      "Pertubuhan Pembangunan dan Bantuan Insan, a humanitarian and development society registered with the Registry of Societies Malaysia (PPM-004-14-30102015) and based in Kuala Lumpur. INSAN runs relief and development programmes including emergency food assistance, and works with refugee and low-income communities in Malaysia alongside its international projects. Campaigns are published on its own donations page.",
    website: "https://www.insanrelief.org/",
    donationUrl: "https://www.insanrelief.org/donations-campaigns/",
    verified: true,
  },
  {
    slug: "malaysian-relief-agency",
    name: "Malaysian Relief Agency (MRA)",
    description:
      "A Malaysian humanitarian organisation registered under the Trustee Act 1952 (PPAB 20/2010), holding special consultative status with the UN Economic and Social Council since 2014. MRA's longest-running programme is the Rohingya Community School, established in 2009, which provides preschool and primary education to Rohingya children at centres in Kuala Lumpur and Kedah. Its other work covers disaster relief, medical services, Orang Asli and disability community development.",
    website: "https://mra.my/",
    donationUrl: "https://www.mra.my/donation/",
    verified: true,
  },
  {
    slug: "al-ikhlas-hope-society",
    name: "Al-Ikhlas Hope Society",
    description:
      "Pertubuhan Harapan Al-Ikhlas Kuala Lumpur dan Selangor, a community organisation serving refugees, migrants and stateless people. It runs Al-Ikhlas School — a UNHCR-registered kindergarten and primary learning centre for Rohingya and other Myanmar refugee children in Taman Sri Murni, Batu Caves, founded in 2015 — together with a community centre and a Refugee Emergency Fund covering healthcare and financial assistance.",
    website: "https://www.alikhlashopesociety.org/",
    donationUrl: "https://www.alikhlashopesociety.org/donate",
    verified: true,
  },
];

/**
 * Published figures only. `source` names the publisher, the figure's own
 * reference date, and where to check it.
 */
const metrics = [
  {
    label: "Refugees and asylum-seekers registered with UNHCR in Malaysia",
    value: "215,600",
    source:
      "UNHCR Malaysia, Figures at a Glance, as of end of February 2026 — https://www.unhcr.org/my/what-we-do/figures-glance-malaysia",
  },
  {
    label: "Registered refugees and asylum-seekers who are from Myanmar",
    value: "193,824",
    source:
      "UNHCR Malaysia, Figures at a Glance, as of end of February 2026 — https://www.unhcr.org/my/what-we-do/figures-glance-malaysia",
  },
  {
    label: "Registered Rohingya refugees and asylum-seekers in Malaysia",
    value: "126,144",
    source:
      "UNHCR Malaysia, Figures at a Glance, as of end of February 2026 — https://www.unhcr.org/my/what-we-do/figures-glance-malaysia",
  },
  {
    label: "Malaysian ratification of the 1951 Refugee Convention",
    value: "Not a party",
    source:
      "UN Treaty Collection, Convention relating to the Status of Refugees (1951) and its 1967 Protocol — Malaysia is not listed among states parties.",
  },
  {
    label: "Year Myanmar's Citizenship Law excluded Rohingya from recognised national groups",
    value: "1982",
    source:
      "Burma Citizenship Law 1982, which does not list Rohingya among Myanmar's recognised national ethnic groups — the legal origin of Rohingya statelessness.",
  },
  {
    label: "Government target for reviewing existing UNHCR-registered cases under the DPP system",
    value: "By 2029",
    source:
      "Human Rights Watch, 'Malaysia: New Refugee Registration System Raises Concerns', 4 May 2026 — https://www.hrw.org/news/2026/05/04/malaysia-new-refugee-registration-system-raises-concerns",
  },
];

/**
 * Contextual explainers, not testimony. The platform does not publish an
 * individual's account without documented informed consent, so none appears
 * here. Each piece ends with the sources it was written from.
 */
const stories = [
  {
    slug: "why-rohingya-refugees-are-in-malaysia",
    title: "Why Rohingya refugees are in Malaysia",
    published: true,
    imageUrl: null,
    content: `The Rohingya are a predominantly Muslim ethnic group from Rakhine State in western Myanmar. Understanding why so many of them are now in Malaysia begins with a single piece of legislation.

## Statelessness by law

Myanmar's 1982 Citizenship Law defines citizenship around a list of recognised national ethnic groups. Rohingya are not on that list. The practical effect has been that most Rohingya cannot establish citizenship in the country where they and their parents were born, leaving them stateless — without the passport, the identity documents or the legal standing that citizenship normally carries.

Statelessness is not an abstraction. It determines whether a person can travel between townships, own property, marry without permission, register a birth, or appeal a decision made about them.

## Displacement

Displacement from Rakhine State has happened in waves rather than as a single event. The largest and most documented was the Myanmar military's operations from August 2017, after which hundreds of thousands of people crossed into Bangladesh in a matter of weeks. Bangladesh continues to host by far the largest displaced Rohingya population.

## Why Malaysia

Malaysia is not a neighbouring country, and reaching it generally means a sea or overland journey arranged by others. It has nonetheless become one of the main onward destinations in Southeast Asia. The commonly cited reasons are the presence of established Rohingya communities that arrived in earlier decades, a shared religion, and the existence of a UNHCR office that has historically been able to register and document new arrivals.

Arriving is not the end of the situation. Malaysia has no domestic refugee law, which is the subject of the next piece in this section.

## Sources

- Burma Citizenship Law 1982.
- UNHCR Malaysia, Figures at a Glance: https://www.unhcr.org/my/what-we-do/figures-glance-malaysia
- UNHCR, Malaysia country page: https://www.unhcr.org/where-we-work/countries/malaysia`,
  },
  {
    slug: "what-no-legal-status-means-in-malaysia",
    title: "What having no legal status means day to day",
    published: true,
    imageUrl: null,
    content: `Malaysia is not a party to the 1951 Refugee Convention or its 1967 Protocol, and has no domestic legislation that creates refugee status. A person recognised as a refugee by UNHCR is, in Malaysian law, still a person without valid immigration documents.

## Work

There is no formal right to work. That does not mean people do not work — it means the work available is informal, unprotected and unenforceable. Wages can be withheld with no avenue of complaint, workplace injury carries no compensation, and reporting exploitation risks exposing one's own immigration status.

## School

Refugee children cannot enrol in government schools. The gap is filled by community learning centres — often a rented shoplot or a room attached to a community hall, staffed by a mix of paid teachers and volunteers, funded by donations. Two of the organisations listed on this platform run exactly this kind of centre. These centres are why school supplies, teacher salaries and rent appear so often on organisations' needs lists.

## Health

There is no subsidised public healthcare rate. Refugee patients are charged the foreigner rate at government facilities, which puts routine care and childbirth out of reach for many households, and makes NGO-run clinics and emergency medical funds a primary rather than supplementary service.

## A system in transition

In 2026 the Malaysian government began introducing its own Refugee Registration Document (Dokumen Pendaftaran Pelarian, or DPP) system, and in July 2026 directed UNHCR to pause new registrations during the transition. Human Rights Watch, Amnesty International Malaysia and Fortify Rights have each raised concerns about protection gaps while the two systems overlap, including the risk that people whose cases have not yet been reviewed are treated as undocumented.

This is an actively changing policy area. Treat any summary of it, including this one, as a starting point and check the sources below for the current position.

## Sources

- UN Treaty Collection: Malaysia is not a state party to the 1951 Convention or the 1967 Protocol.
- Human Rights Watch, 'Malaysia: New Refugee Registration System Raises Concerns', 4 May 2026: https://www.hrw.org/news/2026/05/04/malaysia-new-refugee-registration-system-raises-concerns
- Amnesty International Malaysia, 'Refugee protection cannot be paused during transition to DPP system', 23 July 2026: https://www.amnesty.my/2026/07/23/refugee-protection-cannot-be-paused-during-transition-to-dpp-system/
- Fortify Rights, 'Malaysia: New Refugee Registration Scheme Must Protect Rights', 1 June 2026: https://www.fortifyrights.org/mly-inv-2026-06-01/`,
  },
  {
    slug: "how-organisations-are-verified",
    title: "How organisations on this platform are verified",
    published: true,
    imageUrl: null,
    content: `The verified badge on this site makes a narrow, checkable claim. This piece sets out exactly what that claim is, so nobody reads more into it than it can carry.

## What is checked

For each listed organisation, two things are confirmed against a primary source — the organisation's own official website, or a public register:

- That the organisation exists as described, with its registration identifier where one is published.
- That the donation URL listed here is the organisation's own official donation channel, on its own domain or a platform it publicly names.

The date of that check is shown on the organisation's page, and is repeated wherever the badge appears.

## What is not checked

Verification is not an audit. It says nothing about how efficiently an organisation spends, how it prioritises between programmes, the quality of its services, its governance, or its financial position. It is also not continuous: an organisation can change its banking, its programmes or its leadership the day after a check.

Nor is a listing an endorsement. Several listed organisations run programmes far wider than Rohingya support, and inclusion here is not a judgement on all of that work.

## What happens when a check fails

If a donation URL stops resolving to the organisation's official channel, or registration details can no longer be confirmed, the badge is removed until they can be — the listing stays, marked as pending, rather than silently keeping a claim that is no longer supported.

Corrections are welcome through the contact form, ideally with a source.

## Why it is done this way

A directory that verified nothing would be a list of links. A directory that claimed to vouch for how organisations spend money would be making a promise it has no ability to keep. Publishing the exact scope of the check is the only version of this that is honest.`,
  },
  {
    slug: "where-your-donation-actually-goes",
    title: "Where your donation actually goes",
    published: true,
    imageUrl: null,
    content: `This platform does not take donations. It is worth being precise about what that means, because "donate here" buttons on the internet usually mean the opposite.

## The path a donation takes

You choose an organisation on this site. You select its donation link. Your browser opens that organisation's own donation page, on its own domain. From that point onward, this platform is not involved: the transaction runs through the organisation's payment processor, the receipt is issued by the organisation, and any refund or query is handled by the organisation.

This platform never sees your card details, never holds funds, takes no commission, and cannot look up your donation.

## What the organisation does with it

Organisations allocate donations according to their own programmes and published campaigns. Some run designated funds — a school fund, an emergency medical fund — and say so on their donation page. Unless an organisation states otherwise, a general donation goes to general operations, which is usually where the unglamorous and genuinely necessary costs sit: rent, teacher salaries, utilities, transport.

## Why this platform makes no per-person claims

You will not find a claim here that a specific sum reaches a specific family. Aid organisations pool and allocate funds; a claim of direct individual transfer would, in almost every case, be false. Where an organisation runs a sponsorship-style programme, that is the organisation's own claim to make on its own page, with its own accountability behind it.

## Practical advice before giving

- Check the address bar on the donation page matches the organisation's official domain.
- Keep the receipt the organisation issues; this platform cannot retrieve it.
- Tax deductibility depends on the organisation's own status — UNHCR Malaysia, for example, states that donations to it are not tax-deductible in Malaysia although receipts are issued. Check the organisation's page rather than assuming.

## Sources

- UNHCR Malaysia, Donate in Malaysia: https://www.unhcr.org/my/get-involved/ways-contribute/donate-malaysia`,
  },
];

async function main() {
  for (const organization of organizations) {
    await prisma.organization.upsert({
      where: { slug: organization.slug },
      create: organization,
      update: organization,
    });
  }

  for (const story of stories) {
    await prisma.story.upsert({
      where: { slug: story.slug },
      create: story,
      update: story,
    });
  }

  // ImpactMetric has no natural unique key in the schema, so labels are matched
  // explicitly and the row is rewritten in place rather than duplicated.
  for (const metric of metrics) {
    const existing = await prisma.impactMetric.findFirst({
      where: { label: metric.label },
      select: { id: true },
    });
    if (existing) {
      await prisma.impactMetric.update({ where: { id: existing.id }, data: metric });
    } else {
      await prisma.impactMetric.create({ data: metric });
    }
  }

  console.log(
    `Seeded ${organizations.length} organisations, ${stories.length} stories, ${metrics.length} metrics.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
