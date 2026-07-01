import type { Metadata } from "next";
import { DesignExperience } from "./DesignExperience";

export const metadata: Metadata = {
  title: "Design Your Bag",
  description:
    "Customize your wedding bag online — pick a bag, add names and wedding dates, choose fonts and colors, or upload your own logo and artwork, then download a preview.",
  alternates: { canonical: "/design" },
};

export default function DesignPage() {
  return <DesignExperience />;
}
