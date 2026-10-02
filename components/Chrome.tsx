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
      <div className="fb">
        <b>{SITE.name}</b>
        {SITE.address}
        <br />GSTIN: {SITE.gstin}
        <br />© {new Date().getFullYear()} {SITE.name}
      </div>
      <div>
        <a className="map-btn" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">View on Google Maps <span aria-hidden>↗</span></a>
      </div>
      <div><b>Products</b>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
      <div><b>Company</b><Link href="/about">About</Link><Link href="/certifications">Certifications</Link><a href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com</a><Link href="/privacy">Privacy &amp; Cookies</Link><CookieSettingsLink /></div>
      <div className="fc">
        <b>Contact</b>
        <p>Sales: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> | <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p>
        <p>Service: <a href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a> | <a href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a></p>
        <p><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </div>
    </footer>
  );
}

export function Hero({ photo, tone = "", slug, small, title, text, children }: { photo?: string; tone?: string; slug?: string; small?: boolean; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className={`photo ${tone} s-hero ${small ? "sm" : ""}`} style={slug ? ({ "--img": `url(/products/${slug}.jpg)` } as React.CSSProperties) : undefined} aria-label={photo}>
      <div className="in">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children && <div className="row">{children}</div>}
      </div>
    </section>
  );
}
