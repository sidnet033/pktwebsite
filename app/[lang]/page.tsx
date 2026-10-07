import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { PortfolioCards, productSlides } from "@/components/ProductPage";
import { PromoBox } from "@/components/PromoBox";
import { lp } from "@/lib/i18n";
import { fill, getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";
import { getProducts } from "@/lib/products";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "/");
}

export default async function Home({ params }: Props) {
  const lang = await getLang(params);
  const t = getDict(lang).pages.home;
  const products = getProducts(lang);
  return (
    <>
      <PromoBox />
      <section className="ph">
        <h1>{t.title}</h1>
        <p className="ph-lead one">{t.lead}</p>
        <a className="ef-link" href="#portfolio">{t.cta} <span aria-hidden>↓</span></a>
      </section>
      <Carousel className="wide" alts={t.slides} />

      <section className="ef-sec stats" aria-label={t.statsLabel}>
        {t.stats.map(([n, l]) => (
          <div key={n}><strong>{n}</strong><span>{l}</span></div>
        ))}
      </section>

      <section className="ef-sec muted" id="portfolio">
        <h2 className="ef-h2">{t.portfolio}</h2>
        <PortfolioCards lang={lang} />
      </section>

      {products.map((p, i) => {
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
              <Link className="pill line" href={lp(lang, `/${p.slug}`)}>{fill(t.explore, { name: p.name.toLowerCase() })} <span aria-hidden>→</span></Link>
            </div>
          </section>
        );
      })}
    </>
  );
}
