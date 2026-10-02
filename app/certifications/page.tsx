import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Certifications" };

// Certificate images live in public/certs/. Click a card to open the full-size image.
const CE = [
  { file: "ce-oil-filled-transformer.png", name: "Oil Filled Distribution Transformer", note: "Ecodesign Directive 2009/125/EC · EN 50708-1-1:2020, EN 50708-3-1:2020", no: "4563-CI-32026" },
  { file: "ce-compact-substation.png", name: "Compact Substation", note: "Ecodesign Directive 2009/125/EC · EN 50708-1-1:2020, EN 50708-3-1:2020", no: "4562-CI-32026" },
  { file: "ce-lv-switchboard.png", name: "LV Switchboard", note: "Low Voltage Directive 2014/35/EU · IEC 61439:2020", no: "4560-CI-32026" },
];

export default function Certifications() {
  return (
    <>
      <section className="s-sec cert-head">
        <h1 className="s-h big2">Certifications</h1>
      </section>

      <section className="s-sec cert-sec">
        <h2 className="s-h">CE Certifications</h2>
        <p className="mut cert-intro">Issued by CEPROM S.A., Romania, on 02.02.2026 and valid until 01.02.2031.</p>
        <div className="certs">
          {CE.map((c) => (
            <a key={c.file} className="cert" href={`/certs/${c.file}`} target="_blank" rel="noopener noreferrer">
              <Image src={`/certs/${c.file}`} alt={`CE certificate: ${c.name}, No. ${c.no}`} width={1240} height={1754} sizes="(max-width: 900px) 100vw, 33vw" />
              <b>{c.name}</b>
              <small>{c.note}</small>
              <small>Certificate No. {c.no}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="s-sec grey cert-sec">
        <h2 className="s-h">Indian Certifications</h2>
        <p className="mut cert-intro">Certificates will be added here soon.</p>
      </section>
    </>
  );
}
