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


const W = [
  { left: "50vw", top: "120vh" }, // W0 — origin (off-screen bottom)
  { left: "25vw", top: "75vh"  }, // W1 — Lower Left 1
  { left: "17vw", top: "61vh"  }, // W2 — Lower Left 2
  { left: "15vw", top: "45vh"  }, // W3 — Mid Left
  { left: "21vw", top: "29vh"  }, // W4 — Upper Left 1
  { left: "34vw", top: "19vh"  }, // W5 — Upper Left 2
  { left: "50vw", top: "15vh"  }, // W6 — Top Center
  { left: "66vw", top: "19vh"  }, // W7 — Upper Right 2
  { left: "79vw", top: "29vh"  }, // W8 — Upper Right 1
  { left: "85vw", top: "45vh"  }, // W9 — Mid Right
  { left: "83vw", top: "61vh"  }, // W10— Lower Right 2
  { left: "75vw", top: "75vh"  }, // W11— Lower Right 1
];

const SEG = 0.05; // scroll progress per arc segment
const GAP = 0.04; // departure gap between consecutive cards

// Card i departs at i*GAP and travels (i+1) segments to its stop W[i+1]
const CARD_CONFIG = [
  { id: 1,  src: "/images/collection-jute-1.jpg",    stopIndex: 1,  rotate: -50, startAt: 0 * GAP,  endAt: 0 * GAP + 1 * SEG },
  { id: 2,  src: "/images/collection-cotton-1.jpg",  stopIndex: 2,  rotate: -40, startAt: 1 * GAP,  endAt: 1 * GAP + 2 * SEG },
  { id: 3,  src: "/images/about-1.jpg",              stopIndex: 3,  rotate: -30, startAt: 2 * GAP,  endAt: 2 * GAP + 3 * SEG },
  { id: 4,  src: "/images/purple-bag1.png",          stopIndex: 4,  rotate: -20, startAt: 3 * GAP,  endAt: 3 * GAP + 4 * SEG },
  { id: 5,  src: "/images/gallery-1.jpg",            stopIndex: 5,  rotate: -10, startAt: 4 * GAP,  endAt: 4 * GAP + 5 * SEG },
  { id: 6,  src: "/images/hero-1.jpg",               stopIndex: 6,  rotate: 0,   startAt: 5 * GAP,  endAt: 5 * GAP + 6 * SEG },
  { id: 7,  src: "/images/collection-premium-1.jpg", stopIndex: 7,  rotate: 10,  startAt: 6 * GAP,  endAt: 6 * GAP + 7 * SEG },
  { id: 8,  src: "/images/gallery-4.jpg",            stopIndex: 8,  rotate: 20,  startAt: 7 * GAP,  endAt: 7 * GAP + 8 * SEG },
  { id: 9,  src: "/images/gallery-7.jpg",            stopIndex: 9,  rotate: 30,  startAt: 8 * GAP,  endAt: 8 * GAP + 9 * SEG },
  { id: 10, src: "/images/gallery-10.jpg",           stopIndex: 10, rotate: 40,  startAt: 9 * GAP,  endAt: 9 * GAP + 10 * SEG },
  { id: 11, src: "/images/purple-bag2.png",          stopIndex: 11, rotate: 50,  startAt: 10 * GAP, endAt: 10 * GAP + 11 * SEG },
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
        <div className="relative w-[70px] md:w-[100px] lg:w-[125px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white ring-2 ring-white/70 cursor-pointer hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.3)] transition-all duration-500">
          <Image
            src={card.src}
            alt={`Purple Bag ${card.id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 70px, 125px"
            priority={floatIndex < 3}
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
