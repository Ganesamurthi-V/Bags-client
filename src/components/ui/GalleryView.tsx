"use client";

import Image from "next/image";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  style: "tall" | "wide" | "square";
}

const aspectClass: Record<GalleryItem["style"], string> = {
  tall:   "aspect-[3/4]",
  wide:   "aspect-[4/3]",
  square: "aspect-square",
};

export default function GalleryView({ items }: { items: GalleryItem[] }) {
  return (
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
    >
      {items.map((item, i) => (
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={i < 4}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
          </div>
        </a>
      ))}
    </LightGallery>
  );
}
