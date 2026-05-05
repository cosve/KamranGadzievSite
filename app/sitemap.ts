import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { alternateLanguages, localizedAbsoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1 },
  { path: "/wedding", priority: 0.9 },
  { path: "/anniversary", priority: 0.85 },
  { path: "/events", priority: 0.85 },
  { path: "/contacts", priority: 0.75 },
  { path: "/book", priority: 0.7 },
  { path: "/privacy", priority: 0.35 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap(({ path, priority }) =>
    locales.map((locale: Locale) => ({
      url: localizedAbsoluteUrl(path, locale),
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
      alternates: {
        languages: alternateLanguages(path),
      },
    })),
  );
}
