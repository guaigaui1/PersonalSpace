"use client";

// Scroll Velocity：随滚动速度变向加速的横向文字带（framer-motion ParallaxText 思路）
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface ScrollVelocityProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

export function ScrollVelocity({ children, baseVelocity = 4, className }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex-nowrap select-none">
      <motion.div className={cn("flex whitespace-nowrap flex-nowrap", className)} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="block mr-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
