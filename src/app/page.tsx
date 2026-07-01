import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Home keeps the root layout's default title/description; it only needs to
// claim its own canonical (now that the root no longer sets one globally).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
import { ArrowRight, CheckCircle2, Truck, Factory, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { HeroSection } from "@/components/ui/HeroSection";
import { FadeSection } from "@/components/ui/FadeSection";
import { StaggerFade } from "@/components/ui/StaggerFade";

const TestimonialScene = dynamic(
  () => import("@/components/ui/TestimonialScene").then((mod) => mod.TestimonialScene)
);

const featuredCollections = [
  {
    title: "Jute Wedding Bags",
    desc: "Durable, eco-friendly, and elegant.",
    src: "/images/collection-jute-1.jpg",
    alt: "Jute Wedding Bag",
  },
  {
    title: "Cotton Wedding Bags",
    desc: "Soft, premium, and versatile.",
    src: "/images/collection-cotton-1.jpg",
    alt: "Cotton Wedding Bag",
  },
  {
    title: "Premium Fabric Bags",
    desc: "Luxury materials for premium weddings.",
    src: "/images/collection-premium-1.jpg",
    alt: "Premium Fabric Wedding Bag",
  },
];

const whyChooseUs = [
  {
    icon: <Factory className="h-8 w-8" />,
    title: "Own Manufacturing Unit",
    desc: "Direct from factory pricing with guaranteed quality control on every stitch.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Premium Materials",
    desc: "High-quality jute, cotton, and premium fabrics sourced and built to last.",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "Fully Customized",
    desc: "Bride & Groom names, dates, logos, and custom artwork printed beautifully.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Pan India Delivery",
    desc: "Fast turnaround time and safe delivery anywhere in India.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* About Preview */}
      <FadeSection className="py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background dark:from-primary/5 dark:to-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <Image
                src="/purple-bag1.webp"
                alt="Purple Bags crafting process and manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight text-foreground leading-tight">
                Crafting Wedding Bags With Passion Since 2019
              </h2>
              <p className="text-muted-foreground text-lg">
                Founded by <strong className="font-semibold text-foreground">Pregadeeswari S</strong>, Purple Bags specializes in
                manufacturing premium customized wedding bags for weddings and
                celebrations across India.
              </p>
              <p className="text-muted-foreground text-lg">
                From bride and groom names to logos, wedding dates, and custom
                artwork, every bag is designed with care, precision, and attention
                to detail.
              </p>
              <Link
                href="/about"
                className="flex items-center gap-2 text-primary text-sm font-medium hover:underline underline-offset-4 w-fit"
              >
                Read Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* Collections Showcase */}
      <FadeSection className="pt-24 pb-16 bg-gradient-to-b from-background to-primary/5 dark:from-background dark:to-primary/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[60px] font-medium tracking-tight text-foreground leading-tight">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover premium wedding bags crafted with quality materials and
              personalized designs for every celebration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {featuredCollections.map((collection, i) => (
              <StaggerFade key={collection.title} delay={i * 0.1}>
                <Link href="/collections" className="group flex flex-col gap-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-md">
                    <Image
                      src={collection.src}
                      alt={collection.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-medium group-hover:text-primary transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{collection.desc}</p>
                  </div>
                </Link>
              </StaggerFade>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/collections"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              View All Collections
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* Why Choose Us */}
      <FadeSection className="pt-16 pb-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-[60px] font-medium tracking-tight text-foreground leading-tight">
              Why Families Choose <span className="text-primary">Purple Bags</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map(({ icon, title, desc }, i) => (
              <StaggerFade
                key={title}
                delay={i * 0.1}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {icon}
                </div>
                <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </StaggerFade>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Testimonials ── */}
      <FadeSection className="relative py-28 overflow-hidden bg-[#f5f0ff] dark:bg-zinc-950">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-300/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-primary/60 mb-2">Real stories</p>
            <h2 className="text-3xl md:text-4xl lg:text-[60px] font-medium tracking-tight text-foreground leading-tight">
              real results.
            </h2>
          </div>

          <TestimonialScene />
        </div>
      </FadeSection>
    </div>
  );
}
