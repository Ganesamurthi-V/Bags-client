/**
 * FAQ content — single source of truth shared by the /faq page (rendered
 * accordion) and the FAQPage JSON-LD structured data. Keeping them in one
 * place guarantees the visible answer and the answer AI engines cite match
 * exactly, which is what Google's FAQ rich-result policy requires.
 */
export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
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
    answer: "We offer Screen Printing, Offset Printing, and DTF Printing.",
  },
  {
    id: "faq-6",
    question: "How long does production take?",
    answer:
      "Production timelines vary depending on order quantity and customization requirements, but we always aim for fast turnaround times.",
  },
];
