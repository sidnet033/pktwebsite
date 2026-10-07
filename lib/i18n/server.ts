import { notFound } from "next/navigation";
import { isLang, HTML_LANG, lp, type Lang } from "./index";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";

/** Reads the language from the page address. Anything other than en/pt is a 404. */
export async function getLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}

/** Title, description, canonical address and the English/Portuguese alternates (hreflang) of a page. */
export function pageMeta(lang: Lang, path: string, title?: string, description?: string): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: lp(lang, path),
      languages: { en: lp("en", path), [HTML_LANG.pt]: lp("pt", path), "x-default": lp("en", path) },
    },
    openGraph: { siteName: SITE.name, type: "website", locale: lang === "pt" ? "pt_PT" : "en", images: ["/logo.png"], url: lp(lang, path) },
  };
}
