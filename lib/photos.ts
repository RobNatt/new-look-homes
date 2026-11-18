import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Project } from "./projects";

export type Photo = { src: string; alt: string };
export type PhotoPair = { before?: Photo; after?: Photo; beforePath: string; afterPath: string };

const EXTS = [".jpg", ".jpeg", ".webp", ".avif", ".png"];
const PUBLIC = path.join(process.cwd(), "public");

/** Finds public/<base>.<ext> at build time. Returns undefined if Nathan hasn't added it yet. */
function find(base: string): string | undefined {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(PUBLIC, base + ext))) return `/${base}${ext}`;
  }
  return undefined;
}

/** Resolves a project's before/after photos, plus the file paths the slots should ask for. */
export function projectPhotos(p: Project): PhotoPair {
  const base = `projects/${p.id}`;
  const label = p.confirmed ? `${p.room} in ${p.town}` : p.room;
  const before = find(`${base}/before`);
  const after = find(`${base}/after`);
  return {
    before: before ? { src: before, alt: `${label} before the remodel` } : undefined,
    after: after ? { src: after, alt: `${label} after the remodel by New Look Homes` } : undefined,
    beforePath: `public/${base}/before.jpg`,
    afterPath: `public/${base}/after.jpg`,
  };
}

/** Single (non before/after) photo slot, e.g. Nathan's portrait. */
export function singlePhoto(base: string, alt: string): { photo?: Photo; path: string } {
  const src = find(base);
  return { photo: src ? { src, alt } : undefined, path: `public/${base}.jpg` };
}
