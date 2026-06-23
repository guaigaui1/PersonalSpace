"use client";

// dodo 研究循环：规划 → 执行 → 评审 → 回到规划。三角环形布局，beam 绕环流动成闭环。
import { useRef } from "react";
import { ClipboardList, Cpu, ScanSearch } from "lucide-react";

import { AnimatedBeam } from "@/components/ui/AnimatedBeam";
import { useLang } from "@/lib/i18n";

export function WorkLoopDiagram() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const execRef = useRef<HTMLDivElement>(null);
  const critRef = useRef<HTMLDivElement>(null);

  const nodeClass =
    "absolute z-10 flex w-20 flex-col items-center gap-1.5 rounded-2xl border border-border bg-card/70 p-2.5 text-center backdrop-blur-sm sm:w-24 sm:p-3";

  return (
    <div ref={containerRef} className="relative mx-auto h-[260px] max-w-md sm:h-[300px]">
      <div ref={planRef} className={`${nodeClass} left-1/2 top-0 -translate-x-1/2`}>
        <span className="flex size-9 items-center justify-center rounded-full bg-background text-accent-ink">
          <ClipboardList className="size-5" aria-hidden />
        </span>
        <span className="text-sm font-medium leading-tight text-foreground/90">
          {lang === "zh" ? "规划" : "Plan"}
        </span>
        <span className="text-[11px] text-muted">Planner</span>
      </div>

      <div ref={execRef} className={`${nodeClass} bottom-0 left-0`}>
        <span className="flex size-9 items-center justify-center rounded-full bg-background text-accent-ink">
          <Cpu className="size-5" aria-hidden />
        </span>
        <span className="text-sm font-medium leading-tight text-foreground/90">
          {lang === "zh" ? "执行" : "Execute"}
        </span>
        <span className="text-[11px] text-muted">Executor</span>
      </div>

      <div ref={critRef} className={`${nodeClass} bottom-0 right-0`}>
        <span className="flex size-9 items-center justify-center rounded-full bg-background text-accent-ink">
          <ScanSearch className="size-5" aria-hidden />
        </span>
        <span className="text-sm font-medium leading-tight text-foreground/90">
          {lang === "zh" ? "评审" : "Critique"}
        </span>
        <span className="text-[11px] text-muted">Critic</span>
      </div>

      {/* 绕环流动：规划→执行→评审→规划，三段错开 delay 形成持续循环 */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={planRef}
        toRef={execRef}
        curvature={55}
        pathColor="var(--color-border)"
        pathWidth={2}
        pathOpacity={0.5}
        gradientStartColor="#E8A0B8"
        gradientStopColor="#D17A98"
        duration={4}
        delay={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={execRef}
        toRef={critRef}
        curvature={-55}
        pathColor="var(--color-border)"
        pathWidth={2}
        pathOpacity={0.5}
        gradientStartColor="#E8A0B8"
        gradientStopColor="#D17A98"
        duration={4}
        delay={1.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={critRef}
        toRef={planRef}
        curvature={55}
        pathColor="var(--color-border)"
        pathWidth={2}
        pathOpacity={0.5}
        gradientStartColor="#F2D9C4"
        gradientStopColor="#D17A98"
        duration={4}
        delay={2.6}
      />
    </div>
  );
}
