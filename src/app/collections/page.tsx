"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { StaggerFade } from "@/components/ui/StaggerFade";
import { collections } from "@/data/collections";
import type { Collection } from "@/data/collections";

const categories = ["All", "Bottle Bags", "Fabric Tote", "Jute Tote Bag", "Mini Jute Bag", "Potli Bags", "Sling & Shoulder Bag"] as const;
type Filter = (typeof categories)[number];

export default function Collections() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? collections
      : collections.filter((c) => c.category === active);

  return (
    <div className="flex flex-col min-h-screen pt-28 md:pt-32 pb-24 bg-gradient-to-br from-[#f5ebff] via-background to-[#ffeef8] dark:from-[#2e1f40] dark:via-background dark:to-[#381e30]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl lg:text-[60px] font-medium tracking-tight text-center leading-tight">
          Explore Our Collections
        </h1>
        <p className="text-center text-black max-w-2xl mx-auto mb-12">
          Discover premium wedding bags crafted with quality materials and
          personalized designs for every celebration.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${active === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item: Collection, i: number) => (
            <StaggerFade
              key={item.id}
              delay={(i % 12) * 0.05}
              className="group relative rounded-2xl overflow-hidden border bg-card text-card-foreground shadow-sm flex flex-col h-full"
            >
              <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={i < 4}
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "sm" })}>
                    Request Quote
                  </Link>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-end items-center text-center">
                <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="font-lora font-medium text-base leading-snug">
                  {item.title}
                </h3>
              </div>
            </StaggerFade>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16">
            No items in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
