import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, SITE } from "@/lib/site";
import { QuoteButton } from "./QuoteDialog";

export function Header() {
  return (
    <header className="s-top">
      <Link href="/" className="s-logo" aria-label={SITE.name}>
        <Image src="/logo.png" alt="" width={480} height={513} priority />
        <span>{SITE.name}</span>
      </Link>
      <nav aria-label="Main">
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
      <div className="fb"><b>{SITE.name}</b>[ address ], Goa, India<br />A Pai Kane Group company</div>
      <div><b>Products</b>{PRODUCTS.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.name}</Link>)}</div>
      <div><b>Company</b><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href={SITE.groupUrl}>paikane.com</a></div>
      <div><b>Contact</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a>[ phone ]</div>
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
      <QuoteButton className="s-btn light" />
    </section>
  );
}
