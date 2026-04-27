import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  getLocalizedHref,
  locales,
  normalizeLocale,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";

const nonDefaultLocales = locales.filter(
  (locale) => locale !== defaultLocale,
);

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const pathLocale = locales.find((locale) =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const queryLocale = normalizeLocale(searchParams.get("lang"));

  if (pathLocale) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = stripLocaleFromPathname(pathname);
    rewriteUrl.searchParams.set("lang", pathLocale);

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: withLocaleHeader(request, pathLocale),
      },
    });
  }

  if (nonDefaultLocales.includes(queryLocale)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = getLocalizedHref(pathname, queryLocale);
    redirectUrl.searchParams.delete("lang");

    return NextResponse.redirect(redirectUrl);
  }

  if (searchParams.get("lang") === defaultLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.searchParams.delete("lang");

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      headers: withLocaleHeader(request, defaultLocale),
    },
  });
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
