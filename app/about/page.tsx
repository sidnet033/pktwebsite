import type { Metadata } from "next";
import { Hero } from "@/components/Chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <Hero small tone="b" title="A new company. A 35-year foundation." text="Pai Kane Transformers LLP is the transformer business of the Pai Kane Group." />
      <section className="s-group">
        <div className="n">35</div>
        <div className="stack">
          <h2 className="s-h">The Pai Kane Group story</h2>
          <p className="mut">Pai Kane began in 1971 in Goa as a trading business, founded by the late Mr. Devidas Pai Kane. In 1989, his son Mr. Atul Pai Kane and three colleagues assembled the group&apos;s first diesel generator set in a family garage. That moment turned a trading house into a manufacturer, and it is the start of the 35 years of engineering that stand behind us today.</p>
          <p className="mut">Over the next three decades the group built its own manufacturing facilities for diesel and gas generator sets, in-house sheet metal capabilities, compact substations, low voltage switchboards, transformers, automatic voltage regulators, solar power solutions, BESS and more. In 2018 it acquired Sheaf Power Limited in the United Kingdom, and it now has bases in India, UAE, UK, Portugal &amp; China.</p>
          <p className="mut">Today Pai Kane serves customers in more than 60 countries across power utilities, water infrastructure, telecom, railways, airports, data centres, and commercial and residential projects.</p>
          <p className="mut">Pai Kane Transformers LLP is the next chapter. It brings the group&apos;s people, plant discipline and customer relationships into a business dedicated to transformers and power distribution equipment. It focuses on transformers &amp; compact substations for renewables in India and diverse applications in MENA &amp; Europe.</p>
          <a className="arrow" href={SITE.groupUrl}>Visit paikane.com →</a>
        </div>
      </section>
      <section className="s-sec grey">
        <div className="lab">Our plant</div>
        <div className="s-tiles three">
          <div className="photo tile" />
          <div className="photo b tile" />
          <div className="photo d tile" />
        </div>
        {/* TODO(client): plant details */}
        <p className="mut wide">[ Plant details and how units are built and tested. Only what is in place today. ]</p>
      </section>
    </>
  );
}
