import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { HTML_LANG } from "@/lib/i18n";
import { fill, getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const m = getDict(lang).pages.meta;
  return pageMeta(lang, "/downloads", m.downloads, m.downloadsDescription);
}

// Files live in public/files/. To replace a document, overwrite the PDF and its cover image (same names) and update the
// month in the dictionaries (lib/i18n/en.ts and pt.ts). To add one, add an entry here and one in each dictionary (same order).
const FILES = [
  { file: "company-brochure-nov26", cover: { w: 921, h: 1291 } },
  { file: "company-profile-nov26", cover: { w: 1280, h: 720 } },
];

export default async function Downloads({ params }: Props) {
  const lang = await getLang(params);
  const t = getDict(lang).pages.downloads;
  const mb = new Intl.NumberFormat(HTML_LANG[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return (
    <>
      <section className="ph">
        <h1>{t.title}</h1>
        <p className="ph-lead">{t.lead}</p>
      </section>

      <section className="ef-sec dgrid" style={{ paddingTop: 0 }}>
        {FILES.map((f, i) => {
          const it = t.items[i];
          const bytes = fs.statSync(path.join(process.cwd(), "public", "files", `${f.file}.pdf`)).size;
          return (
            <article key={f.file} className="dcard">
              <a className="dthumb" href={`/files/${f.file}.pdf`} target="_blank" rel="noopener noreferrer" title={t.open} aria-label={`${it.name}: ${t.open}`}>
                <Image src={`/files/${f.file}-cover.jpg`} alt={fill(t.coverAlt, { name: it.name })} width={f.cover.w} height={f.cover.h} sizes="(max-width: 900px) 100vw, 50vw" />
              </a>
              <h2 className="dname">{it.name}</h2>
              <p className="mut">{it.desc}</p>
              <small className="dmeta">{it.note} · {mb.format(bytes / 1048576)} MB</small>
              <a className="pill" href={`/files/${f.file}.pdf`} download={`${it.name}.pdf`}>{t.download} <span aria-hidden>↓</span></a>
            </article>
          );
        })}
      </section>
    </>
  );
}
