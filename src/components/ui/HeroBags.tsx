"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface CardDef {
  id: number;
  src: string;
  alt: string;
  xOffset: number;
  yOffset: number;
  rotate: number;
  width: string;
  aspectRatio: string;
  zIndex: number;
}

const CARDS: CardDef[] = [
  {
    id: 1,
    src: "/images/collection-fabric-1.jpg",
    alt: "Blue Quilted Bag",
    xOffset: -0.40,
    yOffset: 0.40,
    rotate: -90,
    width: "clamp(90px, 12vw, 180px)",
    aspectRatio: "1/1",
    zIndex: 1,
  },
  {
    id: 2,
    src: "/images/collection-jute-3.jpg",
    alt: "Jute Craft Bag",
    xOffset: -0.35,
    yOffset: 0.20,
    rotate: -60,
    width: "clamp(100px, 14vw, 200px)",
    aspectRatio: "1/1",
    zIndex: 2,
  },
  {
    id: 3,
    src: "/images/collection-cotton-1.jpg",
    alt: "Purple Bags Tote",
    xOffset: -0.20,
    yOffset: 0.05,
    rotate: -30,
    width: "clamp(110px, 15vw, 215px)",
    aspectRatio: "1/1",
    zIndex: 3,
  },
  {
    id: 4,
    src: "/images/collection-premium-2.jpg",
    alt: "Chevron Bag",
    xOffset: 0,
    yOffset: 0,
    rotate: 0,
    width: "clamp(120px, 16vw, 230px)",
    aspectRatio: "1/1",
    zIndex: 4,
  },
  {
    id: 5,
    src: "/images/about-2.jpg",
    alt: "Jute Bags",
    xOffset: 0.20,
    yOffset: 0.05,
    rotate: 30,
    width: "clamp(110px, 15vw, 215px)",
    aspectRatio: "1/1",
    zIndex: 3,
  },
  {
    id: 6,
    src: "/images/collection-cotton-2.jpg",
    alt: "Cotton Tote Bag",
    xOffset: 0.35,
    yOffset: 0.20,
    rotate: 60,
    width: "clamp(100px, 14vw, 200px)",
    aspectRatio: "1/1",
    zIndex: 2,
  },
  {
    id: 7,
    src: "/images/collection-premium-1.jpg",
    alt: "Premium Fabric Bag",
    xOffset: 0.40,
    yOffset: 0.40,
    rotate: 90,
    width: "clamp(90px, 12vw, 180px)",
    aspectRatio: "1/1",
    zIndex: 1,
  }
];

export function HeroBags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const startAnimation = () => {
    const masterTl = gsap.timeline();

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardDef = CARDS[i];
      const cardTl = gsap.timeline();

      // Step 1: Train path to center (creates a sweeping curve)
      cardTl.to(card, {
        "--offsetX": 0,
        duration: 1.2,
        ease: "power2.out",
      }, 0);
      cardTl.to(card, {
        "--offsetY": 0,
        duration: 1.2,
        ease: "power4.out",
      }, 0);
      cardTl.to(card, {
        "--opacity": 1,
        "--scale": 0.8,
        "--rot": "0deg",
        duration: 1.2,
        ease: "power2.out",
      }, 0);

      // Step 2: Spread to scattered layout
      cardTl.to(card, {
        "--offsetX": cardDef.xOffset,
        "--offsetY": cardDef.yOffset,
        "--scale": 1,
        "--rot": `${cardDef.rotate}deg`,
        duration: 1.5,
        ease: "power4.out",
      }, 1.0);

      // Add to master timeline with stagger
      masterTl.add(cardTl, i * 0.18); // Delay between cards (0.15 - 0.25 range)
    });

    // Step 3: Subtle floating animation after all cards settle
    masterTl.call(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardDef = CARDS[i];
        gsap.to(card, {
          "--offsetY": cardDef.yOffset - 0.015,
          "--rot": `${cardDef.rotate + (i % 2 === 0 ? 1.5 : -1.5)}deg`,
          duration: 2.5 + (i * 0.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ "--cw": "min(100vw, 1400px)" } as React.CSSProperties}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="absolute pointer-events-auto"
          style={{
            left: "50%",
            top: "15%",
            zIndex: card.zIndex,
            width: card.width,
            // Initial off-screen states
            "--offsetX": "0.5",
            "--offsetY": "1",
            "--rot": "45deg",
            "--scale": "0.2",
            "--opacity": "0",
            opacity: "var(--opacity)",
            transform: "translate(-50%, -50%) translate(calc(var(--offsetX) * var(--cw)), calc(var(--offsetY) * var(--cw))) rotate(var(--rot)) scale(var(--scale))",
          } as React.CSSProperties}
        >
          <div
            className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl bg-white border-4 md:border-[6px] border-white cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.25)]"
            style={{ width: "100%", aspectRatio: card.aspectRatio }}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 120px, 220px"
              priority={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}