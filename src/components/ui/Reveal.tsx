"use client";

// Fade / Animated Content：滚动进入视口时 opacity 0→1 + 轻微 y 位移
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, y = 22, once = true }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
