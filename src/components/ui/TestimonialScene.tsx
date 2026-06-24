"use client";

import { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

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

export function TestimonialScene() {
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
          <m.div
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
            <m.div
              animate={{ y: [0, -t.floatDistance, 0] }}
              transition={{
                duration: t.floatDuration,
                delay: t.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center"
            >
              <m.div
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
                  loading="lazy"
                />
              </m.div>

              <AnimatePresence>
                {isHovered && (
                  <m.div
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
                    <div className="flex gap-1 mb-1.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 text-amber-500 fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-foreground/95 text-[13px] leading-relaxed mb-2.5 font-[family-name:var(--font-playfair)] italic">
                      &ldquo;{t.review}&rdquo;
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-[9px] font-bold text-foreground tracking-[0.15em] uppercase font-[family-name:var(--font-montserrat)]">
                        {t.name}
                      </p>
                      <span className="text-[9px] text-muted-foreground/40">|</span>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-[family-name:var(--font-montserrat)]">
                        {t.city}
                      </p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </m.div>
        );
      })}
    </div>
  );
}
