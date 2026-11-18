import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BeforeAfter, BeforeAfterPair } from "@/components/BeforeAfter";
import { ProjectCaption } from "@/components/ProjectCaption";
import { projectPhotos } from "@/lib/photos";
import { projects } from "@/lib/projects";
import heroImage from "@/public/images/hero-kitchen.png";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { ArrowRight, PhoneIcon } from "@/components/Icons";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { Ph } from "@/components/Placeholder";
import { SectionHeader } from "@/components/SectionHeader";
import { business, serviceArea, services } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Home Remodeling in Dover, DE | New Look Homes" },
  description:
    "Home remodeling in Dover, DE and across Kent County: kitchens, bathrooms, basements and more. Get a free estimate from New Look Homes.",
  alternates: { canonical: "/" },
};

const steps = [
  {
    title: "Call",
    body: "Call or send the short form. Tell us what you want to change, and we'll set a time to come see it.",
  },
  {
    title: "Free estimate",
    body: "Nathan visits, measures and listens. You get a clear written estimate with the scope spelled out. No pressure to sign.",
  },
  {
    title: "The work",
    body: "We schedule a start date, protect your home and keep the site clean. You'll know who's coming and what's happening each day.",
  },
  {
    title: "Final walk-through",
    body: "We go room by room together. Anything that isn't right goes on the list and gets finished before we call it done.",
  },
];

