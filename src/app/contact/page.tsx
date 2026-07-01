import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Get in touch with Purple Bags in Puducherry for custom wedding bag orders. Request a personalized quotation, or reach us by phone and WhatsApp. Pan India delivery, MOQ 100 bags.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
