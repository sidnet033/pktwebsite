import type { MetadataRoute } from "next";
import { lp } from "@/lib/i18n";
import { PRODUCTS, SITE } from "@/lib/site";

// Served at /sitemap.xml. Every page is listed in English and Portuguese, each pointing to the other (hreflang).
// Add new pages to this list when you create them.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/certifications", "/contacts", "/privacy", ...PRODUCTS.map((p) => `/${p.slug}`)];
  return pages.flatMap((path) =>
    (["en", "pt"] as const).map((lang) => ({
      url: `${SITE.url}${lp(lang, path || "/") === "/" ? "" : lp(lang, path || "/")}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${SITE.url}${path}`,
          "pt-PT": `${SITE.url}${lp("pt", path || "/")}`,
        },
      },
    })),
  );
}
