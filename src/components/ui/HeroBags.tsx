"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroBags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse Parallax & 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth spring configuration for that weighty, expensive luxury feel
  const springConfig = { damping: 40, stiffness: 50, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Bag 1 (Front) 3D Tilt & Parallax Transforms
  const bag1RotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const bag1RotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const bag1OffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]);
  const bag1OffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [25, -25]);

  // Bag 2 (Back) 3D Tilt & Parallax (Moves in opposition to create profound depth)
  const bag2RotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const bag2RotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);
  const bag2OffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const bag2OffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center perspective-[1200px] pointer-events-none"
    >
      {/* --- Atmospheric Luxury Halo --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ 
          opacity: { duration: 4, ease: "easeOut" },
          scale: { duration: 4, ease: "easeOut" },
          rotate: { duration: 90, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-purple-500/10 via-primary/15 to-transparent rounded-full blur-[120px] -z-20" 
      />

      {/* --- Floating Atmospheric Dust/Sparkles --- */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%", opacity: 0, x: (Math.random() - 0.5) * 300 }}
          animate={{ 
            y: "-100%", 
            opacity: [0, 0.4, 0],
            x: `+=${(Math.random() - 0.5) * 150}`
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
          className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full blur-[1px] -z-10"
        />
      ))}

      {/* --- Bag 2 (Back / Offset) --- */}
      <motion.div
        // Fanning out entrance
        initial={{ opacity: 0, x: "0%", y: "0%", scale: 0.75, rotateZ: 0 }}
        animate={{ opacity: 1, x: "-18%", y: "-12%", scale: 1, rotateZ: -2 }}
        // Luxury slow-ease out
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          x: bag2OffsetX,
          y: bag2OffsetY,
          rotateX: bag2RotateX,
          rotateY: bag2RotateY,
          transformStyle: "preserve-3d"
        }}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[65%] sm:w-[55%] md:w-[45%] aspect-square pointer-events-auto flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-purple-400/20 blur-[50px] rounded-full scale-75" />
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className="relative w-full h-full cursor-pointer group"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/images/purple-bag2.png"
            alt="Purple Custom Bag Back"
            fill
            className="object-contain drop-shadow-[0_20px_40px_rgba(100,50,200,0.15)] transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 65vw, 45vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* --- Bag 1 (Front / Main) --- */}
      <motion.div
        // Fanning out entrance (moves opposite to Bag 2)
        initial={{ opacity: 0, x: "0%", y: "0%", scale: 0.75, rotateZ: 0 }}
        animate={{ opacity: 1, x: "18%", y: "18%", scale: 1, rotateZ: 2 }}
        // Slightly delayed to create a staggered peel-apart effect
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{
          x: bag1OffsetX,
          y: bag1OffsetY,
          rotateX: bag1RotateX,
          rotateY: bag1RotateY,
          transformStyle: "preserve-3d"
        }}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[75%] sm:w-[65%] md:w-[55%] aspect-square z-10 pointer-events-auto flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full scale-75 translate-y-10" />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          className="relative w-full h-full cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src="/images/purple-bag1.png"
            alt="Purple Custom Bag Front"
            fill
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 75vw, 55vw"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
