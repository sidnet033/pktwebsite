import type { Metadata } from "next";
import { PageHead } from "@/components/Chrome";
import { QuoteForm } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacts",
  description: `Contact ${SITE.name}: sales, service and our factory in Tuem, North Goa.`,
};

export default function Contacts() {
  return (
    <>
      <PageHead title="Contacts" lead="Want to know more? Send us a message and our team will reply within one working day.">
        <a className="ef-link" href="#where">Where we are <span aria-hidden>↓</span></a>
      </PageHead>

      <section className="ef-sec ct-split">
        <QuoteForm page />
        <aside className="ct-direct" aria-label="Direct contacts">
          <div>
            <h3>Sales</h3>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
          </div>
          <div>
            <h3>Service &amp; support</h3>
            <a href={`mailto:${SITE.serviceEmail}`}>{SITE.serviceEmail}</a>
            <a href={`tel:${SITE.servicePhoneHref}`}>{SITE.servicePhone}</a>
          </div>
          <div>
            <h3>Follow us</h3>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </aside>
      </section>

      <section className="ef-sec muted" id="where">
        <h2 className="ef-h2">Where we are</h2>
        <div className="region">
          <h3>India</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>Factory &amp; head office</b>
              <p>{SITE.name}<br />{SITE.address}</p>
              <p>T: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a><br />E: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <a className="ef-link sm" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
            </div>
          </div>
        </div>
        <div className="region">
          <h3>Pai Kane Group worldwide</h3>
          <div className="loc-cards">
            <div className="loc">
              <b>Group offices</b>
              <p>India, Dubai, United Kingdom, Portugal and China.</p>
              <a className="ef-link sm" href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">paikane.com ↗</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
