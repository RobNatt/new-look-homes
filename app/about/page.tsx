import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import Image from "next/image";
import { Ph, PhotoSlot } from "@/components/Placeholder";
import { singlePhoto } from "@/lib/photos";
import { SectionHeader } from "@/components/SectionHeader";
import { business, serviceArea } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Nathan Morris | Dover, DE Remodeler",
  description:
    "New Look Homes is a Dover, DE home remodeling company owned and run by Nathan Morris, serving homeowners across Kent County.",
  alternates: { canonical: "/about" },
};

// Draft principles. Nathan to confirm or rewrite in his own words.
const principles = [
  { t: "You talk to Nathan", d: "From the first call through the final walk-through, you have one person to reach." },
  { t: "The estimate says what's included", d: "The scope is written down before work starts, so there are no surprises about what you're getting." },
  { t: "Your home gets treated like a home", d: "Floors covered, dust controlled and the site cleaned up at the end of each day." },
  { t: "Done means done", d: "The job isn't finished until the walk-through list is." },
];

export default function AboutPage() {
  const portrait = singlePhoto("images/nathan-portrait", `${business.owner}, owner of New Look Homes, on a job site`);
  return (
    <>
      <LocalBusinessSchema path="/about" />

      <section>
        <div className="container-page grid gap-10 pt-12 pb-16 md:grid-cols-12 md:gap-8 md:pt-20 md:pb-24">
          <div className="md:col-span-5">
            {/* PLACEHOLDER: portrait of Nathan on a job site, natural light, 4:5 */}
            {portrait.photo ? (
              <div className="relative aspect-[4/5]">
                <Image src={portrait.photo.src} alt={portrait.photo.alt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <PhotoSlot kind="portrait" project="Nathan Morris on a job site" file={portrait.path} ratio="4 / 5" />
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-8">
            <SectionHeader
              as="h1"
              eyebrow="About New Look Homes"
              title={<>A Dover remodeler who&apos;s on every job</>}
              deck={`New Look Homes is owned and run by ${business.owner}. We remodel kitchens, bathrooms and the rest of the house for homeowners in ${business.city} and across ${business.county}.`}
            />
            <div className="mt-8 max-w-[38rem] space-y-5">
              <p>
                <Ph>Nathan&apos;s story: how he got into the trades, how long he&apos;s been remodeling, and why he started New Look Homes</Ph>
              </p>
              <p>
                <Ph>A sentence or two in Nathan&apos;s own words about the kind of work he&apos;s proudest of</Ph>
              </p>
            </div>
            <EstimateButton source="about-intro" className="mt-10" />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-greige-deep bg-greige/50" aria-labelledby="principles-title">
        <div className="container-page grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionHeader id="principles-title" eyebrow="How we work" title="What you can count on" />
            <p className="mt-6 text-[14px]">
              <Ph>Draft principles. Nathan to confirm</Ph>
            </p>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {principles.map((p, i) => (
              <li key={p.t} className="grid grid-cols-[3rem_1fr] border-t border-greige-deep py-7 first:border-charcoal">
                <span className="pt-1 text-[13px] font-semibold text-teal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-tight font-semibold">{p.t}</h3>
                  <p className="mt-2 text-charcoal-soft">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y" aria-labelledby="creds-title">
        <div className="container-page grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <SectionHeader id="creds-title" eyebrow="At a glance" title="The details" deck="Who you're hiring and where we work." />
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            <div className="grid gap-2 border-t border-charcoal py-5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">Owner</dt>
              <dd className="text-charcoal-soft">{business.owner}</dd>
            </div>
            <div className="grid gap-2 border-t border-greige-deep py-5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">Based in</dt>
              <dd className="text-charcoal-soft">{business.city}, {business.regionName}</dd>
            </div>
            <div className="grid gap-2 border-t border-greige-deep py-5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">Delaware license</dt>
              <dd className="text-charcoal-soft">
                {/* PLACEHOLDER: license number. Not shown until Nathan confirms. */}
                {business.license.confirmed ? `#${business.license.value}` : <Ph>License # — pending Nathan&apos;s confirmation</Ph>}
              </dd>
            </div>
            <div className="grid gap-2 border-t border-greige-deep py-5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">Insurance</dt>
              <dd className="text-charcoal-soft"><Ph>Coverage details — confirm</Ph></dd>
            </div>
            <div className="grid gap-2 border-y border-greige-deep py-5 sm:grid-cols-[12rem_1fr]">
              <dt className="font-semibold">Service area</dt>
              <dd className="text-charcoal-soft">
                {serviceArea.value.join(", ")}
                {!serviceArea.confirmed && <> <Ph>confirm</Ph></>}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        source="about-cta"
        title="Want Nathan to take a look?"
        deck="Send the short form or call. The estimate is free and there's no obligation."
      />
    </>
  );
}
