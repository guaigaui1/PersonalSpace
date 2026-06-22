"use client";

import Link from "next/link";
import { Sparkles, PenLine, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import notesData from "@/data/notes.json";
import { useLang } from "@/lib/i18n";

export default function LifePage() {
  const { ui, lang } = useLang();
  const interests = ui.life.marquee[lang].split(" · ");

  // 随手记单独做成真卡，其余仍为占位
  const notesCount = notesData.entries.length;
  const latestDate = notesData.entries[0]?.date ?? "";
  const latestTitle = notesData.entries[0]?.title[lang] ?? "";
  const placeholders = ui.life.placeholders.filter((p) => p.en !== "Notes");

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {ui.life.title[lang]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{ui.life.subtitle[lang]}</p>
        </Reveal>
      </div>

      {/* 兴趣滚动条 */}
      <div className="my-12">
        <Marquee pauseOnHover className="[--duration:30s]">
          {interests.map((item) => (
            <span
              key={item}
              className="mx-2 rounded-full border border-border bg-card/60 px-5 py-2 text-base text-foreground/85"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* 卡片墙：随手记是真卡，其余占位 */}
      <div className="mx-auto w-full max-w-4xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {/* 随手记 · 真卡 */}
        <Reveal className="mb-5 block break-inside-avoid">
          <Link href="/notes" className="group block">
            <div
              className="relative flex flex-col gap-3 rounded-2xl border border-accent/40 bg-background/60 p-6 shadow-[0_0_36px_-20px_var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-1"
              style={{ minHeight: "200px" }}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-accent-soft/40 text-accent-ink">
                <PenLine className="size-4" aria-hidden />
              </span>
              <p className="text-lg font-medium text-foreground">{ui.notes.title[lang]}</p>
              <p className="line-clamp-2 text-sm text-muted">{latestTitle}</p>
              <div className="mt-auto flex items-center justify-between text-sm">
                <span className="text-muted">
                  {notesCount} {ui.life.notesCount[lang]} · {latestDate}
                </span>
                <span className="inline-flex items-center gap-1 text-accent-ink">
                  {ui.life.open[lang]}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* 其余占位 */}
        {placeholders.map((ph, i) => (
          <Reveal key={ph.en} delay={i * 0.05} className="mb-5 break-inside-avoid">
            <div
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6"
              style={{ minHeight: `${140 + (i % 3) * 36}px` }}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-accent-soft/40 text-accent-ink">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <p className="text-lg font-medium text-foreground">{ph[lang]}</p>
              <p className="mt-auto text-sm text-muted">{ui.life.soon[lang]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
