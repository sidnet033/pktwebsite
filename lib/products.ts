import { PRODUCTS, type Product } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { PRODUCTS_PT } from "@/lib/i18n/products.pt";

/** All products with their text in the given language (English text lives in lib/site.ts). */
export function getProducts(lang: Lang): Product[] {
  return lang === "pt" ? PRODUCTS.map((p) => ({ ...p, ...PRODUCTS_PT[p.slug] })) : PRODUCTS;
}

export const getProduct = (lang: Lang, slug: string) => getProducts(lang).find((p) => p.slug === slug)!;
