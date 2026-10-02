import type { MetadataRoute } from "next";
import { PRODUCTS, SITE } from "@/lib/site";

// Served at /sitemap.xml. Add new pages to this list when you create them.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/certifications", "/privacy", ...PRODUCTS.map((p) => `/${p.slug}`)];
  return pages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
