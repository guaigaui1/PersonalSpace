"use client";

import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { TextHighlighter } from "@/components/ui/TextHighlighter";
import notesData from "@/data/notes.json";
import { useLang } from "@/lib/i18n";

// 判断是否为小标题（章节号 / 「我的补充」），给予更重的字重
function isHeading(zh: string) {
  return /^[一二三四五六七八九十]、/.test(zh) || zh === "我的补充：";
}

export default function NotesPage() {
  const { ui, lang } = useLang();
  const entries = notesData.entries;

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <Reveal>
          <Link
            href="/life"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {ui.notes.back[lang]}
          </Link>

          <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            <PenLine className="size-7 text-accent-ink" aria-hidden />
            <TextHighlighter>{ui.notes.title[lang]}</TextHighlighter>
          </h1>
          <p className="mt-4 text-lg text-muted">{ui.notes.subtitle[lang]}</p>
        </Reveal>

        {/* 时间线，最新在上，持续往下追加 */}
        <div className="relative mt-14 space-y-12 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-border">
          {entries.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.05}>
              <article className="relative pl-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 flex size-3.5 items-center justify-center rounded-full border-2 border-background bg-accent"
                />
                <time className="text-sm font-medium uppercase tracking-wide text-accent-ink">
                  {entry.date}
                </time>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  {entry.title[lang]}
                </h2>

                <div className="mt-4 rounded-2xl border border-border bg-card/40 p-6">
                  {entry.body.map((line, j) => {
                    const text = line[lang];
                    if (text === "") return <div key={j} className="h-3" />;
                    if (isHeading(line.zh)) {
                      return (
                        <p key={j} className="mt-4 font-semibold text-foreground first:mt-0">
                          {text}
                        </p>
                      );
                    }
                    return (
                      <p key={j} className="mt-1.5 text-[15px] leading-7 text-foreground/85">
                        {text}
                      </p>
                    );
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
