import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { getProduct } from "@/lib/products";
import { getLang, pageMeta } from "@/lib/i18n/server";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const p = getProduct(lang, "avrs");
  return pageMeta(lang, "/avrs", p.name, p.heroText);
}

export default async function Page({ params }: Props) {
  const lang = await getLang(params);
  return <ProductPage p={getProduct(lang, "avrs")} lang={lang} />;
}
