"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { lp, splitPath, type Lang } from "@/lib/i18n";
import { useI18n } from "./I18n";

const OFFERINGS = ["/transformers", "/compact-substations", "/lv-switchboards", "/avrs"] as const;

function Item({ href, label, path, lang }: { href: string; label: string; path: string; lang: Lang }) {
  const active = href === "/" ? path === "/" : path.startsWith(href);
  return (
    <Link href={lp(lang, href)} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

export function NavLinks() {
  const { lang, ui } = useI18n();
  const path = splitPath(usePathname()).path; // same page whether or not the address starts with /pt
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const onOffering = OFFERINGS.some((h) => path.startsWith(h));

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
      <Item href="/" label={ui.nav.home} path={path} lang={lang} />
      <div className="dd" ref={wrap} onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)} onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}>
        <button type="button" className={`dd-btn ${onOffering ? "active" : ""}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
          {ui.nav.offerings} <span aria-hidden>▾</span>
        </button>
        {open && (
          <div className="dd-menu" role="menu">
            {OFFERINGS.map((href) => (
              <Link key={href} href={lp(lang, href)} role="menuitem" aria-current={path.startsWith(href) ? "page" : undefined}>
                {ui.offeringItems[href.slice(1)]}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Item href="/about" label={ui.nav.about} path={path} lang={lang} />
      <Item href="/certifications" label={ui.nav.certifications} path={path} lang={lang} />
      <Item href="/contacts" label={ui.nav.contacts} path={path} lang={lang} />
    </>
  );
}
