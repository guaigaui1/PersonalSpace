"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";

/** profile.json 里「字段 → { zh, en }」的双语结构 */
export type Bi = { zh: string; en: string };

// 站点 UI 文案（非事实数据；事实数据走 profile.json）
const dict = {
  nav: {
    about: { zh: "关于", en: "About" },
    work: { zh: "作品", en: "Work" },
    life: { zh: "生活", en: "Life" },
  },
  home: {
    greeting: { zh: "嗨，我是", en: "Hi, I'm" },
    tagline: {
      zh: "一个折腾大模型应用、也爱安静待着的人。",
      en: "I build things with LLMs, and I like quiet corners.",
    },
    intro: {
      zh: "白天写 RAG 和 Agent，让模型把活干漂亮；其余时间想把日子过得具体一点。这里是我的一小块地方，随便逛。",
      en: "By day I write RAG and Agent systems and try to make models do real work. The rest of the time I just want to live a little more deliberately. This is my small corner — feel free to wander.",
    },
    techLabel: { zh: "最近在用", en: "Recently using" },
    enter: { zh: "随便看看", en: "Look around" },
  },
  // 「此刻」状态卡 —— 这是会过期的个人内容，随时来这里改
  now: {
    label: { zh: "此刻", en: "Now" },
    whereLabel: { zh: "坐标", en: "Where" },
    where: { zh: "西安 · 西安电子科技大学", en: "Xi'an · Xidian University" },
    buildingLabel: { zh: "在做", en: "Building" },
    building: {
      zh: "写 RAG 与 Agent（小丰 / dodo-Agent）",
      en: "RAG & Agent systems (Xiaofeng / dodo-Agent)",
    },
    latelyLabel: { zh: "最近", en: "Lately" },
    lately: {
      zh: "想把日子过得具体一点，这块慢慢往里填。",
      en: "Trying to live a bit more deliberately — filling this in slowly.",
    },
    updated: { zh: "更新于 2026.06", en: "Updated 2026.06" },
  },
  about: {
    title: { zh: "关于我", en: "About me" },
    band: { zh: "好奇 · 较真 · 松弛 · 喜欢把复杂的东西讲清楚", en: "Curious · Particular · Relaxed · Loves making complex things clear" },
    p1: {
      zh: "我叫张文冠，在西安电子科技大学读通信工程的硕士，泡在 ISN 国家重点实验室。真正让我上头的，是怎么把大模型变成能干活、靠得住的东西。",
      en: "I'm Wenguan Zhang, a master's student in Communication Engineering at Xidian University, based in the State Key Laboratory of ISN. What actually hooks me is turning large models into things that get real work done — reliably.",
    },
    p2: {
      zh: "做项目时我喜欢抠细节：检索召回差几个点、意图识别错一类，我都想弄明白为什么。比起一句「搞定了」，我更想知道它到底是怎么搞定的。",
      en: "When I build, I like to dig into the details: a few points of recall, one misrouted intent — I want to know exactly why. I'd rather understand how something works than just say it's done.",
    },
    p3: {
      zh: "不写代码的时候，我也想把生活过得具体些。这部分先留个位置，慢慢填。",
      en: "When I'm not coding, I try to live more deliberately. I'm leaving this part as a placeholder, to fill in over time.",
    },
    eduTitle: { zh: "读过的地方", en: "Where I studied" },
    honorTitle: { zh: "一些记录", en: "A few notes" },
  },
  work: {
    title: { zh: "做过的东西", en: "Things I've built" },
    subtitle: {
      zh: "不是作品集，是我真的折腾过、也还在想的东西。技术细节用的是原话。",
      en: "Not a portfolio — just things I actually built and still think about. Technical details are kept verbatim.",
    },
    stackLabel: { zh: "技术栈", en: "Stack" },
    flowTitle: { zh: "小丰的检索链路", en: "Xiaofeng's retrieval pipeline" },
    loopTitle: { zh: "dodo 的研究循环", en: "dodo's research loop" },
  },
  life: {
    title: { zh: "兴趣 / 生活", en: "Interests / Life" },
    subtitle: {
      zh: "这一块还在搭，下面是些占位的小卡片。等我慢慢把真东西填进来。",
      en: "Still under construction. The cards below are placeholders — real things coming, slowly.",
    },
    marquee: {
      zh: "读杂书 · 看球 · 走路 · 拍点东西 · 折腾小项目 · 安静待着",
      en: "Books · Football · Walking · Taking photos · Side projects · Quiet time",
    },
    placeholders: [
      { zh: "在读", en: "Reading" },
      { zh: "最近听", en: "Listening" },
      { zh: "想去的地方", en: "Places" },
      { zh: "随手记", en: "Notes" },
      { zh: "正在折腾", en: "Tinkering" },
      { zh: "收藏夹", en: "Saved" },
    ],
    soon: { zh: "待填充", en: "Coming soon" },
    notesCount: { zh: "条记录", en: "entries" },
    notesLatest: { zh: "最近", en: "Latest" },
    open: { zh: "点开看看", en: "Open" },
  },
  notes: {
    title: { zh: "随手记", en: "Notes" },
    subtitle: {
      zh: "每一次小感悟，按时间往下记，不删。",
      en: "Small thoughts, logged over time — nothing deleted.",
    },
    back: { zh: "回到生活", en: "Back to Life" },
  },
  footer: {
    madeWith: { zh: "用 Next.js 搭的，慢慢长。", en: "Built with Next.js, growing slowly." },
    backTop: { zh: "回到顶部", en: "Back to top" },
  },
} as const;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** 取双语字段当前语言值 */
  t: (b: Bi) => string;
  ui: typeof dict;
  ready: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null;
    let next: Lang;
    if (stored === "zh" || stored === "en") {
      next = stored;
    } else {
      next = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    }
    // 挂载后按 localStorage / navigator.language 初始化语言（合法的一次性同步）
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  };

  const toggle = () => setLang(lang === "zh" ? "en" : "zh");
  const t = (b: Bi) => b[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t, ui: dict, ready }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
