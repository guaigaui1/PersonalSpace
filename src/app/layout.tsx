import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { LangFade } from "@/components/LangFade";
import ClickSpark from "@/components/ui/ClickSpark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "张文冠 · 个人空间",
  description:
    "张文冠的个人空间 —— 一个折腾大模型应用、也爱安静待着的人。Wenguan Zhang's personal corner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteNav />
          <ClickSpark
            sparkColor="#d17a98"
            sparkRadius={18}
            sparkCount={8}
            duration={420}
          >
            <LangFade>
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </LangFade>
          </ClickSpark>
        </Providers>
      </body>
    </html>
  );
}
