import type { Metadata } from "next";
import { ProductPage } from "@/components/ProductPage";
import { PRODUCTS } from "@/lib/site";

const p = PRODUCTS.find((x) => x.slug === "transformers")!;
export const metadata: Metadata = { title: p.name, description: p.heroText };

export default function Page() {
  return <ProductPage p={p} />;
}
