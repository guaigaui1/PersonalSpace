"use client";

// 语言切换时整页淡出淡入 ~0.2s
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { useLang } from "@/lib/i18n";

export function LangFade({ children }: { children: ReactNode }) {
  const { lang, ready } = useLang();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        initial={{ opacity: ready ? 0 : 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
