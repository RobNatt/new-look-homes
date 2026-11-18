import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { ArrowRight } from "@/components/Icons";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BeforeAfterPair } from "@/components/BeforeAfter";
import { Ph } from "@/components/Placeholder";
import { projectPhotos } from "@/lib/photos";
import { projects, type Project } from "@/lib/projects";

// Which project's before/after photos illustrate each service row. Rows without one stay text-only.
const rowProject: Record<string, Project> = {
  basements: projects.basement1,
  "interior-renovation": projects.interior1,
  "decks-porches": projects.deck1,
};
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home Renovation in Dover, DE",
  description:
    "Home renovation in Dover, DE: basements, flooring, interior renovation, additions, decks and repairs across Kent County. Free estimates from New Look Homes.",
  alternates: { canonical: "/other-services" },
};

export default function OtherServicesPage() {
  return (
    <>
      <LocalBusinessSchema path="/other-services" />

      <section className="border-b border-greige-deep">
        <div className="container-page grid gap-10 pt-12 pb-14 md:grid-cols-12 md:items-end md:pt-20 md:pb-20">
          <div className="md:col-span-8">
            <SectionHeader
              as="h1"
              eyebrow="Other services"
              title="Home renovation in Dover, DE, beyond the kitchen and bath"
              deck="From finishing a basement to replacing every floor in the house. The same crew, the same care, and one person to call."
            />
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <EstimateButton source="os-intro" className="w-full" />
            <Link href="/kitchens-and-baths" className="link mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">
              Looking for kitchens & baths? <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y" aria-label="Services">
        <div className="container-page">
          {!services.confirmed && (
            <p className="mb-8 text-[14px]">
              <Ph>Service list is a draft. Nathan to confirm what's offered, add or remove items</Ph>
            </p>
          )}
          <ol className="border-t border-charcoal">
            {services.other.map((s, i) => {
              const proj = rowProject[s.slug];
              const withPhoto = Boolean(proj);
              return (
                <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-greige-deep py-10 md:py-14">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                    <span className="text-[13px] font-semibold text-teal tabular-nums md:col-span-1 md:pt-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-h3 font-semibold md:col-span-4">{s.name}</h2>
                    <div className={withPhoto ? "md:col-span-4" : "md:col-span-6"}>
                      <p className="text-deck text-charcoal-soft">{s.summary}</p>
                      <p className="mt-3 text-[14px]">
                        <Ph>Add 2–3 specifics for {s.name.toLowerCase()}</Ph>
                      </p>
                    </div>
                    {proj && (
                      <div className="md:col-span-3">
                        <BeforeAfterPair project={proj.title} photos={projectPhotos(proj)} ratio="4 / 5" />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-14 grid gap-6 md:grid-cols-12">
            <p className="font-display text-[1.75rem] leading-tight font-semibold md:col-span-7">
              Don't see your project here? Ask. If it's part of making the house better, we probably do it.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        source="os-cta"
        title="Tell us what you want to change."
        deck="Send the short form or call, and we'll come take a look. Estimates are free."
      />
    </>
  );
}
