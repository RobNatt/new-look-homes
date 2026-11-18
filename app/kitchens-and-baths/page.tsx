import type { Metadata } from "next";
import { BeforeAfter, BeforeAfterPair } from "@/components/BeforeAfter";
import { ProjectCaption } from "@/components/ProjectCaption";
import { projectPhotos } from "@/lib/photos";
import { projects } from "@/lib/projects";
import { CtaBand } from "@/components/CtaBand";
import { EstimateButton } from "@/components/Estimate";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { Ph } from "@/components/Placeholder";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kitchen & Bathroom Remodel in Dover, DE",
  description:
    "Kitchen remodel and bathroom remodel in Dover, DE: cabinets, counters, tile showers, vanities and layout changes. Free estimates from New Look Homes.",
  alternates: { canonical: "/kitchens-and-baths" },
};

const [kitchen, bath] = services.kitchensAndBaths;

const prep = [
  { t: "Photos of the space", d: "A few phone photos help us come prepared." },
  { t: "What bugs you about it now", d: "Storage, layout, lighting, the tub you never use." },
  { t: "A few pictures you like", d: "Saved photos from anywhere. They don't need to match." },
  { t: "Your timing", d: "Any date you're working toward, like a holiday, a sale or a move-in." },
];

export default function KitchensAndBathsPage() {
  return (
    <>
      <LocalBusinessSchema path="/kitchens-and-baths" />

      {/* Intro: headline left, jump links right */}
      <section className="border-b border-greige-deep">
        <div className="container-page grid gap-10 pt-12 pb-14 md:grid-cols-12 md:items-end md:pt-20 md:pb-20">
          <div className="md:col-span-8">
            <SectionHeader
              as="h1"
              eyebrow="Kitchens & baths"
              title="Kitchen and bathroom remodeling in Dover, DE"
              deck="The two rooms that get used hardest and show their age first. We rebuild them to work better and look new for years."
            />
            <EstimateButton source="kb-intro" className="mt-9" />
          </div>
          <nav aria-label="On this page" className="md:col-span-3 md:col-start-10">
            <p className="eyebrow text-charcoal-soft">On this page</p>
            <ul className="mt-3 border-t border-greige-deep">
              <li className="border-b border-greige-deep">
                <a href="#kitchens" className="flex min-h-12 items-center font-medium hover:text-teal">Kitchen remodels</a>
              </li>
              <li className="border-b border-greige-deep">
                <a href="#bathrooms" className="flex min-h-12 items-center font-medium hover:text-teal">Bathroom remodels</a>
              </li>
              <li className="border-b border-greige-deep">
                <a href="#prepare" className="flex min-h-12 items-center font-medium hover:text-teal">Before your estimate</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Kitchen: photo left (7), text right (5) */}
      <section id="kitchens" className="section-y" aria-labelledby="kitchen-title">
        <div className="container-page grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <BeforeAfter
              label="Kitchen remodel"
              project={projects.kitchen1.title}
              photos={projectPhotos(projects.kitchen1)}
              sizes="(min-width: 768px) 58vw, 100vw"
              caption={<ProjectCaption project={projects.kitchen1} />}
            />
          </div>
          <div className="md:col-span-5 md:pl-6">
            <SectionHeader id="kitchen-title" eyebrow="Kitchens" title="Your kitchen remodel in Dover, DE" deck={kitchen.summary} />
            <h3 className="mt-10 text-[1.125rem] font-semibold">What a kitchen project can include</h3>
            <ul className="mt-3 border-t border-greige-deep">
              {kitchen.includes.map((x) => (
                <li key={x} className="border-b border-greige-deep py-3">{x}</li>
              ))}
            </ul>
            {!services.confirmed && <p className="mt-4 text-[14px]"><Ph>Scope list is a draft. Confirm</Ph></p>}
          </div>
        </div>
      </section>

      {/* Second kitchen: static before/after pair, offset for an asymmetric rhythm */}
      <figure className="container-page grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-3">
          <BeforeAfterPair project={projects.kitchen2.title} photos={projectPhotos(projects.kitchen2)} ratio="3 / 2" />
          <figcaption className="mt-3 text-[14px] font-medium text-charcoal-soft">
            <ProjectCaption project={projects.kitchen2} />
          </figcaption>
        </div>
      </figure>

      {/* Bathroom: text left (5), slider right (7) */}
      <section id="bathrooms" className="section-y" aria-labelledby="bath-title">
        <div className="container-page grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="order-2 md:order-1 md:col-span-5 md:pr-6">
            <SectionHeader id="bath-title" eyebrow="Bathrooms" title="Your bathroom remodel in Dover, DE" deck={bath.summary} />
            <h3 className="mt-10 text-[1.125rem] font-semibold">What a bathroom project can include</h3>
            <ul className="mt-3 border-t border-greige-deep">
              {bath.includes.map((x) => (
                <li key={x} className="border-b border-greige-deep py-3">{x}</li>
              ))}
            </ul>
            {!services.confirmed && <p className="mt-4 text-[14px]"><Ph>Scope list is a draft. Confirm</Ph></p>}
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            <BeforeAfter
              label="Bathroom remodel"
              project={projects.bath1.title}
              photos={projectPhotos(projects.bath1)}
              sizes="(min-width: 768px) 58vw, 100vw"
              caption={<ProjectCaption project={projects.bath1} />}
            />
          </div>
        </div>
      </section>

      {/* Before your estimate */}
      <section id="prepare" className="section-y border-t border-greige-deep" aria-labelledby="prep-title">
        <div className="container-page grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <SectionHeader
              id="prep-title"
              eyebrow="Before your estimate"
              title="Four things that make the first visit faster"
              deck="None of this is required. It just helps us give you a more accurate estimate on the first visit."
            />
          </div>
          <dl className="grid gap-x-8 sm:grid-cols-2 md:col-span-6 md:col-start-7">
            {prep.map((p, i) => (
              <div key={p.t} className="border-t border-greige-deep py-6">
                <dt className="flex items-baseline gap-3 font-semibold">
                  <span className="text-[13px] text-teal tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {p.t}
                </dt>
                <dd className="mt-2 pl-8 text-charcoal-soft">{p.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        source="kb-cta"
        title="Ready to talk about your kitchen or bath?"
        deck="Send the short form or call. We'll set up a free estimate at your home."
      />
    </>
  );
}
