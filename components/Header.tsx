"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, nav } from "@/lib/site";
import { EstimateButton } from "./Estimate";
import { MenuIcon, PhoneIcon } from "./Icons";

export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const phone = business.phone.value;

  // Shrink after 80px of scroll. IntersectionObserver on a sentinel, no scroll listener.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setCondensed(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-20 w-px" />
      <a href="#main" className="sr-only z-[60] bg-paper px-4 py-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <header className={`site-header sticky top-0 z-50 bg-paper ${condensed ? "is-condensed" : ""}`}>
        <div className="container-page flex h-full items-center gap-3">
          <Link href="/" className="wordmark mr-auto flex min-h-11 min-w-0 items-center gap-3" aria-label={`${business.name}, home`}>
            {/* PLACEHOLDER: logo. Replace this block with <Image src={business.logo.value} …/> once supplied.
                Hidden below 640px so the Call button always fits on small phones. */}
            <span
              aria-hidden="true"
              className="hidden h-9 w-9 shrink-0 place-items-center sm:grid border border-dashed border-line-strong text-[10px] font-semibold tracking-wider text-charcoal-soft"
              title="Logo placeholder"
            >
              LOGO
            </span>
            <span className="font-display text-[1.375rem] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap sm:text-[1.5rem] md:text-[1.75rem]">
              New Look Homes
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center px-3 text-[15px] font-medium transition-colors hover:text-teal ${
                        active ? "text-teal underline decoration-1 underline-offset-[6px]" : "text-charcoal"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile menu toggle sits LEFT of Call so Call is always the rightmost, thumb-side control. */}
          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[2px] text-charcoal hover:bg-greige lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          {/* Tap-to-call: always visible, every width, every scroll position. PLACEHOLDER: phone. */}
          <a
            href={`tel:${phone.tel}`}
            className="btn min-h-11 shrink-0 border border-teal bg-teal px-3.5 text-white sm:px-4 hover:bg-teal-hover md:bg-transparent md:text-teal md:hover:bg-teal-tint"
            aria-label={`Call ${business.name} at ${phone.display}`}
          >
            <PhoneIcon />
            <span className="md:hidden">Call</span>
            <span className="hidden tabular-nums md:inline">{phone.display}</span>
          </a>

          <EstimateButton className="hidden md:inline-flex" source="header" />
        </div>

        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="absolute inset-x-0 top-full border-t border-greige-deep bg-paper shadow-[0_12px_24px_rgb(30_29_27/0.08)] lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-greige last:border-0">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-14 items-center font-display text-[1.75rem] font-semibold aria-[current=page]:text-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <EstimateButton className="mt-4 w-full md:hidden" source="mobile-menu" />
          </nav>
        </div>
      </header>
    </>
  );
}
