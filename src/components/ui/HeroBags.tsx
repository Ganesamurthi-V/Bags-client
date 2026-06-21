"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroBags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax offsets (front bag moves opposite to back bag for depth)
  const bag1OffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
  const bag1OffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);

  const bag2OffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const bag2OffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position between -0.5 and 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // GSAP Entrance Animations
    const bags = containerRef.current.querySelectorAll(".hero-bag-container");
    gsap.fromTo(
      bags,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // GSAP subtle entrance for glows
    const glows = containerRef.current.querySelectorAll(".hero-bag-glow");
    gsap.fromTo(
      glows,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.4 }
    );
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none"
    >
      {/* Background Soft Purple Glow */}
      <div className="hero-bag-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/20 rounded-full blur-[80px] -z-10" />

      {/* Bag 2 (Back / Offset) */}
      <motion.div
        style={{
          x: bag2OffsetX,
          y: bag2OffsetY,
        }}
        className="hero-bag-container absolute top-[5%] md:top-[10%] right-[20%] md:right-[35%] w-[55%] md:w-[45%] aspect-square pointer-events-auto"
      >
        <div className="absolute inset-0 bg-purple-400/10 blur-[40px] rounded-full scale-75" />
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-1, 1.5, -1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full cursor-pointer group"
        >
          <Image
            src="/images/purple-bag2.png"
            alt="Purple Custom Bag Back"
            fill
            className="object-contain drop-shadow-2xl transition-transform duration-500"
            sizes="(max-width: 768px) 55vw, 45vw"
            priority
          />
          {/* Subtle animated shadow under bag */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/20 blur-lg rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Bag 1 (Front / Main) */}
      <motion.div
        style={{
          x: bag1OffsetX,
          y: bag1OffsetY,
        }}
        className="hero-bag-container absolute bottom-[5%] md:bottom-[10%] right-0 md:right-[5%] w-[65%] md:w-[55%] aspect-square z-10 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-purple-600/15 blur-[50px] rounded-full scale-75 translate-y-10" />
        <motion.div
          animate={{
            y: [12, -12, 12],
            rotate: [1.5, -1.5, 1.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full cursor-pointer"
        >
          <Image
            src="/images/purple-bag1.png"
            alt="Purple Custom Bag Front"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            sizes="(max-width: 768px) 65vw, 55vw"
            priority
          />
          {/* Subtle animated shadow under bag */}
          <motion.div 
            animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.25, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/30 blur-xl rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
