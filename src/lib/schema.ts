/**
 * JSON-LD structured-data builders, all derived from `siteConfig` so the
 * machine-readable schema stays in lockstep with the on-page metadata.
 *
 * These feed AI answer engines (ChatGPT, Perplexity, Gemini, Google AI
 * Overviews) the who / where / what facts they need to cite Purple Bags
 * confidently — the core of Answer Engine Optimization (AEO).
 */
import { siteConfig, absoluteUrl } from "@/lib/site";
import type { Faq } from "@/lib/faqs";

type JsonLd = Record<string, unknown>;

// Stable @id anchors so nodes can reference each other across the graph.
const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/**
 * The business entity — typed as both Organization and LocalBusiness so it
 * satisfies knowledge-panel (Organization) and local-pack (LocalBusiness)
 * expectations from a single node.
 */
export function organizationSchema(): JsonLd {
  const sameAs = [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    siteConfig.socials.whatsapp,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.slogan,
    foundingDate: siteConfig.foundingYear,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    openingHours: siteConfig.openingHours,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** The website itself, published by the organization above. */
export function webSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** FAQPage node — powers FAQ rich results and gives AI engines Q/A pairs. */
export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": absoluteUrl("/faq#faqpage"),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
