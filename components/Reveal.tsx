"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Text and cards fade in one after another as the visitor scrolls down.
// Without JavaScript (or with "reduce motion" on) everything simply shows.
const TARGETS = [
  "main h1", "main h2", "main h3", "main p", "main li", "main .dlr", "main .ef-link", "main .pill",
  "main .stats>div", "main .pf-card", "main .ef-card", "main .loc", "main .person", "main .cert", "main .qf>*",
  "main .car", "main .fam-img", "main .ph-lab",
  ".s-foot-cols>div", ".s-foot-bar",
].join(",");

const STEP_MS = 90; // gap between items that appear together
const MAX_STEPS = 6;

export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Animate the outermost match only (e.g. a whole card, not the heading inside it).
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.closest("dialog") && !el.classList.contains("hp") && !el.parentElement?.closest(TARGETS) && !el.classList.contains("in"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(n++, MAX_STEPS) * STEP_MS}ms`;
          el.classList.add("in");
          el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
          io.unobserve(el);
        }
      },
      { threshold: 0 },
    );
    for (const el of els) {
      el.classList.add("fade");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [path]);
  return null;
}
