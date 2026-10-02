import type { Metadata } from "next";
import { QuoteButton } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

// TODO(client): replace placeholders with the real names and reporting lines.
const HEADS = [
  { role: "Head, Sales", subs: ["India sales", "Middle East & Europe"] },
  { role: "Head, Design & Engineering" },
  { role: "Head, Production" },
  { role: "Head, Quality" },
  { role: "Finance & Admin" },
] as { role: string; subs?: string[] }[];

export default function Contact() {
  return (
    <section className="s-sec">
      <div className="lab">Contact</div>
      <h1 className="s-h big2">Talk to the right person.</h1>
      <div className="org">
        <div className="node grp"><b>Pai Kane Group</b><small>Parent group</small></div>
        <div className="vline" />
        <div className="node top"><b>[ Name ]</b><small>Managing Partner</small></div>
        <div className="vline" />
        <div className="branch">
          {HEADS.map((h) => (
            <div key={h.role}>
              <div className="node"><b>[ Name ]</b><small>{h.role}</small></div>
              {h.subs && <div className="sub">{h.subs.map((s) => <div key={s} className="node"><b>[ Name ]</b><small>{s}</small></div>)}</div>}
            </div>
          ))}
        </div>
      </div>
      <p className="mut tiny">Names and roles are placeholders until the real structure is supplied.</p>
      <div className="s-cols two">
        <div><h3>Sales enquiries</h3><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p><QuoteButton className="s-btn self" /></div>
        <div><h3>Office and factory</h3><p>{SITE.name}<br />{SITE.address}</p></div>
      </div>
    </section>
  );
}
