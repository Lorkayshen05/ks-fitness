/**
 * All copy and data for the Gepuklah landing page lives here so the page
 * component stays purely presentational.
 *
 * BEFORE LAUNCH — replace the values flagged `PLACEHOLDER`. They are
 * realistic stand-ins written for the mockup, not verified business data:
 *   • `menu[].price`      — indicative prices
 *   • `reviews`           — sample testimonials, not real Google reviews
 *   • `queue`             — typical rush windows, not measured wait times
 *   • `google.reviewCount`— left null until the real count is available
 * The rating (3.7/5), address, and closing time are the values supplied by
 * the business.
 */

/* -------------------------------------------------------------------------- */
/*  Business                                                                  */
/* -------------------------------------------------------------------------- */

export const TIMEZONE = "Asia/Kuala_Lumpur";

export const business = {
  name: "Gepuklah",
  byline: "by Mingchuun",
  kicker: "Ayam Gepuk · Damansara Jaya",
  tagline: "Smashed. Sambal-ed. Sold out by eight.",
  intro:
    "Boneless chicken chop, pounded thin and fried to a shatter, then buried under our house cashew sambal. Pick your heat, grab a stool, eat it while it is loud.",
  address: {
    line1: "Jalan SS 22/11",
    line2: "Damansara Jaya",
    postcode: "47400 Petaling Jaya",
    state: "Selangor, Malaysia",
  },
  /** Google Maps URL API links — no API key, no fabricated place IDs. */
  maps: {
    place:
      "https://www.google.com/maps/search/?api=1&query=Gepuklah%20by%20Mingchuun%2C%20Jalan%20SS%2022%2F11%2C%20Damansara%20Jaya%2C%2047400%20Petaling%20Jaya%2C%20Selangor",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Gepuklah%20by%20Mingchuun%2C%20Jalan%20SS%2022%2F11%2C%20Damansara%20Jaya%2C%2047400%20Petaling%20Jaya%2C%20Selangor",
  },
  social: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },
} as const;

export const fullAddress = [
  business.address.line1,
  business.address.line2,
  business.address.postcode,
  business.address.state,
].join(", ");

/* -------------------------------------------------------------------------- */
/*  Opening hours                                                             */
/* -------------------------------------------------------------------------- */

/** Minutes from midnight, in `TIMEZONE`. Index 0 = Sunday, matching `Date#getDay`. */
export interface DayHours {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  label: string;
  short: string;
  /** `null` on both fields means closed all day. */
  open: number | null;
  close: number | null;
}

const OPEN_AT = 11 * 60; // 11:00 AM
const CLOSE_AT = 20 * 60 + 30; // 8:30 PM

export const openingHours: DayHours[] = [
  { day: 1, label: "Monday", short: "Mon", open: OPEN_AT, close: CLOSE_AT },
  { day: 2, label: "Tuesday", short: "Tue", open: OPEN_AT, close: CLOSE_AT },
  { day: 3, label: "Wednesday", short: "Wed", open: OPEN_AT, close: CLOSE_AT },
  { day: 4, label: "Thursday", short: "Thu", open: OPEN_AT, close: CLOSE_AT },
  { day: 5, label: "Friday", short: "Fri", open: OPEN_AT, close: CLOSE_AT },
  { day: 6, label: "Saturday", short: "Sat", open: OPEN_AT, close: CLOSE_AT },
  { day: 0, label: "Sunday", short: "Sun", open: OPEN_AT, close: CLOSE_AT },
];

