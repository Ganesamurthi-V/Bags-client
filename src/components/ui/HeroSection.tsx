"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Star, Truck, Users } from "lucide-react";

const trustMetrics = [
  { stat: "100+", label: "Happy Customers" },
  { stat: "7+ Years", label: "Experience" },
  { stat: "Pan India", label: "Delivery" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-24 pb-24 md:pt-32 md:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Main_background.svg"
          alt="Hero Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={heroTextRef} className="flex flex-col gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                Elegance in Every Stitch
              </span>
              <div className="w-12 h-[2px] bg-primary/60"></div>
            </div>

            <span className="font-heading text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              <span className="text-primary">Purple</span> <span className="text-foreground/90">Bags</span>
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight text-foreground/80 leading-tight">
              Custom Wedding Bags<br />Crafted For Your Special Day
            </h1>

            <div className="flex items-center justify-start gap-3 text-primary/60 my-2">
              <div className="h-[1px] w-16 bg-primary/30"></div>
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 2.5 13 2.5 7.5C2.5 4.5 4.5 2.5 7.5 2.5C9.5 2.5 11 3.5 12 5.5C13 3.5 14.5 2.5 16.5 2.5C19.5 2.5 21.5 4.5 21.5 7.5C21.5 13 12 20 12 20Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <div className="h-[1px] w-16 bg-primary/30"></div>
            </div>

            <p className="text-base text-muted-foreground/90 max-w-md leading-relaxed">
              Premium customized wedding bags designed with your names, wedding
              dates, logos, and unique artwork to make every celebration
              unforgettable.
            </p>

            <div className="flex flex-wrap gap-6 md:gap-10 mt-4">
              {trustMetrics.map(({ stat, label }, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full border border-primary/20 flex items-center justify-center text-primary bg-transparent">
                    {i === 0 ? <Users className="h-5 w-5 stroke-[1.5]" /> : i === 1 ? <Star className="h-5 w-5 stroke-[1.5]" /> : <Truck className="h-5 w-5 stroke-[1.5]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-caveat font-bold text-primary text-3xl leading-tight tracking-tight">{stat}</span>
                    <span className="font-caveat text-xl text-muted-foreground font-medium">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link 
                href="/contact" 
                className={buttonVariants({ size: "lg", variant: "outline", className: "gap-2 bg-transparent border-primary/20 hover:bg-primary/5 w-fit" })}
              >
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collections"
                className={buttonVariants({ size: "lg", className: "gap-2 shadow-md w-fit" })}
              >
                Design Your Bag <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}
