"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import type { Ui } from "@/lib/i18n/dict";

const Ctx = createContext<{ lang: Lang; ui: Ui } | null>(null);

/** Gives client components (menu, forms, cookie banner) the language and its interface text. */
export function I18nProvider({ lang, ui, children }: { lang: Lang; ui: Ui; children: ReactNode }) {
  return <Ctx.Provider value={{ lang, ui }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n needs I18nProvider");
  return v;
}
