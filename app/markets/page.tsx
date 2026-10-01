import type { Metadata } from "next";
import Link from "next/link";
import { Cta, Hero } from "@/components/Chrome";

export const metadata: Metadata = { title: "Markets" };

const M = [
  { id: "india", name: "India", text: "Oil cooled transformers for solar, wind and battery storage projects, plus distribution transformers, compact substations, LV switchboards and voltage regulators for industry and utilities. Built in Goa and supplied to developers, EPCs and industrial buyers." },
  { id: "mea", name: "Middle East & Africa", text: "Distribution transformers and packaged substations engineered for demanding climates and tender specifications. Send your specification and we will build to it." },
  { id: "europe", name: "Europe", text: "Distribution transformers and switchgear for distributors and project buyers, engineered to the standard you specify." },
];

export default function Markets() {
  return (
    <>
      <Hero small photo="Photo: loaded transformers" tone="d" title="The same products, led differently for each buyer." />
      {M.map((m, i) => (
        <section key={m.id} id={m.id} className={`s-sec ${i % 2 ? "grey" : ""}`}>
          <div className="lab">Market</div>
          <h2 className="s-h">{m.name}</h2>
          <p className="mut wide">{m.text}</p>
          <Link href="/transformers" className="arrow">See products →</Link>
        </section>
      ))}
      <Cta title="Tell us where it is going." />
    </>
  );
}
