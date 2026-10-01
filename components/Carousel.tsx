"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/site";

export function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = PRODUCTS.length;
  const go = useCallback((k: number) => setI((k + n) % n), [n]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section
      className="car"
      aria-roledescription="carousel"
      aria-label="Our products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="car-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {PRODUCTS.map((p, k) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            className={`photo ${p.tone} car-slide`}
            style={{ "--img": `url(/products/${p.slug}.jpg)` } as React.CSSProperties}
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${n}: ${p.name}`}
            aria-hidden={k !== i}
            tabIndex={k === i ? 0 : -1}
          >
            <div className="in">
              <span className="lab">0{k + 1} / 0{n}</span>
              <h2>{p.name}</h2>
              <p>{p.tileSpec}</p>
              <span className="go">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="car-ctl">
        <button type="button" aria-label="Previous product" onClick={() => go(i - 1)}>←</button>
        <button type="button" aria-label="Next product" onClick={() => go(i + 1)}>→</button>
        <div className="dots">
          {PRODUCTS.map((p, k) => (
            <button key={p.slug} type="button" aria-label={`Show ${p.name}`} aria-current={k === i} onClick={() => go(k)} />
          ))}
        </div>
      </div>
    </section>
  );
}
