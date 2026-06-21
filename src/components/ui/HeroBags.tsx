"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Exact coordinates mapped to the user's sketch (using viewport width/height percentages for responsiveness)
const CARDS = [
  // 1. Lower Left
  { id: 1, src: "/images/collection-jute-1.jpg", destX: -40, destY: 35, rotate: -20, scale: 0.85 },
  // 2. Middle Left
  { id: 2, src: "/images/collection-cotton-1.jpg", destX: -45, destY: 5, rotate: -15, scale: 0.9 },
  // 3. Upper Left
  { id: 3, src: "/images/about-1.jpg", destX: -28, destY: -32, rotate: -8, scale: 0.95 },
  // 4. Top Center (Hero/Featured)
  { id: 4, src: "/images/purple-bag1.png", destX: 0, destY: -40, rotate: 0, scale: 1.0 },
  // 5. Upper Right
  { id: 5, src: "/images/purple-bag2.png", destX: 28, destY: -32, rotate: 8, scale: 0.95 },
  // 6. Middle Right
  { id: 6, src: "/images/hero-1.jpg", destX: 45, destY: 5, rotate: 15, scale: 0.9 },
  // 7. Lower Right
  { id: 7, src: "/images/collection-premium-1.jpg", destX: 40, destY: 35, rotate: 20, scale: 0.85 },
];

export function HeroBags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.getElementById("hero-scroll-wrapper"),
          start: "top top", // Starts animating when the wrapper hits the top
          end: "bottom bottom", // Finishes animating when the wrapper leaves the viewport
          scrub: 1.2, // Smooth scrubbing
          // Removed pin: true as it is now handled by native CSS sticky
        },
      });

      // The surrounding cards scatter outward from the center
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const data = CARDS[index];
        
        // Calculate the absolute pixel destination based on viewport width/height
        const destX = (data.destX / 100) * window.innerWidth;
        const destY = (data.destY / 100) * window.innerHeight;

        // Animate from center (x:0, y:0) to the scattered positions
        tl.to(
          card,
          {
            x: destX,
            y: destY,
            opacity: 1,
            rotate: data.rotate,
            ease: "power2.out",
          },
          index * 0.05 // Stagger out organically
        );

        // Add a gentle floating continuous animation that operates independently of scroll
        gsap.to(card.querySelector(".card-inner"), {
          y: "-=15",
          rotation: "+=2",
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden perspective-[1000px] flex items-center justify-center">
      {/* Soft Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-400/10 rounded-full blur-[120px] -z-10" />

      {CARDS.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-0 pointer-events-auto"
          style={{ 
            // All cards start stacked precisely in the center
            transform: `translate(-50%, -50%) scale(${card.scale}) rotate(0deg)` 
          }}
        >
          <div className="card-inner relative w-[140px] md:w-[180px] lg:w-[240px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white cursor-pointer hover:scale-110 transition-transform duration-300 hover:z-20">
            <Image
              src={card.src}
              alt={`Purple Bag Highlight ${card.id}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 280px"
              priority={index < 3}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
