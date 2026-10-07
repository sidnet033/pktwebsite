import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteDialog";
import { getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  const m = getDict(lang).pages.meta;
  return pageMeta(lang, "/contacts", m.contacts, m.contactsDescription);
}

export default async function Contacts({ params }: Props) {
  const lang = await getLang(params);
  const t = getDict(lang).pages.contacts;
  return (
    <>
      <section className="ct-hero">
        <div className="ct-intro">
          <h1>{t.title}</h1>
          <p className="ph-lead">{t.lead}</p>
          <a className="ef-link" href="#where">{t.where} <span aria-hidden>↓</span></a>
          <div className="ct-direct">
            <div><h3>{t.sales}</h3><p><a translate="no" href={`mailto:${SITE.email}`}>{SITE.email}</a><span className="sep"> | </span><a translate="no" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p></div>
            <div><h3>{t.service}</h3><p><a translate="no" href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a><span className="sep"> | </span><a translate="no" href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a></p></div>
            <div><h3>{t.careers}</h3><p><a translate="no" href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></p></div>
          </div>
        </div>
        <div className="ct-panel">
          <QuoteForm page />
        </div>
      </section>

      <section className="ef-sec" id="where">
        <h2 className="ct-where">{t.where}</h2>
        <div className="region">
          <h3>{t.india}</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>{t.factory}</b>
              <p translate="no">{SITE.name}<br />{SITE.address}</p>
              <p>{t.tel} <a translate="no" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a><br />{t.mail} <a translate="no" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <a className="pill line sm" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">{t.maps}</a>
            </div>
          </div>
        </div>
        <div className="region">
          <h3>{t.worldwide}</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>{t.offices}</b>
              <p>{t.officesText}</p>
              <a className="pill line sm" href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com ↗</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
