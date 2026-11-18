"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Editorial section header (design-system.md §7.3) — the ONLY element with a scroll reveal.
 * Reveal: rule draws in → eyebrow appears → headline wipes on left-to-right → deck appears.
 * Visible by default; hidden start state only applies under <html class="js-reveal">.
 */
export function SectionHeader({
  eyebrow,
  title,
  deck,
  as: Tag = "h2",
  align = "left",
  dark = false,
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  deck?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as unknown as { __nlhReady?: boolean }).__nlhReady = true;
    const el = ref.current;
    if (!el) return;
    // Already on screen at load (e.g. the page's H1): show without animating.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const center = align === "center";
  // Page H1s sit at the top of the page, always in view on load, so they never animate.
  const reveal = Tag === "h1" ? "" : "reveal";
  const size = Tag === "h1" ? "text-h1 font-medium tracking-[-0.01em]" : "text-h2 font-semibold tracking-[-0.005em]";

  return (
    <div ref={ref} className={`${reveal} ${center ? "reveal-center mx-auto text-center" : ""} max-w-[46rem] ${className}`}>
      <span aria-hidden="true" className={`reveal-rule mb-5 block h-px w-12 ${dark ? "bg-stone/60" : "bg-stone"} ${center ? "mx-auto" : ""}`} />
      {eyebrow && <p className={`reveal-eyebrow eyebrow mb-3 ${dark ? "text-teal-on-dark" : "text-teal"}`}>{eyebrow}</p>}
      <Tag id={id} className={`reveal-title ${size} pb-[0.08em]`}>
        {title}
      </Tag>
      {deck && (
        <p className={`reveal-deck mt-5 text-deck ${dark ? "text-greige" : "text-charcoal-soft"} ${center ? "mx-auto" : ""} max-w-[38rem]`}>
          {deck}
        </p>
      )}
    </div>
  );
}
