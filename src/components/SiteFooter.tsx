"use client";

import { Code2, Mail, ArrowUp } from "lucide-react";

import profile from "@/data/profile.json";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { ui, lang, t } = useLang();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold text-foreground">{t(profile.name)}</p>
            <p className="mt-1 text-sm text-muted">{ui.footer.madeWith[lang]}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent-ink"
            >
              <Mail className="size-4" aria-hidden />
              {profile.contact.email}
            </a>
            <a
              href={`https://${profile.contact.github}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent-ink"
            >
              <Code2 className="size-4" aria-hidden />
              GitHub
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-transform hover:scale-105"
            >
              <ArrowUp className="size-4" aria-hidden />
              {ui.footer.backTop[lang]}
            </button>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {t(profile.name)}
        </p>
      </div>
    </footer>
  );
}