/** `510` → `"8:30 AM"`. Used for both the status badge and the hours table. */
export function formatMinutes(minutes: number): string {
  const total = ((minutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/* -------------------------------------------------------------------------- */
/*  Menu                                                                      */
/* -------------------------------------------------------------------------- */

export type HeatLevel = 0 | 1 | 2 | 3;

export type MenuCategoryId = "signature" | "sides" | "rice" | "drinks";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  blurb: string;
}

export const menuCategories: MenuCategory[] = [
  { id: "signature", label: "Signature", blurb: "The reason people queue." },
  { id: "sides", label: "Sides", blurb: "Fried, crunchy, gone in a minute." },
  { id: "rice", label: "Rice & Sets", blurb: "Make it a proper meal." },
  { id: "drinks", label: "Drinks", blurb: "For when the sambal wins." },
];

export interface MenuItem {
  id: string;
  name: string;
  /** Shown as a small kicker above the name. */
  malayName?: string;
  category: MenuCategoryId;
  /** Indicative price in MYR — PLACEHOLDER. */
  price: number;
  heat: HeatLevel;
  blurb: string;
  detail: string;
  ingredients: string[];
  /** Called out by customers in the brief. */
  favourite?: boolean;
  badge?: string;
}

export const menu: MenuItem[] = [
  {
    id: "ayam-gepuk",
    name: "Ayam Gepuk",
    malayName: "The original smash",
    category: "signature",
    price: 13.9,
    heat: 2,
    blurb:
      "Boneless chicken chop, marinated overnight, fried crisp and smashed flat in the mortar with sambal.",
    detail:
      "Whole boneless thigh — no bones, no shortcuts. It goes into the lesung hot from the fryer so the sambal soaks into every crack. Order it with rice, or on its own if you know what you are doing.",
    ingredients: ["Boneless chicken thigh", "House sambal", "Fried shallot", "Lime"],
    favourite: true,
    badge: "Most ordered",
  },
  {
    id: "sambal-gajus",
    name: "Sambal Gajus",
    malayName: "Cashew sambal",
    category: "signature",
    price: 6.5,
    heat: 3,
    blurb:
      "Toasted cashews pounded into chilli, garlic and belacan until it turns nutty, thick and dangerous.",
    detail:
      "The one that made the shop. Cashews are toasted to order and pounded in — that is where the roundness comes from, and why it clings to the chicken instead of sliding off. Comes as a side, or ask for extra on anything.",
    ingredients: ["Toasted cashew (gajus)", "Cili padi", "Garlic", "Belacan", "Palm sugar"],
    favourite: true,
    badge: "House favourite",
  },
  {
    id: "ayam-gepuk-gajus",
    name: "Ayam Gepuk Gajus",
    malayName: "Signature combo",
    category: "signature",
    price: 16.9,
    heat: 3,
    blurb: "The chicken chop and the cashew sambal, smashed together in the same mortar.",
    detail:
      "If you only order once, order this. Same boneless chop, but finished in sambal gajus instead of the standard sambal — richer, nuttier, noticeably hotter.",
    ingredients: ["Boneless chicken thigh", "Sambal gajus", "Cucumber", "Lime"],
    favourite: true,
  },
  {
    id: "bayam-goreng",
    name: "Crispy Bayam Goreng",
    malayName: "Fried spinach",
    category: "sides",
    price: 7.9,
    heat: 0,
    blurb: "Spinach leaves in a thin rice batter, fried to a crisp you can hear across the table.",
    detail:
      "Fried in small batches so it never goes soft, and salted the second it leaves the oil. Order it early — this is the first thing to sell out most evenings.",
    ingredients: ["Bayam leaves", "Rice flour batter", "Sea salt"],
    favourite: true,
    badge: "Sells out first",
  },
  {
    id: "tahu-tempe",
    name: "Tahu & Tempe Goreng",
    category: "sides",
    price: 5.5,
    heat: 0,
    blurb: "Golden tofu and tempeh, fried plain so the sambal does the talking.",
    detail:
      "The traditional partner to gepuk. Crisp edges, soft centre, and it soaks up whatever is left in the mortar.",
    ingredients: ["Firm tofu", "Tempeh", "Salt"],
  },
  {
    id: "telur-ceplok",
    name: "Telur Ceplok",
    category: "sides",
    price: 3.0,
    heat: 0,
    blurb: "Crispy-edged fried egg, yolk still running.",
    detail: "Add it to anything. It is three ringgit. Just add it.",
    ingredients: ["Egg", "Salt"],
  },
  {
    id: "nasi-lemak",
    name: "Nasi Lemak",
    category: "rice",
    price: 11.9,
    heat: 2,
    blurb: "Coconut rice, anchovies, peanuts, egg and sambal — the version that eats like dinner.",
    detail:
      "Santan rice steamed with pandan, plated with fried ikan bilis, roasted peanuts, cucumber and a wedge of egg. Add a gepuk chop on the side and it becomes the best value on the board.",
    ingredients: ["Coconut rice", "Ikan bilis", "Peanuts", "Egg", "Sambal", "Cucumber"],
    favourite: true,
  },
  {
    id: "nasi-putih",
    name: "Nasi Putih",
    category: "rice",
    price: 2.5,
    heat: 0,
    blurb: "Plain steamed rice. The neutral ground.",
    detail: "Free refills on the first scoop during lunch service.",
    ingredients: ["Steamed white rice"],
  },
  {
    id: "set-gepuk",
    name: "Set Gepuk Lengkap",
    malayName: "Full set",
    category: "rice",
    price: 19.9,
    heat: 2,
    blurb: "Ayam gepuk, rice, tahu-tempe, bayam goreng and a drink.",
    detail:
      "Everything a first-timer should try, on one tray. Pick your sambal — standard or gajus — and your heat level at the counter.",
    ingredients: ["Ayam gepuk", "Rice", "Tahu & tempe", "Bayam goreng", "Drink"],
    badge: "Best value",
  },
  {
    id: "teh-o-limau",
    name: "Teh O Ais Limau",
    category: "drinks",
    price: 4.5,
    heat: 0,
    blurb: "Iced tea, lime, plenty of ice. The standard sambal extinguisher.",
    detail: "Sweetened to order. Say kurang manis and we will believe you.",
    ingredients: ["Black tea", "Lime", "Sugar syrup"],
  },
  {
    id: "kelapa",
    name: "Air Kelapa",
    category: "drinks",
    price: 6.9,
    heat: 0,
    blurb: "Cold coconut water, straight up.",
    detail: "What the kitchen drinks after tasting the gajus.",
    ingredients: ["Young coconut water"],
  },
];

export const heatLabels: Record<HeatLevel, string> = {
  0: "No heat",
  1: "Mild",
  2: "Pedas",
  3: "Pedas gila",
};

/* -------------------------------------------------------------------------- */
/*  Google rating + reviews                                                   */
/* -------------------------------------------------------------------------- */

export const google = {
  rating: 3.7,
  outOf: 5,
  /** PLACEHOLDER — set to the live count from the Business Profile. */
  reviewCount: null as number | null,
  profileUrl: business.maps.place,
};

export interface Review {
  id: string;
  name: string;
  meta: string;
  rating: number;
  quote: string;
  dish: string;
}

/**
 * PLACEHOLDER testimonials written for the mockup. Replace with real,
 * permissioned reviews before this page goes live.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Amirah H.",
    meta: "Local Guide · Damansara Jaya",
    rating: 5,
    quote:
      "The cashew sambal is the whole point. Nutty, properly hot, and it sticks to the chicken instead of pooling on the plate. Boneless chop was still crackling when it hit the table.",
    dish: "Ayam Gepuk Gajus",
  },
  {
    id: "r2",
    name: "Wei Jian T.",
    meta: "Reviewed on Google",
    rating: 4,
    quote:
      "Came at 7pm on a Friday and waited about twenty minutes. Worth it. Bayam goreng was already sold out though — come earlier if that is what you are here for.",
    dish: "Crispy Bayam Goreng",
  },
  {
    id: "r3",
    name: "Nurul S.",
    meta: "Reviewed on Google",
    rating: 4,
    quote:
      "Small shop, fast counter, no fuss. Asked for level 3 and they did not water it down, which I respect. Nasi lemak portion is generous for the price.",
    dish: "Nasi Lemak",
  },
  {
    id: "r4",
    name: "Daniel L.",
    meta: "Local Guide · Petaling Jaya",
    rating: 3,
    quote:
      "Chicken is genuinely good and the sambal is better than most places in PJ. Seating is tight at peak hour and parking on SS22 is a hunt — plan for that and you will be fine.",
    dish: "Set Gepuk Lengkap",
  },
  {
    id: "r5",
    name: "Priya R.",
    meta: "Reviewed on Google",
    rating: 5,
    quote:
      "Ordered mild for my kids and pedas gila for myself. Both landed exactly as asked. The fried egg on top is three ringgit well spent.",
    dish: "Ayam Gepuk",
  },
];

/* -------------------------------------------------------------------------- */
/*  Queue info                                                                */
/* -------------------------------------------------------------------------- */

export interface QueueWindow {
  label: string;
  time: string;
  wait: string;
  level: "calm" | "busy" | "packed";
  note: string;
}

/** PLACEHOLDER — typical rush windows, not measured wait times. */
export const queue = {
  headline: "How the queue actually works",
  summary:
    "One counter, one mortar, everything smashed to order. That is why it tastes like this and why it takes a few minutes.",
  windows: [
    {
      label: "Opening",
      time: "11:00 AM – 12:00 PM",
      wait: "Walk right up",
      level: "calm",
      note: "First batch of bayam goreng comes out around 11:15.",
    },
    {
      label: "Lunch rush",
      time: "12:00 PM – 2:00 PM",
      wait: "15 – 25 min",
      level: "packed",
      note: "Office crowd from SS22. Seats fill before the queue does.",
    },
    {
      label: "Afternoon lull",
      time: "2:00 PM – 5:30 PM",
      wait: "5 – 10 min",
      level: "calm",
      note: "The best time to come if you want a table and a chat.",
    },
    {
      label: "Dinner rush",
      time: "5:30 PM – 7:30 PM",
      wait: "20 – 30 min",
      level: "packed",
      note: "Peak. Sides start running out from about 7:00.",
    },
    {
      label: "Last hour",
      time: "7:30 PM – 8:30 PM",
      wait: "10 – 15 min",
      level: "busy",
      note: "Kitchen stops taking orders once the day's chicken is gone.",
    },
  ] satisfies QueueWindow[],
  tips: [
    "We cook to order — nothing sits under a lamp, so the wait is the food, not the queue.",
    "Bayam goreng and sambal gajus are made in limited batches daily and regularly sell out before closing.",
    "Large orders (6 pax and above) are easiest before 11:30 AM or after 2:00 PM.",
    "Street parking along Jalan SS 22/11 is tight at peak — the lots one street over are a two-minute walk.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { id: "menu", label: "Menu" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit" },
] as const;

export const marqueeWords = [
  "Ayam Gepuk",
  "Sambal Gajus",
  "Crispy Bayam Goreng",
  "Nasi Lemak",
  "Smashed to order",
  "Damansara Jaya",
] as const;
