"use client";

import Link from "next/link";
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { countryOptions } from "@/lib/countries";
import { lp } from "@/lib/i18n";
import { SITE, TOPICS } from "@/lib/site";
import { useI18n } from "./I18n";

const Ctx = createContext<() => void>(() => {});
export const useQuote = () => useContext(Ctx);

type Errs = Partial<Record<"name" | "email" | "mobile" | "country" | "requirement" | "privacy", string>>;

/** The enquiry form. Used in the "Request a quote" pop-up and on the Contacts page. Sends to /api/quote; nothing is stored.
 *  Labels follow the website language. What is sent (country, topic) is always the English value, and what visitors type is never altered. */
export function QuoteForm({ page, onClose }: { page?: boolean; onClose?: () => void }) {
  const { lang, ui } = useI18n();
  const q = ui.quote;
  const countries = useMemo(() => countryOptions(lang), [lang]);
  const [state, setState] = useState<"form" | "sending" | "done" | "fail">("form");
  const [detail, setDetail] = useState("");
  const [errs, setErrs] = useState<Errs>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f.entries()) as Record<string, string>;
    const er: Errs = {};
    if (!v.name?.trim()) er.name = q.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email?.trim() ?? "")) er.email = q.errEmail;
    if ((v.mobile ?? "").replace(/\D/g, "").length < 8) er.mobile = q.errMobile;
    if (!v.country) er.country = q.errCountry;
    if ((v.requirement?.trim().length ?? 0) < 10) er.requirement = q.errRequirement;
    if (page && !v.privacy) er.privacy = q.errPrivacy;
    setErrs(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, lang }) });
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
        <h3>{q.thanks}</h3>
        <p>{q.reply}</p>
        {onClose ? (
          <button className="pill line" type="button" onClick={onClose}>{q.close}</button>
        ) : (
          <button className="pill line" type="button" onClick={() => setState("form")}>{q.another}</button>
        )}
      </div>
    );
  }

  const privacyHref = lp(lang, "/privacy");
  return (
    <form className={`qf ${page ? "page" : ""}`} onSubmit={submit} noValidate>
      {page && (
        <label className="full">{q.topic}
          <select name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => <option key={t} value={t}>{q.topics[t]}</option>)}
          </select>
        </label>
      )}
      <label>{page ? q.nameFull : q.name}<input name="name" autoComplete="name" required aria-required="true" translate="no" /><span className="err">{errs.name}</span></label>
      <label>{q.company}<input name="company" autoComplete="organization" translate="no" /></label>
      <label>{q.email}<input name="email" type="email" autoComplete="email" required aria-required="true" translate="no" /><span className="err">{errs.email}</span></label>
      <label>{q.mobile}<input name="mobile" type="tel" autoComplete="tel" placeholder={q.mobilePh} translate="no" /><span className="err">{errs.mobile}</span></label>
      <label className="full">{q.country}
        <select name="country" defaultValue="" required aria-required="true" autoComplete="country-name">
          <option value="" disabled>{q.selectCountry}</option>
          {countries.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <span className="err">{errs.country}</span>
      </label>
      <label className="full">{page ? q.message : q.requirement}<textarea name="requirement" placeholder={q.requirementPh} /><span className="err">{errs.requirement}</span></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      {page ? (
        <label className="qf-check full">
          <span><input type="checkbox" name="privacy" value="yes" required aria-required="true" /> {q.checkBefore}<Link href={privacyHref}>{q.agreeLink}</Link>{q.checkAfter}</span>
          <span className="err">{errs.privacy}</span>
        </label>
      ) : (
        <p className="qf-note full">{q.agreeBefore}<Link href={privacyHref}>{q.agreeLink}</Link>{q.agreeAfter}</p>
      )}
      <div className="qf-btns full">
        <button className="pill" type="submit" disabled={state === "sending"}>{state === "sending" ? q.sending : q.send}</button>
        {page && <button className="pill line" type="reset" onClick={() => setErrs({})}>{q.reset}</button>}
      </div>
      {state === "fail" && (
        <div className="err full" role="alert">
          <p>{q.failBefore}<span translate="no">{SITE.email}</span>{q.failAfter}</p>
          {detail && <pre className="err-detail">{detail}</pre>}
        </div>
      )}
    </form>
  );
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const { ui } = useI18n();
  const q = ui.quote;
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
            <h3 id="qd-title">{q.title}</h3>
            <p className="dl-note">{q.note}</p>
          </div>
          <button className="dl-x" type="button" aria-label={q.close} onClick={close}>×</button>
        </div>
        <QuoteForm key={n} onClose={close} />
      </dialog>
    </Ctx.Provider>
  );
}

export function QuoteButton({ className = "pill", children }: { className?: string; children?: ReactNode }) {
  const open = useQuote();
  const { ui } = useI18n();
  return <button type="button" className={className} onClick={open}>{children ?? ui.nav.quote}</button>;
}
