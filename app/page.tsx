import Link from "next/link";
import { Cta, Hero } from "@/components/Chrome";
import { QuoteButton } from "@/components/QuoteDialog";
import { PRODUCTS, SITE } from "@/lib/site";

const NUMS = [
  ["20 MVA", "Oil cooled transformers, up to"],
  ["33 kV", "Transformer voltage class, up to"],
  ["6,300 A", "LV switchboards, up to"],
  ["1,000 kVA", "Voltage regulators, up to"],
];

export default function Home() {
  return (
    <>
      <Hero photo="Photo: transformer yard at dusk" title="Power equipment, engineered to your specification." text="Oil cooled transformers, compact substations, LV switchboards and AVRs, made in Goa.">
        <QuoteButton className="s-btn light" />
        <Link href="/transformers" className="s-btn line">Our products</Link>
      </Hero>
      <section className="s-intro">
        <div className="lab">Who we are</div>
        <div>
          <p className="big">A new company with the engineering of a 35-year-old group behind it.</p>
          <Link href="/about" className="arrow">About us →</Link>
        </div>
      </section>
      <section className="s-sec nopt">
        <div className="lab">Our range</div>
        <div className="s-nums">{NUMS.map(([n, l]) => <div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div>
      </section>
      <section className="s-sec grey">
        <div className="lab">What we make</div>
        <div className="s-tiles">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className={`photo ${p.tone} tile`} data-ph={p.photo}>
              <div className="in"><h3>{p.name}</h3><span className="sp">{p.tileSpec}</span><span className="go">Explore →</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="s-sec">
        <div className="lab">Where we work</div>
        <h2 className="s-h">Choose your market</h2>
        <div className="s-cols">
          <div><h3>India</h3><p>Transformers for solar, wind and battery storage projects, plus distribution and substations.</p><Link className="arrow" href="/markets#india">Explore India →</Link></div>
          <div><h3>Middle East &amp; Africa</h3><p>Distribution transformers and packaged substations for demanding climates and tenders.</p><Link className="arrow" href="/markets#mea">Explore →</Link></div>
          <div><h3>Europe</h3><p>Distribution transformers and switchgear for distributors and project buyers.</p><Link className="arrow" href="/markets#europe">Explore →</Link></div>
        </div>
      </section>
      <section className="s-sec grey steps">
        <div className="lab">How we quote</div>
        <div className="s-cols">
          <div><b>Step 1</b><h3>Tell us what you need</h3><p>Send rating, voltage, quantity and site. Rough details are fine.</p></div>
          <div><b>Step 2</b><h3>Our engineers review</h3><p>We check the requirement and come back with any questions.</p></div>
          <div><b>Step 3</b><h3>Quote to your spec</h3><p>You get a priced offer built around your specification.</p></div>
        </div>
      </section>
      <section className="s-group">
        <div className="n">35</div>
        <div className="stack">
          <p className="s-h">Years of the Pai Kane Group</p>
          <p className="mut">Pai Kane Transformers LLP is the group&apos;s transformer company. The same people, plant discipline and customer relationships, in a dedicated business.</p>
          <a className="arrow" href={SITE.groupUrl}>Visit paikane.com →</a>
        </div>
      </section>
      <Cta title="Tell us what you need." />
    </>
  );
}
