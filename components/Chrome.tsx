import Link from "next/link";
import { PRODUCTS, SITE } from "@/lib/site";
import { QuoteButton } from "./QuoteDialog";

export function Header() {
  return (
    <header className="s-top">
      <Link href="/" className="s-logo">
        <i />
        <span>{SITE.short}<small>A Pai Kane Group company</small></span>
      </Link>
      <nav aria-label="Main">
        <details className="menu">
          <summary>Products</summary>
          <div>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
        </details>
        <Link href="/markets">Markets</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <QuoteButton />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="s-foot">
      <div><b>{SITE.name}</b>[ address ], Goa, India</div>
      <div><b>Products</b>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
      <div><b>Company</b><Link href="/about">About</Link><Link href="/markets">Markets</Link><Link href="/contact">Contact</Link></div>
      <div><b>Contact</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a>[ phone ]</div>
    </footer>
  );
}

export function Hero({ photo, tone = "", small, title, text, children }: { photo: string; tone?: string; small?: boolean; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className={`photo ${tone} s-hero ${small ? "sm" : ""}`} data-ph={photo}>
      <div className="in">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children && <div className="row">{children}</div>}
      </div>
    </section>
  );
}

export function Cta({ title }: { title: string }) {
  return (
    <section className="s-cta">
      <h2>{title}</h2>
      <QuoteButton className="s-btn light" />
    </section>
  );
}
