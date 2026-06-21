import { z } from "zod";

export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[+]?[\d\s-]{10,}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  eventDate: z.string().optional(),
  quantity: z.number().min(100, "Minimum order is 100 bags"),
  material: z.string().optional(),
  notes: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const defaultQuoteValues: Partial<QuoteFormData> = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  quantity: 100,
  material: "",
  notes: "",
};
