import { Carousel } from "@/components/Carousel";
import { PromoBox } from "@/components/PromoBox";
import Link from "next/link";

const NUMS = [
  ["20MVA, 33kV", "Oil cooled transformers, up to", "/transformers"],
  ["CSS", "India & Europe Specs", "/compact-substations"],
  ["6,300 A", "LV switchboards, up to", "/lv-switchboards"],
  ["1,000 kVA", "Voltage regulators, up to", "/avrs"],
];

export default function Home() {
  return (
    <>
      <PromoBox />
      <section className="intro-hero">
        <h1>Power equipment, engineered to your specification.</h1>
        <p>Oil cooled transformers, compact substations, LV switchboards and AVRs, made in Goa.</p>
      </section>
      <Carousel />
      <section className="s-sec">
        <div className="lab">Our range</div>
        <div className="s-nums">{NUMS.map(([n, l, href]) => <Link key={n} href={href}><strong>{n}</strong><span>{l}</span></Link>)}</div>
      </section>
    </>
  );
}
