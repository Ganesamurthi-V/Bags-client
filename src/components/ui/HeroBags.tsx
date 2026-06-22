"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

/**
 * TRAIN ANIMATION — all cars follow the same track with equal gaps.
 *
 * Shared arc track (8 waypoints):
 *   W0 (origin, off-screen bottom-left)
 *   → W1 (bottom-left)  → W2 (mid-left)  → W3 (upper-left)
 *   → W4 (top-center)
 *   → W5 (upper-right) → W6 (mid-right)  → W7 (bottom-right)
 *
 * Card 1 departs first — short journey to W1 (nearest station).
 * Card 2 follows with the same gap — travels W1 → parks at W2.
 * ...
 * Card 7 departs last — longest journey, parks at W7.
 *
 * Each arc segment has the SAME scroll duration = SEG (0.07),
 * so all cards move at equal visual speed → looks like a real train.
 */

const W = [
  { left: "-15vw", top: "92vh" }, // W0 — origin (off-screen bottom-left)
  { left: "11vw",  top: "80vh" }, // W1 — bottom-left station
  { left: "8vw",   top: "50vh" }, // W2 — mid-left station
  { left: "18vw",  top: "18vh" }, // W3 — upper-left station
  { left: "50vw",  top: "9vh"  }, // W4 — top-center station (peak)
  { left: "82vw",  top: "18vh" }, // W5 — upper-right station
  { left: "92vw",  top: "50vh" }, // W6 — mid-right station
  { left: "88vw",  top: "80vh" }, // W7 — bottom-right station
];

const SEG = 0.07; // scroll progress per arc segment (equal for all cards → equal speed)
const GAP = 0.07; // departure gap between consecutive cards

// Card i departs at i*GAP and travels (i+1) segments to its stop W[i+1]
const CARD_CONFIG = [
  { id: 1, src: "/images/collection-jute-1.jpg",    stopIndex: 1, rotate: -20, startAt: 0 * GAP, endAt: 0 * GAP + 1 * SEG },
  { id: 2, src: "/images/collection-cotton-1.jpg",  stopIndex: 2, rotate: -40, startAt: 1 * GAP, endAt: 1 * GAP + 2 * SEG },
  { id: 3, src: "/images/about-1.jpg",              stopIndex: 3, rotate: -20, startAt: 2 * GAP, endAt: 2 * GAP + 3 * SEG },
  { id: 4, src: "/images/purple-bag1.png",          stopIndex: 4, rotate:   0, startAt: 3 * GAP, endAt: 3 * GAP + 4 * SEG },
  { id: 5, src: "/images/purple-bag2.png",          stopIndex: 5, rotate:  20, startAt: 4 * GAP, endAt: 4 * GAP + 5 * SEG },
  { id: 6, src: "/images/hero-1.jpg",               stopIndex: 6, rotate:  40, startAt: 5 * GAP, endAt: 5 * GAP + 6 * SEG },
  { id: 7, src: "/images/collection-premium-1.jpg", stopIndex: 7, rotate:  20, startAt: 6 * GAP, endAt: 6 * GAP + 7 * SEG },
  // Last card ends at: 6*0.07 + 7*0.07 = 13*0.07 = 0.91 ✓ (fits inside 0-1 scroll range)
];

interface CardProps {
  card: (typeof CARD_CONFIG)[number];
  rawProgress: MotionValue<number>;
  floatIndex: number;
}

function AnimatedCard({ card, rawProgress, floatIndex }: CardProps) {
  // Map card's personal scroll window [startAt → endAt] to local progress [0 → 1]
  const localProgress = useTransform(
    rawProgress,
    [card.startAt, card.endAt],
    [0, 1],
    { clamp: true }
  );

  // Build the waypoint path for this card: W[0] → W[1] → ... → W[stopIndex]
  const waypoints = W.slice(0, card.stopIndex + 1);
  const n = waypoints.length;
  const times = waypoints.map((_, i) => i / (n - 1));   // [0, 0.25, 0.5, 0.75, 1] etc.
  const leftKeys = waypoints.map((p) => p.left);
  const topKeys  = waypoints.map((p) => p.top);

  // Animate position along the shared arc track
  const left    = useTransform(localProgress, times, leftKeys);
  const top     = useTransform(localProgress, times, topKeys);
  const opacity = useTransform(localProgress, [0, 0.15], [0, 1]);
  const rotate  = useTransform(localProgress, [0, 1], [0, card.rotate]);
  const scale   = useTransform(localProgress, [0, 0.5, 1], [0.6, 1.08, 1.0]);

  const floatDuration = 3.0 + (floatIndex % 3) * 1.0;

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left,
        top,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
        rotate,
        scale,
        zIndex: floatIndex + 1,
      }}
    >
      {/* Gentle idle float once parked at station */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatIndex * 0.25,
        }}
      >
        <div className="relative w-[100px] md:w-[140px] lg:w-[175px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white ring-2 ring-white/70 cursor-pointer hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.3)] transition-all duration-500">
          <Image
            src={card.src}
            alt={`Purple Bag ${card.id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100px, 175px"
            priority={floatIndex < 2}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroBags() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing for silky train movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    /* 300vh gives enough scroll runway for the full train to pass */
    <div ref={wrapperRef} className="relative w-full h-[300vh]">
      {/* Sticky viewport — stays fixed while train arrives */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {CARD_CONFIG.map((card, index) => (
          <AnimatedCard
            key={card.id}
            card={card}
            floatIndex={index}
            rawProgress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
}
