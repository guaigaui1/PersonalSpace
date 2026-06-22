"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TextAnimate } from "@/components/ui/TextAnimate";
import { ShineBorder } from "@/components/ui/ShineBorder";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { NowCard } from "@/components/NowCard";
import profile from "@/data/profile.json";
import { useLang } from "@/lib/i18n";

// 技术栈去重，做成滚动 chip
const techNames = Array.from(
  new Set(profile.projects.flatMap((p) => p.techStack)),
);

const techLogos: LogoItem[] = techNames.map((name) => ({
  node: (
    <span className="rounded-full border border-border bg-background/70 px-4 py-1.5 text-sm font-medium text-foreground/80">
      {name}
    </span>
  ),
  title: name,
}));

export default function Home() {
  const { ui, lang, t } = useLang();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-28 md:px-10">
      {/* 暖色柔光背景 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent-soft), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 size-[24rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-apricot), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
          <ShineBorder
            borderWidth={2}
            duration={12}
            shineColor={["#E8A0B8", "#F2D9C4", "#D17A98"]}
          />

          <Image
            src="/logo.svg"
            alt={t(profile.name)}
            width={64}
            height={64}
            priority
            className="mb-6 rounded-full shadow-sm"
          />

          <p className="text-base text-muted">{ui.home.greeting[lang]}</p>

          <TextAnimate
            as="h1"
            by="character"
            animation="blurInUp"
            once
            duration={0.6}
            className="mt-1 text-5xl font-semibold tracking-tight text-foreground md:text-6xl"
          >
            {t(profile.name)}
          </TextAnimate>

          <p className="mt-3 text-lg font-medium text-accent-ink">{t(profile.title)}</p>

          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            delay={0.25}
            once
            className="mt-6 text-xl leading-relaxed text-foreground/90"
          >
            {ui.home.tagline[lang]}
          </TextAnimate>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted">{ui.home.intro[lang]}</p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-transform hover:scale-[1.03]"
          >
            {ui.home.enter[lang]}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

          <NowCard />
        </div>

        {/* 技术栈滚动条 */}
        <div className="mt-12 max-w-3xl">
          <p className="mb-3 text-sm uppercase tracking-wide text-muted">{ui.home.techLabel[lang]}</p>
          <LogoLoop
            logos={techLogos}
            speed={40}
            logoHeight={34}
            gap={16}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--color-background)"
            ariaLabel="技术栈"
          />
        </div>
      </div>
    </section>
  );
}
