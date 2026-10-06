import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product } from "@/lib/site";
import { Carousel, type Slide } from "./Carousel";
import { PageHead } from "./Chrome";

// Drop photos into public/products/<slug>/ (jpg, png or webp). They are picked up automatically, in filename order.
export function productSlides(p: Product): Slide[] {
  const dir = path.join(process.cwd(), "public", "products", p.slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f, i) => ({ src: `/products/${p.slug}/${f}`, alt: p.captions?.[f] ?? `${p.name} photo ${i + 1}`, caption: p.captions?.[f] }));
  } catch {
    return [];
  }
}

/** Photo cards linking to each product page ("Get to know our portfolio"). */
export function PortfolioCards({ items = PRODUCTS }: { items?: Product[] }) {
  return (
    <div className={`pf-cards n${items.length}`}>
      {items.map((p) => {
        const img = productSlides(p)[0];
        return (
          <Link key={p.slug} href={`/${p.slug}`} className="pf-card">
            <div className="pf-img">{img && <Image src={img.src} alt="" fill sizes="(max-width: 900px) 100vw, 25vw" />}</div>
            <h3>{p.name}</h3>
            <span>{p.tileSpec}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function ProductPage({ p }: { p: Product }) {
  const slides = productSlides(p);
  return (
    <>
      <PageHead label={<><Link href="/">Offerings</Link> / {p.name}</>} title={p.name} lead={p.heroTitle}>
        <p className="ph-sub">{p.heroText}</p>
      </PageHead>
      <section className="ef-sec pp-split">
        {slides.length ? (
          <Carousel slides={slides} intervalMs={5000} className="box" label={`${p.name} photos`} />
        ) : (
          <div className="car box empty" role="img" aria-label={`${p.name} photos coming soon`}>
            <span>Photos coming soon</span>
          </div>
        )}
        <div className="pp-glance">
          <h2 className="ef-h2">At a glance</h2>
          <dl className="dl">
            {p.glance.map(([k, v]) => (<div key={k} className="dlr"><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
      </section>
      {p.uses && (
        <section className="ef-sec muted">
          <h2 className="ef-h2">Where they are used</h2>
          <div className="ef-cards">
            {p.uses.map(([h, t], i) => (<div key={h} className="ef-card"><span className="ef-n">{String(i + 1).padStart(2, "0")}</span><h3>{h}</h3><p>{t}</p></div>))}
          </div>
        </section>
      )}
      <section className="ef-sec">
        <h2 className="ef-h2">Other offerings</h2>
        <PortfolioCards items={PRODUCTS.filter((x) => x.slug !== p.slug)} />
      </section>
    </>
  );
}
