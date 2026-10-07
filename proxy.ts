import { NextResponse, type NextRequest } from "next/server";

// Language routing. Portuguese pages live under /pt. English keeps the normal addresses (/about),
// which are served from the internal /en folder; /en/... itself is not public and redirects to the plain address.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

// Skip the API, Next.js internals and every file (anything with a dot: images, sitemap.xml, robots.txt, icons).
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
