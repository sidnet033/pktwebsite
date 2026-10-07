"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = { src: string; alt: string; caption?: string };

// Home page photos live in public/hero/. Add, remove or reorder entries here.
const HOME_SLIDES: Slide[] = [
  { src: "/hero/1.jpg", alt: "Compact substation with doors open" },
  { src: "/hero/2.jpg", alt: "LV switchboard line-up" },
  { src: "/hero/3.jpg", alt: "Pai Kane product display" },
  { src: "/hero/4.jpg", alt: "Containerised battery storage unit" },
];

export function Carousel({ slides: given = HOME_SLIDES, alts, intervalMs = 3000, className = "", label = "Pai Kane" }: { slides?: Slide[]; alts?: string[]; intervalMs?: number; className?: string; label?: string }) {
  const slides = alts ? given.map((s, i) => ({ ...s, alt: alts[i] ?? s.alt })) : given;
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(-1);
  const n = slides.length;

  const go = (k: number) => {
    if (k === cur) return;
    setPrev(cur);
    setCur(k);
  };

  // Always auto-advances (also when the visitor's device has "reduce motion" on).
  useEffect(() => {
    if (n < 2) return;
    const t = setTimeout(() => go((cur + 1) % n), intervalMs);
    return () => clearTimeout(t);
  });

  return (
    <section className={`car ${className}`} aria-roledescription="carousel" aria-label={label}>
      {slides.map((s, k) => (
        <div key={s.src} className={`car-slide ${k === cur ? "on" : k === prev ? "out" : "wait"}`} aria-hidden={k !== cur}>
          <Image src={s.src} alt={s.alt} fill sizes="100vw" priority={k === 0} className="car-img" />
          {s.caption && <div className="car-cap">{s.caption}</div>}
        </div>
      ))}
    </section>
  );
}
