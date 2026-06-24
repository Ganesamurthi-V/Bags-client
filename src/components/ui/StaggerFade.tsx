"use client";

import { m } from "framer-motion";

interface StaggerFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function StaggerFade({ children, delay = 0, className }: StaggerFadeProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
