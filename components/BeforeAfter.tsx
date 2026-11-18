"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { PhotoPair } from "@/lib/photos";
import { Chevrons } from "./Icons";
import { PhotoSlot } from "./Placeholder";

const DRAG_SLOP = 8; // px a touch must travel sideways before it counts as a drag (vs. a vertical scroll)

/**
 * Before/after comparison (design-system.md §7.2).
 * Mouse: grab and drag, or click to jump. Touch/pen: drag sideways to compare, swipe vertically to keep
 * scrolling the page (the divider does NOT move), tap to jump. Keyboard: arrows / PageUp / PageDown / Home / End.
 * Never animates on its own. Empty photos render as labeled slots for Nathan's real project photos.
 */
export function BeforeAfter({
  label,
  project,
  photos,
  caption,
  priority = false,
  sizes = "(min-width: 1280px) 1200px, 100vw",
}: {
  label: string;
  project: string;
  photos: PhotoPair;
  caption?: ReactNode;
  priority?: boolean;
  sizes?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const g = useRef<{ id: number; x: number; y: number; dragging: boolean; touch: boolean } | null>(null);
  const [pos, setPos] = useState(50);

  const apply = useCallback((p: number) => {
    const v = Math.min(100, Math.max(0, p));
    root.current?.style.setProperty("--pos", `${v}%`);
    setPos(v);
  }, []);

  const pctAt = (clientX: number) => {
    const r = root.current!.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * 100;
  };

  const jump = (p: number) => {
    const el = root.current!;
    el.classList.add("is-animating");
    window.setTimeout(() => el.classList.remove("is-animating"), 220);
    apply(p);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const touch = e.pointerType !== "mouse";
    g.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: !touch, touch };
    if (!touch) {
      // Mouse: act immediately. Jump (animated) unless the handle itself was grabbed.
      e.preventDefault();
      root.current!.setPointerCapture(e.pointerId);
      const target = pctAt(e.clientX);
      const nearHandle = Math.abs(target - pos) < (28 / root.current!.clientWidth) * 100;
      if (nearHandle) apply(target);
      else jump(target);
    }
    // Touch/pen: wait to see whether this is a sideways drag, a tap, or a vertical scroll.
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (!s || s.id !== e.pointerId) return;
    if (!s.dragging) {
      const dx = Math.abs(e.clientX - s.x);
      const dy = Math.abs(e.clientY - s.y);
      if (dx < DRAG_SLOP || dx <= dy) return;
      s.dragging = true;
      root.current!.setPointerCapture(e.pointerId);
    }
    root.current!.classList.remove("is-animating");
    const x = e.clientX;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(pctAt(x)));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (s && s.touch && !s.dragging && Math.hypot(e.clientX - s.x, e.clientY - s.y) < DRAG_SLOP) jump(pctAt(e.clientX));
    release(e);
  };

  // Browser took over (vertical scroll began): forget the gesture, leave the divider where it was.
  const release = (e: React.PointerEvent<HTMLDivElement>) => {
    g.current = null;
    if (root.current?.hasPointerCapture(e.pointerId)) root.current.releasePointerCapture(e.pointerId);
  };

  const layer = (kind: "before" | "after") => {
    const img = photos[kind];
    return img ? (
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" priority={priority} draggable={false} />
    ) : (
      <PhotoSlot
        kind={kind}
        project={project}
        file={kind === "before" ? photos.beforePath : photos.afterPath}
        ratio="auto"
        align={kind === "before" ? "left" : "right"}
        className="h-full w-full"
      />
    );
  };

  const p = Math.round(pos);

  return (
    <figure>
      <div
        ref={root}
        className="ba aspect-[3/2] bg-greige-deep"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={release}
        // lostpointercapture bubbles: touch pointers are implicitly captured by the inner photo element, and
        // taking capture onto the slider fires it on that child. Only reset when the slider itself loses capture.
        onLostPointerCapture={(e) => {
          if (e.target === root.current) g.current = null;
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="ba-layer">{layer("after")}</div>
        <div className="ba-layer ba-before">{layer("before")}</div>

        <span className="ba-label left-3 sm:left-4" style={{ opacity: pos < 18 ? 0 : 1 }} aria-hidden="true">
          Before
        </span>
        <span className="ba-label right-3 sm:right-4" style={{ opacity: pos > 82 ? 0 : 1 }} aria-hidden="true">
          After
        </span>

        <div className="ba-divider" aria-hidden="true" />
        <div className="ba-handle" aria-hidden="true">
          <Chevrons />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={p}
          onChange={(e) => apply(Number(e.target.value))}
          onKeyDown={(e) => {
            const map: Record<string, number> = { PageUp: 10, PageDown: -10 };
            if (e.key in map) {
              e.preventDefault();
              apply(pos + map[e.key]);
            }
          }}
          aria-label={`Before and after comparison: ${label}`}
          aria-valuetext={`Showing ${p}% before, ${100 - p}% after`}
          className="sr-only"
          tabIndex={0}
        />
      </div>

      {/* No-JS fallback: both photos, labelled, stacked on phones and side by side above. */}
      <div className="ba-static gap-2 sm:grid-cols-2">
        {(["before", "after"] as const).map((t) => (
          <div key={t} className="relative aspect-[3/2]">
            {layer(t)}
            <span className="ba-label left-3 capitalize">{t}</span>
          </div>
        ))}
      </div>

      {/* Inherits the section's text color so it stays legible on both paper and the dark ink band. */}
      <p className="mt-3 text-[13px] opacity-75 sm:hidden" aria-hidden="true">
        Drag sideways or tap to compare
      </p>
      {caption && <figcaption className="mt-3 text-[14px] font-medium tracking-[0.01em] text-charcoal-soft sm:mt-4">{caption}</figcaption>}
    </figure>
  );
}

/** Static before/after pair (no slider) for smaller spots like service rows. */
export function BeforeAfterPair({ project, photos, ratio = "4 / 5" }: { project: string; photos: PhotoPair; ratio?: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(["before", "after"] as const).map((kind) => {
        const img = photos[kind];
        return img ? (
          <div key={kind} className="relative" style={{ aspectRatio: ratio }}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 15vw, 45vw" className="object-cover" />
            <span className="ba-label left-2 top-2 !text-[10px]">{kind}</span>
          </div>
        ) : (
          <PhotoSlot key={kind} kind={kind} project={project} file={kind === "before" ? photos.beforePath : photos.afterPath} ratio={ratio} compact />
        );
      })}
    </div>
  );
}
