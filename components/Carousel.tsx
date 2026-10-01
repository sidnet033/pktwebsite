"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Photos live in public/hero/. Add, remove or reorder entries here.
const SLIDES = [
  { src: "/hero/1.jpg", alt: "Compact substation with doors open" },
  { src: "/hero/2.jpg", alt: "LV switchboard line-up" },
  { src: "/hero/3.jpg", alt: "Compact substation with oil cooled transformer" },
  { src: "/hero/4.jpg", alt: "Pai Kane product display" },
  { src: "/hero/5.jpg", alt: "Oil cooled transformer" },
];
const INTERVAL_MS = 3000;

export function Carousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="car" aria-roledescription="carousel" aria-label="Pai Kane products">
      {SLIDES.map((s, k) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="100vw"
          priority={k === 0}
          className={`car-img ${k === i ? "on" : ""}`}
          aria-hidden={k !== i}
        />
      ))}
      <div className="dots">
        {SLIDES.map((s, k) => (
          <button key={s.src} type="button" aria-label={`Show photo ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} />
        ))}
      </div>
    </section>
  );
}
