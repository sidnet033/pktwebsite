import type { Product } from "@/lib/site";
import { Cta, Hero } from "./Chrome";
import { QuoteButton } from "./QuoteDialog";

export function ProductPage({ p }: { p: Product }) {
  return (
    <>
      <Hero small slug={p.slug} photo={p.photo} tone={p.tone} title={p.heroTitle} text={p.heroText}>
        <QuoteButton className="s-btn light" />
      </Hero>
      <section className="s-sec">
        <div className="lab">At a glance</div>
        <dl className="dl">
          {p.glance.map(([k, v]) => (<div key={k} className="dlr"><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </section>
      {p.uses && (
        <section className="s-sec grey">
          <div className="lab">Where they are used</div>
          <div className="s-cols four">
            {p.uses.map(([h, t]) => (<div key={h}><h3>{h}</h3><p>{t}</p></div>))}
          </div>
        </section>
      )}
      <section className={`s-sec ${p.uses ? "" : "grey"}`}>
        <div className="lab">What to send us</div>
        <h2 className="s-h">{p.sendTitle}</h2>
        <ul className="chk">{p.send.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>
      <Cta title={p.ctaTitle} />
    </>
  );
}
