import type { Metadata } from "next";
import Image from "next/image";
import { fill, getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "/certifications", getDict(lang).pages.meta.certifications);
}

// Certificate images live in public/certs/. Click a card to open the full-size image.
// File names and certificate numbers are fixed; the names and notes come from the dictionaries (same order).
const CE = [
  { file: "ce-oil-filled-transformer.png", no: "4563-CI-32026" },
  { file: "ce-compact-substation.png", no: "4562-CI-32026" },
  { file: "ce-lv-switchboard.png", no: "4560-CI-32026" },
];

export default async function Certifications({ params }: Props) {
  const lang = await getLang(params);
  const t = getDict(lang).pages.certs;
  return (
    <>
      <section className="s-sec cert-head">
        <h1 className="s-h big2">{t.title}</h1>
      </section>

      <section className="s-sec cert-sec">
        <h2 className="s-h">{t.ceTitle}</h2>
        <p className="mut cert-intro">{t.ceIntro}</p>
        <div className="certs">
          {CE.map((c, i) => (
            <a key={c.file} className="cert" href={`/certs/${c.file}`} target="_blank" rel="noopener noreferrer">
              <Image src={`/certs/${c.file}`} alt={fill(t.imgAlt, { name: t.items[i].name, no: c.no })} width={1240} height={1754} sizes="(max-width: 900px) 100vw, 33vw" />
              <b>{t.items[i].name}</b>
              <small>{t.items[i].note}</small>
              <small>{t.certNo} {c.no}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="s-sec grey cert-sec">
        <h2 className="s-h">{t.indianTitle}</h2>
        <p className="mut cert-intro">{t.indianIntro}</p>
      </section>
    </>
  );
}
