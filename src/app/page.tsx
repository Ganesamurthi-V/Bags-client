"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Truck, Factory, ShieldCheck, Star } from "lucide-react";
import { HeroBags } from "@/components/ui/HeroBags";

gsap.registerPlugin(ScrollTrigger);

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

const trustMetrics = [
  { stat: "100+", label: "happy customer" },
  { stat: "7+ Years", label: "Experience" },
  { stat: "Pan India", label: "Delivery" },
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

// Fade-up animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo(
        heroTextRef.current?.children || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Hero image scale-in
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 0.4 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full overflow-hidden bg-primary/5 pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={heroTextRef} className="flex flex-col gap-6">
              <span className="font-heading text-6xl md:text-7xl lg:text-8xl leading-none text-primary tracking-tight">
                Purple Bags
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground/90 leading-tight max-w-xl">
                Custom Wedding Bags Crafted For Your Special Day
              </h1>
              <p className="text-xl text-primary font-heading italic">
                Elegance in Every Stitch.
              </p>
              <p className="text-lg text-muted-foreground max-w-lg">
                Premium customized wedding bags designed with your names, wedding
                dates, logos, and unique artwork to make every celebration
                unforgettable.
              </p>
              <div className="flex flex-wrap gap-6 md:gap-8 mt-2">
                {trustMetrics.map(({ stat, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-0.5 font-heading">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{stat}</span>
                    <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                  Request Quote
                </Link>
                <Link
                  href="/collections"
                  className={buttonVariants({ size: "lg", variant: "outline" })}
                >
                  Design Your Bag
                </Link>
              </div>
            </div>
            <div ref={heroImageRef} className="relative aspect-square md:aspect-[4/3] w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <HeroBags />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <FadeSection className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <Image
                src="/purple-bag1.png"
                alt="Purple Bags crafting process and manufacturing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
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
      <FadeSection className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover premium wedding bags crafted with quality materials and
              personalized designs for every celebration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, i) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
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
                    <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-muted-foreground">{collection.desc}</p>
                  </div>
                </Link>
              </motion.div>
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
      <FadeSection className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Families Choose Purple Bags
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Testimonials ── */}
      <FadeSection className="relative py-28 overflow-hidden bg-[#f5f0ff] dark:bg-zinc-950">
        {/* soft ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-300/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 md:px-8">
          {/* heading */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-2">Real stories</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              real results.
            </h2>
          </div>

          <TestimonialScene />
        </div>
      </FadeSection>
    </div>
  );
}

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
interface Testimonial {
  id: number;
  name: string;
  city: string;
  role: string;
  img: string;
  review: string;
  rating: number;
  floatDuration: number;
  floatDelay: number;
  floatDistance: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Priya & Rahul",
    city: "Chennai",
    role: "Traditional Hindu Wedding",
    img: "/images/gallery-1.jpg",
    review: "The customized jute bags were absolutely perfect for our wedding. Print quality was excellent and delivery was right on time. Every guest loved them!",
    rating: 5,
    floatDuration: 5.2,
    floatDelay: 0,
    floatDistance: 12,
  },
  {
    id: 1,
    name: "Sneha Reddy",
    city: "Hyderabad",
    role: "Telugu Wedding",
    img: "/images/gallery-4.jpg",
    review: "We ordered 500 premium cotton bags with our wedding logo. The fabric quality is top-notch and the team guided us beautifully through every step.",
    rating: 5,
    floatDuration: 6.8,
    floatDelay: 0.8,
    floatDistance: 16,
  },
  {
    id: 2,
    name: "Arun Kumar",
    city: "Bangalore",
    role: "South Indian Wedding",
    img: "/images/gallery-7.jpg",
    review: "Purple Bags delivered exactly what they promised. The finishing on the bags is very professional. Will definitely order again for future family events.",
    rating: 5,
    floatDuration: 4.6,
    floatDelay: 1.4,
    floatDistance: 10,
  },
  {
    id: 3,
    name: "Divya & Karthik",
    city: "Coimbatore",
    role: "Tamil Brahmin Wedding",
    img: "/images/gallery-10.jpg",
    review: "Our names were printed beautifully on the jute bags. The colours were vibrant and delivery was faster than expected. Highly recommend Purple Bags!",
    rating: 5,
    floatDuration: 7.4,
    floatDelay: 0.4,
    floatDistance: 18,
  },
  {
    id: 4,
    name: "Meera S",
    city: "Kochi",
    role: "Kerala Christian Wedding",
    img: "/images/gallery-14.jpg",
    review: "Our guests were so impressed with the premium fabric bags. The customization options are endless and the quality exceeded our expectations completely.",
    rating: 5,
    floatDuration: 5.8,
    floatDelay: 1.8,
    floatDistance: 14,
  },
  {
    id: 5,
    name: "Anand Patel",
    city: "Mumbai",
    role: "Gujarati Wedding",
    img: "/images/gallery-20.jpg",
    review: "Ordered from Mumbai and received the bags well before the wedding date. Pan India delivery was seamless. Very happy with the overall quality and service.",
    rating: 5,
    floatDuration: 6.2,
    floatDelay: 1.1,
    floatDistance: 13,
  },
];

/* ═══════════════════════════════════════
   SCATTERED BUBBLE LAYOUT
═══════════════════════════════════════ */
interface BubbleLayout {
  size: number;
  top: string;
  left?: string;
  right?: string;
  tooltipPos: "left" | "right";
}

const SCATTER_LAYOUTS: BubbleLayout[] = [
  { size: 96, top: "15%", left: "15%", tooltipPos: "right" },
  { size: 110, top: "55%", left: "8%", tooltipPos: "right" },
  { size: 105, top: "10%", left: "45%", tooltipPos: "right" },
  { size: 85, top: "70%", left: "35%", tooltipPos: "right" },
  { size: 100, top: "25%", right: "15%", tooltipPos: "left" },
  { size: 90, top: "65%", right: "10%", tooltipPos: "left" },
];

/* ═══════════════════════════════════════
   SCENE COMPONENT
═══════════════════════════════════════ */
function TestimonialScene() {
  // Open the 3rd bubble (middle top) by default so users see the tooltip feature
  const [hoveredId, setHoveredId] = useState<number | null>(TESTIMONIALS[2].id);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleMouseEnter = (id: number) => {
    if (!hasInteracted) setHasInteracted(true);
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div
      className="relative mx-auto py-8"
      style={{ minHeight: 600, maxWidth: 1100 }}
    >
      {TESTIMONIALS.map((t, i) => {
        const layout = SCATTER_LAYOUTS[i];
        const isHovered = hoveredId === t.id;
        
        return (
          <motion.div
            key={`scatter-${t.id}`}
            style={{
              position: "absolute",
              top: layout.top,
              left: layout.left,
              right: layout.right,
              zIndex: isHovered ? 50 : 10,
            }}
            onMouseEnter={() => handleMouseEnter(t.id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{ y: [0, -t.floatDistance, 0] }}
              transition={{
                duration: t.floatDuration,
                delay: t.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center"
            >
              {/* Bubble */}
              <motion.div
                className="relative rounded-full overflow-hidden cursor-pointer flex-shrink-0"
                style={{ width: layout.size, height: layout.size }}
                animate={{
                  boxShadow: isHovered 
                    ? "0 0 35px 10px rgba(107,13,173,0.3)" 
                    : "0 8px 20px rgba(0,0,0,0.08)",
                  scale: isHovered ? 1.05 : 1,
                  borderColor: isHovered ? "rgba(107,13,173,0.5)" : "rgba(255,255,255,0.8)",
                  borderWidth: isHovered ? "3px" : "2px"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes={`${layout.size}px`}
                />
              </motion.div>

              {/* Tooltip Review Box */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: layout.tooltipPos === "right" ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: layout.tooltipPos === "right" ? -8 : 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute py-3.5 px-5 w-[380px] pointer-events-none"
                    style={{
                      [layout.tooltipPos === "right" ? "left" : "right"]: "calc(100% + 12px)",
                      background: "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
                    }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-1.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-foreground/95 text-[13px] leading-relaxed mb-2.5 font-[family-name:var(--font-playfair)] italic">
                      &ldquo;{t.review}&rdquo;
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-2">
                      <p className="text-[9px] font-bold text-foreground tracking-[0.15em] uppercase font-[family-name:var(--font-montserrat)]">
                        {t.name}
                      </p>
                      <span className="text-[9px] text-muted-foreground/40">|</span>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-[family-name:var(--font-montserrat)]">
                        {t.city}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
