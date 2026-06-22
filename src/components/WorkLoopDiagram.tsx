"use client";

// dodo 研究循环：Plan → Execute → Critique → 回到 Plan，用 Animated Beam 画成闭环
import { useRef } from "react";
import { ClipboardList, Cpu, ScanSearch } from "lucide-react";

import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { useLang } from "@/lib/i18n";

const nodes = [
  { icon: ClipboardList, zh: "规划", en: "Plan", tag: "Planner" },
  { icon: Cpu, zh: "执行", en: "Execute", tag: "Executor" },
  { icon: ScanSearch, zh: "评审", en: "Critique", tag: "Critic" },
] as const;

export function WorkLoopDiagram() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const nodeRefs = [r0, r1, r2];

  return (
    <div className="overflow-x-auto">
      <div
        ref={containerRef}
        className="relative mx-auto flex min-w-[420px] max-w-2xl items-end justify-between gap-2 px-6 pb-6 pt-16"
      >
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div
              key={node.en}
              ref={nodeRefs[i]}
              className="relative z-10 flex w-28 flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-3 text-center backdrop-blur-sm"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-background text-accent-ink">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-medium leading-tight text-foreground/90">
                {lang === "zh" ? node.zh : node.en}
              </span>
              <span className="text-[11px] text-muted">{node.tag}</span>
            </div>
          );
        })}

        {/* 顺序推进 */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={r0}
          toRef={r1}
          pathColor="var(--color-border)"
          pathWidth={2}
          pathOpacity={0.5}
          gradientStartColor="#E8A0B8"
          gradientStopColor="#D17A98"
          duration={3.5}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={r1}
          toRef={r2}
          pathColor="var(--color-border)"
          pathWidth={2}
          pathOpacity={0.5}
          gradientStartColor="#E8A0B8"
          gradientStopColor="#D17A98"
          duration={3.5}
          delay={0.5}
        />
        {/* 评审反馈回到规划，弧线越过顶部形成闭环 */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={r2}
          toRef={r0}
          curvature={90}
          pathColor="var(--color-border)"
          pathWidth={2}
          pathOpacity={0.5}
          gradientStartColor="#F2D9C4"
          gradientStopColor="#D17A98"
          duration={4}
          delay={1}
        />
      </div>
    </div>
  );
}
