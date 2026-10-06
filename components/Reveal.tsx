"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll-linked fade: each item goes from invisible (just entering at the bottom of the screen)
// to fully solid as it is scrolled up the screen. It only ever gets more solid: once solid it stays
// solid for the rest of the visit, even when scrolling back up. It starts again on a reload or a new page.
// Without JavaScript, or with "reduce motion" on, everything simply shows.
const TARGETS = [
  "main h1", "main h2", "main h3", "main p", "main li", "main .dlr", "main .ef-link", "main .pill",
  "main .stats>div", "main .pf-card", "main .ef-card", "main .loc", "main .person", "main .cert", "main .qf>*",
  "main .car", "main .fam-img", "main .ph-lab",
  ".s-foot-cols>div", ".s-foot-bar",
].join(",");

const RANGE = 0.3; // fade happens over the bottom 30% of the screen
const LIFT = 24; // px the item rises while fading in

export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Animate the outermost match only (e.g. a whole card, not the heading inside it).
    let els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.closest("dialog") && !el.classList.contains("hp") && !el.parentElement?.closest(TARGETS),
    );

    const shown = new Map<HTMLElement, number>(); // highest opacity each item has reached
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        // 0 when the item's top is at the bottom edge, 1 once it is RANGE of the screen higher.
        const now = atEnd ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * RANGE)));
        const p = Math.max(now, shown.get(el) ?? 0);
        shown.set(el, p);
        el.style.opacity = String(p);
        el.style.transform = p < 1 ? `translateY(${((1 - p) * LIFT).toFixed(1)}px)` : "";
      }
      els = els.filter((el) => (shown.get(el) ?? 0) < 1); // solid items are done
      if (!els.length) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const all = els;
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      stop();
      cancelAnimationFrame(frame);
      for (const el of all) {
        el.style.opacity = "";
        el.style.transform = "";
      }
    };
  }, [path]);
  return null;
}
