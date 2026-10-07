"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const OFFERINGS = [
  ["/transformers", "Transformers"],
  ["/compact-substations", "Compact Substations (CSS)"],
  ["/lv-switchboards", "LV Switchboards"],
  ["/avrs", "Voltage Regulators (AVR)"],
] as const;

function Item({ href, label, path }: { href: string; label: string; path: string }) {
  const active = href === "/" ? path === "/" : path.startsWith(href);
  return (
    <Link href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

export function NavLinks() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const onOffering = OFFERINGS.some(([h]) => path.startsWith(h));

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <>
      <Item href="/" label="Home" path={path} />
      <div className="dd" ref={wrap} onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}>
        <button type="button" className={`dd-btn ${onOffering ? "active" : ""}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
          Offerings <span aria-hidden>▾</span>
        </button>
        {open && (
          <div className="dd-menu" role="menu">
            {OFFERINGS.map(([href, label]) => (
              <Link key={href} href={href} role="menuitem" aria-current={path.startsWith(href) ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Item href="/about" label="About Us" path={path} />
      <Item href="/certifications" label="Certifications" path={path} />
      <Item href="/contacts" label="Contacts" path={path} />
    </>
  );
}
