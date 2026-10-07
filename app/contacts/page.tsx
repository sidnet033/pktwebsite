import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacts",
  description: `Contact ${SITE.name}: sales, service and our factory in Tuem, North Goa.`,
};

export default function Contacts() {
  return (
    <>
      <section className="ct-hero">
        <div className="ct-intro">
          <h1>Contacts</h1>
          <p className="ph-lead">Want to know more? Fill in the form and our team will reply within one working day.</p>
          <a className="ef-link" href="#where">Where we are <span aria-hidden>↓</span></a>
          <div className="ct-direct">
            <div><h3>Sales</h3><p><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span className="sep"> | </span><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></p></div>
            <div><h3>Service &amp; support</h3><p><a href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a><span className="sep"> | </span><a href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a></p></div>
            <div><h3>Careers</h3><p><a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></p></div>
          </div>
        </div>
        <div className="ct-panel">
          <QuoteForm page />
        </div>
      </section>

      <section className="ef-sec" id="where">
        <h2 className="ct-where">Where we are</h2>
        <div className="region">
          <h3>India</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>Factory &amp; head office</b>
              <p>{SITE.name}<br />{SITE.address}</p>
              <p>T: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a><br />E: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <a className="pill line sm" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
            </div>
          </div>
        </div>
        <div className="region">
          <h3>Pai Kane Group worldwide</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>Group offices</b>
              <p>India, Dubai, United Kingdom, Portugal and China.</p>
              <a className="pill line sm" href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com ↗</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
