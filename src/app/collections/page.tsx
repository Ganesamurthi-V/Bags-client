import type { Metadata } from "next";
import { CollectionsClient } from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Wedding Bag Collections",
  description:
    "Browse Purple Bags' collections — jute totes, cotton bags, potli bags, bottle bags, and premium fabric wedding bags. Filter by category and request a custom quote.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
