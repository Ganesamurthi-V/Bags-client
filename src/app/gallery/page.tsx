"use client";

import Image from "next/image";
import { useState } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type Category = "All" | "Traditional" | "Luxury" | "Jute" | "Premium" | "Custom";

interface GalleryItem {
  id: number;
  title: string;
  category: Category;
  src: string;
  style: "tall" | "wide" | "square";
}

const galleryItems: GalleryItem[] = [
  { id: 1,  title: "Jute Bag with Gold Screen Print",          category: "Jute",        style: "tall",   src: "/images/gallery-1.jpg" },
  { id: 2,  title: "Traditional South Indian Wedding Bag",     category: "Traditional", style: "wide",   src: "/images/gallery-2.jpg" },
  { id: 3,  title: "Cotton Tote with Custom Artwork",          category: "Custom",      style: "square", src: "/images/gallery-3.jpg" },
  { id: 4,  title: "Premium Fabric Pouch",                     category: "Luxury",      style: "tall",   src: "/images/gallery-4.jpg" },
  { id: 5,  title: "Custom Logo Printed Bag",                  category: "Custom",      style: "square", src: "/images/gallery-5.jpg" },
  { id: 6,  title: "Wedding Return Gift Bag",                  category: "Traditional", style: "wide",   src: "/images/gallery-6.jpg" },
  { id: 7,  title: "Royal Premium Wedding Bag",                category: "Premium",     style: "tall",   src: "/images/gallery-7.jpg" },
  { id: 8,  title: "Eco-Friendly Jute Set",                    category: "Jute",        style: "square", src: "/images/gallery-8.jpg" },
  { id: 9,  title: "Luxury Satin Gift Pouch",                  category: "Luxury",      style: "wide",   src: "/images/gallery-9.jpg" },
  { id: 10, title: "Bride & Groom Name Print",                 category: "Custom",      style: "tall",   src: "/images/gallery-10.jpg" },
  { id: 11, title: "Traditional Jute Wedding Bag",             category: "Jute",        style: "wide",   src: "/images/gallery-11.jpg" },
  { id: 12, title: "Premium Velvet Pouch",                     category: "Premium",     style: "square", src: "/images/gallery-12.jpg" },
  { id: 13, title: "Custom Offset Printed Bag",                category: "Custom",      style: "tall",   src: "/images/gallery-13.jpg" },
  { id: 14, title: "DTF Printed Wedding Bag",                  category: "Luxury",      style: "square", src: "/images/gallery-14.jpg" },
  { id: 15, title: "Classic Cotton Return Bag",                category: "Traditional", style: "wide",   src: "/images/gallery-15.jpg" },
  { id: 16, title: "Gold Print Jute Wedding Bag",              category: "Jute",        style: "tall",   src: "/images/gallery-16.jpg" },
  { id: 17, title: "Designer Fabric Pouch",                    category: "Premium",     style: "square", src: "/images/gallery-17.jpg" },
  { id: 18, title: "Custom Artwork Bag",                       category: "Custom",      style: "wide",   src: "/images/gallery-18.jpg" },
  { id: 19, title: "South Indian Wedding Return Gift",         category: "Traditional", style: "tall",   src: "/images/gallery-19.jpg" },
  { id: 20, title: "Luxury Wedding Gift Set",                  category: "Luxury",      style: "square", src: "/images/gallery-20.jpg" },
  { id: 21, title: "Personalised Jute Bag",                    category: "Jute",        style: "wide",   src: "/images/gallery-21.jpg" },
  { id: 22, title: "Premium Screen Print Bag",                 category: "Premium",     style: "tall",   src: "/images/gallery-22.jpg" },
  { id: 23, title: "Custom Wedding Date Bag",                  category: "Custom",      style: "square", src: "/images/gallery-23.jpg" },
  { id: 24, title: "Elegant Traditional Bag",                  category: "Traditional", style: "wide",   src: "/images/gallery-24.jpg" },
  { id: 25, title: "Royal Luxury Pouch",                       category: "Luxury",      style: "tall",   src: "/images/gallery-25.jpg" },
];

const categories: Category[] = ["All", "Traditional", "Luxury", "Jute", "Premium", "Custom"];

const aspectClass: Record<GalleryItem["style"], string> = {
  tall:   "aspect-[3/4]",
  wide:   "aspect-[4/3]",
  square: "aspect-square",
};

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
          Our Work Speaks For Itself
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explore our collection of customized wedding bags created for customers
          across India.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry + LightGallery */}
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.src}
              data-lg-size="1280-960"
              className={`relative block overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid ${aspectClass[item.style]}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
              </div>
            </a>
          ))}
        </LightGallery>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16">
            No gallery items in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
