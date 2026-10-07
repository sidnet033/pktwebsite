import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { lp, type Lang } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/dict";
import { getProducts } from "@/lib/products";
import { SITE } from "@/lib/site";
import { CookieSettingsLink } from "./CookieConsent";
import { LangSwitch } from "./LangSwitch";
import { NavLinks } from "./NavLinks";
import { NavShell } from "./NavShell";
import { QuoteButton } from "./QuoteDialog";

export function Header({ lang }: { lang: Lang }) {
  return (
    <header className="s-top">
      <Link href={lp(lang, "/")} className="s-logo" aria-label={SITE.name}>
        <Image src="/logo.png" alt="" width={640} height={557} priority />
        <span translate="no">{SITE.name}</span>
      </Link>
      <NavShell links={<NavLinks />} quote={<QuoteButton />} language={<LangSwitch />} />
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const { footer: f } = getDict(lang).ui;
  return (
    <footer className="s-foot">
      <div className="s-foot-cols">
        <div className="fb">
          <Link href={lp(lang, "/")} className="f-logo" aria-label={SITE.name}>
            <Image src="/logo.png" alt="" width={640} height={557} />
            <b translate="no">{SITE.name}</b>
          </Link>
          <p translate="no">{SITE.address}<br />{f.gstin}: {SITE.gstin}</p>
          <a className="map-btn" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">{f.maps} <span aria-hidden>↗</span></a>
        </div>
        <div><b>{f.offerings}</b>{getProducts(lang).map((p) => <Link key={p.slug} href={lp(lang, `/${p.slug}`)}>{p.name}</Link>)}</div>
        <div><b>{f.company}</b><Link href={lp(lang, "/about")}>{f.about}</Link><Link href={lp(lang, "/certifications")}>{f.certifications}</Link><Link href={lp(lang, "/contacts")}>{f.contacts}</Link><a href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com ↗</a></div>
        <div className="fc">
          <b>{f.contact}</b>
          <p><span>{f.sales}</span><a translate="no" href={`mailto:${SITE.email}`}>{SITE.email}</a><span className="sep"> | </span><a translate="no" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p>
          <p><span>{f.service}</span><a translate="no" href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a><span className="sep"> | </span><a translate="no" href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a></p>
          <p><span>{f.careers}</span><a translate="no" href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></p>
        </div>
      </div>
      <div className="s-foot-bar">
        <span>© {new Date().getFullYear()} <span translate="no">{SITE.name}</span> | {f.rights}</span>
        <span className="links"><Link href={lp(lang, "/privacy")}>{f.privacy}</Link><CookieSettingsLink /><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">{f.linkedin}</a></span>
      </div>
    </footer>
  );
}

/** Big page title in the Efacec style: small grey label, very large heading, optional lead paragraph. */
export function PageHead({ label, title, lead, children }: { label?: ReactNode; title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="ph">
      {label && <div className="ph-lab">{label}</div>}
      <h1>{title}</h1>
      {lead && <p className="ph-lead">{lead}</p>}
      {children}
    </section>
  );
}