export default function HomePage() {
  const phone = business.phone.value;

  return (
    <>
      <LocalBusinessSchema path="/" />

      {/* ── Hero: split, text left / photo bleeding right ─────────────────── */}
      <section className="overflow-hidden">
        <div className="container-page grid items-center gap-10 pt-10 pb-16 md:grid-cols-12 md:gap-8 md:pt-16 md:pb-24">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="eyebrow text-teal">Dover · Kent County, Delaware</p>
            <h1 className="mt-5 text-display font-medium tracking-[-0.015em]">
              Make your home look <em className="font-medium">new</em> again.
            </h1>
            <p className="mt-6 text-deck text-charcoal-soft">Remodeling in Dover and Kent County.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <EstimateButton source="home-hero" />
              <a href={`tel:${phone.tel}`} className="inline-flex min-h-12 items-center gap-2 px-1 font-semibold text-teal">
                <PhoneIcon />
                <span className="link tabular-nums">{phone.display}</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6 md:-mr-[clamp(24px,5vw,80px)]">
            {/* Generated illustrative image (not a New Look Homes project). Swap for Nathan's best real
                "after" shot once available: replace public/images/hero-kitchen.png, keep a ~4:3 crop. */}
            <div className="relative aspect-[4/3] overflow-hidden bg-greige-deep md:aspect-[5/4]">
              <Image
                src={heroImage}
                alt="Bright remodeled kitchen with greige shaker cabinets, a deep teal island and white oak floors in soft daylight"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured reveal: the one dark band on the page ────────────────── */}
      <section className="on-dark section-y bg-ink text-paper" aria-labelledby="reveal-title">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionHeader
                id="reveal-title"
                dark
                eyebrow="Before & after"
                title="Drag the line. See what changed."
                deck="Same room, same angle. Slide to compare the space before we started and after the final walk-through."
              />
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <BeforeAfter
              label="Featured remodel"
              project={projects.featured.title}
              photos={projectPhotos(projects.featured)}
              caption={
                <span className="text-greige">
                  <ProjectCaption project={projects.featured} />
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Services: one feature + a typographic list, not three equal cards ── */}
      <section className="section-y" aria-labelledby="services-title">
        <div className="container-page">
          <SectionHeader
            id="services-title"
            eyebrow="What we do"
            title="Home remodeling in Dover, DE, room by room"
            deck="Most of our work is kitchens and bathrooms, the rooms you use most and notice most. We handle the rest of the house too."
          />
          {!services.confirmed && (
            <p className="mt-6 text-[14px]">
              <Ph>Service list is a draft. Confirm with Nathan</Ph>
            </p>
          )}

          <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
            <Link href="/kitchens-and-baths" className="group md:col-span-7">
              <BeforeAfterPair project={projects.kitchen1.title} photos={projectPhotos(projects.kitchen1)} ratio="4 / 5" />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-h3 font-semibold">Kitchens & bathrooms</h3>
                  <p className="mt-2 max-w-[32rem] text-charcoal-soft">
                    Full remodels and focused updates: cabinets, counters, tile, showers, vanities and layout changes.
                  </p>
                </div>
                <span className="mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-teal text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <ArrowRight />
                  <span className="sr-only">See kitchens and baths</span>
                </span>
              </div>
            </Link>

            <div className="md:col-span-5 md:pt-2">
              <p className="eyebrow text-charcoal-soft">Also around the house</p>
              <ul className="mt-4 border-t border-greige-deep">
                {services.other.map((s, i) => (
                  <li key={s.slug} className="border-b border-greige-deep">
                    <Link href={`/other-services#${s.slug}`} className="group flex min-h-16 items-baseline gap-4 py-4">
                      <span className="w-6 text-[13px] font-semibold text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-[1.0625rem] font-medium group-hover:text-teal">{s.name}</span>
                      <ArrowRight className="h-4 w-4 text-charcoal-soft transition-transform group-hover:translate-x-1 group-hover:text-teal" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/other-services" className="link mt-6 inline-flex min-h-11 items-center gap-2 font-semibold">
                All other services <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How a project works: connected timeline ───────────────────────── */}
      <section className="section-y border-t border-greige-deep bg-greige/50" aria-labelledby="process-title">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionHeader
                id="process-title"
                eyebrow="How a project works"
                title="Four steps, start to finish"
                deck="You'll always know where the project stands and what comes next."
              />
            </div>
          </div>

          <ol className="relative mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
            {/* connecting line */}
            <span aria-hidden="true" className="absolute top-[22px] bottom-6 left-[21px] w-px bg-stone md:top-[22px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
            {steps.map((s, i) => (
              <li key={s.title} className={`relative pl-16 md:pl-0 ${i % 2 === 1 ? "md:mt-10" : ""}`}>
                <span className="absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full border border-teal bg-paper text-[15px] font-semibold text-teal tabular-nums md:relative">
                  {i + 1}
                </span>
                <h3 className="font-display text-[1.75rem] leading-tight font-semibold md:mt-6">{s.title}</h3>
                <p className="mt-2 text-charcoal-soft">{s.body}</p>
                {i === 0 && (
                  <a href={`tel:${phone.tel}`} className="link mt-3 inline-flex min-h-11 items-center gap-2 font-semibold tabular-nums">
                    <PhoneIcon className="h-4 w-4" /> {phone.display}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Towns served ──────────────────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="area-title">
        <div className="container-page grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <SectionHeader
              id="area-title"
              eyebrow="Where we work"
              title="Based in Dover. Working across Kent County."
              deck="If your town isn't listed, ask. If it's a reasonable drive, we'll come look."
            />
            {!serviceArea.confirmed && (
              <p className="mt-6 text-[14px]">
                <Ph>Town list is a draft. Confirm with Nathan</Ph>
              </p>
            )}
          </div>
          <ul className="grid grid-cols-2 gap-x-8 self-end sm:grid-cols-3 md:col-span-6 md:col-start-7" aria-label="Towns served">
            {serviceArea.value.map((town, i) => (
              <li key={town} className="border-b border-greige-deep py-3">
                <span className={`font-display text-[1.625rem] leading-tight font-semibold ${i === 0 ? "text-teal" : ""}`}>{town}</span>
                {i === 0 && <span className="eyebrow ml-2 align-middle text-[11px] text-charcoal-soft">Home base</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        source="home-cta"
        title="Let's see what your home could look like."
        deck="Tell us about the room. Nathan will call you back to set up a free, no-obligation estimate."
      />
    </>
  );
}
