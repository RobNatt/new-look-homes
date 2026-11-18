"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

/**
 * Consent banner + gated analytics.
 *
 * Nothing analytics-related is in the page until the visitor clicks "Accept":
 * no gtag script, no network request, no cookie. "Decline" (or ignoring the banner) means
 * analytics never loads. The choice is remembered in localStorage on this device only.
 *
 * Analytics provider: Google Analytics 4, configured via NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXX).
 * PLACEHOLDER: if the env var is empty, the banner still works but nothing loads either way.
 */

const KEY = "nlh-consent-v1";
const OPEN_EVENT = "nlh:open-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null; // storage blocked (private mode etc.): treat as undecided, load nothing
  }
}

function saveChoice(v: Choice) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* ignore: the choice just won't persist */
  }
}

/** Footer link that reopens the banner so visitors can change their mind. */
export function PrivacyChoicesButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Privacy choices
    </button>
  );
}

export function ConsentManager() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = readChoice();
    setChoice(c);
    if (!c) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback(
    (v: Choice) => {
      const wasGranted = choice === "granted";
      saveChoice(v);
      setChoice(v);
      setOpen(false);
      // Withdrawing consent after analytics already loaded: reload so the script is gone from memory.
      if (wasGranted && v === "denied") {
        try {
          document.cookie.split(";").forEach((c) => {
            const name = c.split("=")[0].trim();
            if (name.startsWith("_ga")) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
          });
        } catch {}
        window.location.reload();
      }
    },
    [choice],
  );

  return (
    <>
      {choice === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {open && (
        <section
          role="region"
          aria-label="Cookie and analytics choices"
          className="consent fixed inset-x-0 bottom-0 z-40 border-t border-greige-deep bg-paper/97 shadow-[0_-8px_24px_rgb(30_29_27/0.08)] backdrop-blur-md"
        >
          <div className="container-page flex flex-col gap-4 py-4 sm:py-5 md:flex-row md:items-center md:gap-8">
            <div className="flex-1 text-[14px] leading-relaxed text-charcoal sm:text-[15px]">
              <p className="font-semibold">Can we count your visit?</p>
              <p className="mt-1 text-charcoal-soft">
                With your OK we use Google Analytics to see which pages help people find us. Nothing loads unless you
                accept, and you can change this any time under &ldquo;Privacy choices&rdquo; at the bottom of the page.{" "}
                {/* PLACEHOLDER: link to a privacy policy page once one exists */}
                <span className="ph">Privacy policy link</span>
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-3 md:w-[300px]">
              <button type="button" className="btn btn-secondary min-h-11 px-4" onClick={() => decide("denied")}>
                Decline
              </button>
              <button type="button" className="btn btn-primary min-h-11 px-4" onClick={() => decide("granted")}>
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
