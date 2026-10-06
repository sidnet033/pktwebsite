import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SITE } from "@/lib/site";
import { CookieSettingsLink } from "./CookieConsent";
import { NavLinks } from "./NavLinks";
import { QuoteButton } from "./QuoteDialog";

export function Header() {
  return (
    <header className="s-top">
      <Link href="/" className="s-logo" aria-label={SITE.name}>
        <Image src="/logo.png" alt="" width={640} height={557} priority />
        <span>{SITE.name}</span>
      </Link>
      <nav aria-label="Main">
        <NavLinks />
        <QuoteButton />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="s-foot">
      <div className="git">
        <Link href="/contacts" className="git-h">Get in touch with us <span aria-hidden>→</span></Link>
        <QuoteButton className="pill light" />
      </div>
      <div className="s-foot-cols">
        <div className="fb">
          <b>{SITE.name}</b>
          {SITE.address}
          <br />GSTIN: {SITE.gstin}
          <a className="map-btn" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">View on Google Maps <span aria-hidden>↗</span></a>
        </div>
        <div><b>Offerings</b>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
        <div><b>Company</b><Link href="/about">About Us</Link><Link href="/certifications">Certifications</Link><Link href="/contacts">Contacts</Link><a href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com ↗</a></div>
        <div className="fc">
          <b>Contact</b>
          <p>Sales<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p>
          <p>Service<br /><a href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a><br /><a href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a></p>
        </div>
      </div>
      <div className="s-foot-bar">
        <span>© {new Date().getFullYear()} {SITE.name} | All rights reserved.</span>
        <span className="links"><Link href="/privacy">Privacy &amp; Cookies</Link><CookieSettingsLink /><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
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
