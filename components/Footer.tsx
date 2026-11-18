import Link from "next/link";
import { business, nav, serviceArea } from "@/lib/site";
import { PrivacyChoicesButton } from "./Consent";
import { Ph } from "./Placeholder";

export function Footer() {
  const phone = business.phone.value;
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-[2rem] leading-none font-semibold">New Look Homes</p>
          <p className="mt-4 max-w-[26rem] text-greige">
            Home remodeling in {business.city}, {business.regionName} and across {business.county}. Owned and run by{" "}
            {business.owner}.
          </p>
          <p className="mt-6 text-[14px] text-greige">
            {/* PLACEHOLDER: licensing/insurance line + license number. Hidden until Nathan confirms. */}
            {business.license.confirmed ? (
              `Licensed & insured in Delaware · License #${business.license.value}`
            ) : (
              <Ph>Licensed & insured line + license # — pending confirmation</Ph>
            )}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-teal-on-dark">Contact</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`tel:${phone.tel}`} className="inline-flex min-h-11 items-center text-[1.125rem] font-semibold tabular-nums hover:text-teal-on-dark">
                {business.phone.confirmed ? phone.display : <Ph>Phone {phone.display}</Ph>}
              </a>
            </li>
            <li className="text-greige">
              {business.streetAddress.confirmed ? `${business.streetAddress.value}, ` : ""}
              {business.city}, {business.region}{" "}
              {business.postalCode.confirmed ? business.postalCode.value : <Ph>ZIP</Ph>}
            </li>
          </ul>
          <p className="eyebrow mt-8 text-teal-on-dark">Hours</p>
          <dl className="mt-3 space-y-1 text-[15px] text-greige">
            {business.hours.value.map((h) => (
              <div key={h.days} className="flex gap-3">
                <dt className="w-16 shrink-0">{h.days}</dt>
                <dd>{business.hours.confirmed ? h.time : <Ph>{h.time}</Ph>}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-teal-on-dark">Service area</p>
          <p className="mt-4 text-[15px] leading-relaxed text-greige">
            {serviceArea.value.join(" · ")}
            {!serviceArea.confirmed && (
              <>
                {" "}
                <Ph>Town list — confirm</Ph>
              </>
            )}
          </p>
          <nav aria-label="Footer" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-11 items-center text-[15px] hover:text-teal-on-dark">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 py-4 text-[13px] text-stone">
          <p className="py-2">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <PrivacyChoicesButton className="min-h-11 underline decoration-1 underline-offset-[3px] hover:text-paper" />
        </div>
      </div>
    </footer>
  );
}
