"use client";

import { MapPin, Hammer, Coffee } from "lucide-react";

import { useLang } from "@/lib/i18n";

export function NowCard() {
  const { ui, lang } = useLang();
  const now = ui.now;

  const rows = [
    { icon: MapPin, label: now.whereLabel[lang], value: now.where[lang] },
    { icon: Hammer, label: now.buildingLabel[lang], value: now.building[lang] },
    { icon: Coffee, label: now.latelyLabel[lang], value: now.lately[lang] },
  ];

  return (
    <div className="relative w-full rounded-[1.75rem] border border-accent/40 bg-background/60 p-7 backdrop-blur-sm shadow-[0_0_40px_-18px_var(--color-accent)]">
      <div className="mb-5 flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
        </span>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-ink">
          {now.label[lang]}
        </span>
      </div>

      <ul className="space-y-4">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <li key={row.label} className="flex gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-card text-accent-ink">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">{row.label}</p>
                <p className="text-[15px] leading-6 text-foreground/90">{row.value}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-xs text-muted">{now.updated[lang]}</p>
    </div>
  );
}
