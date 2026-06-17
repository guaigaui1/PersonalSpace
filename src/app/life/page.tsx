"use client";

import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { useLang } from "@/lib/i18n";

export default function LifePage() {
  const { ui, lang } = useLang();
  const interests = ui.life.marquee[lang].split(" · ");

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

      {/* 占位卡片墙 */}
      <div className="mx-auto w-full max-w-4xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {ui.life.placeholders.map((ph, i) => (
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
