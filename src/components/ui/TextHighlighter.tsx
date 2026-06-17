"use client";

// Text Highlighter：进入视口时一道高亮从左扫到右，像马克笔划过
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TextHighlighterProps {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}

export function TextHighlighter({
  children,
  className,
  color = "var(--color-accent-soft)",
  delay = 0.15,
}: TextHighlighterProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-[0.05em] -z-0 h-[0.42em] origin-left rounded-[2px]"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      />
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}
