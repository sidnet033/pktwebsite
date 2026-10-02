"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { COUNTRIES } from "@/lib/countries";

const Ctx = createContext<() => void>(() => {});
export const useQuote = () => useContext(Ctx);

type Errs = Partial<Record<"name" | "email" | "mobile" | "country" | "requirement", string>>;

export function QuoteProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"form" | "sending" | "done" | "fail">("form");
  const [errs, setErrs] = useState<Errs>({});

  const open = () => {
    setState("form");
    setErrs({});
    ref.current?.showModal();
  };

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
    setErrs(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      setState(r.ok ? "done" : "fail");
    } catch {
      setState("fail");
    }
  }

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog ref={ref} aria-labelledby="qd-title" className="qd" onClick={(e) => e.target === ref.current && ref.current?.close()}>
        {state === "done" ? (
          <div className="dl-ok">
            <h3>Thank you</h3>
            <p>We will reply within one working day.</p>
            <button className="dl-btn sec" type="button" onClick={() => ref.current?.close()}>Close</button>
          </div>
        ) : (
          <>
            <div className="dl-head">
              <div>
                <h3 id="qd-title">Request a quote</h3>
                <p className="dl-note">Our sales team replies within one working day.</p>
              </div>
              <button className="dl-x" type="button" aria-label="Close" onClick={() => ref.current?.close()}>×</button>
            </div>
            <form onSubmit={submit} noValidate>
              <label>Your name *<input name="name" autoComplete="name" required aria-required="true" /><span className="err">{errs.name}</span></label>
              <label>Company name<input name="company" autoComplete="organization" /></label>
              <label>Email *<input name="email" type="email" autoComplete="email" required aria-required="true" /><span className="err">{errs.email}</span></label>
              <label>Mobile *<input name="mobile" type="tel" autoComplete="tel" placeholder="+91 …" /><span className="err">{errs.mobile}</span></label>
              <label>Country *
                <select name="country" defaultValue="" required aria-required="true" autoComplete="country-name">
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="err">{errs.country}</span>
              </label>
              <label>Your requirement *<textarea name="requirement" placeholder="Product, rating, voltage, quantity, delivery location" /><span className="err">{errs.requirement}</span></label>
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <button className="dl-btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
              {state === "fail" && <p className="err" role="alert">Something went wrong. Please email sales@paikane.com directly.</p>}
            </form>
          </>
        )}
      </dialog>
    </Ctx.Provider>
  );
}

export function QuoteButton({ className = "s-btn", children = "Request a quote" }: { className?: string; children?: ReactNode }) {
  const open = useQuote();
  return <button type="button" className={className} onClick={open}>{children}</button>;
}
