"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lp, splitPath, type Lang } from "@/lib/i18n";
import { useI18n } from "./I18n";

const OPTIONS: { lang: Lang; short: string; name: string }[] = [
  { lang: "en", short: "EN", name: "English" },
  { lang: "pt", short: "PT", name: "Português" },
];

/** EN | PT switch. Opens the same page in the other language. */
export function LangSwitch() {
  const { lang, ui } = useI18n();
  const { path } = splitPath(usePathname());
  return (
    <div className="s-lang" role="group" aria-label={ui.nav.language}>
      {OPTIONS.map((o) => (
        <Link key={o.lang} href={lp(o.lang, path)} lang={o.lang === "pt" ? "pt-PT" : "en"} hrefLang={o.lang === "pt" ? "pt-PT" : "en"} title={o.name} aria-label={o.name} aria-current={o.lang === lang ? "true" : undefined} className={o.lang === lang ? "on" : undefined} prefetch={false}>
          {o.short}
        </Link>
      ))}
    </div>
  );
}
