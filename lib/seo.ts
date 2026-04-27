import type { Metadata } from "next";
import { getLocalizedHref, locales, type Locale } from "@/lib/i18n";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kamrangadzhyev.com",
);

const siteName = "Ведущий на азербайджанский праздник — Кямран Гаджиев";
const ogImage = "/MainImage.webp";

const localeOg: Record<Locale, string> = {
  ru: "ru_RU",
  az: "az_AZ",
  en: "en_US",
};

const keywords: Record<Locale, string[]> = {
  ru: [
    "Кямран Гаджиев",
    "азербайджанский ведущий",
    "ведущий азербайджанец",
    "тамада азербайджанец",
    "ведущий меджлисов",
    "ведущий на азербайджанскую свадьбу",
    "ведущий на свадебный меджлис",
    "тамада на азербайджанскую свадьбу",
    "ведущий на азербайджанский юбилей",
    "ведущий на азербайджанский день рождения",
    "тамада на азербайджанский день рождения",
    "профессиональный ведущий азербайджанец",
    "ведущий на азербайджанское мероприятие",
    "ведущий мероприятий",
    "меджлис",
    "азербайджанская свадьба",
    "ведущий на юбилей",
  ],
  az: [
    "Kamran Hacıyev",
    "peşəkar aparıcı",
    "toy aparıcısı",
    "Azərbaycan toyu aparıcısı",
    "məclis aparıcısı",
    "Azərbaycan toyu",
    "yubiley aparıcısı",
    "ad günü aparıcısı",
    "tədbir aparıcısı",
  ],
  en: [
    "Kamran Gadzhiev",
    "Azerbaijani event host",
    "Azerbaijani MC",
    "wedding host",
    "majlis host",
    "Azerbaijani wedding host",
    "anniversary host",
    "tamada",
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function localizedAbsoluteUrl(path: string, locale: Locale) {
  return absoluteUrl(getLocalizedHref(path, locale));
}

export function alternateLanguages(path: string) {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedAbsoluteUrl(path, locale)]),
  ) as Record<Locale, string>;

  return {
    ...languages,
    "x-default": localizedAbsoluteUrl(path, "ru"),
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = getLocalizedHref(path, locale);

  return {
    metadataBase: siteUrl,
    title,
    description,
    keywords: keywords[locale],
    alternates: {
      canonical: url,
      languages: alternateLanguages(path),
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      locale: localeOg[locale],
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeOg[item]),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function personJsonLd(locale: Locale) {
  const sameAs = [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_VK_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
  ].filter(Boolean);

  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name:
      locale === "az"
        ? "Kamran Hacıyev"
        : locale === "en"
          ? "Kamran Gadzhiev"
          : "Кямран Гаджиев",
    url: localizedAbsoluteUrl("/", locale),
    image: absoluteUrl("/MainImage.webp"),
    jobTitle:
      locale === "az"
        ? "Məclis aparıcısı, tədbirlər üzrə peşəkar aparıcı"
        : locale === "en"
          ? "Azerbaijani event host and majlis MC"
          : "Профессиональный азербайджанский ведущий меджлисов и тамада",
    description:
      locale === "az"
        ? "Peşəkar məclis aparıcısı Kamran Hacıyev — toy, yubiley və tədbirlər üçün Rusiya və Azərbaycanda."
        : locale === "en"
          ? "Kamran Gadzhiev — professional Azerbaijani event host and majlis MC for weddings, anniversaries and events across Russia."
          : "Кямран Гаджиев — профессиональный азербайджанский ведущий и тамада. Свадьбы, меджлисы, юбилеи, дни рождения по всей России и Азербайджану.",
    areaServed: ["Россия", "Азербайджан", "Москва", "Санкт-Петербург", "Баку"],
    telephone: phone,
    email,
    contactPoint: phone
      ? {
          "@type": "ContactPoint",
          telephone: phone,
          contactType: "customer service",
          availableLanguage: ["Russian", "Azerbaijani"],
        }
      : undefined,
    sameAs,
  };
}

export function serviceJsonLd({
  locale,
  path,
  name,
  description,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: localizedAbsoluteUrl(path, locale),
    provider: personJsonLd(locale),
    areaServed: ["Россия", "Азербайджан", "Москва", "Санкт-Петербург", "Баку"],
    serviceType: name,
  };
}

export function breadcrumbJsonLd({
  locale,
  items,
}: {
  locale: Locale;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedAbsoluteUrl(item.path, locale),
    })),
  };
}
