"use client";

// Animated Beam 的 API 需要把 ref 作为 prop 传入，属有意为之
/* eslint-disable react-hooks/refs */

// 小丰检索链路：用 Animated Beam 串起 文档 → 切片向量化 → 混合检索 → 精排 → 回答
import { useRef } from "react";
import { FileText, Layers, Search, ListFilter, MessageSquare } from "lucide-react";

import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { useLang } from "@/lib/i18n";

const nodes = [
  { icon: FileText, zh: "文档接入", en: "Documents" },
  { icon: Layers, zh: "切片 · 向量化", en: "Chunk · Embed" },
  { icon: Search, zh: "混合检索", en: "Hybrid retrieval" },
  { icon: ListFilter, zh: "精排序", en: "Rerank" },
  { icon: MessageSquare, zh: "流式回答", en: "Streamed answer" },
] as const;

export function WorkFlowDiagram() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <div className="overflow-x-auto">
      <div
        ref={containerRef}
        className="relative mx-auto flex min-w-[640px] items-center justify-between gap-2 px-2 py-8"
      >
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div
              key={node.en}
              ref={refs[i]}
              className="relative z-10 flex w-28 flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-3 text-center backdrop-blur-sm"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-background text-accent-ink">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-xs font-medium leading-tight text-foreground/90">
                {lang === "zh" ? node.zh : node.en}
              </span>
            </div>
          );
        })}

        {refs.slice(0, -1).map((from, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={from}
            toRef={refs[i + 1]}
            pathColor="var(--color-border)"
            pathWidth={2}
            pathOpacity={0.5}
            gradientStartColor="#E8A0B8"
            gradientStopColor="#D17A98"
            duration={4}
            delay={i * 0.6}
          />
        ))}
      </div>
    </div>
  );
}
