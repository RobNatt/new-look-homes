import { business } from "@/lib/site";
import { EstimateButton } from "./Estimate";
import { PhoneIcon } from "./Icons";
import { SectionHeader } from "./SectionHeader";

/** Closing call to action used at the bottom of every page. Split layout, not centered. */
export function CtaBand({ title, deck, source }: { title: string; deck: string; source: string }) {
  const phone = business.phone.value;
  return (
    <section className="section-y bg-greige" aria-labelledby={`cta-${source}`}>
      <div className="container-page grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionHeader id={`cta-${source}`} eyebrow="Free estimate" title={title} deck={deck} />
        </div>
        <div className="flex flex-col gap-4 md:col-span-4 md:col-start-9">
          <EstimateButton source={source} className="w-full" />
          <a href={`tel:${phone.tel}`} className="btn btn-secondary w-full">
            <PhoneIcon />
            Call <span className="tabular-nums">{phone.display}</span>
          </a>
          <p className="text-[14px] text-charcoal-soft">No pressure, no obligation. We'll come look at the space and talk it through.</p>
        </div>
      </div>
    </section>
  );
}
