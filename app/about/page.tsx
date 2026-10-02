import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const MILESTONES: [string, string][] = [
  ["1971", "Founded as a trading business by the late Devidas Pai Kane"],
  ["1989", "First diesel genset assembled"],
  ["1996", "Power Engineering (India) Pvt Ltd incorporated as the group's flagship"],
  ["2009", "Creative Manufacturing Solutions added for contract manufacturing"],
  ["2016", "Solray Solutions set up as the group's solar energy arm"],
  ["2018", "Acquires Wardpower (Sheaf Power) in Sheffield, UK"],
  ["2023", "Predictive Edge added for condition monitoring analytics"],
  ["2024", "Pai Kane Transformers launched"],
  ["2026", "Pai Kane Energy launches next-gen BESS"],
];

export default function About() {
  return (
    <>
      <div className="about-split">
      <section className="vt">
        <div className="vt-in">
          <span className="vt-bar" aria-hidden />
          <h1>From humble beginnings to 86+ countries</h1>
          <p className="vt-sub">The Pai Kane Group journey, 1971 to 2026</p>
          <ol className="vt-list">
            {MILESTONES.map(([year, text], i) => (
              <li key={year} className={`${i % 2 ? "even" : "odd"} ${i === MILESTONES.length - 1 ? "now" : ""}`}>
                <div className="vt-card">
                  <span className="vt-year">{year}</span>
                  <span className="vt-text">{text}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="vt-facts">
            <p><b>86+</b> countries served</p>
            <p>Facilities in <b>Goa, Maharashtra and the UK</b></p>
            <p>Offices: <b>India | Dubai | UK | Portugal | China</b></p>
          </div>
        </div>
      </section>
      <section className="story">
        <h2 className="s-h">A young transformer company. A 35-year foundation.</h2>
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
      </div>
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
