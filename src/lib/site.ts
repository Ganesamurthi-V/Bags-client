/**
 * Central site configuration — single source of truth for SEO metadata and
 * JSON-LD structured data (used by robots.ts, sitemap.ts, layout metadata,
 * and the LocalBusiness / WebSite / FAQ schema).
 *
 * ⚠️ REPLACE the placeholder values below with real business details before
 * going live. Search-engine and LLM trust signals depend on these being
 * accurate — a fake phone number or wrong URL hurts more than it helps.
 */

// Prefer an env var so preview/prod can differ. Falls back to the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.purplebags.in"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Purple Bags",
  legalName: "Purple Bags",
  url: SITE_URL,
  // One-line description reused for OG / structured data.
  description:
    "Purple Bags is a custom wedding bag manufacturer in Puducherry, India, producing personalized jute, cotton, and premium fabric bags with name, logo, and wedding-date printing. Minimum order 100 bags, Pan India delivery.",
  slogan: "Elegance in Every Stitch",
  foundingYear: "2019",
  founder: "Pregadeeswari S",

  // Contact — ⚠️ PLACEHOLDERS: replace with the real phone/email before launch.
  telephone: "+91 98765 43210", // TODO: replace with real number
  email: "info@purplebags.in", // TODO: confirm real address

  address: {
    streetAddress: "8A 2nd Cross, Mariamman Nagar, Karamanikuppam",
    addressLocality: "Puducherry",
    addressRegion: "Puducherry",
    postalCode: "605013", // TODO: confirm postal code
    addressCountry: "IN",
  },

  // Approx. coordinates for Puducherry — refine to the exact address for maps.
  geo: { latitude: 11.9139, longitude: 79.8145 },

  areaServed: "India",
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-19:00",

  ogImage: "/og-image.jpg",

  // ⚠️ PLACEHOLDERS: point these at the real profiles (currently "#" in the footer).
  socials: {
    facebook: "",
    instagram: "",
    whatsapp: "", // e.g. https://wa.me/919876543210
  },
} as const;

/** Absolute URL helper for canonical / sitemap / OG. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type SiteRoute = {
  path: string;
  changeFrequency: "yearly" | "monthly" | "weekly" | "daily";
  priority: number;
};

/** All indexable routes — drives sitemap.ts. */
export const routes: SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/collections", changeFrequency: "weekly", priority: 0.9 },
  { path: "/design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];
