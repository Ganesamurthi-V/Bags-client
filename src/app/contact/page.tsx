"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, type QuoteFormData, defaultQuoteValues } from "@/lib/validations";
import { buttonVariants } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PHONE_NUMBER = "919876543210"; // Replace with real number when provided

function buildWhatsAppMessage(data: QuoteFormData): string {
  const lines = [
    "Hello Purple Bags,",
    "",
    "I would like to request a quotation.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Event Date: ${data.eventDate || "Not specified"}`,
    `Quantity: ${data.quantity} bags`,
    `Material Preference: ${data.material || "Not specified"}`,
    "",
    data.notes ? `Requirements: ${data.notes}` : "",
    "",
    "Please contact me with more details.",
    "Thank you.",
  ].filter(Boolean);
  return encodeURIComponent(lines.join("\n"));
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: defaultQuoteValues,
  });

  const onSubmit = async (data: QuoteFormData) => {
    // In production, this would send an email via Resend API
    // For now, simulate submission and show success + WhatsApp fallback
    await new Promise((r) => setTimeout(r, 800));
    setFormData(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(null);
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
          Let's Create Something Beautiful Together
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Get in touch with us to discuss your wedding bag requirements and receive a
          personalized quotation.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div className="flex flex-col gap-12">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Our Location</h3>
                  <p className="text-muted-foreground text-sm">
                    8A 2nd Cross, Mariamman Nagar, Karamanikuppam, Puducherry
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone & WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm">info@purplebags.in</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Office Hours</h3>
                  <p className="text-muted-foreground text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.5432109876543!2d79.83!3d11.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU1JzQ4LjAiTiA3OcKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Purple Bags Location in Puducherry"
              />
            </div>
          </div>

          {/* Request Quote Form */}
          <div className="bg-card border rounded-3xl p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold mb-6">Request Quotation</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Your quotation request has been received. Our team will contact you
                  shortly with pricing and further details.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <Link
                    href={`https://wa.me/${PHONE_NUMBER}?text=${formData ? buildWhatsAppMessage(formData) : ""}`}
                    target="_blank"
                    className={buttonVariants({ className: "flex items-center gap-2" })}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </Link>
                  <Button variant="outline" onClick={handleReset}>
                    Send Another
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      {...register("phone")}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email (Optional)
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="eventDate" className="text-sm font-medium">
                      Event Date
                    </label>
                    <Input id="eventDate" type="date" {...register("eventDate")} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="quantity"
                      type="number"
                      min={100}
                      placeholder="100"
                      {...register("quantity", { valueAsNumber: true })}
                      aria-invalid={!!errors.quantity}
                    />
                    {errors.quantity && (
                      <p className="text-xs text-destructive">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="material" className="text-sm font-medium">
                      Material Preference
                    </label>
                    <Input
                      id="material"
                      placeholder="Jute, Cotton, etc."
                      {...register("material")}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Additional Requirements
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us more about your design needs..."
                    rows={4}
                    {...register("notes")}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Get Custom Pricing"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
