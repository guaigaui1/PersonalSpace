"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { WorkFlowDiagram } from "@/components/WorkFlowDiagram";
import { WorkLoopDiagram } from "@/components/WorkLoopDiagram";
import profile from "@/data/profile.json";
import { useLang } from "@/lib/i18n";

export default function WorkPage() {
  const { ui, lang, t } = useLang();

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {ui.work.title[lang]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{ui.work.subtitle[lang]}</p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {profile.projects.map((project, idx) => (
            <Reveal key={project.id} delay={0.05}>
              <article
                className={`group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/40 p-7 transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--color-accent),0_18px_50px_-20px_var(--color-accent)] md:max-w-[92%] md:p-9 ${
                  idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <ShineBorder borderWidth={1} duration={16} shineColor={["#E8A0B8", "#D17A98"]} />

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-foreground">{t(project.name)}</h2>
                  <span className="text-sm text-muted">{project.period}</span>
                </div>

                <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/90">
                  {t(project.intro)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 小丰展示检索链路图 */}
                {project.id === "xiaofeng" && (
                  <div className="mt-6">
                    <p className="mb-1 text-sm font-medium text-accent-ink">{ui.work.flowTitle[lang]}</p>
                    <WorkFlowDiagram />
                  </div>
                )}
                {project.id === "dodo-agent" && (
                  <div className="mt-6">
                    <p className="mb-1 text-sm font-medium text-accent-ink">{ui.work.loopTitle[lang]}</p>
                    <WorkLoopDiagram />
                  </div>
                )}

                <ul className="mt-6 space-y-4">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="relative pl-5 text-base leading-7 text-foreground/85">
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.6em] size-2 -translate-y-1/2 rounded-full bg-accent"
                      />
                      {t(h)}
                    </li>
                  ))}
                </ul>

                <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none text-8xl font-bold text-accent/5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
