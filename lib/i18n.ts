export const locales = ["ru", "az", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function normalizeLocale(value: unknown): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];

  return normalizeLocale(segment);
}

export function stripLocaleFromPathname(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);

  if (locales.includes(parts[0] as Locale)) {
    parts.shift();
  }

  return parts.length ? `/${parts.join("/")}` : "/";
}

export function getLocalizedHref(href: string, locale: Locale) {
  if (href.startsWith("#") || href.startsWith("http")) return href;

  const [hrefWithoutHash, hash = ""] = href.split("#");
  const [rawPathname, query = ""] = hrefWithoutHash.split("?");
  const pathname = stripLocaleFromPathname(rawPathname || "/");
  const params = new URLSearchParams(query);
  params.delete("lang");

  const localizedPathname =
    locale === defaultLocale
      ? pathname
      : `/${locale}${pathname === "/" ? "" : pathname}`;
  const localizedQuery = params.toString();

  return `${localizedPathname}${localizedQuery ? `?${localizedQuery}` : ""}${hash ? `#${hash}` : ""}`;
}

export type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>
  | undefined;

export async function getLocaleFromSearchParams(
  searchParams: SearchParamsInput,
) {
  const params = await searchParams;
  const lang = params?.lang;

  return normalizeLocale(Array.isArray(lang) ? lang[0] : lang);
}
