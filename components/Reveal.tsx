"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { splitPath } from "@/lib/i18n";

// Fade-in of text, cards and photos. Without JavaScript everything simply shows.
// Like efacec.com, this runs even when the device has "Reduce motion" switched on.
//
// Home page: scroll-linked. Each item goes from invisible (entering at the bottom of the screen) to solid as
//   it is scrolled up the screen, and only ever gets more solid.
// Other pages: like efacec.com. On load the visible content fades up item by item; further down, each block
//   fades up on its own as it comes into view. Plays once per visit; starts again on reload or a new page.
const TARGETS = [
  "main h1", "main h2", "main h3", "main p", "main li", "main .dlr", "main .ef-link", "main .pill",
  "main .stats>div", "main .pf-card", "main .ef-card", "main .loc", "main .person", "main .cert", "main .qf>*",
  "main .car", "main .fam-img", "main .ph-lab", "main .ct-panel",
  ".s-foot-cols>div", ".s-foot-bar",
].join(",");

// Animate the outermost match only (e.g. a whole card, not the heading inside it).
const targets = () =>
  Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
    (el) => !el.closest("dialog") && !el.classList.contains("hp") && !el.parentElement?.closest(TARGETS),
  );

const atPageEnd = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

/* ---------- home: scroll-linked ---------- */
const RANGE = 0.3; // fade happens over the bottom 30% of the screen
const LIFT = 24; // px the item rises while fading in

function scrollLinked() {
  let els = targets();
  const all = els;
  const shown = new Map<HTMLElement, number>(); // highest opacity each item has reached
  let frame = 0;
  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    const end = atPageEnd();
    for (const el of els) {
      const top = el.getBoundingClientRect().top;
      const now = end ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * RANGE)));
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
}

/* ---------- other pages: timed fade when an item comes into view ---------- */
const STEP_MS = 110; // gap between items that appear together
const MAX_STEPS = 5;

function timedOnView() {
  const all = targets();
  let pending = new Set(all);
  for (const el of all) el.classList.add("fade");
  void document.body.offsetHeight; // apply the hidden state now, so the first items have something to fade from

  const show = (list: HTMLElement[]) => {
    list.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, MAX_STEPS) * STEP_MS}ms`;
      el.classList.add("in");
      const done = (e: TransitionEvent) => {
        if (e.target !== el || e.propertyName !== "opacity") return;
        el.style.transitionDelay = "";
        el.removeEventListener("transitionend", done);
      };
      el.addEventListener("transitionend", done);
      pending.delete(el);
      io.unobserve(el);
    });
  };
  const io = new IntersectionObserver(
    (entries) => show(entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)),
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  // Items at the very bottom of a page may never get past the trigger line: show them when the end is reached.
  const onScroll = () => {
    if (atPageEnd() && pending.size) show(all.filter((el) => pending.has(el)));
  };

  for (const el of all) io.observe(el);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    pending = new Set();
    for (const el of all) {
      el.classList.remove("fade", "in");
      el.style.transitionDelay = "";
    }
  };
}

export function Reveal() {
  const path = usePathname();
  // Layout effect: items are hidden before the browser paints, so nothing flashes before fading in.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const cleanup = splitPath(path).path === "/" ? scrollLinked() : timedOnView(); // "/" and "/pt" are the home page
    html.classList.remove("rv-wait"); // set in <head> on first load; items now handle their own fade
    return cleanup;
  }, [path]);
  return null;
}
