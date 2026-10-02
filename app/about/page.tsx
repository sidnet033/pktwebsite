import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <section className="timeline">
        <Image src="/about/journey.webp" alt="The Pai Kane Group journey: founded in 1971 as a trading business in Goa, manufacturing from 1989, the Tuem factory in 1995, diversification, global expansion and the 2018 acquisition of Sheaf Power Ltd." width={2000} height={821} priority sizes="100vw" />
      </section>
      <section className="s-sec story">
        <h1 className="s-h">A new transformer company. A 35-year foundation.</h1>
        <p className="mut">Pai Kane began in 1971 in Goa as a trading business, founded by the late Mr. Devidas Pai Kane. In 1989, his son Mr. Atul Pai Kane and three colleagues assembled the group&apos;s first diesel generator set in a family garage. That moment turned a trading house into a manufacturer, and it is the start of the 35 years of engineering that stand behind us today.</p>
        <ul className="bul">
          <li>Over the next three decades the group built its own manufacturing facilities for diesel and gas generator sets, in-house sheet metal capabilities, compact substations, low voltage switchboards, transformers, automatic voltage regulators, solar power solutions, BESS and more.</li>
          <li>In 2018 it acquired Sheaf Power Limited in the United Kingdom.</li>
          <li>It now has bases in India, UAE, UK, Portugal &amp; China.</li>
        </ul>
        <p className="mut">Today Pai Kane serves customers in more than 60 countries across power utilities, water infrastructure, telecom, railways, airports, data centres, and commercial and residential projects.</p>
        <p className="mut">Pai Kane Transformers LLP is the next chapter. It brings the group&apos;s people, plant discipline and customer relationships into a business dedicated to transformers and power distribution equipment. It focuses on transformers &amp; compact substations for renewables in India and diverse applications in MENA &amp; Europe.</p>
        <a className="arrow" href={SITE.groupUrl}>Visit paikane.com →</a>
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
