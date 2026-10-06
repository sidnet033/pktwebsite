"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sections fade in as the visitor scrolls down. Without JavaScript everything simply shows.
const TARGETS = "main section, main .about-split > *, .s-foot";

export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter((el) => !el.closest("dialog") && !el.classList.contains("in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const el of els) {
      el.classList.add("fade");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [path]);
  return null;
}
