/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT + PLACEHOLDERS
 *
 *  Everything Nathan still needs to confirm lives in this one file.
 *  Search the project for "PLACEHOLDER" to find every spot that needs a real value.
 *
 *  Rules until Nathan confirms:
 *    • No prices anywhere on the site.
 *    • No reviews or testimonials.
 *    • No license number shown (the `license` field stays unconfirmed).
 *
 *  Any field with `confirmed: false` is shown on the page as a visible
 *  placeholder and is left OUT of the LocalBusiness schema, so search engines
 *  never index a fake value.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Confirmable<T> = { value: T; confirmed: boolean };

export const SITE_URL = "https://www.newlookhomes.example"; // PLACEHOLDER: real domain

export const business = {
  name: "New Look Homes",
  owner: "Nathan Morris",
  city: "Dover",
  region: "DE",
  regionName: "Delaware",
  county: "Kent County",

  // PLACEHOLDER: business phone. Set `confirmed: true` once it's real.
  phone: {
    value: { display: "(302) XXX-XXXX", tel: "+13020000000" },
    confirmed: false,
  } as Confirmable<{ display: string; tel: string }>,

  // PLACEHOLDER: street address (optional for a service-area business)
  streetAddress: { value: "", confirmed: false } as Confirmable<string>,
  postalCode: { value: "199XX", confirmed: false } as Confirmable<string>,

  // PLACEHOLDER: hours. Schema format uses openingHours strings.
  hours: {
    value: [
      { days: "Mon–Fri", time: "X:00 AM – X:00 PM", schema: "Mo-Fr 00:00-00:00" },
      { days: "Sat", time: "By appointment", schema: "" },
    ],
    confirmed: false,
  } as Confirmable<{ days: string; time: string; schema: string }[]>,

  // PLACEHOLDER: Delaware contractor license number. Do NOT display until Nathan confirms.
  license: { value: "", confirmed: false } as Confirmable<string>,

  // PLACEHOLDER: logo file (e.g. /logo.svg). Until then a text wordmark is used.
  logo: { value: "", confirmed: false } as Confirmable<string>,

  // PLACEHOLDER: email for estimate requests (used by /api/estimate when wired up)
  email: { value: "", confirmed: false } as Confirmable<string>,
};

/**
 * PLACEHOLDER: service area. Draft list of Kent County towns. Nathan to confirm
 * which ones he actually serves, and add/remove as needed.
 */
export const serviceArea: Confirmable<string[]> = {
  value: [
    "Dover",
    "Camden",
    "Wyoming",
    "Magnolia",
    "Smyrna",
    "Clayton",
    "Cheswold",
    "Felton",
    "Harrington",
    "Milford",
  ],
  confirmed: false,
};

/**
 * PLACEHOLDER: service list. Drafted from a typical remodeler's scope.
 * Nathan to confirm what he does, does not do, and anything missing.
 */
export const services = {
  confirmed: false,
  kitchensAndBaths: [
    {
      slug: "kitchen-remodeling",
      name: "Kitchen remodeling",
      summary:
        "Cabinets, counters, flooring, lighting and layout changes, from a refresh to a full gut-and-rebuild.",
      includes: [
        "Cabinet replacement or refacing",
        "Countertops and backsplash",
        "Layout changes and islands",
        "Lighting and electrical updates",
        "Flooring",
      ],
    },
    {
      slug: "bathroom-remodeling",
      name: "Bathroom remodeling",
      summary:
        "Walk-in showers, tub replacements, tile, vanities and fixtures, built to hold up to daily use.",
      includes: [
        "Tub-to-shower conversions",
        "Tile showers and floors",
        "Vanities, mirrors and storage",
        "Fixtures and plumbing updates",
        "Accessibility upgrades (grab bars, curbless showers)",
      ],
    },
  ],
  other: [
    {
      slug: "basements",
      name: "Basement finishing",
      summary: "Turn unused square footage into a family room, office or guest suite.",
    },
    {
      slug: "flooring",
      name: "Flooring",
      summary: "Hardwood, luxury vinyl plank and tile, installed throughout the house.",
    },
    {
      slug: "interior-renovation",
      name: "Interior renovation",
      summary: "Open up floor plans, update trim and doors, and refresh whole rooms.",
    },
    {
      slug: "additions",
      name: "Additions and sunrooms",
      summary: "More room without moving: bump-outs, sunrooms and new living space.",
    },
    {
      slug: "decks-porches",
      name: "Decks and porches",
      summary: "Outdoor living space built to match the house.",
    },
    {
      slug: "repairs",
      name: "Drywall, paint and repairs",
      summary: "The smaller jobs that make a big difference before a sale or a move-in.",
    },
  ],
};

export const projectTypes = [
  "Kitchen",
  "Bathroom",
  "Basement",
  "Flooring",
  "Addition or sunroom",
  "Deck or porch",
  "Other / not sure yet",
];

export const contactTimes = ["Morning (8–11)", "Midday (11–2)", "Afternoon (2–5)", "Evening (5–7)", "Any time"];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/kitchens-and-baths", label: "Kitchens & Baths" },
  { href: "/other-services", label: "Other Services" },
  { href: "/about", label: "About" },
];
