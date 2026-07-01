import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Purple Bags — minimum order quantity, customization, printing methods, Pan India delivery, and production timelines.",
  alternates: { canonical: "/faq" },
};

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen pt-28 md:pt-32 pb-24">
      {/* FAQPage structured data — drives FAQ rich results and AI answer citations. */}
      <JsonLd schema={faqSchema(faqs)} />
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Find answers to common questions about our products, customization, and
          delivery.
        </p>

        {/* base-ui Accordion: defaultValue accepts an array of open item values */}
        <Accordion defaultValue={["faq-1"]} className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left font-bold text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
