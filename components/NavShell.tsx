"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/** Header navigation. On wide screens the links sit in a row; on phones they collapse behind a menu button. */
export function NavShell({ links, quote }: { links: ReactNode; quote: ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <nav aria-label="Main" className={open ? "open" : undefined}>
      <div className="s-links" id="s-links">{links}<span className="q-menu">{quote}</span></div>
      <span className="q-head">{quote}</span>
      <button type="button" className="s-burger" aria-expanded={open} aria-controls="s-links" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
