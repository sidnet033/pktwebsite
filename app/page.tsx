import { Carousel } from "@/components/Carousel";
import { Cta } from "@/components/Chrome";
import { SITE } from "@/lib/site";

const NUMS = [
  ["20 MVA", "Oil cooled transformers, up to"],
  ["33 kV", "Transformer voltage class, up to"],
  ["6,300 A", "LV switchboards, up to"],
  ["1,000 kVA", "Voltage regulators, up to"],
];

export default function Home() {
  return (
    <>
      <section className="intro-hero">
        <h1>Power equipment, engineered to your specification.</h1>
        <p>Oil cooled transformers, compact substations, LV switchboards and AVRs, made in Goa.</p>
      </section>
      <Carousel />
      <section className="s-sec">
        <div className="lab">Our range</div>
        <div className="s-nums">{NUMS.map(([n, l]) => <div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div>
      </section>
      <section className="s-group">
        <div className="n">35</div>
        <div className="stack">
          <p className="s-h">Years of the Pai Kane Group</p>
          <p className="mut">{SITE.name} is the group&apos;s transformer company. The same people, plant discipline and customer relationships, in a dedicated business.</p>
          <a className="arrow" href={SITE.groupUrl}>Visit paikane.com →</a>
        </div>
      </section>
      <Cta title="Tell us what you need." />
    </>
  );
}
