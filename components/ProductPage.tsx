import fs from "node:fs";
import path from "node:path";
import type { Product } from "@/lib/site";
import { Carousel, type Slide } from "./Carousel";
import { Hero } from "./Chrome";

// Drop photos into public/products/<slug>/ (jpg, png or webp). They are picked up automatically, in filename order.
function productSlides(p: Product): Slide[] {
  const dir = path.join(process.cwd(), "public", "products", p.slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f, i) => ({ src: `/products/${p.slug}/${f}`, alt: `${p.name} photo ${i + 1}` }));
  } catch {
    return [];
  }
}

export function ProductPage({ p }: { p: Product }) {
  const slides = productSlides(p);
  return (
    <>
      <Hero small slug={p.slug} photo={p.photo} tone={p.tone} title={p.heroTitle} text={p.heroText} />
      <section className="s-sec pp-split">
        <div className="pp-glance">
          <div className="lab">At a glance</div>
          <dl className="dl">
            {p.glance.map(([k, v]) => (<div key={k} className="dlr"><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
        {slides.length ? (
          <Carousel slides={slides} intervalMs={5000} className="box" label={`${p.name} photos`} />
        ) : (
          <div className="car box empty" role="img" aria-label={`${p.name} photos coming soon`}>
            <span>Photos coming soon</span>
          </div>
        )}
      </section>
      {p.uses && (
        <section className="s-sec grey">
          <div className="lab">Where they are used</div>
          <div className="s-cols four">
            {p.uses.map(([h, t]) => (<div key={h}><h3>{h}</h3><p>{t}</p></div>))}
          </div>
        </section>
      )}
    </>
  );
}
