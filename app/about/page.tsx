import type { Metadata } from "next";
import { Hero } from "@/components/Chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <Hero small photo="Photo: Goa plant or team" tone="b" title="A new company. A 35-year foundation." text="Pai Kane Transformers LLP is the transformer business of the Pai Kane Group." />
      <section className="s-group">
        <div className="n">35</div>
        <div className="stack">
          <p className="s-h">The Pai Kane Group</p>
          {/* TODO(client): group story, founding year */}
          <p className="mut">[ Group story: when it started, what it makes, where it works. To be written with you. ]</p>
          <a className="arrow" href={SITE.groupUrl}>Visit paikane.com →</a>
        </div>
      </section>
      <section className="s-sec grey">
        <div className="lab">Our plant</div>
        <div className="s-tiles three">
          <div className="photo tile" data-ph="Photo" />
          <div className="photo b tile" data-ph="Photo" />
          <div className="photo d tile" data-ph="Photo" />
        </div>
        {/* TODO(client): plant details */}
        <p className="mut wide">[ Plant details and how units are built and tested. Only what is in place today. ]</p>
      </section>
    </>
  );
}
