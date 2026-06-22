"use client";

import { GraduationCap, Award } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { ScrollVelocity } from "@/components/ui/ScrollVelocity";
import { TextHighlighter } from "@/components/ui/TextHighlighter";
import profile from "@/data/profile.json";
import { useLang } from "@/lib/i18n";

export default function AboutPage() {
  const { ui, lang, t } = useLang();

  // 弱化履历感：证书（CET 等）降为脚注，其余作为小记录
  const certHonors = profile.honors.filter((h) => h.zh.includes("CET"));
  const otherHonors = profile.honors.filter((h) => !h.zh.includes("CET"));

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            <TextHighlighter>{ui.about.title[lang]}</TextHighlighter>
          </h1>
        </Reveal>
      </div>

      {/* 速度感装饰带 */}
      <div className="my-12 text-3xl font-semibold text-accent/70 md:text-4xl">
        <ScrollVelocity baseVelocity={3}>{ui.about.band[lang]}</ScrollVelocity>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-6 text-lg leading-relaxed text-foreground/90">
        <Reveal delay={0.05}>
          <p>{ui.about.p1[lang]}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>{ui.about.p2[lang]}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-muted">{ui.about.p3[lang]}</p>
        </Reveal>
      </div>

      {/* 教育 */}
      <div className="mx-auto mt-16 w-full max-w-3xl">
        <Reveal>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
            <GraduationCap className="size-5 text-accent-ink" aria-hidden />
            {ui.about.eduTitle[lang]}
          </h2>
        </Reveal>
        <div className="space-y-4">
          {profile.education.map((edu, i) => (
            <Reveal key={edu.period} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-lg font-medium text-foreground">{t(edu.school)}</p>
                  <p className="text-sm text-muted">{edu.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {t(edu.college)} · {t(edu.degree)}
                </p>
                {"lab" in edu && edu.lab ? (
                  <p className="mt-1 text-sm text-accent-ink">{t(edu.lab)}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 记录（弱化，去履历感）*/}
      <div className="mx-auto mt-12 w-full max-w-3xl">
        <Reveal>
          <h2 className="mb-4 flex items-center gap-2 text-base font-medium text-muted">
            <Award className="size-4 text-accent-ink/70" aria-hidden />
            {ui.about.honorTitle[lang]}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {otherHonors.map((honor) => (
              <span
                key={honor.zh}
                className="inline-block rounded-full border border-border/70 bg-card/30 px-3 py-1 text-xs text-muted"
              >
                {t(honor)}
              </span>
            ))}
          </div>
          {certHonors.length > 0 && (
            <p className="mt-3 text-xs text-muted/80">
              {certHonors.map((c) => t(c)).join(" · ")}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
