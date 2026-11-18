import { business, serviceArea, services, SITE_URL } from "@/lib/site";

/**
 * LocalBusiness (GeneralContractor subtype) JSON-LD, rendered on every page via the root layout.
 * Only CONFIRMED values from lib/site.ts are emitted, so placeholders never reach search engines.
 */
export function LocalBusinessSchema({ path = "/" }: { path?: string }) {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.region,
    addressCountry: "US",
  };
  if (business.streetAddress.confirmed) address.streetAddress = business.streetAddress.value;
  if (business.postalCode.confirmed) address.postalCode = business.postalCode.value;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    description: `Home remodeling contractor in ${business.city}, ${business.region}: kitchens, bathrooms and whole-home renovation across ${business.county}.`,
    founder: { "@type": "Person", name: business.owner },
    address,
    areaServed: serviceArea.value.map((town) => ({
      "@type": "City",
      name: `${town}, ${business.regionName}`,
    })),
    knowsAbout: [
      ...services.kitchensAndBaths.map((s) => s.name),
      ...services.other.map((s) => s.name),
    ],
  };

  if (business.phone.confirmed) schema.telephone = business.phone.value.tel;
  if (business.logo.confirmed) schema.logo = `${SITE_URL}${business.logo.value}`;
  if (business.email.confirmed) schema.email = business.email.value;
  if (business.hours.confirmed) {
    schema.openingHours = business.hours.value.map((h) => h.schema).filter(Boolean);
  }
  // Intentionally omitted until Nathan confirms: priceRange, aggregateRating, review, license.

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
