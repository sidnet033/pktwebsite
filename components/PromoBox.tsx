"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROMO } from "@/lib/promo";
import { useI18n } from "./I18n";

const SEEN_KEY = "pkt-promo-seen";

export function PromoBox() {
  const { ui } = useI18n();
  const t = ui.promo;
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const slides = PROMO.slides;
  const n = slides.length;

  // Show once per browser tab: sessionStorage is cleared when the tab closes,
  // so a new tab shows it again, but moving to other pages and back does not.
  useEffect(() => {
    if (!PROMO.enabled || n === 0 || (PROMO.until && Date.now() >= Date.parse(PROMO.until))) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked: still show it once for this page view */
    }
    ref.current?.showModal();
    ref.current?.focus(); // keep focus off the close button so no ring shows on open
    setOpen(true);
  }, [n]);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (!open || n < 2 || hover) return;
    const t = setTimeout(() => go(i + 1), PROMO.intervalMs);
    return () => clearTimeout(t);
  }, [open, n, hover, i, go]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, i, go]);

  if (!PROMO.enabled || n === 0) return null;

  return (
    <dialog
      ref={ref}
      className="promo"
      tabIndex={-1}
      aria-label={t.label}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="promo-box" aria-roledescription="carousel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {slides.map((s, k) => (
          <div key={s.src} className={`promo-slide ${k === i ? "on" : ""}`} aria-hidden={k !== i}>
            <Image src={s.src} alt={t.alts[k] ?? s.alt} fill sizes="(max-width: 900px) 92vw, 80vh" priority={k === 0} className="promo-img" />
          </div>
        ))}
        <button type="button" className="promo-x" aria-label={t.close} onClick={() => ref.current?.close()}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 5 19 19M19 5 5 19" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
        {n > 1 && (
          <>
            <button type="button" className="promo-nav prev" aria-label={t.prev} onClick={() => go(i - 1)}>‹</button>
            <button type="button" className="promo-nav next" aria-label={t.next} onClick={() => go(i + 1)}>›</button>
            <div className="promo-dots">
              {slides.map((s, k) => (
                <button key={s.src} type="button" aria-label={`${t.item} ${k + 1}`} aria-current={k === i} onClick={() => go(k)} />
              ))}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
