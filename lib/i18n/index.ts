// Languages: English lives at the normal addresses (/about), Portuguese under /pt (/pt/about).
// People's names, email addresses, phone numbers and the company name are never translated.
export const LANGS = ["en", "pt"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (x: string): x is Lang => (LANGS as readonly string[]).includes(x);

/** Value for <html lang> and for hreflang. Portuguese is written for Portugal. */
export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-PT" };

/** Address of a page in the given language, e.g. lp("pt", "/about") -> "/pt/about". */
export const lp = (lang: Lang, path: string) => (lang === "pt" ? (path === "/" ? "/pt" : `/pt${path}`) : path);

/** Splits "/pt/about" into { lang: "pt", path: "/about" }. Works with or without a language prefix. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/(pt|en)(?=\/|$)/);
  const path = (m ? pathname.slice(m[0].length) : pathname) || "/";
  return { lang: m?.[1] === "pt" ? "pt" : "en", path };
}
