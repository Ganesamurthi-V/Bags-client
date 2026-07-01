import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Web app manifest — gives mobile browsers an install name, theme color, and
 * icons. Next serves this at /manifest.webmanifest and links it automatically.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Custom Wedding Bags`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed", // brand purple
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
