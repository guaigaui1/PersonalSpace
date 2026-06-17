"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import PillNav from "@/components/ui/PillNav";
import { useLang } from "@/lib/i18n";

export function SiteNav() {
  const pathname = usePathname();
  const { ui, lang, toggle } = useLang();

  // 按语言记忆 items，避免 pathname 变化时重放入场动画
  const items = useMemo(
    () => [
      { label: ui.nav.about[lang], href: "/about" },
      { label: ui.nav.work[lang], href: "/work" },
      { label: ui.nav.life[lang], href: "/life" },
    ],
    [ui, lang],
  );

  return (
    <>
      <PillNav
        logo="/logo.svg"
        logoAlt="文冠"
        logoHref="/"
        items={items}
        activeHref={pathname}
        baseColor="var(--color-foreground)"
        pillColor="var(--color-background)"
        pillTextColor="var(--color-foreground)"
        hoveredPillTextColor="var(--color-background)"
      />
      <button
        onClick={toggle}
        aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
        className="fixed top-4 right-4 z-[1001] h-[42px] min-w-[42px] px-4 rounded-full bg-foreground text-background text-[15px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 active:scale-95"
      >
        {lang === "zh" ? "EN" : "中"}
      </button>
    </>
  );
}
