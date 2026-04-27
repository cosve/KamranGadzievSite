"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  defaultLocale,
  getLocaleFromPathname,
  getLocalizedHref,
  locales,
  normalizeLocale,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n";

const labels: Record<Locale, string> = {
  ru: "RU",
  az: "AZ",
  en: "EN",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const active =
    getLocaleFromPathname(pathname) || normalizeLocale(searchParams.get("lang"));

  const selectLocale = (locale: Locale) => {
    const params = new URLSearchParams(searchParams.toString());

    if (locale === defaultLocale) {
      params.delete("lang");
    } else {
      params.set("lang", locale);
    }

    const query = params.toString();
    const nextPathname = getLocalizedHref(
      stripLocaleFromPathname(pathname),
      locale,
    );

    window.dispatchEvent(new CustomEvent("routeChangeStart"));
    router.push(`${nextPathname}${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex bg-[#0f2235] h-10 rounded-2xl w-max">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => selectLocale(locale)}
          className={`
            px-4 h-10 rounded-xl text-lg font-medium transition-all
            ${
              active === locale
                ? "bg-[#1f3b5c] text-white"
                : "text-gray-300 hover:text-[#F2E2AC] cursor-pointer"
            }
          `}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
