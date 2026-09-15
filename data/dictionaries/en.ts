import type {
  AboutSectionId,
  FaqId,
  HelpWayId,
  MissionPointId,
  NavId,
  PrivacySectionId,
  TermsSectionId,
} from "@/data/content";

/**
 * English is the source of truth for the dictionary shape. `zh` and `ms` are
 * typed as `Dictionary`, so adding a key here without translating it fails
 * `npm run typecheck`.
 */
export const en = {
  meta: {
    siteName: "Sokongan Rohingya",
    title: "Sokongan Rohingya — Verified ways to support Rohingya refugees in Malaysia",
    description:
      "An independent, non-transactional directory of verified organisations supporting Rohingya refugees in Malaysia. Donations are processed by the organisations themselves, never by this site.",
    pages: {
      about: {
        title: "About this platform",
        description:
          "Why this platform exists, how organisations are verified, and what it deliberately does not do.",
      },
      help: {
        title: "Ways to help",
        description:
          "Practical, non-financial and financial ways to support Rohingya refugees in Malaysia through verified organisations.",
      },
      organizations: {
        title: "Verified organisations",
        description:
          "Search organisations working with Rohingya refugees in Malaysia. Every donation link points to the organisation's own official channel.",
      },
      impact: {
        title: "Impact and figures",
        description:
          "Published figures on the Rohingya refugee population in Malaysia, each one attributed to its primary source.",
      },
      stories: {
        title: "Context and explainers",
        description:
          "Sourced explainers on why Rohingya refugees are in Malaysia and what life without legal status involves.",
      },
      faq: {
        title: "Frequently asked questions",
        description:
          "How this platform works, where donations go, how organisations are verified, and how your data is handled.",
      },
      contact: {
        title: "Contact and volunteer",
        description:
          "Send a general enquiry or register your interest in volunteering with a verified organisation.",
      },
      privacy: {
        title: "Privacy policy",
        description: "What this platform collects, why, how long it is kept, and who can see it.",
      },
      terms: {
        title: "Terms of use",
        description: "The terms that apply to using this information platform.",
      },
    },
  },

  common: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    open: "Open",
    loading: "Loading…",
    readMore: "Read more",
    learnMore: "Learn more",
    viewAll: "View all",
    back: "Back",
    source: "Source",
    lastUpdated: "Last updated",
    published: "Published",
    verified: "Verified",
    verifiedTitle: "Verification checked against a primary source",
    unverified: "Verification pending",
    unverifiedTitle: "Not yet checked against a primary source",
    externalLink: "Opens the organisation's own website in a new tab",
    empty: "Nothing to show yet.",
    error: "Something went wrong. Please try again.",
    retry: "Try again",
  },

  lang: {
    label: "Language",
    switchTo: "Switch language",
  },

  nav: {
    home: "Home",
    links: {
      about: "About",
      help: "Ways to help",
      organizations: "Organisations",
      impact: "Impact",
      stories: "Context",
      faq: "FAQ",
      contact: "Contact",
    } satisfies Record<NavId, string>,
    legal: {
      privacy: "Privacy",
      terms: "Terms",
    },
    cta: "Find an organisation",
  },

  home: {
    hero: {
      eyebrow: "Independent · Malaysia · Non-transactional",
      title: "Support for Rohingya refugees in Malaysia, routed only through verified organisations.",
      subtitle:
        "This platform does not collect money. It helps you understand the situation, find organisations whose registration and donation channels have been checked, and reach them directly.",
      primary: "See verified organisations",
      secondary: "Understand the situation",
      note: "Every donation link on this site opens the organisation's own official donation page.",
    },
    mission: {
      eyebrow: "Our approach",
      title: "Three rules this platform holds itself to",
      body:
        "Humanitarian information fails when it exaggerates. These rules are what keep the platform usable by the people it describes as well as the people reading it.",
      points: {
        accurate: {
          title: "Figures carry their source",
          body:
            "Every number published here names where it came from and when it was last checked. If a figure cannot be attributed, it is not published.",
        },
        verified: {
          title: "Organisations are checked, not listed",
          body:
            "An organisation appears as verified only when its registration details and its official donation channel have been confirmed against a primary source.",
        },
        consent: {
          title: "No invented people",
          body:
            "This platform publishes contextual explainers, not personal testimony. No named individual appears without documented, informed consent — so none appear here yet.",
        },
      } satisfies Record<MissionPointId, { title: string; body: string }>,
    },
    help: {
      eyebrow: "Ways to help",
      title: "Money is one option among several",
      body:
        "Volunteering, hiring, teaching and donating goods all meet needs that cash alone does not. Each route below goes to a real next step.",
    },
    organizations: {
      eyebrow: "Directory",
      title: "Verified organisations",
      body:
        "Organisations working with Rohingya and other refugee communities in Malaysia. Search the full directory to filter by name or focus.",
    },
    impact: {
      eyebrow: "Figures",
      title: "The scale, as reported",
      body:
        "These are published figures from the agencies that collect them — not this platform's estimates.",
    },
    stories: {
      eyebrow: "Context",
      title: "Background worth reading first",
      body:
        "Short, sourced explainers on how the situation came about and what it means day to day in Malaysia.",
    },
    faq: {
      eyebrow: "Questions",
      title: "The three we are asked most",
      body: "The full list is on the FAQ page.",
    },
    cta: {
      title: "Choose a next step",
      body:
        "Pick an organisation and give directly through their own channel, or tell us how you would like to volunteer and we will pass it on.",
      primary: "Browse organisations",
      secondary: "Register to volunteer",
    },
  },

  about: {
    title: "About this platform",
    intro:
      "Sokongan Rohingya is an independent information platform about Rohingya refugees in Malaysia. It is not a charity, it is not an agent of any organisation listed on it, and it does not handle donations.",
    sections: {
      context: {
        title: "Why Rohingya refugees are in Malaysia",
        body: [
          "The Rohingya are a predominantly Muslim ethnic group from Rakhine State in Myanmar. Myanmar's 1982 Citizenship Law did not include them among the country's recognised national groups, which left most Rohingya stateless — without citizenship in the country where they were born.",
          "Successive waves of displacement, most prominently the military operations in Rakhine State from August 2017, pushed hundreds of thousands of people across borders. Bangladesh hosts the largest displaced population; Malaysia has become one of the main onward destinations in Southeast Asia.",
        ],
      },
      status: {
        title: "What their legal position in Malaysia is",
        body: [
          "Malaysia is not a party to the 1951 Refugee Convention or its 1967 Protocol, and has no domestic legislation that grants refugee status. People recognised as refugees by UNHCR have historically been documented by UNHCR rather than by Malaysian law, which means no formal right to work, no access to government schools, and no subsidised public healthcare rate.",
          "In 2026 the Malaysian government began introducing its own Refugee Registration Document (Dokumen Pendaftaran Pelarian, DPP) system and, in July 2026, directed UNHCR to pause new registrations during the transition. Human rights organisations including Human Rights Watch, Amnesty International Malaysia and Fortify Rights have raised concerns about protection gaps during that transition. This situation is still changing; check the primary sources cited on the Impact page before relying on any description of it, including this one.",
        ],
      },
      platform: {
        title: "What this platform does",
        body: [
          "It explains the situation using sourced material, lists organisations whose registration and official donation channels have been checked, and passes volunteer and contact enquiries to the platform's operators.",
          "It does not process payments, take a percentage, hold funds, or forward money on anyone's behalf. Selecting a donation link sends you to the organisation's own website, where that organisation's own terms and payment processor apply.",
        ],
      },
      language: {
        title: "How we write about people",
        body: [
          "Refugee communities are frequently described through either pity or suspicion. Both distort. This platform describes circumstances — statelessness, lack of work rights, barriers to schooling — rather than characterising a population, and it does not attribute the behaviour of individuals to an ethnic group.",
          "Photographs of identifiable people in distress are not used. Personal accounts are not published without documented, informed consent from the person concerned, which is why the Context section currently carries explainers rather than testimony.",
        ],
      },
      limits: {
        title: "What this platform is not",
        body: [
          "It is not legal advice, and it cannot register anyone as a refugee, intervene in a detention case, or represent anyone before an authority. UNHCR Malaysia and licensed legal aid providers are the appropriate first contact for those needs.",
          "Listing an organisation is not an endorsement of every activity it undertakes, and verification records a check made on a date — it is not a continuing guarantee. If you believe an entry is wrong or out of date, please tell us through the contact form.",
        ],
      },
    } satisfies Record<AboutSectionId, { title: string; body: string[] }>,
  },

  help: {
    title: "Ways to help",
    intro:
      "Every route below ends somewhere real — an organisation's own donation page, a volunteer enquiry that reaches a person, or material worth reading before you act.",
    ways: {
      donate: {
        title: "Give through a verified organisation",
        body:
          "Choose an organisation and donate on its own official page. This platform never handles the transaction, so you are covered by that organisation's receipting and refund terms, not ours.",
        action: "Browse organisations",
      },
      volunteer: {
        title: "Volunteer your time",
        body:
          "Community learning centres, clinics and relief programmes need teachers, translators, medical volunteers, drivers and administrators. Tell us what you can offer and we will pass it to the organisations that need it.",
        action: "Register your interest",
      },
      educate: {
        title: "Understand before you act",
        body:
          "Well-meaning help built on a misunderstanding creates work for the people it was meant to serve. The context section covers the basics in about ten minutes.",
        action: "Read the explainers",
      },
      employ: {
        title: "Offer work or training",
        body:
          "Refugees in Malaysia have no formal right to work, which makes any legitimate skills training, apprenticeship or income-generating partnership genuinely valuable. Employers and trainers can reach us through the contact form.",
        action: "Get in touch",
      },
      goods: {
        title: "Donate goods and equipment",
        body:
          "Learning centres and clinics publish their own current needs lists — usually school supplies, clothing, non-perishable food or medical consumables. Check an organisation's page before sending anything, as unsolicited goods cost them storage.",
        action: "Find an organisation",
      },
      advocate: {
        title: "Talk about it accurately",
        body:
          "Public conversation about refugees in Malaysia is often shaped by unsourced claims. Correcting a figure in your own circle, with the source attached, is small but real work.",
        action: "See the sources",
      },
    } satisfies Record<HelpWayId, { title: string; body: string; action: string }>,
  },

  organizations: {
    title: "Verified organisations",
    intro:
      "Organisations supporting Rohingya and other refugee communities in Malaysia. Donation links open the organisation's own official page in a new tab.",
    searchLabel: "Search organisations",
    searchPlaceholder: "Search by name or focus…",
    filterLabel: "Verification",
    filterAll: "All organisations",
    filterVerified: "Verified only",
    apply: "Search",
    reset: "Clear",
    resultsOne: "1 organisation",
    resultsMany: "{count} organisations",
    emptyTitle: "No organisations match that search",
    emptyBody: "Try a shorter search term, or clear the filters to see the full directory.",
    visit: "Visit website",
    donate: "Donate",
    details: "Details",
    disclaimer:
      "This platform is not affiliated with the organisations listed and receives no share of any donation.",
  },

  organization: {
    backToList: "All organisations",
    aboutHeading: "About this organisation",
    linksHeading: "Official channels",
    website: "Official website",
    donation: "Official donation page",
    verifiedOn: "Verification last checked",
    notice:
      "Donations are made on the organisation's own website, under its terms and its payment processor. Sokongan Rohingya does not receive, hold or forward any funds.",
    notFound: "That organisation is not in the directory.",
  },

  donate: {
    trigger: "Donate",
    title: "You are leaving this site",
    body:
      "Donations are processed by the organisation, not by this platform. The link below opens their official donation page in a new tab.",
    checklistTitle: "Before you continue",
    checklist: [
      "Confirm the address in your browser matches the organisation's official domain.",
      "Keep the receipt the organisation issues — this platform cannot access it.",
      "Tax deductibility depends on the organisation's status, not on this platform.",
    ],
    confirm: "Continue to {name}",
    cancel: "Stay here",
    unverifiedWarning:
      "This organisation's donation channel has not yet been confirmed against a primary source. Please verify it independently before giving.",
  },

  impact: {
    title: "Impact and figures",
    intro:
      "Figures published by the agencies that collect them. Each one names its source and the date it was last checked here. This platform publishes no estimate of its own.",
    sourceNote:
      "Sources are reproduced as published. Where a figure has changed since it was recorded, the source link is authoritative, not this page.",
    emptyTitle: "No figures published",
    emptyBody: "Figures appear here once they have been attributed to a primary source.",
    caveatTitle: "Why there are no donation or outcome totals here",
    caveatBody:
      "This platform does not process donations and does not run programmes, so it has no donation totals or beneficiary outcomes of its own to report. Publishing figures it cannot verify would be exactly the failure this section exists to avoid.",
  },

  stories: {
    title: "Context and explainers",
    intro:
      "Short, sourced pieces on how the situation came about and what it means in practice. Each cites its sources at the end.",
    editorialTitle: "A note on personal stories",
    editorialBody:
      "Personal accounts are powerful and easy to misuse. This platform does not publish an individual's story without their documented, informed consent and a right to withdraw it, and it never invents one. Until consented accounts are available, this section carries context rather than testimony.",
    emptyTitle: "No pieces published yet",
    emptyBody: "Explainers appear here once they have been written and sourced.",
    backToList: "All context pieces",
    notFound: "That piece is not published.",
  },

  faq: {
    title: "Frequently asked questions",
    intro: "How the platform works, and what it deliberately does not do.",
    items: {
      "who-runs": {
        q: "Who runs this platform?",
        a: "It is an independent, volunteer-built information project focused on Malaysia. It is not a registered charity, not a government body, and not an agent of any organisation listed on it. It has no fundraising licence and does not seek one, because it does not raise funds.",
      },
      "where-money-goes": {
        q: "Where does my donation go?",
        a: "Directly to the organisation you choose, on their own website, through their own payment processor. This platform never sees the transaction, takes no percentage, and cannot access your receipt. We also do not claim that money reaches any named individual — organisations allocate funds according to their own programmes.",
      },
      "how-verified": {
        q: "What does the verified badge mean?",
        a: "That, on the date shown, the organisation's registration details and the donation URL listed here were checked against a primary source — the organisation's own official site or a public register. It is a record of a check on a date, not a continuing guarantee of conduct, solvency or programme quality.",
      },
      "why-no-payments": {
        q: "Why not just take donations here?",
        a: "Collecting donations on behalf of others triggers fundraising licensing, trust accounting and refund obligations, and it inserts an unnecessary intermediary between you and the organisation. Sending you straight to the source is both safer and more honest about who is accountable.",
      },
      "legal-status": {
        q: "Do Rohingya refugees have legal status in Malaysia?",
        a: "Malaysia is not a party to the 1951 Refugee Convention and has no domestic refugee law, so recognition has historically come from UNHCR rather than Malaysian statute. That means no formal right to work, no place in government schools and no subsidised healthcare rate. A government Refugee Registration Document (DPP) system began rolling out in 2026 and the position is still changing — check the sources on the Impact page rather than relying on a summary.",
      },
      "volunteer-requirements": {
        q: "What do I need to volunteer?",
        a: "It depends entirely on the organisation. Teaching and translation roles usually ask for a regular weekly commitment rather than a qualification; medical and legal roles require the relevant credentials. Some organisations require a background check for roles involving children. Send us what you can offer and we will pass it to organisations with a matching need.",
      },
      "data-handling": {
        q: "What happens to what I submit?",
        a: "Your name, email, message and enquiry type are stored on this platform's server so that a human can respond and, where relevant, refer you to an organisation. Nothing you submit is published, sold, or used for advertising. The full detail is in the privacy policy.",
      },
      "report-problem": {
        q: "An entry looks wrong. What do I do?",
        a: "Please tell us through the contact form, with the source if you have one. A listing found to be inaccurate is corrected or removed; an organisation whose details can no longer be confirmed loses its verified badge until they are.",
      },
    } satisfies Record<FaqId, { q: string; a: string }>,
  },

  contact: {
    title: "Contact and volunteer",
    intro:
      "Use this form for general enquiries, corrections, or to register interest in volunteering. It reaches the people who run this platform — not the organisations directly.",
    responseTitle: "What to expect",
    responseBody:
      "This is a volunteer-run project, so replies are not immediate. Urgent protection matters should go to UNHCR Malaysia or a licensed legal aid provider rather than through this form.",
    urgentTitle: "If the matter is urgent",
    urgentBody:
      "This platform cannot intervene in detention, deportation or registration cases. Contact UNHCR Malaysia or a licensed legal aid organisation directly.",
  },

  form: {
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    typeLabel: "What is this about?",
    types: {
      general: "General enquiry",
      volunteer: "Volunteering",
    },
    messageLabel: "Message",
    messagePlaceholderGeneral: "Tell us what you need, or what we have got wrong.",
    messagePlaceholderVolunteer:
      "What could you offer, and roughly how much time? Include any relevant skills or credentials.",
    submit: "Send message",
    submitting: "Sending…",
    required: "Required",
    privacyNote:
      "Submitting this form stores your name, email and message on our server so we can reply. See the privacy policy.",
    feedback: {
      success: "Thank you — your message has been received. We will reply by email.",
      error: "Your message could not be sent. Please check the fields below and try again.",
      rateLimited: "That is a few messages in a short time. Please wait a minute and try again.",
      server: "Something went wrong on our side. Please try again in a moment.",
    },
    errors: {
      nameRequired: "Please enter your name.",
      nameTooLong: "Please keep your name under 100 characters.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "That does not look like an email address.",
      emailTooLong: "Please use an email address under 200 characters.",
      messageRequired: "Please write a message.",
      messageTooShort: "Please write at least 10 characters so we can act on it.",
      messageTooLong: "Please keep your message under 4,000 characters.",
      typeInvalid: "Please choose what your message is about.",
    },
  },

  legal: {
    updated: "Last reviewed",
    privacy: {
      title: "Privacy policy",
      intro:
        "This platform collects as little as it can. It has no analytics, no advertising, no tracking pixels and no third-party scripts.",
      sections: {
        collect: {
          title: "What we collect",
          body: [
            "When you submit the contact or volunteer form: the name, email address, message and enquiry type you provide.",
            "A language preference, stored in a first-party cookie so the site renders in the language you chose. It contains nothing but the language code.",
            "Standard server request logs kept by the hosting provider. This platform adds no analytics or tracking of its own.",
          ],
        },
        use: {
          title: "Why we use it",
          body: [
            "To reply to you, and — where you have asked to volunteer or offer work — to refer your enquiry to an organisation that has a matching need.",
            "To apply basic anti-spam limits, which involves counting recent submissions per network address for a short period.",
          ],
        },
        retain: {
          title: "How long we keep it",
          body: [
            "Submissions are kept for as long as needed to handle the enquiry and any follow-up, and are deleted on request.",
            "Anti-spam counters are held in memory only and are discarded within minutes.",
          ],
        },
        share: {
          title: "Who else sees it",
          body: [
            "Nobody, unless referring your enquiry requires it — and then only the organisation concerned, only with the detail needed, and only for volunteering, employment or goods enquiries you have sent for that purpose.",
            "We do not sell, rent or trade submissions, and we do not use them for advertising.",
          ],
        },
        rights: {
          title: "Your choices",
          body: [
            "You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted, by writing to us through the contact form.",
            "Following a donation link takes you to a third party. Once there, that organisation's privacy policy governs — not this one.",
          ],
        },
        cookies: {
          title: "Cookies",
          body: [
            "One cookie is set: your language preference. It is first-party, contains only a language code, and expires after a year.",
            "There are no advertising or analytics cookies, so there is no consent banner to dismiss.",
          ],
        },
      } satisfies Record<PrivacySectionId, { title: string; body: string[] }>,
    },
    terms: {
      title: "Terms of use",
      intro:
        "Using this site means accepting the terms below. They are short because the platform does very little on your behalf.",
      sections: {
        purpose: {
          title: "What this service is",
          body: [
            "An information directory about organisations supporting Rohingya refugees in Malaysia, published for public benefit.",
            "It is not legal, medical, immigration or financial advice, and it is not a substitute for contacting UNHCR Malaysia or a licensed provider.",
          ],
        },
        "no-payments": {
          title: "No payment processing",
          body: [
            "This platform does not collect, hold, forward or refund donations, and takes no commission of any kind.",
            "Donation links lead to third-party websites. Any donation you make is a contract between you and that organisation, governed by its terms and its payment processor.",
          ],
        },
        accuracy: {
          title: "Accuracy and verification",
          body: [
            "Content is published in good faith from sources named on the page, but circumstances change and sources are revised. Always check the cited source before relying on a figure.",
            "A verified badge records a check made on a stated date against a primary source. It is not an endorsement, a guarantee of conduct or an assurance of financial standing.",
          ],
        },
        conduct: {
          title: "Acceptable use",
          body: [
            "Do not use the forms to send abuse, spam, malware or bulk marketing, and do not attempt to interfere with the service or access data that is not yours.",
            "Submissions that breach this are deleted, and access may be blocked.",
          ],
        },
        liability: {
          title: "Liability",
          body: [
            "The site is provided as is. To the extent the law allows, the operators are not liable for loss arising from use of the site or from dealings with a third-party organisation found through it.",
            "Nothing here limits liability that cannot lawfully be limited.",
          ],
        },
        changes: {
          title: "Changes",
          body: [
            "These terms may be updated; the review date at the top of this page shows when they last were.",
            "Continuing to use the site after a change means accepting the revised terms.",
          ],
        },
      } satisfies Record<TermsSectionId, { title: string; body: string[] }>,
    },
  },

  notFound: {
    title: "Page not found",
    body: "That page does not exist, or it has moved. The main sections are linked below.",
    cta: "Back to home",
  },

  footer: {
    blurb:
      "An independent information platform on supporting Rohingya refugees in Malaysia. Not a charity, and not a payment processor.",
    exploreHeading: "Explore",
    legalHeading: "Legal",
    disclaimerHeading: "Important",
    disclaimer:
      "Sokongan Rohingya does not collect donations. Every donation link opens the listed organisation's own official page, where that organisation is solely responsible for processing, receipting and allocating your gift.",
    rights: "Published for public benefit. Content reusable with attribution to its original source.",
  },
};

export type Dictionary = typeof en;
