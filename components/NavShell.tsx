"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { splitPath } from "@/lib/i18n";
import { useI18n } from "./I18n";

/** Header navigation. On wide screens the links sit in a row; on phones they collapse behind a menu button. */
export function NavShell({ links, quote, language }: { links: ReactNode; quote: ReactNode; language: ReactNode }) {
  const path = splitPath(usePathname()).path;
  const { ui } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <nav aria-label={ui.nav.main} className={open ? "open" : undefined}>
      <div className="s-links" id="s-links">{links}<span className="q-menu">{quote}</span></div>
      <span className="q-head">{quote}</span>
      {language}
      <button type="button" className="s-burger" aria-expanded={open} aria-controls="s-links" aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
