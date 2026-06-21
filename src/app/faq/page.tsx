import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "What is the minimum order quantity?",
    answer: "Our minimum order quantity starts at 100 bags.",
  },
  {
    id: "faq-2",
    question: "Can I customize the design?",
    answer:
      "Yes. You can customize names, wedding dates, logos, colors, fonts, and artwork.",
  },
  {
    id: "faq-3",
    question: "Do you deliver across India?",
    answer: "Yes. We provide safe and timely Pan India delivery.",
  },
  {
    id: "faq-4",
    question: "Can I upload my own design?",
    answer:
      "Absolutely. You can upload logos, images, and complete artwork files in our design customizer.",
  },
  {
    id: "faq-5",
    question: "What printing methods are available?",
    answer:
      "We offer Screen Printing, Offset Printing, and DTF Printing.",
  },
  {
    id: "faq-6",
    question: "How long does production take?",
    answer:
      "Production timelines vary depending on order quantity and customization requirements, but we always aim for fast turnaround times.",
  },
];

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
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
