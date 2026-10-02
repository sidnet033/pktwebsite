"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/certifications", "Certifications"],
] as const;

export function NavLinks() {
  const path = usePathname();
  return (
    <>
      {LINKS.map(([href, label]) => {
        const active = href === "/" ? path === "/" : path.startsWith(href);
        return (
          <Link key={href} href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
