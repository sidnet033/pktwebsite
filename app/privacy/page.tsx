import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description: "How Pai Kane Transformers LLP handles personal information and cookies on this website.",
};

const UPDATED = "2 October 2026";

export default function Privacy() {
  return (
    <section className="s-sec prose">
      <h1 className="s-h big2">Privacy &amp; Cookies</h1>
      <p className="mut">Last updated: {UPDATED}</p>

      <p>
        This page explains what personal information {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this website, why we collect it, and the choices you have. We are
        based at {SITE.address}. We aim to follow the Digital Personal Data Protection Act, 2023 (India) and, for visitors in Europe and the UK, the GDPR and UK GDPR.
      </p>

      <h2>1. What we collect</h2>
      <h3>When you send an enquiry</h3>
      <p>
        If you use the &ldquo;Request a quote&rdquo; form, we receive the details you type: your name, company name (optional), email address, mobile number, country, and
        the requirement you describe. We use them only to reply to your enquiry and to prepare an offer.
      </p>
      <p>
        The website does not keep a copy of your enquiry. It is sent as an email to our sales team and then lives in our company mailboxes, like any other email we receive.
      </p>

      <h3>When you browse the site</h3>
      <p>
        Our hosting provider records basic technical information when a page is requested, such as your IP address, browser type and the page you asked for. This is used to run
        and secure the site. If you accept analytics cookies (see below), we also collect statistics about how the site is used.
      </p>

      <h2>2. Cookies and similar technologies</h2>
      <p>
        When you first visit, a banner asks whether you accept cookies that measure how the site is used. <strong>Analytics is off until you choose Accept.</strong> We do not use
        advertising cookies.
      </p>
      <div className="scroll">
        <table>
          <thead>
            <tr><th>Name</th><th>Set by</th><th>Purpose</th><th>Needs your consent?</th></tr>
          </thead>
          <tbody>
            <tr><td>_ga, _ga_*</td><td>Google Analytics (through Google Tag Manager)</td><td>Counts visits and shows which pages are read, in aggregate form</td><td>Yes</td></tr>
            <tr><td>pkt-consent</td><td>This site (stored in your browser)</td><td>Remembers your cookie choice for 180 days</td><td>No, it is needed to respect your choice</td></tr>
            <tr><td>pkt-promo-seen</td><td>This site (stored in your browser, cleared when the tab closes)</td><td>Stops the news pop-up from reappearing while you browse</td><td>No</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Google Maps.</strong> The footer has a &ldquo;View on Google Maps&rdquo; link. Nothing is loaded from Google until you click it, and it then opens in a new tab under Google&apos;s own policies.
      </p>
      <p>
        <strong>Links to other sites.</strong> Our pages link to LinkedIn and to paikane.com. Those sites have their own privacy policies.
      </p>
      <p>
        You can change your mind at any time with the <em>Cookie settings</em> link in the footer, or by clearing this site&apos;s data in your browser.
      </p>

      <h2>3. Who sees your information</h2>
      <ul>
        <li>Our sales and support team, who receive enquiries by email.</li>
        <li>Service providers that run the website and our email: Vercel (hosting) and Google (Workspace email, and Analytics if you accepted cookies).</li>
        <li>We do not sell your personal information.</li>
      </ul>
      <p>
        These providers operate globally, so your information may be processed outside India, including in the United States. We use providers that apply recognised safeguards.
      </p>

      <h2>4. How long we keep it</h2>
      <p>
        We keep enquiry emails for as long as needed to deal with your request and for our ordinary business records, and then delete them. Analytics data is kept by Google for the
        period set in our Analytics account.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You may ask us to tell you what personal information we hold about you, to correct it, or to delete it, and you may withdraw consent you have given. If you are in the EU or
        UK you may also object to or restrict processing and complain to your local data protection authority. To use any of these rights, write to us at the address below. We will
        reply within a reasonable time.
      </p>

      <h2>6. Contact</h2>
      <p>
        {SITE.name}<br />
        {SITE.address}<br />
        Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Phone: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
      </p>

      <h2>7. Changes to this page</h2>
      <p>
        We may update this page from time to time. The date at the top shows when it last changed.
      </p>

      <p><Link href="/" className="arrow">Back to home →</Link></p>
    </section>
  );
}
