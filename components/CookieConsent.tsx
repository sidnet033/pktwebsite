"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_DAYS, CONSENT_EVENT, CONSENT_KEY } from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Choice = "granted" | "denied";

function stored(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    if (c && (c.v === "granted" || c.v === "denied") && Date.now() - c.t < CONSENT_DAYS * 864e5) return c.v;
  } catch {
    /* storage blocked or corrupt: treat as no choice yet */
  }
  return null;
}

function save(v: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v, t: Date.now() }));
  } catch {
    /* ignore */
  }
  // Tell Google Tag Manager. Only analytics is used on this site; advertising signals stay off.
  window.gtag?.("consent", "update", {
    analytics_storage: v,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!stored()) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!show) return null;

  const choose = (v: Choice) => {
    save(v);
    setShow(false);
  };

  return (
    <div className="cookie" role="dialog" aria-label="Cookie preferences" aria-live="polite">
      <p>
        We use cookies to understand how visitors use this website, so we can improve it. No advertising cookies are used. You can change your choice any time from &ldquo;Cookie settings&rdquo; in the footer. <Link href="/privacy">Privacy &amp; Cookies policy</Link>
      </p>
      <div className="cookie-btns">
        <button type="button" className="cookie-no" onClick={() => choose("denied")}>Decline</button>
        <button type="button" className="cookie-yes" onClick={() => choose("granted")}>Accept</button>
      </div>
    </div>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}>
      Cookie settings
    </button>
  );
}
