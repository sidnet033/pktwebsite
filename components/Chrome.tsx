import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SITE } from "@/lib/site";
import { QuoteButton } from "./QuoteDialog";

export function Header() {
  return (
    <header className="s-top">
      <Link href="/" className="s-logo" aria-label={SITE.name}>
        <Image src="/logo.png" alt="" width={640} height={557} priority />
        <span>{SITE.name}</span>
      </Link>
      <nav aria-label="Main">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <QuoteButton />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="s-foot">
      <div className="fb"><b>{SITE.name}</b>{SITE.address}<br />A Pai Kane Group company</div>
      <div><b>Products</b>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
      <div><b>Company</b><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href={SITE.groupUrl}>paikane.com</a></div>
      <div><b>Contact</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
      <p className="legal">© {new Date().getFullYear()} {SITE.name}</p>
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

export function Cta({ title }: { title: string }) {
  return (
    <section className="s-cta">
      <h2>{title}</h2>
    </section>
  );
}
