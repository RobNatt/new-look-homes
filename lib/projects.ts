/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECT PHOTO SLOTS
 *
 *  Every before/after image on the site comes from a project listed here.
 *  To add Nathan's real photos, drop the files into:
 *
 *      public/projects/<id>/before.jpg
 *      public/projects/<id>/after.jpg
 *
 *  (.jpg, .jpeg, .webp, .avif or .png all work.) They appear automatically
 *  on the next build. Until a file exists, the site shows a labeled slot
 *  that names the exact file it's waiting for.
 *
 *  Photo rules (design-system.md §6): before and after from the SAME spot,
 *  same lens, same height, same exposure. Landscape 3:2, at least 2400px wide.
 *
 *  PLACEHOLDER: titles, towns and details. Fill in once Nathan picks projects.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Project = {
  id: string;
  room: string;
  title: string; // PLACEHOLDER until real
  town: string; // PLACEHOLDER until real
  details: string; // PLACEHOLDER: duration · key materials
  confirmed: boolean;
};

export const projects = {
  featured: {
    id: "featured",
    room: "Featured remodel",
    title: "Project name",
    town: "Town, DE",
    details: "Duration · Key materials",
    confirmed: false,
  },
  kitchen1: {
    id: "kitchen-01",
    room: "Kitchen",
    title: "Kitchen project 1",
    town: "Town, DE",
    details: "Duration · Cabinets · Counters",
    confirmed: false,
  },
  kitchen2: {
    id: "kitchen-02",
    room: "Kitchen",
    title: "Kitchen project 2",
    town: "Town, DE",
    details: "Duration · Key materials",
    confirmed: false,
  },
  bath1: {
    id: "bath-01",
    room: "Bathroom",
    title: "Bathroom project 1",
    town: "Town, DE",
    details: "Duration · Tile · Fixtures",
    confirmed: false,
  },
  basement1: {
    id: "basement-01",
    room: "Basement",
    title: "Basement project",
    town: "Town, DE",
    details: "Duration · Key materials",
    confirmed: false,
  },
  interior1: {
    id: "interior-01",
    room: "Interior renovation",
    title: "Interior project",
    town: "Town, DE",
    details: "Duration · Key materials",
    confirmed: false,
  },
  deck1: {
    id: "deck-01",
    room: "Deck or porch",
    title: "Deck project",
    town: "Town, DE",
    details: "Duration · Key materials",
    confirmed: false,
  },
} satisfies Record<string, Project>;
