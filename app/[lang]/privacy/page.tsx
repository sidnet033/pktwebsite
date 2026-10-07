import type { Metadata } from "next";
import { PrivacyEn } from "@/components/privacy/PrivacyEn";
import { PrivacyPt } from "@/components/privacy/PrivacyPt";
import { getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const m = getDict(lang).pages.meta;
  return pageMeta(lang, "/privacy", m.privacy, m.privacyDescription);
}

export default async function Privacy({ params }: Props) {
  const lang = await getLang(params);
  return lang === "pt" ? <PrivacyPt /> : <PrivacyEn />;
}
