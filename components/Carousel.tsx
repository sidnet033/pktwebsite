"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Photos live in public/hero/. Add, remove or reorder entries here.
const SLIDES = [
  { src: "/hero/1.jpg", alt: "Compact substation with doors open" },
  { src: "/hero/2.jpg", alt: "LV switchboard line-up" },
  { src: "/hero/3.jpg", alt: "Pai Kane product display" },
  { src: "/hero/4.jpg", alt: "Containerised battery storage unit" },
];
const INTERVAL_MS = 3000;

export function Carousel() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(-1);
  const n = SLIDES.length;

  const go = (k: number) => {
    if (k === cur) return;
    setPrev(cur);
    setCur(k);
  };

  // Always auto-advances (also when the visitor's device has "reduce motion" on).
  useEffect(() => {
    const t = setTimeout(() => go((cur + 1) % n), INTERVAL_MS);
    return () => clearTimeout(t);
  });

  return (
    <section className="car" aria-roledescription="carousel" aria-label="Pai Kane products">
      {SLIDES.map((s, k) => (
        <div key={s.src} className={`car-slide ${k === cur ? "on" : k === prev ? "out" : "wait"}`} aria-hidden={k !== cur}>
          <Image src={s.src} alt={s.alt} fill sizes="100vw" priority={k === 0} className="car-img" />
        </div>
      ))}
    </section>
  );
}
