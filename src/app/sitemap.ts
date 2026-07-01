import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/site";

/**
 * XML sitemap — generated from the single `routes` list in site.ts so the
 * sitemap, robots host, and internal linking never drift apart.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
