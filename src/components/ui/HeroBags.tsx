"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * HeroBags — Tight rainbow arc, cards occupy top 48% of viewport.
 * Text sits cleanly from 48% downward with no card overlap.
 *
 * The arc is modelled as a semicircle with:
 *   - center card at top ~3%
 *   - flanking cards stepping down at ~8%, ~18%, ~33%
 *   - edge cards at ~42%, partially cropped
 *
 * Horizontal spread: 8% → 92% (tighter than before)
 */

interface CardDef {
  id: number;
  src: string;
  alt: string;
  left: string;
  top: string;
  rotate: number;
  width: string;
  zIndex: number;
  floatDelay: number;
  floatDuration: number;
  floatDistance: number;
}

const CARDS: CardDef[] = [
  // ── FAR LEFT — partially off-screen ──
  {
    id: 1,
    src: "/images/collection-premium-2.jpg",
    alt: "Premium Bag 2",
    left: "9%",
    top: "36%",
    rotate: -18,
    width: "150px",
    zIndex: 2,
    floatDelay: 0.9,
    floatDuration: 5.8,
    floatDistance: 7,
  },
  // ── LEFT-LOW ──
  {
    id: 2,
    src: "/images/collection-jute-2.jpg",
    alt: "Jute Bag 2",
    left: "22%",
    top: "28%",
    rotate: -15,
    width: "158px",
    zIndex: 3,
    floatDelay: 0.2,
    floatDuration: 6.0,
    floatDistance: 9,
  },
  // ── LEFT-HIGH ──
  {
    id: 3,
    src: "/images/collection-jute-1.jpg",
    alt: "Jute Bag 1",
    left: "35%",
    top: "23%",
    rotate: -15,
    width: "160px",
    zIndex: 4,
    floatDelay: 1.1,
    floatDuration: 5.2,
    floatDistance: 13,
  },
  // ── CENTER TOP — upright, tallest ──
  {
    id: 4,
    src: "/images/purple-bag1.png",
    alt: "Purple Bag Center",
    left: "47%",
    top: "13%",
    rotate: -19,
    width: "160px",
    zIndex: 5,
    floatDelay: 0.3,
    floatDuration: 4.8,
    floatDistance: 15,
  },
  // ── RIGHT-HIGH ──
  {
    id: 5,
    src: "/images/purple-bag2.png",
    alt: "Purple Bag 2",
    left: "73%",
    top: "4%",
    rotate: 22,
    width: "190px",
    zIndex: 4,
    floatDelay: 0.7,
    floatDuration: 5.5,
    floatDistance: 13,
  },
  // ── RIGHT-LOW ──
  {
    id: 6,
    src: "/images/collection-cotton-1.jpg",
    alt: "Cotton Bag 1",
    left: "88%",
    top: "20%",
    rotate: 40,
    width: "168px",
    zIndex: 3,
    floatDelay: 1.4,
    floatDuration: 6.5,
    floatDistance: 9,
  },
  // ── FAR RIGHT — partially off-screen ──
  {
    id: 7,
    src: "/images/hero-1.jpg",
    alt: "Hero Bag",
    left: "101%",
    top: "36%",
    rotate: 18,
    width: "150px",
    zIndex: 2,
    floatDelay: 0.5,
    floatDuration: 5.4,
    floatDistance: 7,
  },

    {
    id: 8 ,
    src: "/images/collection-premium-2.jpg",
    alt: "Premium Bag 2",
    left: "-1%",
    top: "36%",
    rotate: -18,
    width: "150px",
    zIndex: 2,
    floatDelay: 0.9,
    floatDuration: 5.8,
    floatDistance: 7,
  },
  
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.1,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

function HeroCard({ card, index }: { card: CardDef; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="absolute pointer-events-auto"
      style={{
        left: card.left,
        top: card.top,
        translateX: "-50%",
        rotate: card.rotate,
        zIndex: card.zIndex,
        width: card.width,
      }}
    >
      <motion.div
        animate={{ y: [0, -card.floatDistance, 0] }}
        transition={{
          duration: card.floatDuration,
          delay: card.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[1.4rem] shadow-2xl bg-white ring-2 ring-white/90 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.28)]"
          style={{ width: card.width, aspectRatio: "4/5" }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            className="object-cover"
            sizes="210px"
            priority={index < 4}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroBags() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {CARDS.map((card, i) => (
        <HeroCard key={card.id} card={card} index={i} />
      ))}
    </div>
  );
}