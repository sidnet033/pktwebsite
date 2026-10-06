import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { PortfolioCards, productSlides } from "@/components/ProductPage";
import { PromoBox } from "@/components/PromoBox";
import { PRODUCTS } from "@/lib/site";

const STATS = [
  ["1971", "Pai Kane Group founded in Goa"],
  ["86+", "Countries served by the group"],
  ["20 MVA", "Transformers up to 33 kV"],
  ["6,300 A", "LV switchboards on ABB ArTu K"],
];

export default function Home() {
  return (
    <>
      <PromoBox />
      <section className="ph">
        <h1>Power equipment, engineered to your specification.</h1>
        <p className="ph-lead">Transformers, compact substations, LV switchboards and voltage regulators, made in Goa.</p>
        <a className="ef-link" href="#portfolio">Get to know our portfolio <span aria-hidden>↓</span></a>
      </section>
      <Carousel className="wide" />

      <section className="ef-sec stats" aria-label="Key figures">
        {STATS.map(([n, l]) => (
          <div key={n}><strong>{n}</strong><span>{l}</span></div>
        ))}
      </section>

      <section className="ef-sec muted" id="portfolio">
        <h2 className="ef-h2">Get to know our portfolio</h2>
        <PortfolioCards />
      </section>

      {PRODUCTS.map((p, i) => {
        const img = productSlides(p)[0];
        return (
          <section key={p.slug} className={`ef-sec fam ${i % 2 ? "rev" : ""}`}>
            <div className="fam-img">{img && <Image src={img.src} alt={img.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />}</div>
            <div className="fam-txt">
              <h2 className="ef-h2">{p.name}</h2>
              <p className="ef-p">{p.heroTitle} {p.heroText}</p>
              <dl className="dl">
                {p.glance.slice(0, 3).map(([k, v]) => (<div key={k} className="dlr"><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
              <Link className="pill line" href={`/${p.slug}`}>Explore {p.name.toLowerCase()} <span aria-hidden>→</span></Link>
            </div>
          </section>
        );
      })}

      <section className="ef-sec statement">
        <h2>A young transformer company with a 35-year engineering foundation, serving customers in India, MENA and Europe.</h2>
        <Link className="ef-link" href="/about">About Pai Kane <span aria-hidden>→</span></Link>
      </section>
    </>
  );
}
