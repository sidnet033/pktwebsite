"use client";

import Link from "next/link";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SITE, TOPICS } from "@/lib/site";

const Ctx = createContext<() => void>(() => {});
export const useQuote = () => useContext(Ctx);

type Errs = Partial<Record<"name" | "email" | "mobile" | "country" | "requirement" | "privacy", string>>;

/** The enquiry form. Used in the "Request a quote" pop-up and on the Contacts page. Sends to /api/quote; nothing is stored. */
export function QuoteForm({ page, onClose }: { page?: boolean; onClose?: () => void }) {
  const [state, setState] = useState<"form" | "sending" | "done" | "fail">("form");
  const [detail, setDetail] = useState("");
  const [errs, setErrs] = useState<Errs>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f.entries()) as Record<string, string>;
    const er: Errs = {};
    if (!v.name?.trim()) er.name = "Enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email?.trim() ?? "")) er.email = "Enter a valid email address.";
    if ((v.mobile ?? "").replace(/\D/g, "").length < 8) er.mobile = "Enter a mobile number with country code.";
    if (!v.country) er.country = "Select your country.";
    if ((v.requirement?.trim().length ?? 0) < 10) er.requirement = "Tell us what you need, in a sentence or two.";
    if (page && !v.privacy) er.privacy = "Please confirm you have read the Privacy & Cookies policy.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (r.ok) {
        setState("done");
      } else {
        const j = await r.json().catch(() => ({}));
        setDetail(typeof j.detail === "string" ? j.detail : "");
        setState("fail");
      }
    } catch {
      setDetail("");
      setState("fail");
    }
  }

  if (state === "done") {
    return (
      <div className="dl-ok">
        <h3>Thank you</h3>
        <p>We will reply within one working day.</p>
        {onClose ? (
          <button className="pill line" type="button" onClick={onClose}>Close</button>
        ) : (
          <button className="pill line" type="button" onClick={() => setState("form")}>Send another message</button>
        )}
      </div>
    );
  }

  return (
    <form className={`qf ${page ? "page" : ""}`} onSubmit={submit} noValidate>
      {page && (
        <label className="full">What is this about?
          <select name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      )}
      <label>{page ? "Name (first and last) *" : "Your name *"}<input name="name" autoComplete="name" required aria-required="true" /><span className="err">{errs.name}</span></label>
      <label>Company name<input name="company" autoComplete="organization" /></label>
      <label>Email *<input name="email" type="email" autoComplete="email" required aria-required="true" /><span className="err">{errs.email}</span></label>
      <label>Mobile *<input name="mobile" type="tel" autoComplete="tel" placeholder="+91 …" /><span className="err">{errs.mobile}</span></label>
      <label className="full">Country *
        <select name="country" defaultValue="" required aria-required="true" autoComplete="country-name">
          <option value="" disabled>Select your country</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="err">{errs.country}</span>
      </label>
      <label className="full">{page ? "Message *" : "Your requirement *"}<textarea name="requirement" placeholder="Product, rating, voltage, quantity, delivery location" /><span className="err">{errs.requirement}</span></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      {page ? (
        <label className="qf-check full">
          <span><input type="checkbox" name="privacy" value="yes" required aria-required="true" /> I have read and understood the <Link href="/privacy">Privacy &amp; Cookies</Link> policy *</span>
          <span className="err">{errs.privacy}</span>
        </label>
      ) : (
        <p className="qf-note full">By sending this form you agree to our <Link href="/privacy">Privacy &amp; Cookies</Link> policy.</p>
      )}
      <div className="qf-btns full">
        <button className="pill" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send"}</button>
        {page && <button className="pill line" type="reset" onClick={() => setErrs({})}>Reset</button>}
      </div>
      {state === "fail" && (
        <div className="err full" role="alert">
          <p>Something went wrong. Please email {SITE.email} directly.</p>
          {detail && <pre className="err-detail">{detail}</pre>}
        </div>
      )}
    </form>
  );
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [n, setN] = useState(0);
  const close = () => ref.current?.close();

  const open = () => {
    setN((k) => k + 1); // fresh, empty form each time
    ref.current?.showModal();
  };

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog ref={ref} aria-labelledby="qd-title" className="qd" onClick={(e) => e.target === ref.current && close()}>
        <div className="dl-head">
          <div>
            <h3 id="qd-title">Request a quote</h3>
            <p className="dl-note">Our sales team replies within one working day.</p>
          </div>
          <button className="dl-x" type="button" aria-label="Close" onClick={close}>×</button>
        </div>
        <QuoteForm key={n} onClose={close} />
      </dialog>
    </Ctx.Provider>
  );
}

export function QuoteButton({ className = "pill", children = "Request a quote" }: { className?: string; children?: ReactNode }) {
  const open = useQuote();
  return <button type="button" className={className} onClick={open}>{children}</button>;
}
